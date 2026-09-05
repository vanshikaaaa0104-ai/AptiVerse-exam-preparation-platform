# AptiVerse Database Schema & Data Modeling Specification

This document details the relational data model for AptiVerse using Prisma ORM with PostgreSQL.

---

## 1. Relational Entity Overview

```
User ──────── Profile
 │
 ├── Attempt ──────── AttemptAnswer ──────── Question ──────── QuestionOption
 │     │                                        │                   │
 │     └──── MockTest / Quiz                    ├──── Solution      │
 │                                              ├──── VerificationReview
 ├── UserProgress                               │
 ├── TopicMastery                               ├──── ExamSubtopic ──► ExamTopic ──► ExamSection ──► ExamVersion ──► Exam
 ├── UserAchievement ──► Achievement           │
 ├── Bookmark                                  └──── Concept
 ├── Notification
 └── Recommendation
```

---

## 2. Complete Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// -----------------------------------------------------------------------------
// ENUMS
// -----------------------------------------------------------------------------

enum UserRole {
  STUDENT
  REVIEWER
  ADMIN
  SUPERADMIN
}

enum VerificationStatus {
  DRAFT
  REVIEW
  VERIFIED
  PUBLISHED
  REJECTED
}

enum ExamVerificationStatus {
  VERIFIED
  DERIVED
  NEEDS_REVIEW
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum QuestionType {
  MCQ
  TITA
  NUMERICAL
  MATCHING
}

enum AttemptStatus {
  IN_PROGRESS
  COMPLETED
  TIMED_OUT
  ABANDONED
}

enum PaletteQuestionStatus {
  NOT_VISITED
  SKIPPED
  ANSWERED
  MARKED_FOR_REVIEW
  ANSWERED_AND_MARKED
}

enum RecommendationType {
  WEAK_AREA_REVISION
  DIFFICULTY_PROGRESSION
  SPACED_REFRESHER
  SPEED_OPTIMIZATION
  MOCK_TEST_CHALLENGE
}

// -----------------------------------------------------------------------------
// USER & AUTHENTICATION
// -----------------------------------------------------------------------------

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  role          UserRole  @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  profile             Profile?
  attempts            Attempt[]
  bookmarks           Bookmark[]
  achievements        UserAchievement[]
  progress            UserProgress[]
  masteries           TopicMastery[]
  recommendations     Recommendation[]
  notifications       Notification[]
  reviewsConducted    VerificationReview[] @relation("Reviewer")
  studySessions       StudySession[]
  questionHistories   UserQuestionHistory[]

  @@index([role])
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  targetExamSlug  String   @default("cat")
  targetYear      Int      @default(2026)
  dailyGoalCount  Int      @default(20)
  weeklyGoalMocks Int      @default(2)
  currentStreak   Int      @default(0)
  bestStreak      Int      @default(0)
  totalXp         Int      @default(0)
  level           Int      @default(1)
  lastActiveDate  DateTime @default(now())

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([targetExamSlug])
  @@index([totalXp])
}

// -----------------------------------------------------------------------------
// EXAM ARCHITECTURE & SYLLABUS GRAPH
// -----------------------------------------------------------------------------

model Exam {
  id          String   @id @default(cuid())
  slug        String   @unique // e.g. "cat", "xat", "snap", "nmat", "cmat", "mat", "mah-cet"
  name        String   // e.g. "Common Admission Test"
  shortName   String   // e.g. "CAT"
  conductingBody String // e.g. "IIMs"
  officialWebsite String
  description String   @db.Text
  isPopular   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  versions    ExamVersion[]
}

model ExamVersion {
  id                   String                 @id @default(cuid())
  examId               String
  exam                 Exam                   @relation(fields: [examId], references: [id], onDelete: Cascade)
  year                 Int
  versionName          String                 // e.g. "CAT 2026 Official Pattern"
  totalDurationMinutes Int
  totalQuestions       Int
  totalMarks           Int
  hasSectionalTiming   Boolean                @default(false)
  allowSectionSwitching Boolean               @default(true)
  allowReview          Boolean                @default(true)
  hasCalculator        Boolean                @default(false)
  verificationStatus   ExamVerificationStatus @default(VERIFIED)
  sourceAuthority      String                 // e.g. "CAT Convenor Official Notification"
  sourceUrl            String
  verifiedAt           DateTime               @default(now())
  rulesJson            Json?                  // Special rules config (penalties, unattempted deductions)
  createdAt            DateTime               @default(now())
  updatedAt            DateTime               @updatedAt

  sections             ExamSection[]
  mockTests            MockTest[]
  questions            Question[]

  @@unique([examId, year])
  @@index([verificationStatus])
}

