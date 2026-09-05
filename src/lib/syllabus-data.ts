export interface SyllabusSubtopic {
  name: string;
  slug: string;
  description?: string;
  conceptsCount?: number;
  completedCount?: number;
  accuracy?: number;
  status?: "MASTERED" | "IN_PROGRESS" | "WEAK" | "NOT_STARTED";
  sampleQuestionsCount?: number;
}

export interface SyllabusTopic {
  name: string;
  slug: string;
  weightage?: string;
  subtopics: SyllabusSubtopic[];
}

export interface SyllabusSection {
  name: string;
  slug: string;
  durationMinutes?: number;
  questionCount: number;
  marksPerQuestion?: number;
  negativeMarks?: number;
  topics: SyllabusTopic[];
}

export interface ExamSyllabusInfo {
  examSlug: string;
  examName: string;
  shortName: string;
  fullForm: string;
  conductingBody: string;
  officialWebsite: string;
  difficulty: "High" | "Moderate to High" | "Speed-Intensive" | "Adaptive";
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  description: string;
  sections: SyllabusSection[];
}

export const EXAM_SYLLABI_DATABASE: Record<string, ExamSyllabusInfo> = {
  cat: {
    examSlug: "cat",
    examName: "CAT 2026",
    shortName: "CAT",
    fullForm: "Common Admission Test",
    conductingBody: "Indian Institutes of Management (IIMs)",
    officialWebsite: "https://iimcat.ac.in",
    difficulty: "High",
    durationMinutes: 120,
    totalQuestions: 66,
    totalMarks: 198,
    description: "The premier national entrance exam for admission into 21 IIMs and top business schools in India (FMS, SPJIMR, MDI, IIT DoMS). Strictly enforces locked 40-minute sections.",
    sections: [
      {
        name: "Verbal Ability & Reading Comprehension",
        slug: "varc",
        durationMinutes: 40,
        questionCount: 24,
        marksPerQuestion: 3,
        negativeMarks: 1,
        topics: [
          {
            name: "Reading Comprehension",
            slug: "reading-comprehension",
            weightage: "16 Questions (66% of VARC)",
            subtopics: [
              { name: "Main Idea", slug: "main-idea", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "MASTERED" },
              { name: "Central Idea", slug: "central-idea", conceptsCount: 3, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Author's Tone", slug: "authors-tone", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
              { name: "Author's Purpose", slug: "authors-purpose", conceptsCount: 3, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Inference", slug: "inference", conceptsCount: 6, completedCount: 3, accuracy: 55, status: "WEAK" },
              { name: "Fact-based Questions", slug: "fact-based", conceptsCount: 4, completedCount: 4, accuracy: 88, status: "MASTERED" },
              { name: "Vocabulary in Context", slug: "vocab-context", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Passage Structure", slug: "passage-structure", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Summary of Passage", slug: "summary-passage", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Critical Reasoning based on Passages", slug: "cr-passages", conceptsCount: 5, completedCount: 2, accuracy: 52, status: "WEAK" },
            ],
          },
          {
            name: "Verbal Ability",
            slug: "verbal-ability",
            weightage: "8 Questions (33% of VARC)",
            subtopics: [
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 5, completedCount: 2, accuracy: 48, status: "WEAK" },
              { name: "Para Summary", slug: "para-summary", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Odd Sentence Out", slug: "odd-sentence-out", conceptsCount: 4, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Sentence Completion", slug: "sentence-completion", conceptsCount: 3, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Sentence Correction", slug: "sentence-correction", conceptsCount: 4, completedCount: 3, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Vocabulary", slug: "vocabulary", conceptsCount: 6, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Grammar", slug: "grammar", conceptsCount: 6, completedCount: 4, accuracy: 78, status: "MASTERED" },
              { name: "Sentence Structure", slug: "sentence-structure", conceptsCount: 3, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Critical Reasoning", slug: "critical-reasoning", conceptsCount: 5, completedCount: 3, accuracy: 60, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Data Interpretation & Logical Reasoning",
        slug: "dilr",
        durationMinutes: 40,
        questionCount: 20,
        marksPerQuestion: 3,
        negativeMarks: 1,
        topics: [
          {
            name: "Data Interpretation",
            slug: "data-interpretation",
            weightage: "10 Questions (50% of DILR)",
            subtopics: [
              { name: "Tables", slug: "tables", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Bar Graphs", slug: "bar-graphs", conceptsCount: 3, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Line Graphs", slug: "line-graphs", conceptsCount: 3, completedCount: 2, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Pie Charts", slug: "pie-charts", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Caselets", slug: "caselets", conceptsCount: 5, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Data Comparison", slug: "data-comparison", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Venn Diagrams", slug: "venn-diagrams", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Combination of Multiple Charts", slug: "multi-charts", conceptsCount: 5, completedCount: 2, accuracy: 50, status: "WEAK" },
              { name: "Arithmetic-based DI", slug: "arithmetic-di", conceptsCount: 5, completedCount: 3, accuracy: 66, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Logical Reasoning",
            slug: "logical-reasoning",
            weightage: "10 Questions (50% of DILR)",
            subtopics: [
              { name: "Seating Arrangement", slug: "seating-arrangement", conceptsCount: 4, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Linear Arrangement", slug: "linear-arrangement", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Circular Arrangement", slug: "circular-arrangement", conceptsCount: 4, completedCount: 2, accuracy: 56, status: "WEAK" },
              { name: "Distribution", slug: "distribution", conceptsCount: 3, completedCount: 2, accuracy: 64, status: "IN_PROGRESS" },
              { name: "Grouping", slug: "grouping", conceptsCount: 3, completedCount: 2, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Selection", slug: "selection", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Scheduling", slug: "scheduling", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Blood Relations", slug: "blood-relations", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Directions", slug: "directions", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Ranking", slug: "ranking", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Games and Tournaments", slug: "games-tournaments", conceptsCount: 5, completedCount: 2, accuracy: 44, status: "WEAK" },
              { name: "Routes and Networks", slug: "routes-networks", conceptsCount: 4, completedCount: 2, accuracy: 54, status: "WEAK" },
              { name: "Puzzles", slug: "puzzles", conceptsCount: 5, completedCount: 3, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Binary Logic", slug: "binary-logic", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Set-based Reasoning", slug: "set-reasoning", conceptsCount: 4, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "qa",
        durationMinutes: 40,
        questionCount: 22,
        marksPerQuestion: 3,
        negativeMarks: 1,
        topics: [
          {
            name: "Arithmetic",
            slug: "arithmetic",
            weightage: "8-10 Questions (40-45% of QA)",
            subtopics: [
              { name: "Percentages", slug: "percentages", conceptsCount: 5, completedCount: 5, accuracy: 86, status: "MASTERED" },
              { name: "Profit and Loss", slug: "profit-loss", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
              { name: "Simple Interest", slug: "simple-interest", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Compound Interest", slug: "compound-interest", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Ratio and Proportion", slug: "ratio-proportion", conceptsCount: 4, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Averages", slug: "averages", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Mixtures and Allegations", slug: "mixtures-allegations", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 5, completedCount: 2, accuracy: 48, status: "WEAK" },
              { name: "Pipes and Cisterns", slug: "pipes-cisterns", conceptsCount: 4, completedCount: 2, accuracy: 54, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 6, completedCount: 4, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Boats and Streams", slug: "boats-streams", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Algebra",
            slug: "algebra",
            weightage: "5-7 Questions (25-30% of QA)",
            subtopics: [
              { name: "Linear Equations", slug: "linear-equations", conceptsCount: 4, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Quadratic Equations", slug: "quadratic-equations", conceptsCount: 5, completedCount: 4, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Inequalities", slug: "inequalities", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Algebraic Expressions", slug: "algebraic-expressions", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Functions", slug: "functions", conceptsCount: 4, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Progressions (AP/GP/HP)", slug: "progressions", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Logarithms", slug: "logarithms", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Surds and Indices", slug: "surds-indices", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
            ],
          },
          {
            name: "Number System",
            slug: "number-system",
            weightage: "2-4 Questions (10-15% of QA)",
            subtopics: [
              { name: "Divisibility", slug: "divisibility", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Factors", slug: "factors", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Multiples", slug: "multiples", conceptsCount: 3, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "HCF and LCM", slug: "hcf-lcm", conceptsCount: 4, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Remainders", slug: "remainders", conceptsCount: 5, completedCount: 2, accuracy: 50, status: "WEAK" },
              { name: "Unit Digit", slug: "unit-digit", conceptsCount: 3, completedCount: 3, accuracy: 90, status: "MASTERED" },
              { name: "Last Two Digits", slug: "last-two-digits", conceptsCount: 3, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Number Properties", slug: "number-properties", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Geometry and Mensuration",
            slug: "geometry-mensuration",
            weightage: "3-4 Questions (15-20% of QA)",
            subtopics: [
              { name: "Lines and Angles", slug: "lines-angles", conceptsCount: 3, completedCount: 3, accuracy: 92, status: "MASTERED" },
              { name: "Triangles", slug: "triangles", conceptsCount: 6, completedCount: 4, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Quadrilaterals", slug: "quadrilaterals", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Circles", slug: "circles", conceptsCount: 5, completedCount: 3, accuracy: 64, status: "IN_PROGRESS" },
              { name: "Polygons", slug: "polygons", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Coordinate Geometry", slug: "coordinate-geometry", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Area and Perimeter", slug: "area-perimeter", conceptsCount: 4, completedCount: 4, accuracy: 86, status: "MASTERED" },
              { name: "Volume and 3D Mensuration", slug: "3d-mensuration", conceptsCount: 5, completedCount: 3, accuracy: 65, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Modern Mathematics",
            slug: "modern-math",
            weightage: "1-3 Questions (5-10% of QA)",
            subtopics: [
              { name: "Permutation and Combination", slug: "permutation-combination", conceptsCount: 5, completedCount: 2, accuracy: 46, status: "WEAK" },
              { name: "Probability", slug: "probability", conceptsCount: 5, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Set Theory", slug: "set-theory", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
    ],
  },
  xat: {
    examSlug: "xat",
    examName: "XAT 2026",
    shortName: "XAT",
    fullForm: "Xavier Aptitude Test",
    conductingBody: "XLRI Jamshedpur",
    officialWebsite: "https://xatonline.in",
    difficulty: "High",
    durationMinutes: 205,
    totalQuestions: 101,
    totalMarks: 101,
    description: "Premier entrance examination for XLRI Jamshedpur/Delhi and over 160 associate management institutes. Renowned for its Decision Making section and analytical rigor.",
    sections: [
      {
        name: "Verbal Ability and Logical Reasoning",
        slug: "valr",
        questionCount: 26,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Verbal Ability & Reading Comprehension",
            slug: "valr-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 6, completedCount: 4, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Critical Reasoning", slug: "critical-reasoning", conceptsCount: 5, completedCount: 3, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Vocabulary", slug: "vocabulary", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
              { name: "Grammar", slug: "grammar", conceptsCount: 5, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 4, completedCount: 2, accuracy: 55, status: "WEAK" },
              { name: "Para Completion", slug: "para-completion", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Sentence Correction", slug: "sentence-correction", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Inference", slug: "inference", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Main Idea", slug: "main-idea", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Author's Tone", slug: "authors-tone", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Analogy", slug: "analogy", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Statement and Assumption", slug: "statement-assumption", conceptsCount: 4, completedCount: 2, accuracy: 56, status: "WEAK" },
              { name: "Statement and Conclusion", slug: "statement-conclusion", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Strengthen/Weaken Arguments", slug: "strengthen-weaken", conceptsCount: 4, completedCount: 2, accuracy: 54, status: "WEAK" },
            ],
          },
        ],
      },
      {
        name: "Decision Making",
        slug: "decision-making",
        questionCount: 22,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Decision Making & Situational Judgement",
            slug: "dm-core",
            subtopics: [
              { name: "Caselets", slug: "caselets", conceptsCount: 5, completedCount: 3, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Ethical Decision Making", slug: "ethical-dm", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Business Situations", slug: "business-situations", conceptsCount: 5, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Personal Situations", slug: "personal-situations", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Managerial Decision Making", slug: "managerial-dm", conceptsCount: 4, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Stakeholder Analysis", slug: "stakeholder-analysis", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Data-based Decision Making", slug: "data-dm", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Situational Judgement", slug: "situational-judgement", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Prioritization", slug: "prioritization", conceptsCount: 3, completedCount: 2, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Problem Solving", slug: "problem-solving", conceptsCount: 4, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude and Data Interpretation",
        slug: "qadi",
        questionCount: 28,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Quantitative Aptitude & DI",
            slug: "qadi-core",
            subtopics: [
              { name: "Percentages", slug: "percentages", conceptsCount: 4, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Profit and Loss", slug: "profit-loss", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Ratio and Proportion", slug: "ratio-proportion", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Averages", slug: "averages", conceptsCount: 3, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 50, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Simple and Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Mixtures and Allegations", slug: "mixtures-allegations", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Number System", slug: "number-system", conceptsCount: 5, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Algebra & Equations", slug: "algebra-equations", conceptsCount: 5, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Inequalities", slug: "inequalities", conceptsCount: 3, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry-mensuration", conceptsCount: 6, completedCount: 3, accuracy: 64, status: "IN_PROGRESS" },
              { name: "Probability", slug: "probability", conceptsCount: 4, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Permutation and Combination", slug: "permutation-combination", conceptsCount: 4, completedCount: 2, accuracy: 48, status: "WEAK" },
              { name: "Tables & Charts", slug: "tables-charts", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Graphs & Caselets", slug: "graphs-caselets", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 3, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "General Knowledge",
        slug: "gk",
        questionCount: 25,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "General Knowledge & Current Affairs",
            slug: "gk-core",
            subtopics: [
              { name: "Current Affairs", slug: "current-affairs", conceptsCount: 6, completedCount: 3, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Business and Economy", slug: "business-economy", conceptsCount: 5, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Indian Economy", slug: "indian-economy", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "International Affairs", slug: "international-affairs", conceptsCount: 4, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
              { name: "Politics", slug: "politics", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Sports", slug: "sports", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Awards & Honors", slug: "awards", conceptsCount: 3, completedCount: 2, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Books and Authors", slug: "books-authors", conceptsCount: 3, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Science and Technology", slug: "science-tech", conceptsCount: 4, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
              { name: "History & Geography", slug: "history-geography", conceptsCount: 5, completedCount: 3, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Important Events", slug: "important-events", conceptsCount: 3, completedCount: 2, accuracy: 75, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
    ],
  },
  nmat: {
    examSlug: "nmat",
    examName: "NMAT by GMAC 2026",
    shortName: "NMAT",
    fullForm: "NMIMS Management Aptitude Test",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://mba.com/exams/nmat",
    difficulty: "Adaptive",
    durationMinutes: 120,
    totalQuestions: 108,
    totalMarks: 324,
    description: "Computer-adaptive management entrance exam accepted by NMIMS Mumbai, K J Somaiya, XIM University, and leading global business schools.",
    sections: [
      {
        name: "Language Skills",
        slug: "language-skills",
        durationMinutes: 28,
        questionCount: 36,
        marksPerQuestion: 3,
        negativeMarks: 0,
        topics: [
          {
            name: "Language Skills & Verbal Ability",
            slug: "lang-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 5, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Vocabulary", slug: "vocab", conceptsCount: 5, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Synonyms & Antonyms", slug: "synonyms-antonyms", conceptsCount: 4, completedCount: 4, accuracy: 85, status: "MASTERED" },
              { name: "Idioms & Phrases", slug: "idioms-phrases", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Sentence Completion", slug: "sentence-completion", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Grammar & Error Identification", slug: "grammar-errors", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Sentence Formation", slug: "sentence-formation", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Cloze Test", slug: "cloze-test", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Quantitative Skills",
        slug: "quantitative-skills",
        durationMinutes: 52,
        questionCount: 36,
        marksPerQuestion: 3,
        negativeMarks: 0,
        topics: [
          {
            name: "Quantitative Skills & DI",
            slug: "quant-skills-core",
            subtopics: [
              { name: "Number System", slug: "number-system", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Arithmetic (Percentages, P&L, Ratio, Avg)", slug: "arithmetic-core", conceptsCount: 6, completedCount: 5, accuracy: 84, status: "MASTERED" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 54, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 4, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Simple & Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Mixtures", slug: "mixtures", conceptsCount: 3, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Algebra & Equations", slug: "algebra-equations", conceptsCount: 5, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Inequalities", slug: "inequalities", conceptsCount: 3, completedCount: 2, accuracy: 64, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry-mensuration", conceptsCount: 5, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Probability & P&C", slug: "prob-pnc", conceptsCount: 5, completedCount: 2, accuracy: 50, status: "WEAK" },
              { name: "Data Interpretation", slug: "data-interpretation", conceptsCount: 5, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 3, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        durationMinutes: 40,
        questionCount: 36,
        marksPerQuestion: 3,
        negativeMarks: 0,
        topics: [
          {
            name: "Logical & Analytical Reasoning",
            slug: "lr-core",
            subtopics: [
              { name: "Verbal & Critical Reasoning", slug: "verbal-cr", conceptsCount: 5, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Analytical Reasoning", slug: "analytical-reasoning", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Seating Arrangement & Puzzles", slug: "arrangements-puzzles", conceptsCount: 5, completedCount: 3, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Series & Coding-Decoding", slug: "series-coding", conceptsCount: 4, completedCount: 4, accuracy: 88, status: "MASTERED" },
              { name: "Blood Relations & Directions", slug: "relations-directions", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Ranking & Logical Sequences", slug: "ranking-sequences", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Syllogisms", slug: "syllogisms", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Statement & Conclusion / Assumption", slug: "statement-conclusion-assumption", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Data Sufficiency & Venn Diagrams", slug: "ds-venn", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Input-Output", slug: "input-output", conceptsCount: 4, completedCount: 2, accuracy: 56, status: "WEAK" },
            ],
          },
        ],
      },
    ],
  },
  "mah-cet": {
    examSlug: "mah-cet",
    examName: "MAH MBA/MMS CET 2026",
    shortName: "MAH MBA CET",
    fullForm: "Maharashtra MBA Common Entrance Test",
    conductingBody: "State Common Entrance Test Cell, Maharashtra",
    officialWebsite: "https://mahacet.org",
    difficulty: "Speed-Intensive",
    durationMinutes: 150,
    totalQuestions: 200,
    totalMarks: 200,
    description: "State-level speed assessment for admission to JBIMS, SIMSREE, PUMBA, and 300+ management colleges in Maharashtra. Features 200 questions and zero negative marking.",
    sections: [
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        questionCount: 75,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Logical Reasoning Masteries",
            slug: "lr-mah-core",
            subtopics: [
              { name: "Arrangements (Linear, Circular, Seating)", slug: "arrangements", conceptsCount: 6, completedCount: 4, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Puzzles", slug: "puzzles", conceptsCount: 5, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Blood Relations", slug: "blood-relations", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Directions", slug: "directions", conceptsCount: 3, completedCount: 3, accuracy: 92, status: "MASTERED" },
              { name: "Coding-Decoding", slug: "coding-decoding", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Series", slug: "series", conceptsCount: 4, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Syllogisms", slug: "syllogisms", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Venn Diagrams", slug: "venn-diagrams", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Ranking", slug: "ranking", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 4, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
              { name: "Statement and Conclusion / Assumption", slug: "statements", conceptsCount: 4, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Critical Reasoning & Logical Connections", slug: "cr-connections", conceptsCount: 5, completedCount: 3, accuracy: 64, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Abstract Reasoning",
        slug: "abstract-reasoning",
        questionCount: 25,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Visual & Abstract Reasoning",
            slug: "abstract-core",
            subtopics: [
              { name: "Figure Series", slug: "figure-series", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Pattern Completion", slug: "pattern-completion", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Analogy", slug: "analogy", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Classification & Odd Figure Out", slug: "odd-figure-out", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Mirror & Water Images", slug: "mirror-water-images", conceptsCount: 3, completedCount: 3, accuracy: 92, status: "MASTERED" },
              { name: "Paper Folding & Cutting", slug: "paper-folding-cutting", conceptsCount: 3, completedCount: 2, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Embedded Figures", slug: "embedded-figures", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Figure Matrix & Visual Reasoning", slug: "figure-matrix", conceptsCount: 4, completedCount: 2, accuracy: 66, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "quantitative-aptitude",
        questionCount: 50,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Quantitative Aptitude & DI",
            slug: "qa-mah-core",
            subtopics: [
              { name: "Arithmetic (%, Profit-Loss, Ratio, Avg)", slug: "arithmetic", conceptsCount: 6, completedCount: 5, accuracy: 86, status: "MASTERED" },
              { name: "Time & Work / Pipes", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 56, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 4, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Simple & Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Number System", slug: "number-system", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Algebra & Equations", slug: "algebra", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry-mensuration", conceptsCount: 5, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Probability & P&C", slug: "prob-pnc", conceptsCount: 4, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Data Interpretation (Tables, Graphs)", slug: "di", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
            ],
          },
        ],
      },
      {
        name: "Verbal Ability / Reading Comprehension",
        slug: "verbal-ability-rc",
        questionCount: 50,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Verbal Ability & Grammar",
            slug: "varc-mah-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 5, completedCount: 4, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Vocabulary, Synonyms & Antonyms", slug: "vocab-synonyms", conceptsCount: 5, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Grammar & Sentence Correction", slug: "grammar-correction", conceptsCount: 5, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Error Detection", slug: "error-detection", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 4, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
              { name: "Sentence Completion & Fill in Blanks", slug: "sentence-completion", conceptsCount: 4, completedCount: 4, accuracy: 86, status: "MASTERED" },
              { name: "Idioms and Phrases", slug: "idioms-phrases", conceptsCount: 3, completedCount: 3, accuracy: 80, status: "MASTERED" },
            ],
          },
        ],
      },
    ],
  },
  snap: {
    examSlug: "snap",
    examName: "SNAP 2026",
    shortName: "SNAP",
    fullForm: "Symbiosis National Aptitude Test",
    conductingBody: "Symbiosis International (Deemed University)",
    officialWebsite: "https://snaptest.org",
    difficulty: "Speed-Intensive",
    durationMinutes: 60,
    totalQuestions: 60,
    totalMarks: 60,
    description: "A 60-minute high-speed precision assessment for admission to 16 Symbiosis institutes (SIBM Pune, SCMHRD, SIIB).",
    sections: [
      {
        name: "General English",
        slug: "general-english",
        questionCount: 15,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "General English & Verbal Skills",
            slug: "english-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Vocabulary (Synonyms & Antonyms)", slug: "vocab", conceptsCount: 5, completedCount: 4, accuracy: 85, status: "MASTERED" },
              { name: "Idioms & Phrases", slug: "idioms", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Grammar & Sentence Correction", slug: "grammar", conceptsCount: 5, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Fill in the Blanks", slug: "fill-blanks", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Sentence Completion & Error Detection", slug: "errors", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Analytical and Logical Reasoning",
        slug: "analytical-lr",
        questionCount: 25,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Analytical & Logical Reasoning",
            slug: "lr-snap-core",
            subtopics: [
              { name: "Series & Coding-Decoding", slug: "series-coding", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Blood Relations & Directions", slug: "relations-directions", conceptsCount: 4, completedCount: 4, accuracy: 92, status: "MASTERED" },
              { name: "Seating Arrangement & Puzzles", slug: "arrangements-puzzles", conceptsCount: 5, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Syllogisms", slug: "syllogisms", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Statement and Conclusion / Assumption", slug: "statement-conclusion", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Cause and Effect", slug: "cause-effect", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Analogy & Classification", slug: "analogy-classification", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Ranking & Data Sufficiency", slug: "ranking-ds", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Critical Reasoning & Visual Reasoning", slug: "cr-visual", conceptsCount: 4, completedCount: 2, accuracy: 64, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Quantitative, Data Interpretation and Data Sufficiency",
        slug: "quant-di-ds",
        questionCount: 20,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Quantitative Aptitude, DI & DS",
            slug: "quant-snap-core",
            subtopics: [
              { name: "Number System", slug: "number-system", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Percentages, Profit & Loss", slug: "percentages-pl", conceptsCount: 5, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Ratio, Proportion & Averages", slug: "ratio-averages", conceptsCount: 4, completedCount: 4, accuracy: 86, status: "MASTERED" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 55, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Simple & Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Mixtures", slug: "mixtures", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Algebra & Equations", slug: "algebra", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry", conceptsCount: 5, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Probability & P&C", slug: "prob-pnc", conceptsCount: 4, completedCount: 2, accuracy: 52, status: "WEAK" },
              { name: "Tables, Charts, Graphs & Caselets", slug: "charts-graphs", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 3, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
    ],
  },
  cmat: {
    examSlug: "cmat",
    examName: "CMAT 2026",
    shortName: "CMAT",
    fullForm: "Common Management Admission Test",
    conductingBody: "National Testing Agency (NTA)",
    officialWebsite: "https://cmat.nta.nic.in",
    difficulty: "Moderate to High",
    durationMinutes: 180,
    totalQuestions: 100,
    totalMarks: 400,
    description: "National testing assessment covering Quantitative Techniques, Logical Reasoning, Language Comprehension, General Awareness, and Innovation & Entrepreneurship.",
    sections: [
      {
        name: "Quantitative Techniques and Data Interpretation",
        slug: "qt-di",
        questionCount: 20,
        marksPerQuestion: 4,
        negativeMarks: 1,
        topics: [
          {
            name: "Quantitative Techniques & DI",
            slug: "qtdi-core",
            subtopics: [
              { name: "Number System", slug: "number-system", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Percentages, Profit & Loss", slug: "percentages-pl", conceptsCount: 5, completedCount: 4, accuracy: 85, status: "MASTERED" },
              { name: "Ratio, Proportion & Averages", slug: "ratio-averages", conceptsCount: 4, completedCount: 4, accuracy: 88, status: "MASTERED" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 58, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 4, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Simple & Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Mixtures and Allegations", slug: "mixtures", conceptsCount: 3, completedCount: 2, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Algebra, Equations & Inequalities", slug: "algebra", conceptsCount: 5, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry", conceptsCount: 5, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Probability & Permutation and Combination", slug: "prob-pnc", conceptsCount: 5, completedCount: 2, accuracy: 54, status: "WEAK" },
              { name: "Data Interpretation (Tables, Charts, Graphs, DS)", slug: "di-ds", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
            ],
          },
        ],
      },
      {
        name: "Logical Reasoning",
        slug: "lr",
        questionCount: 20,
        marksPerQuestion: 4,
        negativeMarks: 1,
        topics: [
          {
            name: "Logical Reasoning & Arrangements",
            slug: "lr-cmat-core",
            subtopics: [
              { name: "Arrangements & Seating", slug: "arrangements", conceptsCount: 5, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Puzzles", slug: "puzzles", conceptsCount: 4, completedCount: 2, accuracy: 60, status: "IN_PROGRESS" },
              { name: "Blood Relations & Directions", slug: "relations-directions", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Coding-Decoding & Series", slug: "coding-series", conceptsCount: 4, completedCount: 4, accuracy: 88, status: "MASTERED" },
              { name: "Syllogisms & Venn Diagrams", slug: "syllogisms-venn", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Ranking & Classification", slug: "ranking-classification", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Statement and Conclusion / Assumption", slug: "statements", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Cause and Effect & Analogy", slug: "cause-analogy", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Critical Reasoning & Data Sufficiency", slug: "cr-ds", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Language Comprehension",
        slug: "language-comprehension",
        questionCount: 20,
        marksPerQuestion: 4,
        negativeMarks: 1,
        topics: [
          {
            name: "Language Comprehension & Grammar",
            slug: "lang-cmat-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 5, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Vocabulary (Synonyms & Antonyms)", slug: "vocab", conceptsCount: 5, completedCount: 4, accuracy: 86, status: "MASTERED" },
              { name: "Grammar & Sentence Correction", slug: "grammar", conceptsCount: 5, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Para Jumbles", slug: "para-jumbles", conceptsCount: 4, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Sentence Completion & Fill in Blanks", slug: "sentence-completion", conceptsCount: 4, completedCount: 4, accuracy: 88, status: "MASTERED" },
              { name: "Idioms, Phrases & Error Detection", slug: "idioms-errors", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
            ],
          },
        ],
      },
      {
        name: "General Awareness",
        slug: "general-awareness",
        questionCount: 20,
        marksPerQuestion: 4,
        negativeMarks: 1,
        topics: [
          {
            name: "General Awareness & Economy",
            slug: "ga-core",
            subtopics: [
              { name: "Current Affairs", slug: "current-affairs", conceptsCount: 6, completedCount: 3, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Business, Economy & Banking", slug: "business-banking", conceptsCount: 5, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Government Schemes & Politics", slug: "schemes-politics", conceptsCount: 4, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "History & Geography", slug: "history-geography", conceptsCount: 4, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Science & Technology", slug: "science-tech", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Sports & Awards", slug: "sports-awards", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Books, Authors & Important Events", slug: "books-events", conceptsCount: 4, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Innovation and Entrepreneurship",
        slug: "innovation-entrepreneurship",
        questionCount: 20,
        marksPerQuestion: 4,
        negativeMarks: 1,
        topics: [
          {
            name: "Innovation & Entrepreneurship Fundamentals",
            slug: "ie-core",
            subtopics: [
              { name: "Entrepreneurship Basics", slug: "entrepreneurship-basics", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Business Models & Startups", slug: "business-models", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Innovation & Creativity", slug: "innovation-creativity", conceptsCount: 3, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Business Strategy & Characteristics", slug: "strategy", conceptsCount: 4, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Funding & Marketing Basics", slug: "funding-marketing", conceptsCount: 4, completedCount: 2, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Business Environment & Intellectual Property", slug: "ip-environment", conceptsCount: 4, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Government Startup Initiatives", slug: "startup-initiatives", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
    ],
  },
  mat: {
    examSlug: "mat",
    examName: "MAT 2026",
    shortName: "MAT",
    fullForm: "Management Aptitude Test",
    conductingBody: "All India Management Association (AIMA)",
    officialWebsite: "https://mat.aima.in",
    difficulty: "Moderate to High",
    durationMinutes: 120,
    totalQuestions: 150,
    totalMarks: 150,
    description: "All India standardized exam conducted in CBT, PBT, and IBT formats across 150 questions for admissions to top Tier-2 business schools.",
    sections: [
      {
        name: "Language Comprehension",
        slug: "language-comp",
        questionCount: 30,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Language Comprehension",
            slug: "lang-mat-core",
            subtopics: [
              { name: "Reading Comprehension", slug: "rc", conceptsCount: 5, completedCount: 4, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Vocabulary (Synonyms & Antonyms)", slug: "vocab", conceptsCount: 5, completedCount: 4, accuracy: 85, status: "MASTERED" },
              { name: "Grammar & Sentence Correction", slug: "grammar", conceptsCount: 5, completedCount: 4, accuracy: 82, status: "MASTERED" },
              { name: "Para Jumbles & Sentence Completion", slug: "jumbles-completion", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Idioms, Phrases & Error Detection", slug: "idioms-errors", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Fill in the Blanks", slug: "fill-blanks", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
            ],
          },
        ],
      },
      {
        name: "Intelligence and Critical Reasoning",
        slug: "intelligence-reasoning",
        questionCount: 30,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Intelligence & Critical Reasoning",
            slug: "icr-core",
            subtopics: [
              { name: "Analogy & Classification", slug: "analogy-classification", conceptsCount: 3, completedCount: 3, accuracy: 88, status: "MASTERED" },
              { name: "Series & Coding-Decoding", slug: "series-coding", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Blood Relations & Directions", slug: "relations-directions", conceptsCount: 4, completedCount: 4, accuracy: 92, status: "MASTERED" },
              { name: "Ranking & Seating Arrangement", slug: "ranking-seating", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Puzzles", slug: "puzzles", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Syllogisms", slug: "syllogisms", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Statement & Conclusion / Assumption", slug: "statements", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Cause and Effect", slug: "cause-effect", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Critical Reasoning & Data Sufficiency", slug: "cr-ds", conceptsCount: 4, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Mathematical Skills",
        slug: "mathematical-skills",
        questionCount: 30,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Mathematical Skills (QA)",
            slug: "math-skills-core",
            subtopics: [
              { name: "Number System", slug: "number-system", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Percentages, Profit & Loss", slug: "percentages-pl", conceptsCount: 5, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Ratio, Proportion & Averages", slug: "ratio-averages", conceptsCount: 4, completedCount: 4, accuracy: 86, status: "MASTERED" },
              { name: "Time and Work", slug: "time-work", conceptsCount: 4, completedCount: 2, accuracy: 56, status: "WEAK" },
              { name: "Time Speed Distance", slug: "time-speed-distance", conceptsCount: 5, completedCount: 4, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Simple & Compound Interest", slug: "si-ci", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Mixtures", slug: "mixtures", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Algebra & Equations", slug: "algebra", conceptsCount: 4, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Geometry & Mensuration", slug: "geometry", conceptsCount: 5, completedCount: 3, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Probability & Permutation and Combination", slug: "prob-pnc", conceptsCount: 4, completedCount: 2, accuracy: 54, status: "WEAK" },
            ],
          },
        ],
      },
      {
        name: "Data Analysis and Sufficiency",
        slug: "data-analysis-sufficiency",
        questionCount: 30,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Data Analysis & Sufficiency",
            slug: "das-core",
            subtopics: [
              { name: "Tables", slug: "tables", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Bar Graphs", slug: "bar-graphs", conceptsCount: 3, completedCount: 3, accuracy: 84, status: "MASTERED" },
              { name: "Line Graphs", slug: "line-graphs", conceptsCount: 3, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Pie Charts", slug: "pie-charts", conceptsCount: 4, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Caselets", slug: "caselets", conceptsCount: 4, completedCount: 2, accuracy: 62, status: "IN_PROGRESS" },
              { name: "Data Comparison", slug: "data-comparison", conceptsCount: 3, completedCount: 2, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Data Sufficiency", slug: "data-sufficiency", conceptsCount: 4, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
              { name: "Data Interpretation", slug: "data-interpretation", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
            ],
          },
        ],
      },
      {
        name: "Indian and Global Environment",
        slug: "indian-global-env",
        questionCount: 30,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Indian & Global Environment (GK)",
            slug: "ige-core",
            subtopics: [
              { name: "Current Affairs", slug: "current-affairs", conceptsCount: 6, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Business and Economy", slug: "business-economy", conceptsCount: 5, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Banking & Indian Economy", slug: "banking-economy", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "International Affairs", slug: "international-affairs", conceptsCount: 4, completedCount: 2, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Government Policies", slug: "government-policies", conceptsCount: 3, completedCount: 2, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Sports & Awards", slug: "sports-awards", conceptsCount: 3, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Books and Authors", slug: "books-authors", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Science and Technology", slug: "science-tech", conceptsCount: 4, completedCount: 2, accuracy: 75, status: "IN_PROGRESS" },
              { name: "Important Events", slug: "important-events", conceptsCount: 3, completedCount: 2, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Business Leaders and Organizations", slug: "leaders-orgs", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
            ],
          },
        ],
      },
    ],
  },
  gmat: {
    examSlug: "gmat",
    examName: "GMAT 2026",
    shortName: "GMAT",
    fullForm: "Graduate Management Admission Test",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://www.mba.com/exams/gmat-exam",
    difficulty: "Adaptive",
    durationMinutes: 135,
    totalQuestions: 64,
    totalMarks: 805,
    description:
      "Global standardized computer-adaptive entrance assessment for top international MBA and business master's programs. Features Quantitative Reasoning, Verbal Reasoning, and Data Insights across 64 questions (score scale 205-805).",
    sections: [
      {
        name: "Quantitative Reasoning",
        slug: "quantitative-reasoning",
        durationMinutes: 45,
        questionCount: 21,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Problem Solving: Arithmetic (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-arithmetic",
            subtopics: [
              { name: "Percentages, Fractions & Decimals", slug: "percentages-fractions", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Ratio, Proportion & Rates", slug: "ratio-rates", conceptsCount: 4, completedCount: 3, accuracy: 85, status: "MASTERED" },
              { name: "Averages & Statistics (Mean, Median, Mode, SD)", slug: "averages-statistics", conceptsCount: 4, completedCount: 2, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Work & Rate Problems", slug: "work-rate", conceptsCount: 3, completedCount: 2, accuracy: 68, status: "IN_PROGRESS" },
              { name: "Distance, Speed & Relative Motion", slug: "distance-speed", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Number Properties (Divisibility, Primes, Remainders)", slug: "number-properties", conceptsCount: 5, completedCount: 3, accuracy: 75, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Problem Solving: Algebra (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-algebra",
            subtopics: [
              { name: "Linear & Quadratic Equations", slug: "linear-quadratic", conceptsCount: 5, completedCount: 4, accuracy: 84, status: "MASTERED" },
              { name: "Inequalities & Absolute Value", slug: "inequalities-absolute", conceptsCount: 4, completedCount: 2, accuracy: 60, status: "WEAK" },
              { name: "Exponents, Roots & Surds", slug: "exponents-roots", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Functions & Sequences", slug: "functions-sequences", conceptsCount: 3, completedCount: 2, accuracy: 70, status: "IN_PROGRESS" },
              { name: "Permutations, Combinations & Probability", slug: "pnc-probability", conceptsCount: 5, completedCount: 2, accuracy: 58, status: "WEAK" },
            ],
          },
        ],
      },
      {
        name: "Verbal Reasoning",
        slug: "verbal-reasoning",
        durationMinutes: 45,
        questionCount: 23,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Critical Reasoning (Recommended Preparation Taxonomy)",
            slug: "gmat-critical-reasoning",
            subtopics: [
              { name: "Assumptions & Stated Premise Analysis", slug: "assumptions", conceptsCount: 5, completedCount: 4, accuracy: 80, status: "MASTERED" },
              { name: "Weaken the Argument", slug: "weaken-argument", conceptsCount: 4, completedCount: 3, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Strengthen the Argument", slug: "strengthen-argument", conceptsCount: 4, completedCount: 3, accuracy: 78, status: "IN_PROGRESS" },
              { name: "Inference & Conclusion", slug: "inference-conclusion", conceptsCount: 4, completedCount: 3, accuracy: 72, status: "IN_PROGRESS" },
              { name: "Method of Reasoning & Boldface Roles", slug: "boldface-method", conceptsCount: 4, completedCount: 2, accuracy: 55, status: "WEAK" },
              { name: "Evaluate the Argument & Paradoxes", slug: "evaluate-paradox", conceptsCount: 4, completedCount: 2, accuracy: 65, status: "IN_PROGRESS" },
            ],
          },
          {
            name: "Reading Comprehension (Recommended Preparation Taxonomy)",
            slug: "gmat-reading-comprehension",
            subtopics: [
              { name: "Main Idea & Primary Purpose", slug: "main-idea", conceptsCount: 4, completedCount: 3, accuracy: 86, status: "MASTERED" },
              { name: "Supporting Details & Retrieval", slug: "supporting-details", conceptsCount: 4, completedCount: 4, accuracy: 90, status: "MASTERED" },
              { name: "Inferences & Author's Tone", slug: "inference-tone", conceptsCount: 4, completedCount: 3, accuracy: 76, status: "IN_PROGRESS" },
              { name: "Structural Organization & Logic of Passages", slug: "passage-structure", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
            ],
          },
        ],
      },
      {
        name: "Data Insights",
        slug: "data-insights",
        durationMinutes: 45,
        questionCount: 20,
        marksPerQuestion: 1,
        negativeMarks: 0,
        topics: [
          {
            name: "Data Sufficiency & Interactive Analysis (Recommended Preparation Taxonomy)",
            slug: "gmat-data-insights-core",
            subtopics: [
              { name: "Data Sufficiency (Quantitative & Real-World)", slug: "data-sufficiency", conceptsCount: 6, completedCount: 4, accuracy: 74, status: "IN_PROGRESS" },
              { name: "Multi-Source Reasoning (MSR Tabbed Analysis)", slug: "multi-source-reasoning", conceptsCount: 5, completedCount: 3, accuracy: 66, status: "IN_PROGRESS" },
              { name: "Table Analysis (Sortable Spreadsheets & Stats)", slug: "table-analysis", conceptsCount: 4, completedCount: 3, accuracy: 82, status: "MASTERED" },
              { name: "Graphics Interpretation (Scatter, Trend, Bar & Bubble)", slug: "graphics-interpretation", conceptsCount: 4, completedCount: 3, accuracy: 80, status: "MASTERED" },
              { name: "Two-Part Analysis (Quantitative & Verbal Dual Grids)", slug: "two-part-analysis", conceptsCount: 5, completedCount: 2, accuracy: 58, status: "WEAK" },
            ],
          },
        ],
      },
    ],
  },
};

export function getExamSyllabus(examSlug: string): ExamSyllabusInfo | undefined {
  return EXAM_SYLLABI_DATABASE[examSlug.toLowerCase()];
}

export function getAllExamSummaries() {
  return Object.values(EXAM_SYLLABI_DATABASE).map((e) => ({
    slug: e.examSlug,
    name: e.shortName,
    fullForm: e.fullForm,
    description: e.description,
    difficulty: e.difficulty,
    sectionsCount: e.sections.length,
    sections: e.sections.map((s) => s.name),
    durationMinutes: e.durationMinutes,
    totalQuestions: e.totalQuestions,
    totalMarks: e.totalMarks,
  }));
}
