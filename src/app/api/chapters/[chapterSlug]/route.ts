import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionToken, SESSION_COOKIE_NAME, ALT_SESSION_COOKIE_NAME } from "@/lib/session";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ chapterSlug: string }> }
) {
  try {
    const { chapterSlug } = await context.params;

    // Check authenticated user from request cookies
    const token =
      request.cookies.get(SESSION_COOKIE_NAME)?.value ||
      request.cookies.get(ALT_SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    const userId = session?.userId;

    const chapter = await db.chapter.findFirst({
      where: { slug: chapterSlug },
      include: {
        topic: {
          include: {
            section: {
              include: {
                examVersion: {
                  include: {
                    exam: true,
                  },
                },
              },
            },
          },
        },
        concepts: {
          select: {
            id: true,
            title: true,
            slug: true,
            summary: true,
            readTimeMin: true,
          },
        },
        questions: {
          select: {
            id: true,
            questionType: true,
            difficulty: true,
            questionText: true,
            estimatedTimeSec: true,
          },
          take: 10,
        },
        chapterTests: {
          where: { isLive: true },
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            durationMinutes: true,
            totalQuestions: true,
            totalMarks: true,
            positiveMarks: true,
            negativeMarks: true,
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
    });

    if (!chapter) {
      return NextResponse.json(
        { success: false, error: `Chapter with slug "${chapterSlug}" not found` },
        { status: 404 }
      );
    }

    const userProg = (chapter as any).chapterProgress?.[0] || null;

    return NextResponse.json({
      success: true,
      chapter: {
        id: chapter.id,
        name: chapter.name,
        slug: chapter.slug,
        description: chapter.description,
        orderIndex: chapter.orderIndex,
        taxonomyType: chapter.taxonomyType,
        taxonomyLabel:
          chapter.taxonomyType === "OFFICIAL_SYLLABUS"
            ? "Official Syllabus"
            : "Recommended Preparation Taxonomy",
        isOfficial: chapter.taxonomyType === "OFFICIAL_SYLLABUS",
        topic: {
          id: chapter.topic.id,
          name: chapter.topic.name,
          slug: chapter.topic.slug,
        },
        section: {
          id: chapter.topic.section.id,
          name: chapter.topic.section.name,
          slug: chapter.topic.section.slug,
        },
        exam: {
          id: chapter.topic.section.examVersion.exam.id,
          slug: chapter.topic.section.examVersion.exam.slug,
          name: chapter.topic.section.examVersion.exam.name,
          shortName: chapter.topic.section.examVersion.exam.shortName,
        },
        concepts: chapter.concepts,
        sampleQuestions: chapter.questions,
        tests: chapter.chapterTests,
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
      },
    });
  } catch (error) {
    console.error("Error fetching chapter details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching chapter" },
      { status: 500 }
    );
  }
}