model ExamSection {
  id                   String      @id @default(cuid())
  examVersionId        String
  examVersion          ExamVersion @relation(fields: [examVersionId], references: [id], onDelete: Cascade)
  name                 String      // e.g. "Quantitative Aptitude"
  slug                 String
  durationMinutes      Int?        // Optional sectional timer
  questionCount        Int
  positiveMarks        Float       @default(3.0)
  negativeMarks        Float       @default(1.0)
  titaPositiveMarks    Float       @default(3.0)
  titaNegativeMarks    Float       @default(0.0)
  orderIndex           Int
  createdAt            DateTime    @default(now())
  updatedAt            DateTime    @updatedAt

  topics               ExamTopic[]
  mockTestSections     MockTestSection[]
  questions            Question[]

  @@index([examVersionId, orderIndex])
}

model ExamTopic {
  id          String      @id @default(cuid())
  sectionId   String
  section     ExamSection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  name        String      // e.g. "Arithmetic"
  slug        String
  description String?     @db.Text
  weightage   String?     // e.g. "30-35%"
  orderIndex  Int         @default(0)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  subtopics   ExamSubtopic[]
  chapters    Chapter[]
  questions   Question[]

  @@index([sectionId])
}

model Chapter {
  id              String      @id @default(cuid())
  topicId         String
  topic           ExamTopic   @relation(fields: [topicId], references: [id], onDelete: Cascade)
  name            String      // e.g. "Time, Speed & Distance"
  slug            String
  description     String?
  orderIndex      Int         @default(0)
  taxonomyType    String      @default("RECOMMENDED_PREPARATION_TAXONOMY") // "RECOMMENDED_PREPARATION_TAXONOMY" | "OFFICIAL_SYLLABUS"

  concepts        Concept[]
  questions       Question[]
  chapterProgress UserChapterProgress[]
  chapterTests    ChapterTest[]

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@unique([topicId, slug])
  @@index([topicId, orderIndex])
}

model ExamSubtopic {
  id          String    @id @default(cuid())
  topicId     String
  topic       ExamTopic @relation(fields: [topicId], references: [id], onDelete: Cascade)
  name        String    // e.g. "Time & Work"
  slug        String
  description String?   @db.Text
  orderIndex  Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  concepts    Concept[]
  questions   Question[]
  masteries   TopicMastery[]

  @@index([topicId])
}

model Concept {
  id          String       @id @default(cuid())
  subtopicId  String
  subtopic    ExamSubtopic @relation(fields: [subtopicId], references: [id], onDelete: Cascade)
  title       String       // e.g. "Efficiency & Man-Days Equivalence"
  slug        String
  summary     String       @db.Text
  theoryHtml  String       @db.Text
  keyFormulas Json?        // Array of formula strings / LaTeX
  tricks      String?      @db.Text
  commonTraps String?      @db.Text
  readTimeMin Int          @default(5)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  questions   Question[]

  @@index([subtopicId])
}

// -----------------------------------------------------------------------------
// QUESTION BANK & VERIFICATION
// -----------------------------------------------------------------------------

