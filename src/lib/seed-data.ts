export interface ExamData {
  slug: string;
  name: string;
  shortName: string;
  conductingBody: string;
  officialWebsite: string;
  description: string;
  isPopular: boolean;
  version: {
    year: number;
    versionName: string;
    totalDurationMinutes: number;
    totalQuestions: number;
    totalMarks: number;
    hasSectionalTiming: boolean;
    allowSectionSwitching: boolean;
    allowReview: boolean;
    hasCalculator: boolean;
    verificationStatus: "VERIFIED" | "DERIVED" | "NEEDS_REVIEW";
    sourceAuthority: string;
    sourceUrl: string;
    rulesJson?: Record<string, unknown>;
  };
  sections: {
    name: string;
    slug: string;
    durationMinutes?: number;
    questionCount: number;
    positiveMarks: number;
    negativeMarks: number;
    titaPositiveMarks: number;
    titaNegativeMarks: number;
    orderIndex: number;
    topics: {
      name: string;
      slug: string;
      weightage: string;
      subtopics: {
        name: string;
        slug: string;
        concepts: {
          title: string;
          slug: string;
          summary: string;
          theoryHtml: string;
          keyFormulas: string[];
          tricks: string;
          commonTraps: string;
          readTimeMin: number;
        }[];
      }[];
    }[];
  }[];
}

