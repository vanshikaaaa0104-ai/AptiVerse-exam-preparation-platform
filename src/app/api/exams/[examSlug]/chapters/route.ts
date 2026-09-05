import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CANONICAL_EXAM_TAXONOMY, getAllChaptersForExam } from "@/lib/canonical-chapters";
import { verifySessionToken, SESSION_COOKIE_NAME, ALT_SESSION_COOKIE_NAME } from "@/lib/session";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ examSlug: string }> }
) {
  try {
    const { examSlug } = await context.params;
    const normalizedSlug = examSlug.toLowerCase();

    // Check optional authenticated user from request cookies
    const token =
      request.cookies.get(SESSION_COOKIE_NAME)?.value ||
      request.cookies.get(ALT_SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    const userId = session?.userId;

    // 1. Fetch from Database
    const exam = await db.exam.findUnique({
      where: { slug: normalizedSlug },
      include: {
        versions: {
          orderBy: { year: "desc" },
          take: 1,
          include: {
            sections: {
              orderBy: { orderIndex: "asc" },
              include: {
                topics: {
                  include: {
                    chapters: {
                      orderBy: { orderIndex: "asc" },
                      include: {
                        chapterTests: {
                          where: { isLive: true },
                          select: {
                            id: true,
                            slug: true,
                            title: true,
                            durationMinutes: true,
                            totalQuestions: true,
                            totalMarks: true,
                            positiveMarks: true,
                            negativeMarks: true,
                          },
                        },
                        _count: {
                          select: {
                            concepts: true,
                            questions: true,
                          },
                        },
                        ...(userId
                          ? {
                              chapterProgress: {
                                where: { userId },
                                select: {
                                  masteryStatus: true,
                                  questionsAttempted: true,
                                  questionsCorrect: true,
                                  accuracyPct: true,
                                  practiceTimeSec: true,
                                  lastPracticedAt: true,
                                },
                              },
                            }
                          : {}),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (exam && exam.versions.length > 0) {
      const activeVersion = exam.versions[0];
      let totalChapters = 0;
      let officialCount = 0;
      let recommendedCount = 0;

      const formattedSections = activeVersion.sections.map((section: any) => {
        const topics = section.topics.map((topic: any) => {
          const chapters = topic.chapters.map((ch: any) => {
            totalChapters++;
            if (ch.taxonomyType === "OFFICIAL_SYLLABUS") {
              officialCount++;
            } else {
              recommendedCount++;
            }

            const userProg = (ch as any).chapterProgress?.[0] || null;

            return {
              id: ch.id,
              name: ch.name,
              slug: ch.slug,
              description: ch.description,
              orderIndex: ch.orderIndex,
              taxonomyType: ch.taxonomyType,
              taxonomyLabel:
                ch.taxonomyType === "OFFICIAL_SYLLABUS"
                  ? "Official Syllabus"
                  : "Recommended Preparation Taxonomy",
              isOfficial: ch.taxonomyType === "OFFICIAL_SYLLABUS",
              conceptCount: ch._count.concepts,
              questionCount: ch._count.questions,
              tests: ch.chapterTests,
              userProgress: userProg
                ? {
                    masteryStatus: userProg.masteryStatus,
                    questionsAttempted: userProg.questionsAttempted,
                    questionsCorrect: userProg.questionsCorrect,
                    accuracyPct: userProg.accuracyPct,
                    practiceTimeSec: userProg.practiceTimeSec,
                    lastPracticedAt: userProg.lastPracticedAt,
                  }
                : {
                    masteryStatus: "NOT_STARTED",
                    questionsAttempted: 0,
                    questionsCorrect: 0,
                    accuracyPct: 0.0,
                    practiceTimeSec: 0,
                    lastPracticedAt: null,
                  },
            };
          });

          return {
            id: topic.id,
            name: topic.name,
            slug: topic.slug,
            weightage: topic.weightage,
            chapters,
          };
        });

        return {
          id: section.id,
          name: section.name,
          slug: section.slug,
          durationMinutes: section.durationMinutes,
          questionCount: section.questionCount,
          positiveMarks: section.positiveMarks,
          negativeMarks: section.negativeMarks,
          orderIndex: section.orderIndex,
          topics,
        };
      });

      return NextResponse.json({
        success: true,
        source: "database",
        exam: {
          id: exam.id,
          slug: exam.slug,
          name: exam.name,
          shortName: exam.shortName,
          conductingBody: exam.conductingBody,
          officialWebsite: exam.officialWebsite,
          year: activeVersion.year,
        },
        stats: {
          totalChapters,
          officialCount,
          recommendedCount,
        },
        sections: formattedSections,
      });
    }

    // 2. Fallback to Canonical In-Memory Taxonomy if Database has not yet synced
    const canonicalExam = CANONICAL_EXAM_TAXONOMY[normalizedSlug];
    if (canonicalExam) {
      const allChapters = getAllChaptersForExam(normalizedSlug);
      const officialCount = allChapters.filter(
        (c) => c.taxonomyType === "OFFICIAL_SYLLABUS"
      ).length;
      const recommendedCount = allChapters.length - officialCount;

      return NextResponse.json({
        success: true,
        source: "canonical-taxonomy-memory",
        exam: {
          slug: canonicalExam.examSlug,
          name: canonicalExam.examName,
          shortName: canonicalExam.shortName,
          year: 2026,
        },
        stats: {
          totalChapters: allChapters.length,
          officialCount,
          recommendedCount,
        },
        sections: canonicalExam.sections,
      });
    }

    return NextResponse.json(
      { success: false, error: `Exam with slug "${examSlug}" not found` },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching exam chapters:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching chapters" },
      { status: 500 }
    );
  }
}
