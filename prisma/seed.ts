import { db as prisma } from "../src/lib/db";
import { INITIAL_EXAMS_DATA, SAMPLE_VERIFIED_QUESTIONS } from "../src/lib/seed-data";
import { CANONICAL_EXAM_TAXONOMY } from "../src/lib/canonical-chapters";

async function main() {
  console.log("🌱 Starting AptiVerse Database Seeding (Canonical Knowledge Graph & Chapters)...");

  // 1. Create Default Demo Student
  const demoUser = await prisma.user.upsert({
    where: { email: "aman.sharma@aptiverse.ai" },
    update: {},
    create: {
      name: "Aman Sharma",
      email: "aman.sharma@aptiverse.ai",
      role: "STUDENT",
      profile: {
        create: {
          targetExamSlug: "cat",
          targetYear: 2026,
          dailyGoalCount: 25,
          weeklyGoalMocks: 2,
          currentStreak: 12,
          bestStreak: 15,
          totalXp: 2450,
          level: 4,
        },
      },
    },
  });
  console.log(`✅ Demo student initialized: ${demoUser.email}`);

  // 2. Create Default Reviewer/Admin
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@aptiverse.ai" },
    update: {},
    create: {
      name: "Academic Review Board",
      email: "admin@aptiverse.ai",
      role: "SUPERADMIN",
    },
  });
  console.log(`✅ Superadmin initialized: ${adminUser.email}`);

  // 3. Seed Exams and ExamVersions for all 8 exams
  for (const examData of INITIAL_EXAMS_DATA) {
    const exam = await prisma.exam.upsert({
      where: { slug: examData.slug },
      update: {
        name: examData.name,
        shortName: examData.shortName,
        conductingBody: examData.conductingBody,
        officialWebsite: examData.officialWebsite,
        description: examData.description,
        isPopular: examData.isPopular,
      },
      create: {
        slug: examData.slug,
        name: examData.name,
        shortName: examData.shortName,
        conductingBody: examData.conductingBody,
        officialWebsite: examData.officialWebsite,
        description: examData.description,
        isPopular: examData.isPopular,
      },
    });

    const version = await prisma.examVersion.upsert({
      where: {
        examId_year: {
          examId: exam.id,
          year: examData.version.year,
        },
      },
      update: {
        versionName: examData.version.versionName,
        totalDurationMinutes: examData.version.totalDurationMinutes,
        totalQuestions: examData.version.totalQuestions,
        totalMarks: examData.version.totalMarks,
        hasSectionalTiming: examData.version.hasSectionalTiming,
        allowSectionSwitching: examData.version.allowSectionSwitching,
        allowReview: examData.version.allowReview,
        hasCalculator: examData.version.hasCalculator,
        verificationStatus: examData.version.verificationStatus,
        sourceAuthority: examData.version.sourceAuthority,
        sourceUrl: examData.version.sourceUrl,
        rulesJson: examData.version.rulesJson
          ? JSON.stringify(examData.version.rulesJson)
          : null,
      },
      create: {
        examId: exam.id,
        year: examData.version.year,
        versionName: examData.version.versionName,
        totalDurationMinutes: examData.version.totalDurationMinutes,
        totalQuestions: examData.version.totalQuestions,
        totalMarks: examData.version.totalMarks,
        hasSectionalTiming: examData.version.hasSectionalTiming,
        allowSectionSwitching: examData.version.allowSectionSwitching,
        allowReview: examData.version.allowReview,
        hasCalculator: examData.version.hasCalculator,
        verificationStatus: examData.version.verificationStatus,
        sourceAuthority: examData.version.sourceAuthority,
        sourceUrl: examData.version.sourceUrl,
        rulesJson: examData.version.rulesJson
          ? JSON.stringify(examData.version.rulesJson)
          : null,
      },
    });

    console.log(`  + Exam synchronized: ${exam.shortName} (${version.year})`);
  }

  // 4. Seed Canonical Taxonomy: Sections, Topics, Chapters & ChapterTests across all 8 exams
  let totalSeededChapters = 0;
  let totalSeededChapterTests = 0;
  let officialTaxonomyCount = 0;
  let recommendedTaxonomyCount = 0;

  const seededChapterIdMap = new Map<string, string>(); // slug -> chapterId

  for (const [examSlug, canonicalExam] of Object.entries(CANONICAL_EXAM_TAXONOMY)) {
    const exam = await prisma.exam.findUnique({ where: { slug: examSlug } });
    if (!exam) continue;

    const version = await prisma.examVersion.findFirst({
      where: { examId: exam.id },
      orderBy: { year: "desc" },
    });
    if (!version) continue;

    for (const sectionData of canonicalExam.sections) {
      // Find or create ExamSection
      let section = await prisma.examSection.findFirst({
        where: { examVersionId: version.id, slug: sectionData.slug },
      });

      if (!section) {
        section = await prisma.examSection.create({
          data: {
            examVersionId: version.id,
            name: sectionData.name,
            slug: sectionData.slug,
            durationMinutes: sectionData.durationMinutes,
            questionCount: sectionData.questionCount,
            positiveMarks: sectionData.positiveMarks,
            negativeMarks: sectionData.negativeMarks,
            titaPositiveMarks: sectionData.titaPositiveMarks,
            titaNegativeMarks: sectionData.titaNegativeMarks,
            orderIndex: sectionData.orderIndex,
          },
        });
      } else {
        section = await prisma.examSection.update({
          where: { id: section.id },
          data: {
            name: sectionData.name,
            durationMinutes: sectionData.durationMinutes,
            questionCount: sectionData.questionCount,
            positiveMarks: sectionData.positiveMarks,
            negativeMarks: sectionData.negativeMarks,
            orderIndex: sectionData.orderIndex,
          },
        });
      }

      for (const topicData of sectionData.topics) {
        // Find or create ExamTopic
        let topic = await prisma.examTopic.findFirst({
          where: { sectionId: section.id, slug: topicData.slug },
        });

        if (!topic) {
          topic = await prisma.examTopic.create({
            data: {
              sectionId: section.id,
              name: topicData.name,
              slug: topicData.slug,
              weightage: topicData.weightage,
            },
          });
        } else {
          topic = await prisma.examTopic.update({
            where: { id: topic.id },
            data: {
              name: topicData.name,
              weightage: topicData.weightage,
            },
          });
        }

        // Seed Chapters for this Topic
        for (const chapterData of topicData.chapters) {
          const chapter = await prisma.chapter.upsert({
            where: {
              topicId_slug: {
                topicId: topic.id,
                slug: chapterData.slug,
              },
            },
            update: {
              name: chapterData.name,
              description: chapterData.description,
              orderIndex: chapterData.orderIndex,
              taxonomyType: chapterData.taxonomyType,
            },
            create: {
              topicId: topic.id,
              name: chapterData.name,
              slug: chapterData.slug,
              description: chapterData.description,
              orderIndex: chapterData.orderIndex,
              taxonomyType: chapterData.taxonomyType,
            },
          });

          seededChapterIdMap.set(`${examSlug}-${chapter.slug}`, chapter.id);
          seededChapterIdMap.set(chapter.slug, chapter.id);

          totalSeededChapters++;
          if (chapter.taxonomyType === "OFFICIAL_SYLLABUS") {
            officialTaxonomyCount++;
          } else {
            recommendedTaxonomyCount++;
          }

          // Seed or update ChapterTest
          const testSlug = `${examSlug}-${chapter.slug}-mastery-test`;
          const testQuestionCount = chapterData.testQuestionCount || 10;
          const positiveMarks = chapterData.positiveMarks ?? sectionData.positiveMarks ?? 3.0;
          const negativeMarks = chapterData.negativeMarks ?? sectionData.negativeMarks ?? 1.0;
          const totalMarks = testQuestionCount * positiveMarks;

          await prisma.chapterTest.upsert({
            where: { slug: testSlug },
            update: {
              title: `${chapter.name} - Chapter Mastery Test`,
              description: `Standardized chapterwise assessment for ${chapter.name}. Evaluates core concepts, trap avoidance, and timed accuracy.`,
              durationMinutes: chapterData.testDurationMinutes || 15,
              totalQuestions: testQuestionCount,
              totalMarks,
              positiveMarks,
              negativeMarks,
              isLive: true,
            },
            create: {
              chapterId: chapter.id,
              title: `${chapter.name} - Chapter Mastery Test`,
              slug: testSlug,
              description: `Standardized chapterwise assessment for ${chapter.name}. Evaluates core concepts, trap avoidance, and timed accuracy.`,
              durationMinutes: chapterData.testDurationMinutes || 15,
              totalQuestions: testQuestionCount,
              totalMarks,
              positiveMarks,
              negativeMarks,
              isLive: true,
            },
          });

          totalSeededChapterTests++;
        }
      }
    }
  }

  console.log(
    `✅ Successfully seeded ${totalSeededChapters} Chapters (${officialTaxonomyCount} Official Syllabus, ${recommendedTaxonomyCount} Recommended Prep Taxonomy) and ${totalSeededChapterTests} Chapter Tests!`
  );

  // 5. Seed Subtopics & Concepts from INITIAL_EXAMS_DATA and link Concepts to matching Chapters
  for (const examData of INITIAL_EXAMS_DATA) {
    const exam = await prisma.exam.findUnique({ where: { slug: examData.slug } });
    if (!exam) continue;

    const version = await prisma.examVersion.findFirst({
      where: { examId: exam.id },
      orderBy: { year: "desc" },
    });
    if (!version) continue;

    for (const sectionData of examData.sections) {
      const section = await prisma.examSection.findFirst({
        where: { examVersionId: version.id, slug: sectionData.slug },
      });
      if (!section) continue;

      for (const topicData of sectionData.topics) {
        const topic = await prisma.examTopic.findFirst({
          where: { sectionId: section.id, slug: topicData.slug },
        });
        if (!topic) continue;

        // Retrieve chapters under this topic for concept linking
        const topicChapters = await prisma.chapter.findMany({
          where: { topicId: topic.id },
        });

        for (const subtopicData of topicData.subtopics) {
          let subtopic = await prisma.examSubtopic.findFirst({
            where: { topicId: topic.id, slug: subtopicData.slug },
          });

          if (!subtopic) {
            subtopic = await prisma.examSubtopic.create({
              data: {
                topicId: topic.id,
                name: subtopicData.name,
                slug: subtopicData.slug,
              },
            });
          }

          for (const conceptData of subtopicData.concepts) {
            // Match concept to the closest chapter in this topic if possible
            const matchedChapter = topicChapters.find((ch: any) =>
              conceptData.slug.includes(ch.slug) ||
              ch.slug.includes(conceptData.slug) ||
              conceptData.title.toLowerCase().includes(ch.name.toLowerCase().split(" ")[0])
            ) || topicChapters[0];

            const existingConcept = await prisma.concept.findFirst({
              where: { subtopicId: subtopic.id, slug: conceptData.slug },
            });

            if (!existingConcept) {
              await prisma.concept.create({
                data: {
                  subtopicId: subtopic.id,
                  chapterId: matchedChapter ? matchedChapter.id : null,
                  title: conceptData.title,
                  slug: conceptData.slug,
                  summary: conceptData.summary,
                  theoryHtml: conceptData.theoryHtml,
                  keyFormulas: JSON.stringify(conceptData.keyFormulas),
                  tricks: conceptData.tricks,
                  commonTraps: conceptData.commonTraps,
                  readTimeMin: conceptData.readTimeMin,
                },
              });
            } else {
              await prisma.concept.update({
                where: { id: existingConcept.id },
                data: {
                  chapterId: matchedChapter ? matchedChapter.id : existingConcept.chapterId,
                  title: conceptData.title,
                  summary: conceptData.summary,
                  theoryHtml: conceptData.theoryHtml,
                  keyFormulas: JSON.stringify(conceptData.keyFormulas),
                },
              });
            }
          }
        }
      }
    }
  }

  // 6. Seed / Link Verified Questions to Chapters
  console.log("📝 Synchronizing sample verified questions and linking to chapters...");
  for (const q of SAMPLE_VERIFIED_QUESTIONS) {
    let assignedChapterSlug = "";
    if (q.id === "q-tsd-001" || q.questionText.includes("Two trains")) {
      assignedChapterSlug = "time-speed-distance";
    } else if (q.id === "q-tw-002" || q.questionText.includes("A can complete a project")) {
      assignedChapterSlug = "time-work-pipes-cisterns";
    } else if (q.id === "q-rc-003" || q.questionText.includes("central argument")) {
      assignedChapterSlug = "main-idea-primary-purpose";
    } else if (q.id === "q-dm-004" || q.questionText.includes("Naveen")) {
      assignedChapterSlug = "ethical-dilemmas-governance";
    }

    const assignedChapterId = assignedChapterSlug
      ? seededChapterIdMap.get(assignedChapterSlug) || null
      : null;

    const existingQ = await prisma.question.findFirst({
      where: { questionText: q.questionText },
    });

    if (!existingQ) {
      await prisma.question.create({
        data: {
          questionType: q.questionType,
          difficulty: q.difficulty,
          questionText: q.questionText,
          passageText: q.passageText,
          correctAnswer: q.correctAnswer,
          estimatedTimeSec: q.estimatedTimeSec,
          isDemo: q.isDemo,
          verificationStatus: "VERIFIED",
          source: q.source,
          chapterId: assignedChapterId,
          options: {
            create: q.options.map((opt, idx) => ({
              optionLabel: opt.label,
              optionText: opt.text,
              orderIndex: idx,
            })),
          },
          solution: {
            create: {
              detailedText: q.solution.detailedText,
              stepByStep: JSON.stringify(q.solution.stepByStep),
              shortcutMethod: q.solution.shortcutMethod,
              conceptTested: q.solution.conceptTested,
              commonMistakeTrap: q.solution.commonMistakeTrap,
            },
          },
        },
      });
      console.log(`  + Question seeded: [${q.difficulty}] ${q.id} (Chapter: ${assignedChapterSlug})`);
    } else {
      await prisma.question.update({
        where: { id: existingQ.id },
        data: { chapterId: assignedChapterId },
      });
      console.log(`  + Question chapter linked: ${existingQ.id} -> ${assignedChapterSlug} (${assignedChapterId})`);
    }
  }

  // 7. Seed Initial Chapter Mastery Progress for Demo User (Aman Sharma)
  console.log("🎯 Initializing student chapter progress baseline...");
  const catPercentageChapterId = seededChapterIdMap.get("percentages-base-changes");
  const catInferenceChapterId = seededChapterIdMap.get("direct-indirect-inferences");
  const catNetworkChapterId = seededChapterIdMap.get("routes-networks-pipelines");
  const catLinearEqChapterId = seededChapterIdMap.get("linear-equations-diophantine");

  const demoProgressItems = [
    {
      chapterId: catPercentageChapterId,
      masteryStatus: "MASTERED",
      questionsAttempted: 35,
      questionsCorrect: 31,
      accuracyPct: 88.6,
      practiceTimeSec: 2400,
    },
    {
      chapterId: catInferenceChapterId,
      masteryStatus: "IN_PROGRESS",
      questionsAttempted: 24,
      questionsCorrect: 18,
      accuracyPct: 75.0,
      practiceTimeSec: 1800,
    },
    {
      chapterId: catNetworkChapterId,
      masteryStatus: "NEEDS_REVISION",
      questionsAttempted: 15,
      questionsCorrect: 8,
      accuracyPct: 53.3,
      practiceTimeSec: 1500,
    },
    {
      chapterId: catLinearEqChapterId,
      masteryStatus: "IN_PROGRESS",
      questionsAttempted: 20,
      questionsCorrect: 16,
      accuracyPct: 80.0,
      practiceTimeSec: 1950,
    },
  ];

  for (const item of demoProgressItems) {
    if (item.chapterId) {
      await prisma.userChapterProgress.upsert({
        where: {
          userId_chapterId: {
            userId: demoUser.id,
            chapterId: item.chapterId,
          },
        },
        update: {
          masteryStatus: item.masteryStatus,
          questionsAttempted: item.questionsAttempted,
          questionsCorrect: item.questionsCorrect,
          accuracyPct: item.accuracyPct,
          practiceTimeSec: item.practiceTimeSec,
          lastPracticedAt: new Date(),
        },
        create: {
          userId: demoUser.id,
          chapterId: item.chapterId,
          masteryStatus: item.masteryStatus,
          questionsAttempted: item.questionsAttempted,
          questionsCorrect: item.questionsCorrect,
          accuracyPct: item.accuracyPct,
          practiceTimeSec: item.practiceTimeSec,
          lastPracticedAt: new Date(),
        },
      });
    }
  }

  // 8. Seed Official Full Mock
  const catExam = await prisma.exam.findUnique({ where: { slug: "cat" } });
  if (catExam) {
    const catVersion = await prisma.examVersion.findFirst({
      where: { examId: catExam.id, year: 2026 },
    });
    if (catVersion) {
      const mock = await prisma.mockTest.upsert({
        where: { slug: "cat-2026-national-full-mock-01" },
        update: {},
        create: {
          examVersionId: catVersion.id,
          title: "CAT 2026 National Full Mock #01",
          slug: "cat-2026-national-full-mock-01",
          description:
            "Official 120-minute simulation with 3 locked 40-minute sections (VARC, DILR, QA). Standard +3 / -1 marking scheme.",
          isFullMock: true,
          durationMin: 120,
          totalMarks: 198,
          totalQuestions: 66,
          isLive: true,
        },
      });
      console.log(`✅ Official Mock created: ${mock.title}`);
    }
  }

  console.log("🚀 AptiVerse Database Seeding Completed Successfully with Canonical Knowledge Graph!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
