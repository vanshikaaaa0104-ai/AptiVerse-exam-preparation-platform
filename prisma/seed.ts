import { db as prisma } from "../src/lib/db";
import { INITIAL_EXAMS_DATA, SAMPLE_VERIFIED_QUESTIONS } from "../src/lib/seed-data";

async function main() {
  console.log("🌱 Starting AptiVerse Database Seeding...");

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

  // 3. Seed Exams, Versions, Sections, Topics, Concepts
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

    for (const sectionData of examData.sections) {
      const section = await prisma.examSection.create({
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

      for (const topicData of sectionData.topics) {
        const topic = await prisma.examTopic.create({
          data: {
            sectionId: section.id,
            name: topicData.name,
            slug: topicData.slug,
            weightage: topicData.weightage,
          },
        });

        for (const subtopicData of topicData.subtopics) {
          const subtopic = await prisma.examSubtopic.create({
            data: {
              topicId: topic.id,
              name: subtopicData.name,
              slug: subtopicData.slug,
            },
          });

          for (const conceptData of subtopicData.concepts) {
            await prisma.concept.create({
              data: {
                subtopicId: subtopic.id,
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
          }
        }
      }
    }
  }

  // 4. Seed Verified Questions with 4-Part Solutions
  for (const q of SAMPLE_VERIFIED_QUESTIONS) {
    const question = await prisma.question.create({
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
    console.log(`  + Question seeded: [${q.difficulty}] ${q.id}`);
  }

  // 5. Seed Official Full Mock
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

  console.log("🚀 AptiVerse Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