model Question {
  id                 String             @id @default(cuid())
  examVersionId      String?
  examVersion        ExamVersion?       @relation(fields: [examVersionId], references: [id], onDelete: SetNull)
  sectionId          String?
  section            ExamSection?       @relation(fields: [sectionId], references: [id], onDelete: SetNull)
  topicId            String?
  topic              ExamTopic?         @relation(fields: [topicId], references: [id], onDelete: SetNull)
  subtopicId         String?
  subtopic           ExamSubtopic?      @relation(fields: [subtopicId], references: [id], onDelete: SetNull)
  conceptId          String?
  concept            Concept?           @relation(fields: [conceptId], references: [id], onDelete: SetNull)

  questionType       QuestionType       @default(MCQ)
  difficulty         Difficulty         @default(MEDIUM)
  questionText       String             @db.Text
  passageText        String?            @db.Text // RC / DI Caselet passage
  correctAnswer      String             // "A", "B", "C", "D" or exact numeric/string value for TITA
  estimatedTimeSec   Int                @default(120) // Expected solving time
  isDemo             Boolean            @default(false)
  verificationStatus VerificationStatus @default(DRAFT)
  source             String?            // e.g. "AptiVerse Original" or "CAT 2023 Slot 1 (Verified Pattern)"
  sourceType         String             @default("ORIGINAL_CURATED")
  copyrightStatus    String             @default("ORIGINAL_CONTENT")
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  options            QuestionOption[]
  solution           Solution?
  quizQuestions      QuizQuestion[]
  attemptAnswers     AttemptAnswer[]
  bookmarks          Bookmark[]
  reviews            VerificationReview[]
  tags               QuestionTag[]
  histories          UserQuestionHistory[]

  @@index([examVersionId])
  @@index([sectionId])
  @@index([topicId])
  @@index([subtopicId])
  @@index([difficulty])
  @@index([verificationStatus])
}

model QuestionOption {
  id          String   @id @default(cuid())
  questionId  String
  question    Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  optionLabel String   // "A", "B", "C", "D", "E"
  optionText  String   @db.Text
  orderIndex  Int      @default(0)

  @@index([questionId])
}