export const INITIAL_EXAMS_DATA: ExamData[] = [
  {
    slug: "cat",
    name: "Common Admission Test",
    shortName: "CAT 2026",
    conductingBody: "Indian Institutes of Management (IIMs)",
    officialWebsite: "https://iimcat.ac.in",
    description:
      "The premier national entrance exam for admission into 21 IIMs and top business schools in India (FMS, SPJIMR, MDI, IIT DoMS). Strictly enforces locked 40-minute sections.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "CAT 2026 Official Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: true,
      verificationStatus: "VERIFIED",
      sourceAuthority: "CAT Official Notification & Information Bulletin",
      sourceUrl: "https://iimcat.ac.in",
      rulesJson: {
        sectionOrderEnforced: true,
        sectionOrder: ["varc", "dilr", "qa"],
        calculatorAllowed: "BASIC_ON_SCREEN",
      },
    },
    sections: [
      {
        name: "Verbal Ability & Reading Comprehension",
        slug: "varc",
        durationMinutes: 40,
        questionCount: 24,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [
          {
            name: "Reading Comprehension",
            slug: "reading-comprehension",
            weightage: "66% (16 Questions across 4 Passages)",
            subtopics: [
              {
                name: "Main Idea & Central Argument",
                slug: "main-idea",
                concepts: [
                  {
                    title: "Identifying Primary Purpose & Core Thesis",
                    slug: "primary-purpose-thesis",
                    summary:
                      "How to distinguish the author's overarching claim from supporting evidence, counter-arguments, and rhetorical background.",
                    theoryHtml:
                      "To isolate the main idea, identify the problem the passage addresses and the author's conclusive stance. Eliminate options that only capture a single paragraph's focus (too narrow) or extend beyond the passage's boundary (too broad).",
                    keyFormulas: [
                      "Main Idea = Author's Problem + Proposed Thesis + Conclusive Stance",
                      "Trap Filter: Eliminate options containing extreme quantifiers (always, never, solely) unless explicitly justified by the text.",
                    ],
                    tricks:
                      "Read the first 2 sentences and the last sentence of each paragraph. The topic transitions reveal the passage spine.",
                    commonTraps:
                      "Choosing an option that is 100% factually true according to the passage, but only represents a supporting premise rather than the central thesis.",
                    readTimeMin: 6,
                  },
                ],
              },
              {
                name: "Inference & Author's Tone",
                slug: "inference-tone",
                concepts: [
                  {
                    title: "Critical Inferences & Attitude Spectrum",
                    slug: "critical-inferences",
                    summary:
                      "Mastering deductive inferences that must be true based on the passage premises.",
                    theoryHtml:
                      "An inference is an unstated fact logically mandated by the stated premises. It is NOT an extrapolation or speculation.",
                    keyFormulas: [
                      "Valid Inference = Premise A + Premise B ➔ Must Be True",
                    ],
                    tricks:
                      "If the passage says 'X causes Y in high-stress settings', do not infer that 'X causes Y in calm settings'. Stay strictly within contextual constraints.",
                    commonTraps:
                      "Confusing plausibility in the real world with textual necessity within the passage boundary.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
          {
            name: "Verbal Ability",
            slug: "verbal-ability",
            weightage: "33% (8 Questions - Para Jumbles, Summary, Odd Sentence)",
            subtopics: [
              {
                name: "Para Jumbles & Coherence",
                slug: "para-jumbles",
                concepts: [
                  {
                    title: "Mandatory Pairs & Pronoun Linkage",
                    slug: "mandatory-pairs",
                    summary:
                      "Techniques to unlock 4-sentence and 5-sentence arrangements using structural anchors.",
                    theoryHtml:
                      "Look for Acronym-Full Form pairs, Time chronology, Demonstrative pronouns (this, that, these, such), and Conjunction indicators (However, Furthermore, Consequently).",
                    keyFormulas: [
                      "Full Name ➔ Pronoun / Surname",
                      "General Category ➔ Specific Instance / Case Study",
                      "Problem Statement ➔ Policy Remedy ➔ Evaluation",
                    ],
                    tricks:
                      "In TITA Para Jumbles, find the independent opening sentence first. It will have no backward-referencing pronouns.",
                    commonTraps:
                      "Pairing sentences solely based on similar keywords rather than logical flow and causal sequencing.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Data Interpretation & Logical Reasoning",
        slug: "dilr",
        durationMinutes: 40,
        questionCount: 20,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Data Interpretation",
            slug: "data-interpretation",
            weightage: "50% (2 Sets of 5 Qs)",
            subtopics: [
              {
                name: "Mixed Graphs & Missing Tables",
                slug: "mixed-graphs-tables",
                concepts: [
                  {
                    title: "Table Reconstruction & Constraint Propagation",
                    slug: "table-reconstruction",
                    summary:
                      "Step-by-step techniques to deduce missing matrix values from aggregate marginal sums.",
                    theoryHtml:
                      "Always identify the row and column totals first. Use minimum/maximum bounds to prune possibilities before branching into hypothetical scenarios.",
                    keyFormulas: [
                      "Sum of Rows = Sum of Columns = Grand Total",
                      "Percentage Share = (Component Value / Total Base) * 100",
                    ],
                    tricks:
                      "Look for the column or row with the fewest empty cells to anchor the first deterministic deduction.",
                    commonTraps:
                      "Assuming uniform distributions when numbers must be integers or discrete whole items.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
          {
            name: "Logical Reasoning",
            slug: "logical-reasoning",
            weightage: "50% (2 Sets of 5 Qs)",
            subtopics: [
              {
                name: "Arrangements & Games / Tournaments",
                slug: "arrangements-tournaments",
                concepts: [
                  {
                    title: "Round-Robin & Knockout Tournament Deduction",
                    slug: "tournament-deduction",
                    summary:
                      "Mathematical analysis of match outcomes, upset games, and points table constraints.",
                    theoryHtml:
                      "In a round-robin with N teams, total matches = N*(N-1)/2. If Win=2, Draw=1, Loss=0, total points across all teams = 2 * (Total Matches).",
                    keyFormulas: [
                      "Total Matches (Round Robin) = n * (n - 1) / 2",
                      "Matches in Knockout Tournament = n - 1",
                      "Minimum points to qualify = (Total Points / Qualifying Spots) + Margin",
                    ],
                    tricks:
                      "Start by identifying the team with the maximum wins or zero losses to pin down their head-to-head outcomes against lower-ranked teams.",
                    commonTraps:
                      "Forgetting that a drawn match divides points equally (1 point each), maintaining total points invariant.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "qa",
        durationMinutes: 40,
        questionCount: 22,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [
          {
            name: "Arithmetic",
            slug: "arithmetic",
            weightage: "40-45% (8-10 Questions)",
            subtopics: [
              {
                name: "Time, Speed & Distance",
                slug: "time-speed-distance",
                concepts: [
                  {
                    title: "Relative Speed, Meeting Points & Circular Tracks",
                    slug: "relative-speed-circular",
                    summary:
                      "Core formulas for opposite/same direction motion, headstarts, and circular meetings.",
                    theoryHtml:
                      "When two bodies travel towards each other, relative speed is (S1 + S2). When traveling in the same direction, relative speed is |S1 - S2|.",
                    keyFormulas: [
                      "Time to First Meeting on Circular Track = Track Length / Relative Speed",
                      "Distinct Meeting Points on Circular Track = (S1 ± S2) / HCF(S1, S2)",
                      "Average Speed (Equal Distances) = 2*S1*S2 / (S1 + S2)",
                    ],
                    tricks:
                      "For two bodies starting from A and B and meeting at point M, the ratio of speeds S1/S2 = √(t2 / t1) where t1 and t2 are times taken after meeting to reach destinations.",
                    commonTraps:
                      "Using arithmetic mean (S1 + S2)/2 for average speed instead of the harmonic formula when distance is constant.",
                    readTimeMin: 6,
                  },
                ],
              },
              {
                name: "Time & Work",
                slug: "time-work",
                concepts: [
                  {
                    title: "Efficiency & Man-Days Equivalence",
                    slug: "efficiency-man-days",
                    summary:
                      "LCM work units method for individual workers, pipes, cisterns, and negative work.",
                    theoryHtml:
                      "Assign Total Work as the LCM of the days taken by individual workers. Efficiency = Total Units / Days Taken.",
                    keyFormulas: [
                      "M1 * D1 * H1 / W1 = M2 * D2 * H2 / W2",
                      "Combined Time = (LCM of days) / (Sum of individual efficiencies)",
                    ],
                    tricks:
                      "In alternating day problems, calculate work done in a complete cycle (e.g. 2 or 3 days) first to avoid fractional cycle errors.",
                    commonTraps:
                      "Not accounting for who works on the final partial day in alternating schedules.",
                    readTimeMin: 5,
                  },
                ],
              },
              {
                name: "Percentages, Profit & Loss",
                slug: "percentages-profit-loss",
                concepts: [
                  {
                    title: "Successive Percentage Change & Faulty Balances",
                    slug: "successive-change-faulty",
                    summary:
                      "Multipliers, percentage point adjustments, and dishonest merchant profit formulas.",
                    theoryHtml:
                      "Successive changes of a% and b% result in an effective net change of (a + b + ab/100)%.",
                    keyFormulas: [
                      "Net % Change = a + b + (a * b / 100)",
                      "Dishonest Merchant Profit % = (True Weight - False Weight) / False Weight * 100",
                      "Selling Price = Cost Price * (1 + Profit% / 100)",
                    ],
                    tricks:
                      "Convert percentages to fractions (e.g. 16.66% = 1/6, 14.28% = 1/7, 12.5% = 1/8) for rapid mental calculation.",
                    commonTraps:
                      "Calculating discounts on the Cost Price instead of the Marked Price.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
          {
            name: "Algebra",
            slug: "algebra",
            weightage: "25-30% (5-7 Questions)",
            subtopics: [
              {
                name: "Quadratic Equations & Higher Polynomials",
                slug: "quadratic-equations",
                concepts: [
                  {
                    title: "Roots, Discriminants & Maximum/Minimum Values",
                    slug: "roots-discriminant",
                    summary:
                      "Vieta formulas, nature of roots, and vertex optimization for quadratic expressions.",
                    theoryHtml:
                      "For ax^2 + bx + c = 0, Sum of roots = -b/a, Product of roots = c/a. Vertex occurs at x = -b/(2a).",
                    keyFormulas: [
                      "Discriminant Δ = b^2 - 4ac",
                      "Minimum/Maximum value = c - b^2 / (4a) at x = -b / (2a)",
                      "Condition for at least one common root: (c1*a2 - c2*a1)^2 = (a1*b2 - a2*b1)(b1*c2 - b2*c1)",
                    ],
                    tricks:
                      "If coefficients a, b, c are rational and one root is p + √q, the second root must be p - √q.",
                    commonTraps:
                      "Ignoring the constraint a ≠ 0 when solving parameterized quadratic questions.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
          {
            name: "Geometry & Mensuration",
            slug: "geometry",
            weightage: "15-20% (3-4 Questions)",
            subtopics: [
              {
                name: "Triangles & Circles",
                slug: "triangles-circles",
                concepts: [
                  {
                    title: "Similarity, Apollonius & Tangent Theorems",
                    slug: "similarity-tangents",
                    summary:
                      "Intersecting chords, alternate segment theorem, medians, and inradius/circumradius.",
                    theoryHtml:
                      "Ratio of areas of similar triangles is the square of the ratio of their corresponding sides.",
                    keyFormulas: [
                      "Apollonius Theorem: AB^2 + AC^2 = 2 * (AD^2 + BD^2) where AD is the median",
                      "Inradius r = Area / Semi-perimeter (Δ / s)",
                      "Circumradius R = (a * b * c) / (4 * Δ)",
                      "Intersecting Chords: PA * PB = PC * PD",
                    ],
                    tricks:
                      "In right triangles, the median to the hypotenuse is exactly half the length of the hypotenuse.",
                    commonTraps:
                      "Applying similarity ratios to sides instead of squaring them when calculating area ratios.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "xat",
    name: "Xavier Aptitude Test",
    shortName: "XAT 2026",
    conductingBody: "XLRI Jamshedpur",
    officialWebsite: "https://xatonline.in",
    description:
      "Premier entrance examination for XLRI Jamshedpur/Delhi and over 160 associate management institutes. Renowned for its Decision Making section and analytical rigor.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "XAT 2026 Official Pattern",
      totalDurationMinutes: 205,
      totalQuestions: 101,
      totalMarks: 101,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "XLRI XAT Information Brochure",
      sourceUrl: "https://xatonline.in",
      rulesJson: {
        unattemptedPenaltyThreshold: 8,
        unattemptedPenaltyMarks: 0.1,
        part1DurationMinutes: 175,
        part2DurationMinutes: 30,
      },
    },
    sections: [
      {
        name: "Verbal Ability & Logical Reasoning",
        slug: "valr",
        questionCount: 26,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Decision Making",
        slug: "decision-making",
        questionCount: 22,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Ethical Dilemmas & Business Cases",
            slug: "ethical-business-cases",
            weightage: "100% of Decision Making",
            subtopics: [
              {
                name: "Stakeholder Prioritization & Corporate Governance",
                slug: "stakeholder-prioritization",
                concepts: [
                  {
                    title: "Evaluating Tradeoffs: Ethics vs Short-term Profit",
                    slug: "ethics-vs-profit",
                    summary:
                      "Framework for analyzing multi-party business conflicts, whistleblowing, and fiduciary duty.",
                    theoryHtml:
                      "A good XAT DM choice never condones illegal behavior, protects long-term institutional reputation over short-term expediency, and maintains pragmatic employee empathy.",
                    keyFormulas: [
                      "Rule of Balance: Avoid extreme binary reactions (instant firing vs complete inaction). Favor structured inquiry and transparent mediation.",
                    ],
                    tricks:
                      "Eliminate options that make unverified assumptions not supported by the narrative.",
                    commonTraps:
                      "Choosing a morally aggressive option that violates statutory regulations or company bylaws.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude & Data Interpretation",
        slug: "qadi",
        questionCount: 28,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "snap",
    name: "Symbiosis National Aptitude Test",
    shortName: "SNAP 2026",
    conductingBody: "Symbiosis International (Deemed University)",
    officialWebsite: "https://snaptest.org",
    description:
      "A 60-minute high-speed precision assessment for admission to 16 Symbiosis institutes (SIBM Pune, SCMHRD, SIIB).",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "SNAP 2026 Pattern",
      totalDurationMinutes: 60,
      totalQuestions: 60,
      totalMarks: 60,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "SIU SNAP Official Notification",
      sourceUrl: "https://snaptest.org",
    },
    sections: [
      {
        name: "General English",
        slug: "general-english",
        questionCount: 15,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Analytical & Logical Reasoning",
        slug: "analytical-lr",
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Quantitative, Data Interpretation & DS",
        slug: "quant-di-ds",
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "nmat",
    name: "NMAT by GMAC",
    shortName: "NMAT 2026",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://mba.com/exams/nmat",
    description:
      "Computer-adaptive management entrance exam accepted by NMIMS Mumbai, K J Somaiya, XIM University, and leading global business schools.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "NMAT 2026 Official Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 108,
      totalMarks: 324,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "GMAC NMAT Official Guide",
      sourceUrl: "https://mba.com/exams/nmat",
    },
    sections: [
      {
        name: "Language Skills",
        slug: "language-skills",
        durationMinutes: 28,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Quantitative Skills",
        slug: "quantitative-skills",
        durationMinutes: 52,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        durationMinutes: 40,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "cmat",
    name: "Common Management Admission Test",
    shortName: "CMAT 2026",
    conductingBody: "National Testing Agency (NTA)",
    officialWebsite: "https://cmat.nta.nic.in",
    description:
      "National testing assessment covering Quantitative Techniques, Logical Reasoning, Language Comprehension, General Awareness, and Innovation & Entrepreneurship.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "CMAT 2026 Pattern",
      totalDurationMinutes: 180,
      totalQuestions: 100,
      totalMarks: 400,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "NTA CMAT Information Bulletin",
      sourceUrl: "https://cmat.nta.nic.in",
    },
    sections: [
      {
        name: "Quantitative Techniques & Data Interpretation",
        slug: "qt-di",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Logical Reasoning",
        slug: "lr",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Language Comprehension",
        slug: "language-comprehension",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "General Awareness",
        slug: "general-awareness",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
      {
        name: "Innovation & Entrepreneurship",
        slug: "innovation-entrepreneurship",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 5,
        topics: [],
      },
    ],
  },
  {
    slug: "mat",
    name: "Management Aptitude Test",
    shortName: "MAT 2026",
    conductingBody: "All India Management Association (AIMA)",
    officialWebsite: "https://mat.aima.in",
    description:
      "All India standardized exam conducted in CBT, PBT, and IBT formats across 150 questions for admissions to top Tier-2 business schools.",
    isPopular: false,
    version: {
      year: 2026,
      versionName: "MAT 2026 Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 150,
      totalMarks: 150,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "AIMA MAT Official Portal",
      sourceUrl: "https://mat.aima.in",
    },
    sections: [
      {
        name: "Language Comprehension",
        slug: "language-comp",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Intelligence & Critical Reasoning",
        slug: "intelligence-reasoning",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Mathematical Skills",
        slug: "mathematical-skills",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "Data Analysis & Sufficiency",
        slug: "data-analysis-sufficiency",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
      {
        name: "Economic & Business Environment",
        slug: "economic-business-env",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 5,
        topics: [],
      },
    ],
  },
  {
    slug: "mah-cet",
    name: "MAH MBA/MMS CET",
    shortName: "MAH CET 2026",
    conductingBody: "State Common Entrance Test Cell, Maharashtra State",
    officialWebsite: "https://mahacet.org",
    description:
      "State-level speed assessment for admission to JBIMS, SIMSREE, PUMBA, and 300+ management colleges in Maharashtra. Features 200 questions and zero negative marking.",
    isPopular: false,
    version: {
      year: 2026,
      versionName: "MAH CET 2026 Pattern",
      totalDurationMinutes: 150,
      totalQuestions: 200,
      totalMarks: 200,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "State CET Cell Maharashtra Notification",
      sourceUrl: "https://mahacet.org",
    },
    sections: [
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        questionCount: 75,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Abstract Reasoning",
        slug: "abstract-reasoning",
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Quantitative Aptitude",
        slug: "quantitative-aptitude",
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "Verbal Ability / Reading Comprehension",
        slug: "verbal-ability-rc",
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
    ],
  },
  {
    slug: "gmat",
    name: "Graduate Management Admission Test",
    shortName: "GMAT 2026",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://www.mba.com/exams/gmat-exam",
    description:
      "Global standardized computer-adaptive examination for international business schools, assessing Quantitative Reasoning, Verbal Reasoning, and Data Insights across 64 questions (score scale 205-805).",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "GMAT 2026 Official Pattern",
      totalDurationMinutes: 135,
      totalQuestions: 64,
      totalMarks: 805,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: true,
      verificationStatus: "VERIFIED",
      sourceAuthority: "Graduate Management Admission Council (GMAC) Official Exam Specifications",
      sourceUrl: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
    },
    sections: [
      {
        name: "Quantitative Reasoning",
        slug: "quantitative-reasoning",
        durationMinutes: 45,
        questionCount: 21,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [
          {
            name: "Problem Solving: Arithmetic (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-arithmetic",
            weightage: "50% of QR",
            subtopics: [
              {
                name: "Number Properties & Fractions",
                slug: "number-properties",
                concepts: [
                  {
                    title: "Divisibility, Primes & Factors",
                    slug: "divisibility-primes",
                    summary: "Prime factorizations, even-odd parity, and divisibility rules without calculators.",
                    theoryHtml: "<p>GMAC tests number properties conceptually. Key focus is prime factor distribution and remainder constraints.</p>",
                    keyFormulas: ["Total factors = (p+1)(q+1)...", "Remainder property: Dividend = Divisor * Quotient + Remainder"],
                    tricks: "Test extreme cases (0, negatives, fractions) for integer constraints.",
                    commonTraps: "Assuming variables must be positive integers unless stated.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
          {
            name: "Problem Solving: Algebra (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-algebra",
            weightage: "50% of QR",
            subtopics: [
              {
                name: "Linear, Quadratic & Inequalities",
                slug: "algebra-inequalities",
                concepts: [
                  {
                    title: "Inequalities & Absolute Values",
                    slug: "inequalities-abs",
                    summary: "Solving quadratic inequalities and modulus equations under strict algebraic sign rules.",
                    theoryHtml: "<p>Inequalities flip signs when multiplied or divided by negative quantities. Always evaluate roots separately.</p>",
                    keyFormulas: ["|x| < a => -a < x < a", "|x| > a => x > a or x < -a"],
                    tricks: "Never multiply both sides by an unknown variable whose sign is indeterminate.",
                    commonTraps: "Canceling variables across inequalities without testing for negative values.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Verbal Reasoning",
        slug: "verbal-reasoning",
        durationMinutes: 45,
        questionCount: 23,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Critical Reasoning (Recommended Preparation Taxonomy)",
            slug: "gmat-critical-reasoning",
            weightage: "50% of VR",
            subtopics: [
              {
                name: "Argument Analysis & Logic",
                slug: "cr-argument-analysis",
                concepts: [
                  {
                    title: "Assumption & Weakening Frameworks",
                    slug: "assumption-weakening",
                    summary: "Pinpoint unstated necessary assumptions using the Negation Test.",
                    theoryHtml: "<p>An assumption is an unstated premise required for the conclusion to stand. Negating the correct assumption destroys the argument.</p>",
                    keyFormulas: ["Premise + Assumption = Conclusion", "Negation Test: If ~Assumption then ~Conclusion"],
                    tricks: "Beware of extreme wording in correct assumption answers (e.g. 'always', 'never').",
                    commonTraps: "Confusing what strengthens an argument with what is strictly necessary.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
          {
            name: "Reading Comprehension (Recommended Preparation Taxonomy)",
            slug: "gmat-reading-comprehension",
            weightage: "50% of VR",
            subtopics: [
              {
                name: "Passage Architecture & Inferences",
                slug: "rc-architecture",
                concepts: [
                  {
                    title: "Main Idea & Structural Shift Identification",
                    slug: "main-idea-structure",
                    summary: "Identify author perspective vs reported viewpoints across dense academic texts.",
                    theoryHtml: "<p>Track pivot keywords (However, Nevertheless, In contrast) to map author stance.</p>",
                    keyFormulas: ["Primary Purpose = Overall communicative objective", "Inference = Must be 100% true based solely on passage"],
                    tricks: "Eliminate answers introducing external facts not mentioned or implied by text.",
                    commonTraps: "Selecting true outside-world facts that are not supported by the passage context.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Data Insights",
        slug: "data-insights",
        durationMinutes: 45,
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [
          {
            name: "Data Sufficiency & Multi-Source Synthesis (Recommended Preparation Taxonomy)",
            slug: "gmat-data-insights-core",
            weightage: "100% of DI",
            subtopics: [
              {
                name: "Data Sufficiency Framework",
                slug: "data-sufficiency",
                concepts: [
                  {
                    title: "DS Systematic 12-TEN Protocol",
                    slug: "ds-protocol",
                    summary: "AD/BCE elimination matrix to evaluate Statement 1 and Statement 2 without over-calculating.",
                    theoryHtml: "<p>Test Statement 1 alone. If sufficient => A or D. If insufficient => B, C, or E. Carry zero assumptions between statements.</p>",
                    keyFormulas: ["Value Question: Yields exactly 1 unique value", "Yes/No Question: Yields definitive YES or definitive NO"],
                    tricks: "Stop calculating the second you confirm a single unique numerical solution exists.",
                    commonTraps: "Carrying facts from Statement 1 into Statement 2 when evaluating Statement 2 alone.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export interface VerifiedQuestionItem {
  id: string;
  topicSlug: string;
  subtopicSlug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questionType: "MCQ" | "TITA";
  questionText: string;
  passageText?: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  estimatedTimeSec: number;
  isDemo: boolean;
  source: string;
  solution: {
    detailedText: string;
    stepByStep: string[];
    shortcutMethod: string;
    conceptTested: string;
    commonMistakeTrap: string;
  };
}

export const SAMPLE_VERIFIED_QUESTIONS: VerifiedQuestionItem[] = [
  {
    id: "q-tsd-001",
    topicSlug: "arithmetic",
    subtopicSlug: "time-speed-distance",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "Two trains, Train A and Train B, start simultaneously from stations X and Y towards each other. After meeting at point M, Train A takes 4 hours to reach Y and Train B takes 9 hours to reach X. If the speed of Train A is 72 km/h, what is the speed of Train B in km/h?",
    options: [
      { label: "A", text: "32 km/h" },
      { label: "B", text: "48 km/h" },
      { label: "C", text: "54 km/h" },
      { label: "D", text: "60 km/h" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 100,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Let the two trains meet after time T hours. Distance covered by Train A before meeting = S_A * T. Distance covered by Train B after meeting = S_B * 9. Since both represent the distance XM, we have S_A * T = S_B * 9. Similarly, distance MY is S_B * T = S_A * 4. Dividing the two equations yields: (S_A / S_B) = √(t_B / t_A).",
      stepByStep: [
        "1. Recall the post-meeting ratio theorem: (Speed of A) / (Speed of B) = √(Time taken by B after meeting / Time taken by A after meeting).",
        "2. Substitute the given values: 72 / S_B = √(9 / 4).",
        "3. Simplify the square root: 72 / S_B = 3 / 2.",
        "4. Solve for S_B: S_B = (72 * 2) / 3 = 48 km/h.",
      ],
      shortcutMethod:
        "Direct Formula: S_A / S_B = √(T_B / T_A). Here √(9/4) = 3/2. Speed of B = 72 * (2/3) = 48 km/h. Solving time: < 30 seconds.",
      conceptTested: "Time, Speed & Distance - Post-Meeting Travel Time Theorem",
      commonMistakeTrap:
        "Inverting the ratio under the radical: taking √(T_A / T_B) = √(4/9) = 2/3 and multiplying 72 * (3/2) = 108 km/h.",
    },
  },
  {
    id: "q-tw-002",
    topicSlug: "arithmetic",
    subtopicSlug: "time-work",
    difficulty: "HARD",
    questionType: "MCQ",
    questionText:
      "A can complete a project in 18 days, and B can complete the same project in 24 days. They work together for 4 days, after which B leaves. A is then joined by C, whose efficiency is 60% more than B's. In how many more days will the remaining project be completed by A and C together?",
    options: [
      { label: "A", text: "4 days" },
      { label: "B", text: "5 days" },
      { label: "C", text: "6 days" },
      { label: "D", text: "7.5 days" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 120,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Let total work be LCM(18, 24) = 72 units. Efficiency of A = 72 / 18 = 4 units/day. Efficiency of B = 72 / 24 = 3 units/day. Since C is 60% more efficient than B, C's efficiency = 3 × 1.6 = 4.8 units/day. Combined efficiency of A + C = 4 + 4.8 = 8.8 units/day. In the first 4 days, A and B together complete 4 × (4 + 3) = 28 units. Remaining work = 72 - 28 = 44 units. Additional days needed by A and C = 44 / 8.8 = 5 days.",
      stepByStep: [
        "1. Assume Total Work = LCM(18, 24) = 72 units.",
        "2. Efficiency of A = 72 / 18 = 4 units/day.",
        "3. Efficiency of B = 72 / 24 = 3 units/day.",
        "4. Efficiency of C = 3 × (1 + 0.60) = 4.8 units/day.",
        "5. Combined efficiency of A + C = 4 + 4.8 = 8.8 units/day.",
        "6. Work done in first 4 days by A + B = 4 × (4 + 3) = 28 units.",
        "7. Remaining work = 72 - 28 = 44 units.",
        "8. Additional days required for A and C = 44 / 8.8 = 5 days.",
      ],
      shortcutMethod:
        "Units approach: Total = 72 units. (A+B) do 7 units/day × 4 = 28 units. Remaining = 44 units. (A+C) do 4 + 4.8 = 8.8 units/day. Days = 44 / 8.8 = 5 days.",
      conceptTested: "Time & Work - Multi-Worker Efficiency & Partial Replacement",
      commonMistakeTrap:
        "Calculating C's efficiency as 60% of B (1.8 units/day) rather than 60% more than B (4.8 units/day).",
    },
  },
  {
    id: "q-pl-001",
    topicSlug: "arithmetic",
    subtopicSlug: "percentages",
    difficulty: "EASY",
    questionType: "MCQ",
    questionText:
      "A shopkeeper marks an article 40% above the cost price and allows a discount of 15% on the marked price. If his cost price is ₹800, what is the net profit earned?",
    options: [
      { label: "A", text: "₹144" },
      { label: "B", text: "₹152" },
      { label: "C", text: "₹160" },
      { label: "D", text: "₹172" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Marked Price (MP) = 800 × (1 + 0.40) = ₹1120. Selling Price (SP) after 15% discount = 1120 × (1 - 0.15) = 1120 × 0.85 = ₹952. Net Profit = SP - CP = 952 - 800 = ₹152.",
      stepByStep: [
        "1. Calculate Marked Price: MP = 800 × 1.40 = ₹1120.",
        "2. Calculate Selling Price: SP = 1120 × 0.85 = ₹952.",
        "3. Net Profit = SP - CP = 952 - 800 = ₹152.",
      ],
      shortcutMethod:
        "Net Profit % = Marked% - Discount% - (Marked% × Discount%)/100 = 40 - 15 - (40 × 15)/100 = 25 - 6 = 19%. Profit = 19% of 800 = ₹152.",
      conceptTested: "Percentages - Successive Markup & Discount Relations",
      commonMistakeTrap:
        "Calculating the 15% discount on the Cost Price (₹800) instead of the Marked Price (₹1120).",
    },
  },
  {
    id: "q-pl-002",
    topicSlug: "arithmetic",
    subtopicSlug: "profit-loss",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "A dishonest merchant uses a faulty balance that reads 1000g for every 800g actual weight, and simultaneously claims to sell goods at a discount of 10% on the cost price. What is his net profit or loss percentage?",
    options: [
      { label: "A", text: "8% Profit" },
      { label: "B", text: "10% Profit" },
      { label: "C", text: "12.5% Profit" },
      { label: "D", text: "15% Profit" },
    ],
    correctAnswer: "C",
    estimatedTimeSec: 100,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Let the cost price of 1g = ₹1. The merchant dispenses 800g of goods, so his actual cost incurred = ₹800. The scale reads 1000g, for which he bills the customer with a 10% discount: SP = 1000 × (1 - 0.10) = ₹900. Net Profit = SP - CP = 900 - 800 = ₹100. Net Profit % = (100 / 800) × 100 = 12.5% Profit.",
      stepByStep: [
        "1. Let CP per gram = ₹1. Actual cost incurred for 800g = ₹800.",
        "2. Billed weight = 1000g with 10% discount => Revenue collected = 1000 × 0.90 = ₹900.",
        "3. Absolute profit = 900 - 800 = ₹100.",
        "4. Profit percentage = (100 / 800) × 100 = 12.5% Profit.",
      ],
      shortcutMethod:
        "Effective Multiplier = (Billed Weight / Actual Dispensed Weight) × (1 - Discount) = (1000 / 800) × 0.90 = 1.25 × 0.90 = 1.125 => +12.5% Profit.",
      conceptTested: "Profit & Loss - Dishonest Dealer & Faulty Weight Metric",
      commonMistakeTrap:
        "Computing the profit percentage over 1000g rather than the actual 800g dispensed cost base.",
    },
  },
  {
    id: "q-alg-005",
    topicSlug: "algebra",
    subtopicSlug: "quadratic-equations",
    difficulty: "HARD",
    questionType: "MCQ",
    questionText:
      "Find the complete range of values of k for which the roots of the quadratic equation x^2 - (k - 3)x + k = 0 are real and distinct.",
    options: [
      { label: "A", text: "k < 1 or k > 9" },
      { label: "B", text: "1 < k < 9" },
      { label: "C", text: "k <= 1" },
      { label: "D", text: "k >= 9" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 110,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "For a quadratic equation ax^2 + bx + c = 0 to have real and distinct roots, the discriminant Δ = b^2 - 4ac must be strictly greater than 0. Here a = 1, b = -(k - 3), and c = k. Thus, Δ = [-(k - 3)]^2 - 4(1)(k) = k^2 - 6k + 9 - 4k = k^2 - 10k + 9 > 0. Factoring: (k - 1)(k - 9) > 0. By the sign-scheme/wavy curve method, the product is positive outside the roots: k < 1 or k > 9.",
      stepByStep: [
        "1. Write the condition for real and distinct roots: Discriminant Δ > 0.",
        "2. Compute Δ: Δ = (-(k - 3))^2 - 4(1)(k) = k^2 - 6k + 9 - 4k = k^2 - 10k + 9.",
        "3. Factor the quadratic in k: (k - 1)(k - 9) > 0.",
        "4. Critical roots are k = 1 and k = 9. For product > 0, k lies in the outer intervals: k < 1 or k > 9.",
      ],
      shortcutMethod:
        "Roots of k^2 - 10k + 9 = 0 are 1 and 9. Since the coefficient of k^2 is positive, the quadratic is > 0 strictly outside the interval [1, 9], giving k < 1 or k > 9 in under 20 seconds.",
      conceptTested: "Algebra - Nature of Roots & Quadratic Discriminant Inequalities",
      commonMistakeTrap:
        "Selecting the inner interval 1 < k < 9 where the discriminant is negative (complex roots).",
    },
  },
  {
    id: "q-geo-006",
    topicSlug: "geometry",
    subtopicSlug: "triangles",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "In a right-angled triangle, the lengths of the two perpendicular legs are 12 cm and 16 cm. What is the radius of the inscribed circle (inradius) of this triangle in cm?",
    options: [
      { label: "A", text: "3 cm" },
      { label: "B", text: "4 cm" },
      { label: "C", text: "5 cm" },
      { label: "D", text: "6 cm" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "By Pythagoras' theorem, hypotenuse c = √(12^2 + 16^2) = √(144 + 256) = √400 = 20 cm. For any right-angled triangle with perpendicular legs a, b and hypotenuse c, the inradius r is given by r = (a + b - c) / 2. Substituting: r = (12 + 16 - 20) / 2 = 8 / 2 = 4 cm. Alternatively, using r = Area / s where Area = (1/2) × 12 × 16 = 96 cm^2 and s = (12 + 16 + 20) / 2 = 24 cm, r = 96 / 24 = 4 cm.",
      stepByStep: [
        "1. Calculate hypotenuse c = √(12^2 + 16^2) = 20 cm.",
        "2. Use right triangle inradius theorem: r = (a + b - c) / 2.",
        "3. Substitute values: r = (12 + 16 - 20) / 2 = 8 / 2 = 4 cm.",
      ],
      shortcutMethod:
        "Standard 3-4-5 triangle scaled by factor 4 (sides 12-16-20). In a 3-4-5 right triangle, inradius = (3+4-5)/2 = 1. Scaling by 4 gives r = 1 × 4 = 4 cm immediately.",
      conceptTested: "Geometry - Right Triangle Properties & Inscribed Circles",
      commonMistakeTrap:
        "Calculating circumradius R = c / 2 = 20 / 2 = 10 cm instead of inradius r.",
    },
  },
  {
    id: "q-num-007",
    topicSlug: "number-systems",
    subtopicSlug: "remainders",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "What is the remainder when 2^100 is divided by 7?",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "4" },
      { label: "D", text: "6" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 80,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Examine the remainders of successive powers of 2 when divided by 7 (cyclicity): 2^1 ≡ 2 (mod 7), 2^2 ≡ 4 (mod 7), 2^3 = 8 ≡ 1 (mod 7). Since 2^3 ≡ 1 (mod 7), the remainder repeats with a period (cyclicity) of 3. Dividing the exponent 100 by 3: 100 = 3 × 33 + 1 (remainder 1). Therefore, 2^100 = (2^3)^33 × 2^1 ≡ 1^33 × 2 ≡ 2 (mod 7).",
      stepByStep: [
        "1. Find the cyclicity of powers of 2 mod 7: 2^1 = 2, 2^2 = 4, 2^3 = 8 ≡ 1 (mod 7).",
        "2. The cycle period is 3.",
        "3. Divide the power by cycle length: 100 = 3 × 33 + 1, so the remainder power is 1.",
        "4. Remainder = 2^1 mod 7 = 2.",
      ],
      shortcutMethod:
        "2^3 ≡ 1 (mod 7). 100 mod 3 = 1 => Remainder is 2^1 = 2.",
      conceptTested: "Number Systems - Modular Arithmetic & Power Cyclicity",
      commonMistakeTrap:
        "Forgetting to reduce the exponent modulo the cycle length 3.",
    },
  },
  {
    id: "q-lr-001",
    topicSlug: "logical-reasoning",
    subtopicSlug: "arrangements",
    difficulty: "EASY",
    questionType: "MCQ",
    questionText:
      "Six people P, Q, R, S, T, and U sit in a circle facing the center. P is between Q and R. S is second to the left of U. T is to the immediate right of R. Who is sitting directly opposite to P?",
    options: [
      { label: "A", text: "Q" },
      { label: "B", text: "S" },
      { label: "C", text: "T" },
      { label: "D", text: "U" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified DILR Question Bank",
    solution: {
      detailedText:
        "Fix positions 1 to 6 clockwise. Let P be at position 1. P is between Q and R, so R and Q must be at positions 2 and 6 (or vice versa). Since T is to the immediate right of R (counter-clockwise when facing inward), R must be at pos 2 and T at pos 3. Then Q is at pos 6. The remaining positions are 4 and 5 for S and U. S is second to the left of U, which places U at pos 5 and S at pos 4 (since 2 steps clockwise from pos 5 is pos 4). Directly opposite to pos 1 (P) in a 6-person circle is pos 4, which is occupied by S.",
      stepByStep: [
        "1. Place P at pos 1. P is flanked by Q and R at pos 2 and 6.",
        "2. T is immediate right of R => R is pos 2, T is pos 3.",
        "3. S is 2nd left of U => U is pos 5, S is pos 4.",
        "4. Opposite pos 1 (P) in a 6-seat circle is pos 1 + 3 = pos 4 = S.",
      ],
      shortcutMethod:
        "In a 6-person circle, the person opposite index i is (i + 3) mod 6. P at 1 => Opposite is pos 4 = S.",
      conceptTested: "Logical Reasoning - Circular Seating Arrangement Deductions",
      commonMistakeTrap:
        "Reversing left and right orientation for inwards-facing circle positions.",
    },
  },
  {
    id: "q-di-008",
    topicSlug: "data-interpretation",
    subtopicSlug: "tournaments",
    difficulty: "HARD",
    questionType: "MCQ",
    questionText:
      "In a single round-robin tournament consisting of 5 teams, each team plays every other team exactly once. A win awards 2 points, a tie awards 1 point to each team, and a loss awards 0 points. If exactly 2 matches ended in ties, what is the grand total of points accumulated across all 5 teams at the conclusion of the tournament?",
    options: [
      { label: "A", text: "18 points" },
      { label: "B", text: "20 points" },
      { label: "C", text: "22 points" },
      { label: "D", text: "24 points" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 100,
    isDemo: true,
    source: "AptiVerse Verified DILR Question Bank",
    solution: {
      detailedText:
        "In a single round-robin tournament with n teams, total matches played = n(n - 1) / 2 = 5 × 4 / 2 = 10 matches. In any decisive match (one team wins, one loses), the winner receives 2 points and the loser 0 points, adding 2 points to the total pool. In any tied match, each team receives 1 point, adding 1 + 1 = 2 points to the total pool. Because every single match produces exactly 2 points regardless of whether it is won or drawn, the total points across all teams is invariant: 10 matches × 2 points/match = 20 points.",
      stepByStep: [
        "1. Calculate total matches: N = 5 × (5 - 1) / 2 = 10 matches.",
        "2. In a win/loss match: Points generated = 2 + 0 = 2.",
        "3. In a tie match: Points generated = 1 + 1 = 2.",
        "4. Total points generated = 10 matches × 2 points/match = 20 points.",
      ],
      shortcutMethod:
        "Tournament Invariant Rule: Total Points = 2 × Total Matches whenever Win=2 and Draw=1. 2 × 10 = 20 points, independent of the number of ties.",
      conceptTested: "Data Interpretation - Round-Robin Points Invariants & Tournaments",
      commonMistakeTrap:
        "Subtracting points for ties or assuming ties reduce total points generated.",
    },
  },
  {
    id: "q-rc-003",
    topicSlug: "reading-comprehension",
    subtopicSlug: "main-idea",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    passageText:
      "Technological determinism presumes that a society's technology drives the development of its social structure and cultural values. However, historical evidence frequently demonstrates that technology is socially shaped: cultural imperatives, institutional incentives, and political negotiations determine which technologies are funded, developed, and adopted. Rather than an autonomous force steering civilization, technology functions as an arena where competing social interests contend for dominance. Treating technology as an unalterable external wave obscures the human agency and policy choices that construct our digital landscape.",
    questionText:
      "Which of the following best captures the central argument of the author?",
    options: [
      {
        label: "A",
        text: "Technological determinism has successfully explained major social revolutions in modern history.",
      },
      {
        label: "B",
        text: "Technology is an autonomous force that dictates societal values irrespective of political choices.",
      },
      {
        label: "C",
        text: "Technological advancement is not an autonomous external driver but a product of social, political, and institutional choices.",
      },
      {
        label: "D",
        text: "Modern society must halt technological adoption to restore democratic human agency.",
      },
    ],
    correctAnswer: "C",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified VARC Question Bank",
    solution: {
      detailedText:
        "The passage critiques technological determinism and argues that technology is shaped by human policy, institutions, and cultural negotiations. Option C succinctly encapsulates this thesis without overreaching.",
      stepByStep: [
        "1. Identify the author's primary pivot: 'However, historical evidence frequently demonstrates that technology is socially shaped...'",
        "2. Note the conclusion: 'Treating technology as an unalterable external wave obscures the human agency and policy choices...'",
        "3. Option A contradicts the passage by praising determinism.",
        "4. Option B states the exact opposite of the author's thesis.",
        "5. Option D introduces an extreme, unsubstantiated recommendation (halting adoption).",
        "6. Option C accurately captures the balanced central argument.",
      ],
      shortcutMethod:
        "Elimination: Option A and B contradict the passage; Option D is too extreme ('must halt'). Option C is the only accurate representation.",
      conceptTested: "VARC - Central Argument & Thesis Extraction",
      commonMistakeTrap:
        "Selecting Option D due to the strong concluding tone, even though the author advocates policy awareness rather than a moratorium on tech.",
    },
  },
  {
    id: "q-va-009",
    topicSlug: "verbal-ability",
    subtopicSlug: "para-jumbles",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "The following four sentences (A, B, C, D) need to be arranged to form a coherent paragraph:\n(A) Furthermore, this rapid transition has exposed structural deficits in data governance and regulatory compliance across global markets.\n(B) Over the past decade, cloud computing has transitioned from an experimental enterprise cost-saver to the fundamental operating substrate of global commerce.\n(C) Without standardized multi-jurisdictional frameworks, financial and healthcare institutions risk catastrophic systemic vulnerabilities.\n(D) As business processes migrated to centralized distributed servers, reliance on single cloud hyperscalers grew exponentially.\nWhich sequence forms the most coherent paragraph?",
    options: [
      { label: "A", text: "B - D - A - C" },
      { label: "B", text: "B - A - D - C" },
      { label: "C", text: "D - B - A - C" },
      { label: "D", text: "A - B - D - C" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 100,
    isDemo: true,
    source: "AptiVerse Verified VARC Question Bank",
    solution: {
      detailedText:
        "Sentence B serves as the overarching introductory anchor by establishing the macro shift of cloud computing over the past decade. Sentence D naturally follows B by explaining how business processes migrated to distributed servers. Sentence A introduces the complicating factor ('Furthermore, this rapid transition has exposed structural deficits...'). Sentence C concludes by articulating the severe risk if regulatory frameworks remain unaddressed. Thus, the coherent sequence is B - D - A - C.",
      stepByStep: [
        "1. Sentence B introduces the subject without backward referents: ideal opening sentence.",
        "2. Sentence D describes the execution of that transition.",
        "3. Sentence A connects using additive connector 'Furthermore, this rapid transition...'.",
        "4. Sentence C provides the consequence of those deficits, concluding the thought.",
        "5. Order: B - D - A - C.",
      ],
      shortcutMethod:
        "Identify opening sentence B and the mandatory cause-effect pair A - C. Only Option A offers sequence B - D - A - C.",
      conceptTested: "VARC - Para Jumbles & Cohesion Markers",
      commonMistakeTrap:
        "Starting with Sentence D, which presumes a pre-established context of cloud migration.",
    },
  },
  {
    id: "q-dm-004",
    topicSlug: "ethical-business-cases",
    subtopicSlug: "stakeholder-prioritization",
    difficulty: "HARD",
    questionType: "MCQ",
    passageText:
      "Naveen is the Regional Operations Head of a fast-growing pharmaceutical logistics firm, MedFlow. MedFlow recently won a high-stakes government contract to deliver temperature-sensitive vaccines to remote rural clinics. During a routine audit, Naveen discovers that one batch of refrigeration sensors in a sub-warehouse had experienced a 45-minute power glitch two weeks ago. The manufacturer's tolerance protocol states that a glitch over 30 minutes may cause a 5% degradation in efficacy, though it is non-toxic. If Naveen recalls and re-tests the entire batch, MedFlow will miss the contractual delivery deadline, incurring severe financial penalties and potential blacklisting. If he proceeds with the shipment without disclosure, the rural clinics will receive the vaccines on time, but 5% of recipients might receive sub-optimal immunity.",
    questionText:
      "What is the most ethically and professionally sound course of action for Naveen?",
    options: [
      {
        label: "A",
        text: "Dispatch the vaccines immediately to fulfill the contractual obligation, while privately commissioning a secondary supplier for subsequent batches.",
      },
      {
        label: "B",
        text: "Immediately inform the government health authority about the 45-minute temperature variance, provide the manufacturer's degradation risk data, and dispatch emergency replacement units from the central reserve at MedFlow's cost.",
      },
      {
        label: "C",
        text: "Conduct an internal investigation into the warehouse staff responsible for the power outage before taking any action on the shipment.",
      },
      {
        label: "D",
        text: "Quietly dispose of the affected batch and report a transit theft to claim insurance and avoid contractual breach penalties.",
      },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 150,
    isDemo: true,
    source: "AptiVerse Verified XAT Decision Making Bank",
    solution: {
      detailedText:
        "In ethical decision-making, patient health and public trust take precedence over contractual penalties. Transparency with the authority coupled with proactive mitigation (deploying emergency reserves at company cost) upholds corporate integrity and fiduciary responsibility.",
      stepByStep: [
        "1. Evaluate core dilemma: Public health efficacy vs contractual penalty / company reputation.",
        "2. Option A conceals health risks, violating pharmaceutical compliance and ethics.",
        "3. Option C delays urgent patient safety action to conduct administrative blame-assignment.",
        "4. Option D involves fraudulent misrepresentation and criminal misconduct.",
        "5. Option B provides full transparency, transparent risk assessment, and active corrective remedy at company expense.",
      ],
      shortcutMethod:
        "XAT Decision Rule: Transparent disclosure + Immediate patient safety remedy + Company accountability = Optimal Choice.",
      conceptTested: "XAT Decision Making - Public Health Fiduciary Responsibility",
      commonMistakeTrap:
        "Selecting Option A under the assumption that 5% degradation is 'acceptable' to preserve corporate solvency.",
    },
  },
];