model Solution {
  id                 String   @id @default(cuid())
  questionId         String   @unique
  question           Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  detailedText       String   @db.Text
  stepByStep         Json?    // Array of string steps
  shortcutMethod     String?  @db.Text
  conceptTested      String?  @db.Text
  commonMistakeTrap  String?  @db.Text
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model QuestionTag {
  id         String   @id @default(cuid())
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  tagName    String

  @@index([questionId])
  @@index([tagName])
}

model VerificationReview {
  id          String             @id @default(cuid())
  questionId  String
  question    Question           @relation(fields: [questionId], references: [id], onDelete: Cascade)
  reviewerId  String
  reviewer    User               @relation("Reviewer", fields: [reviewerId], references: [id])
  status      VerificationStatus
  feedback    String?            @db.Text
  checklist   Json               // Checklist results { mathVerified: true, singleAnswer: true, ... }
  createdAt   DateTime           @default(now())

  @@index([questionId])
  @@index([reviewerId])
}

// -----------------------------------------------------------------------------
// PRACTICE QUIZZES & MOCK TESTS
// -----------------------------------------------------------------------------

model Quiz {
  id          String         @id @default(cuid())
  title       String
  slug        String         @unique
  description String?        @db.Text
  durationSec Int            @default(900) // 15 mins
  totalMarks  Float          @default(30.0)
  isPublic    Boolean        @default(true)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  questions   QuizQuestion[]
  attempts    Attempt[]
}

model QuizQuestion {
  id         String   @id @default(cuid())
  quizId     String
  quiz       Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  orderIndex Int      @default(0)

  @@unique([quizId, questionId])
  @@index([quizId])
}

model MockTest {
  id            String            @id @default(cuid())
  examVersionId String
  examVersion   ExamVersion       @relation(fields: [examVersionId], references: [id], onDelete: Cascade)
  title         String            // e.g. "CAT 2026 National Full Mock #01"
  slug          String            @unique
  description   String?           @db.Text
  isFullMock    Boolean           @default(true) // false = sectional mock
  durationMin   Int
  totalMarks    Float
  totalQuestions Int
  isLive        Boolean           @default(true)
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  sections      MockTestSection[]
  attempts      Attempt[]

  @@index([examVersionId])
}

model MockTestSection {
  id            String      @id @default(cuid())
  mockTestId    String
  mockTest      MockTest    @relation(fields: [mockTestId], references: [id], onDelete: Cascade)
  sectionId     String
  section       ExamSection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  orderIndex    Int
  durationMin   Int?
  questionCount Int
  positiveMarks Float
  negativeMarks Float

  @@index([mockTestId])
}

// -----------------------------------------------------------------------------
// ATTEMPTS, TELEMETRY & ANSWERS
// -----------------------------------------------------------------------------

model Attempt {
  id             String        @id @default(cuid())
  userId         String
  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId         String?
  quiz           Quiz?         @relation(fields: [quizId], references: [id], onDelete: SetNull)
  mockTestId     String?
  mockTest       MockTest?     @relation(fields: [mockTestId], references: [id], onDelete: SetNull)
  status         AttemptStatus @default(IN_PROGRESS)
  startedAt      DateTime      @default(now())
  completedAt    DateTime?
  totalTimeSec   Int           @default(0)
  totalScore     Float         @default(0.0)
  accuracyPct    Float         @default(0.0)
  totalQuestions Int           @default(0)
  correctCount   Int           @default(0)
  incorrectCount Int           @default(0)
  skippedCount   Int           @default(0)
  percentile     Float?
  sectionScores  Json?         // Sectional breakdown { "qa": 24, "dilr": 18, "varc": 30 }

  answers        AttemptAnswer[]

  @@index([userId, status])
  @@index([mockTestId])
  @@index([quizId])
}

model AttemptAnswer {
  id             String                @id @default(cuid())
  attemptId      String
  attempt        Attempt               @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  questionId     String
  question       Question              @relation(fields: [questionId], references: [id], onDelete: Cascade)
  selectedOption String?               // e.g. "B" or TITA string
  isCorrect      Boolean               @default(false)
  scoreAwarded   Float                 @default(0.0)
  timeSpentSec   Int                   @default(0)
  paletteState   PaletteQuestionStatus @default(NOT_VISITED)
  updatedAt      DateTime              @default(now())

  @@unique([attemptId, questionId])
  @@index([attemptId])
  @@index([questionId])
}

// -----------------------------------------------------------------------------
// LEARNING, MASTERY & RECOMMENDATIONS
// -----------------------------------------------------------------------------

model UserProgress {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  conceptId    String
  isCompleted  Boolean  @default(false)
  completedAt  DateTime?
  createdAt    DateTime @default(now())

  @@unique([userId, conceptId])
  @@index([userId])
}

model TopicMastery {
  id             String       @id @default(cuid())
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  subtopicId     String
  subtopic       ExamSubtopic @relation(fields: [subtopicId], references: [id], onDelete: Cascade)
  masteryPct     Float        @default(0.0) // 0 - 100%
  totalAttempts  Int          @default(0)
  correctAttempts Int         @default(0)
  avgTimeSec     Float        @default(0.0)
  isWeakArea     Boolean      @default(false)
  lastPracticedAt DateTime    @default(now())
  updatedAt      DateTime     @updatedAt

  @@unique([userId, subtopicId])
  @@index([userId, isWeakArea])
}

model UserQuestionHistory {
  id           String    @id @default(cuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  questionId   String
  question     Question  @relation(fields: [questionId], references: [id], onDelete: Cascade)
  attemptCount Int       @default(1)
  isMistake    Boolean   @default(false) // True if last attempt was incorrect
  isResolved   Boolean   @default(false) // True if student re-solved correctly in Mistake Book
  lastOption   String?
  lastAnsweredAt DateTime @default(now())

  @@unique([userId, questionId])
  @@index([userId, isMistake, isResolved])
}

model Bookmark {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  notes      String?  @db.Text
  createdAt  DateTime @default(now())

  @@unique([userId, questionId])
  @@index([userId])
}

model Recommendation {
  id          String             @id @default(cuid())
  userId      String
  user        User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  type        RecommendationType
  title       String
  description String             @db.Text
  actionLabel String
  actionUrl   String
  priority    Int                @default(1)
  isDismissed Boolean            @default(false)
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  @@index([userId, isDismissed])
}

model StudySession {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  durationSec  Int
  questionsSolved Int  @default(0)
  date         DateTime @default(now())

  @@index([userId, date])
}

model Achievement {
  id          String   @id @default(cuid())
  slug        String   @unique // e.g. "first_mock", "100_questions", "streak_7"
  title       String
  description String
  badgeIcon   String
  xpReward    Int      @default(100)
  tier        String   @default("BRONZE")

  users       UserAchievement[]
}

model UserAchievement {
  id            String      @id @default(cuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  unlockedAt    DateTime    @default(now())

  @@unique([userId, achievementId])
  @@index([userId])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  message   String   @db.Text
  type      String   @default("INFO") // INFO, STREAK, MASTERY, MOCK
  isRead    Boolean  @default(false)
  linkUrl   String?
  createdAt DateTime @default(now())

  @@index([userId, isRead])
}
```
