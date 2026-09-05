export type TaxonomyType = "OFFICIAL_SYLLABUS" | "RECOMMENDED_PREPARATION_TAXONOMY";

export interface CanonicalChapterDefinition {
  name: string;
  slug: string;
  description: string;
  orderIndex: number;
  taxonomyType: TaxonomyType;
  testDurationMinutes?: number;
  testQuestionCount?: number;
  positiveMarks?: number;
  negativeMarks?: number;
}

export interface CanonicalTopicDefinition {
  name: string;
  slug: string;
  description?: string;
  weightage?: string;
  chapters: CanonicalChapterDefinition[];
}

export interface CanonicalSectionDefinition {
  name: string;
  slug: string;
  orderIndex: number;
  durationMinutes?: number;
  questionCount: number;
  positiveMarks: number;
  negativeMarks: number;
  titaPositiveMarks?: number;
  titaNegativeMarks?: number;
  topics: CanonicalTopicDefinition[];
}

export interface CanonicalExamChaptersData {
  examSlug: string;
  examName: string;
  shortName: string;
  defaultTaxonomy: TaxonomyType;
  sections: CanonicalSectionDefinition[];
}

export const CANONICAL_EXAM_TAXONOMY: Record<string, CanonicalExamChaptersData> = {
  cat: {
    examSlug: "cat",
    examName: "Common Admission Test 2026",
    shortName: "CAT",
    defaultTaxonomy: "RECOMMENDED_PREPARATION_TAXONOMY",
    sections: [
      {
        name: "Verbal Ability & Reading Comprehension",
        slug: "varc",
        orderIndex: 1,
        durationMinutes: 40,
        questionCount: 24,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        topics: [
          {
            name: "Reading Comprehension",
            slug: "reading-comprehension",
            weightage: "66% of VARC (16 Questions)",
            chapters: [
              {
                name: "Main Idea, Primary Purpose & Central Theme",
                slug: "main-idea-primary-purpose",
                description: "Identifying author's core thesis, distinguishing central ideas from supporting claims across humanities, economics, and science passages.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Direct & Indirect Inferences",
                slug: "direct-indirect-inferences",
                description: "Deducing unstated implications, logical extrapolations, and boundary limits supported by passage evidence without speculation.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Author's Tone, Attitude & Rhetorical Style",
                slug: "authors-tone-attitude",
                description: "Evaluating subjective nuances, irony, skeptical vs laudatory stances, neutrality, and persuasive rhetoric.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Logical Structure & Passage Architecture",
                slug: "passage-structure-logic",
                description: "Analyzing paragraph progression, role of counter-examples, transitional pivots, and paragraph-function relationships.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Fact-Based Retrieval & Data Comparison",
                slug: "fact-retrieval-comparison",
                description: "Scanning specific textual details, multi-paragraph factual comparisons, and eliminating distorted paraphrases.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Critical Reasoning in Reading Passages",
                slug: "critical-reasoning-passages",
                description: "Evaluating arguments embedded in passages: strengthening, weakening, identifying unstated premises, and resolving paradoxes.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Verbal Ability",
            slug: "verbal-ability",
            weightage: "33% of VARC (8 Questions)",
            chapters: [
              {
                name: "Para Jumbles (Sentence Rearrangement)",
                slug: "para-jumbles",
                description: "Reconstructing scrambled paragraphs using mandatory pairs, chronological indicators, demonstrative pronouns, and topic sentences.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Para Summary & Core Essence",
                slug: "para-summary",
                description: "Distilling paragraphs into succinct 1-sentence summaries while eliminating over-generalizations and distorted scopes.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Odd Sentence Out",
                slug: "odd-sentence-out",
                description: "Detecting the outlier sentence that deviates from the paragraph's core narrative thread or tone.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Para Completion & Sentence Insertion",
                slug: "para-completion-insertion",
                description: "Selecting the most logically consistent concluding sentence or optimal paragraph insertion slot.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "Data Interpretation & Logical Reasoning",
        slug: "dilr",
        orderIndex: 2,
        durationMinutes: 40,
        questionCount: 20,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        topics: [
          {
            name: "Data Interpretation",
            slug: "data-interpretation",
            weightage: "50% of DILR (10-12 Questions)",
            chapters: [
              {
                name: "Tables, Calculation Sets & Missing Data",
                slug: "tables-calculation-missing-data",
                description: "Deducing missing cells in multi-variable tables using consistency checks, totals, and row-column constraints.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Bar Charts, Line Graphs & Growth Trends",
                slug: "bar-line-growth-trends",
                description: "Analyzing stacked, grouped, and bidirectional bar graphs alongside multi-year compounded growth trends.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Pie Charts & Interrelated Distributions",
                slug: "pie-charts-interrelated",
                description: "Solving dual pie charts, degree-to-percentage conversions, and sub-categorical segment distributions.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Mixed, Radar & Scatter Plots",
                slug: "mixed-radar-scatter-plots",
                description: "Interpreting hybrid visual charts combining volume with growth rates, spider/radar grids, and bivariate scatter distributions.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Unstructured Caselets & Tabular Conversions",
                slug: "unstructured-caselets",
                description: "Translating paragraph-based quantitative descriptions into structured mathematical models and tables.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Logical Reasoning",
            slug: "logical-reasoning",
            weightage: "50% of DILR (8-10 Questions)",
            chapters: [
              {
                name: "Linear & Matrix Grid Arrangements",
                slug: "linear-matrix-arrangements",
                description: "Single and multi-row seating, facing directions, and multi-attribute grid matching with negative clues.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Circular & Polygonal Seating Arrangements",
                slug: "circular-polygonal-arrangements",
                description: "Circular and polygon tables with internal/external facing directions and variable distances.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Games & Tournaments (Knockout & Round-Robin)",
                slug: "games-tournaments",
                description: "Deducing match outcomes, tournament seedings, upset matches, points tallies, and run rates.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Binary Logic (Truth-Tellers, Liars & Alternators)",
                slug: "binary-logic",
                description: "Solving statement-consistency puzzles involving truth-tellers, absolute liars, and alternating respondents.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Grouping, Team Selection & Distribution Bounds",
                slug: "grouping-selection-distribution",
                description: "Constrained team formation, pairwise exclusions, item-box distributions under capacity limits.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Routes, Networks & Flow Optimization",
                slug: "routes-networks-pipelines",
                description: "Directed acyclic graphs, shortest routes, flow conservation, pipeline capacity bottlenecks.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Advanced Venn Diagrams & Set Optimization",
                slug: "venn-diagrams-set-optimization",
                description: "3-set and 4-set Venn diagrams with maximization and minimization of overlapping intersections.",
                orderIndex: 7,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "qa",
        orderIndex: 3,
        durationMinutes: 40,
        questionCount: 22,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        topics: [
          {
            name: "Arithmetic",
            slug: "arithmetic",
            weightage: "40-45% of QA (8-10 Questions)",
            chapters: [
              {
                name: "Percentages, Base Changes & Successive Variations",
                slug: "percentages-base-changes",
                description: "Base changes, successive multiplicative factors, expenditure-consumption-price models, percentage point shifts.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Profit, Loss, Discount & Faulty Balances",
                slug: "profit-loss-discount",
                description: "Marked price, successive cash discounts, faulty weights/balances, dishonest shopkeeper models, free-item bundles.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Simple & Compound Interest, Compounding Periods & EMIs",
                slug: "simple-compound-interest",
                description: "Nominal vs effective rates, continuous and fractional compounding, equal installment (EMI) amortizations.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Ratio, Proportion, Partnership & Variation Models",
                slug: "ratio-proportion-variation",
                description: "Mean/third/fourth proportion, compound ratios, active vs sleeping partner profit sharing, direct and inverse variation laws.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Averages, Weighted Averages & Deviation Method",
                slug: "averages-weighted-deviations",
                description: "Arithmetic mean, assumed mean deviation, shifting averages upon entry/exit of group members.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Mixtures, Multi-Stage Dilutions & Alligations",
                slug: "mixtures-alligation",
                description: "Repeated liquid replacement formula, cross-alligation method, multi-container solution transfers.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Time & Work, Man-Days & Pipes & Cisterns",
                slug: "time-work-pipes-cisterns",
                description: "Individual and combined work efficiency, negative work (leakages), alternate day cycles, wage distribution.",
                orderIndex: 7,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Time, Speed, Distance, Relative Speed & Trains",
                slug: "time-speed-distance",
                description: "Average speed, meeting points, relative velocity of trains crossing stationary and moving objects.",
                orderIndex: 8,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Races, Circular Motion, Boats & Streams",
                slug: "races-circular-boats-streams",
                description: "Headstarts, beat distances, circular track meeting points (at start and anywhere), upstream-downstream rates.",
                orderIndex: 9,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Algebra",
            slug: "algebra",
            weightage: "30-35% of QA (6-8 Questions)",
            chapters: [
              {
                name: "Linear Equations & Integral Diophantine Solutions",
                slug: "linear-equations-diophantine",
                description: "Simultaneous linear equations, consistency conditions, integer solution counting (Diophantine equations).",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Quadratic Equations, Roots & Discriminant Analysis",
                slug: "quadratic-equations-roots",
                description: "Sum/product of roots, discriminant nature, common roots conditions, signs of quadratic functions.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Polynomials, Vieta's Relations & Remainder Theorem",
                slug: "polynomials-vietas-theorems",
                description: "Cubic and higher-degree polynomials, Factor and Remainder theorems, Vieta's formulas.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Inequalities, Modulus & Wavy Curve Method",
                slug: "inequalities-modulus-wavy-curve",
                description: "Sign intervals, absolute value transformations, AM-GM inequality, algebraic bounds.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Functions, Domain-Range & Transformations",
                slug: "functions-composite-graphs",
                description: "Composite functions f(g(x)), periodic and even/odd functions, invertible functions, graphical shifts.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Sequences & Series (AP, GP, HP & Special Sums)",
                slug: "sequences-series-progressions",
                description: "Arithmetic, Geometric, Arithmetico-Geometric (AGP), Harmonic progressions, infinite sums, sigma formulas.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Logarithms, Surds & Indices",
                slug: "logarithms-surds-indices",
                description: "Base change formulas, logarithmic inequalities, laws of indices, rationalizing radical surds.",
                orderIndex: 7,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Maxima & Minima Optimization",
                slug: "maxima-minima-optimization",
                description: "Algebraic optimization without calculus, symmetry principles, completing the square, boundary vertices.",
                orderIndex: 8,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Geometry & Mensuration",
            slug: "geometry",
            weightage: "15-20% of QA (3-5 Questions)",
            chapters: [
              {
                name: "Lines, Angles & Triangle Theorems",
                slug: "lines-angles-triangles",
                description: "Parallel transversals, triangle inequalities, Pythagoras, Apollonius, Angle Bisector theorem.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Triangle Centers, Congruence & Similarity",
                slug: "triangle-centers-similarity",
                description: "Incenter, circumcenter, orthocenter, centroid coordinates, Euler line, area ratios of similar triangles.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Quadrilaterals, Regular Polygons & Cyclic Theorems",
                slug: "quadrilaterals-polygons",
                description: "Parallelograms, trapezoids, cyclic quadrilaterals (Ptolemy theorem), regular polygon angles and diagonals.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Circles, Tangents & Intersecting Chord Theorems",
                slug: "circles-tangents-chords",
                description: "Direct and transverse common tangents, intersecting secants/chords, alternate segment theorem.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Coordinate Geometry, Slopes & Distances",
                slug: "coordinate-geometry-lines",
                description: "Distance and section formulas, slope-intercept forms, perpendicular distance, circle equations.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Mensuration 2D & 3D (Surface Area & Volume)",
                slug: "mensuration-2d-3d",
                description: "Prisms, pyramids, cylinders, cones, spheres, frustums, cross-sections and composite solids.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Modern Mathematics & Number System",
            slug: "modern-math-numbers",
            weightage: "10-15% of QA (2-4 Questions)",
            chapters: [
              {
                name: "Divisibility Rules, Remainders & Modular Arithmetic",
                slug: "divisibility-remainders-theorems",
                description: "Euler's totient theorem, Fermat's Little theorem, Wilson's theorem, Chinese Remainder basics, unit digit cycles.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Factors, Multiples, HCF & LCM Models",
                slug: "factors-multiples-hcf-lcm",
                description: "Total, even, odd factors; sum and product of factors; HCF and LCM word problems, Euclidean algorithm.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Factorials, Trailing Zeroes & Cyclicity Patterns",
                slug: "factorials-trailing-zeroes-cyclicity",
                description: "Legendre's formula for highest power of prime in n!, trailing zeroes in products, base systems conversions.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Permutations & Combinations (Counting, Partitions, Circular)",
                slug: "permutations-combinations-counting",
                description: "Fundamental counting principle, derangements, stars and bars / multinomial partitions, circular seating.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Probability, Conditional Probability & Bayes' Theorem",
                slug: "probability-conditional-bayes",
                description: "Classical and experimental probability, independent events, odds in favor/against, conditional probability, Bayes' theorem.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Set Theory & Principle of Inclusion-Exclusion",
                slug: "set-theory-venn-principle",
                description: "Algebra of sets, Venn diagram regions, inclusion-exclusion principle across multiple subsets.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
    ],
  },

  xat: {
    examSlug: "xat",
    examName: "Xavier Aptitude Test 2026",
    shortName: "XAT",
    defaultTaxonomy: "RECOMMENDED_PREPARATION_TAXONOMY",
    sections: [
      {
        name: "Verbal and Logical Ability",
        slug: "valr",
        orderIndex: 1,
        questionCount: 26,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Verbal and Logical Ability",
            slug: "valr-core",
            weightage: "100% of VALR (26 Questions)",
            chapters: [
              {
                name: "Philosophical, Sociological & Abstract RC Passages",
                slug: "philosophical-analytical-rc",
                description: "High-complexity passages covering political philosophy, sociology, art theory, and evolutionary anthropology.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Critical Reasoning (Assumptions, Boldface & Paradoxes)",
                slug: "critical-reasoning-xat",
                description: "Deconstructing premises, detecting unstated assumptions, strengthening/weakening arguments, resolving logical paradoxes.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Para Jumbles & Coherent Paragraph Sequencing",
                slug: "para-jumbles-valr",
                description: "Sequencing high-density discursive sentences with subtle pronoun links and logical connectors.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Advanced Contextual Vocabulary & Analogies",
                slug: "contextual-vocab-analogies",
                description: "Nuanced semantic vocabulary, subtle antonyms, and relational analogies.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Sentence Completion & Rhetorical Consistency",
                slug: "sentence-completion-flow",
                description: "Completing multi-clause compound sentences ensuring structural parallelism and stylistic coherence.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "Decision Making",
        slug: "decision-making",
        orderIndex: 2,
        questionCount: 22,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Decision Making",
            slug: "decision-making-core",
            weightage: "100% of DM (22 Questions)",
            chapters: [
              {
                name: "Ethical Dilemmas & Corporate Governance",
                slug: "ethical-dilemmas-governance",
                description: "Whistleblowing scenarios, conflict of interest, integrity vs profitability, regulatory compliance.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Business Strategy & Competitive Market Decisions",
                slug: "business-strategy-market",
                description: "Market expansion, capacity constraints, price undercutting, product diversification tradeoffs.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Human Resource Conflicts & Employee Mediation",
                slug: "hr-conflict-resolution",
                description: "Workplace disputes, performance appraisals, constructive dismissal, union negotiations, empathetic management.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Multi-Stakeholder Tradeoffs & Public Trust",
                slug: "stakeholder-tradeoffs-policy",
                description: "Balancing shareholders, employees, local communities, consumers, and environmental stewardship.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Quantitative & Statistical Decision Making",
                slug: "quantitative-dm-caselets",
                description: "Evaluating quantitative tradeoffs using expected values, probability trees, cost-benefit matrices, and break-even thresholds.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Ability & Data Interpretation",
        slug: "qadi",
        orderIndex: 3,
        questionCount: 28,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Quantitative Ability & Data Interpretation",
            slug: "qadi-core",
            weightage: "100% of QADI (28 Questions)",
            chapters: [
              {
                name: "Advanced Commercial Arithmetic",
                slug: "arithmetic-commercial-math",
                description: "Percentages, profit-loss, compound rates, work-efficiency, speed-distance-time, relative motion.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Higher Algebra, Functions & Polynomials",
                slug: "advanced-algebra-functions",
                description: "Quadratic equations, polynomials, algebraic inequalities, sequences and series, composite functions.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Geometry, Trigonometry & Mensuration",
                slug: "geometry-trigonometry-mensuration",
                description: "Triangles, circles, cyclic quadrilaterals, heights and distances, coordinate lines, 3D volumes.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Number Properties, P&C & Probability",
                slug: "numbers-pnc-probability-xat",
                description: "Divisibility, remainders, factorials, permutations, combinations, conditional probability.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Multi-Layered Data Interpretation & Decision Caselets",
                slug: "multi-table-caselet-di",
                description: "Dense multi-table caselets, scatter and bubble graphs, radar plots, data sufficiency.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "General Knowledge",
        slug: "general-knowledge",
        orderIndex: 4,
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "General Knowledge",
            slug: "general-knowledge-xat",
            weightage: "100% of GK (25 Questions)",
            chapters: [
              {
                name: "Indian Economy, Union Budget & Monetary Policy",
                slug: "indian-economy-budget-banking",
                description: "Union budget highlights, RBI monetary policy rates, inflation metrics (CPI/WPI), fiscal deficit.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "National & International Current Affairs",
                slug: "national-international-affairs",
                description: "Global geopolitical summits (G20, BRICS), bilateral treaties, heads of state, major national developments.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Static GK: Polity, Constitution & History",
                slug: "polity-constitution-history",
                description: "Fundamental rights, constitutional articles, Indian freedom movement, world history milestones.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Science, Technology & Environment",
                slug: "science-tech-ecology",
                description: "Space missions (ISRO/NASA), clean energy transitions, climate treaties, artificial intelligence advancements.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Corporate World, Business Mergers & Leadership",
                slug: "business-mergers-leadership",
                description: "Major corporate mergers and acquisitions, Fortune 500 CEOs, prominent brand-parent corporate structures.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
    ],
  },

  snap: {
    examSlug: "snap",
    examName: "Symbiosis National Aptitude Test 2026",
    shortName: "SNAP",
    defaultTaxonomy: "OFFICIAL_SYLLABUS",
    sections: [
      {
        name: "General English",
        slug: "general-english",
        orderIndex: 1,
        questionCount: 15,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "General English",
            slug: "general-english-core",
            weightage: "15 Questions (25% of Exam)",
            chapters: [
              {
                name: "Rapid Reading Comprehension",
                slug: "rapid-reading-comprehension",
                description: "Speed reading short passages for quick detail retrieval, tone detection, and main idea extraction.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Sentence Correction & Core Grammar Rules",
                slug: "sentence-correction-grammar",
                description: "Subject-verb agreement, modifier errors, pronoun-antecedent reference, parallelism, conditional tenses.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Vocabulary: Synonyms, Antonyms & Odd Word Out",
                slug: "vocabulary-synonyms-antonyms",
                description: "High-frequency word roots, semantic nuances, direct antonyms, identifying lexical outliers.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Idioms, Proverbs & Phrasal Verbs",
                slug: "idioms-phrasal-verbs",
                description: "Common English idioms, proverb meanings, separable and inseparable phrasal verbs.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Analogies & Word Association",
                slug: "analogies-word-association",
                description: "Pairwise semantic relations: part-to-whole, degree of intensity, cause-and-effect, agent-action.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Para Jumbles & Sentence Completion",
                slug: "para-jumbles-completion-snap",
                description: "Rearranging short 4-sentence paragraphs and contextual single/double blank fills.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Analytical & Logical Reasoning",
        slug: "analytical-lr",
        orderIndex: 2,
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Analytical & Logical Reasoning",
            slug: "analytical-lr-core",
            weightage: "25 Questions (42% of Exam)",
            chapters: [
              {
                name: "Linear & Circular Seating Arrangements",
                slug: "seating-arrangements-snap",
                description: "Single-line facing North/South, circular table arrangements with directional orientation.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Blood Relations & Family Trees",
                slug: "blood-relations-snap",
                description: "Generational hierarchies, coded relations (A+B means father), maternal/paternal ties.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Direction Sense & Spatial Navigation",
                slug: "direction-sense-snap",
                description: "Cardinal and intermediate directions, shadow movements, distance between start and end coordinates.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Coding-Decoding & Letter/Number Series",
                slug: "coding-decoding-series-snap",
                description: "Letter shifts, substitution codes, alphanumeric pattern progressions, next term in series.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Clocks, Calendars & Binary Logic",
                slug: "clocks-calendars-binary-snap",
                description: "Angle between clock hands, leap year rules, day of the week determination, binary logic statements.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Syllogisms & Venn Deductions",
                slug: "syllogisms-venn-snap",
                description: "Deductive categorical logic (All, Some, No), evaluating whether conclusions logically follow.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Critical Reasoning: Statements, Assumptions & Conclusions",
                slug: "statement-assumptions-conclusions-snap",
                description: "Analyzing short arguments for implicit assumptions, deductive conclusions, and courses of action.",
                orderIndex: 7,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Analytical Puzzles & Matrix Matching",
                slug: "analytical-puzzles-snap",
                description: "Matching people to professions, cities, colors, and weekdays using grid deduction.",
                orderIndex: 8,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative, Data Interpretation & Data Sufficiency",
        slug: "quant-di-ds",
        orderIndex: 3,
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Quantitative, Data Interpretation & Data Sufficiency",
            slug: "quant-di-ds-core",
            weightage: "20 Questions (33% of Exam)",
            chapters: [
              {
                name: "Speed Arithmetic (Percentages, Profit/Loss, Ratios, Averages)",
                slug: "speed-arithmetic-snap",
                description: "Rapid mental math techniques for percentages, discounts, ratios, mixtures, and simple/compound interest.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Time & Work, Time Speed Distance",
                slug: "time-work-tsd-snap",
                description: "Efficiency calculations, pipes and cisterns, train speeds, boats and streams, circular tracks.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Algebra: Equations, Progressions & Surds",
                slug: "algebra-progressions-surds-snap",
                description: "Linear and quadratic equations, arithmetic and geometric progressions, indices rules.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Geometry & Mensuration Formulas",
                slug: "geometry-mensuration-snap",
                description: "Formula application for triangles, rectangles, circles, cylinder volumes, and cone surface areas.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Permutations, Combinations & Probability",
                slug: "pnc-probability-snap",
                description: "Basic arrangements, selections, coin tosses, dice rolls, card drawing probabilities.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Interpretation: Charts & Graphs",
                slug: "di-charts-graphs-snap",
                description: "Interpreting tables, bar graphs, and line charts with percentage increase/decrease calculations.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Sufficiency Principles",
                slug: "data-sufficiency-snap",
                description: "Determining whether Statement 1, Statement 2, or both are sufficient to solve a given mathematical problem.",
                orderIndex: 7,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
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
    defaultTaxonomy: "OFFICIAL_SYLLABUS",
    sections: [
      {
        name: "Language Skills",
        slug: "language-skills",
        orderIndex: 1,
        durationMinutes: 28,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Language Skills",
            slug: "language-skills-core",
            weightage: "36 Questions (Equal Score Weightage)",
            chapters: [
              {
                name: "Speed Reading Comprehension Passages",
                slug: "rc-speed-retrieval-nmat",
                description: "Business, technology, and general awareness passages testing direct facts and inferences under tight 28-minute timer.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Error Identification & Grammar Mechanics",
                slug: "error-identification-grammar-nmat",
                description: "Spotting grammatical errors in sentences: subject-verb agreement, prepositions, modifiers, and parallelism.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Para Jumbles & Sentence Rearrangement",
                slug: "para-jumbles-nmat",
                description: "Ordering 4 to 5 sentences into a coherent paragraph using chronological and structural indicators.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Contextual Vocabulary & Fill in the Blanks",
                slug: "contextual-vocabulary-nmat",
                description: "Single and double sentence completions assessing vocabulary in business and academic contexts.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Word Analogies & Semantic Relationships",
                slug: "analogies-word-relations-nmat",
                description: "Identifying relational equivalence between vocabulary pairs.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Skills",
        slug: "quantitative-skills",
        orderIndex: 2,
        durationMinutes: 52,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Quantitative Skills",
            slug: "quantitative-skills-core",
            weightage: "36 Questions (Equal Score Weightage)",
            chapters: [
              {
                name: "Number Properties & Divisibility",
                slug: "number-properties-nmat",
                description: "Prime factorization, divisibility rules, HCF/LCM properties, units digit.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Arithmetic: Commercial Math & Ratios",
                slug: "arithmetic-commercial-nmat",
                description: "Percentages, profit and loss, ratio and proportion, mixtures, simple/compound interest, time-work, speed-time.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Algebra: Equations & Progressions",
                slug: "algebra-equations-nmat",
                description: "Linear equations, quadratic roots, arithmetic progressions, inequalities.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Modern Math: P&C and Probability",
                slug: "modern-math-pnc-nmat",
                description: "Permutations, combinations, coin/dice/urn probability models.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Interpretation: Tables, Bar & Line Charts",
                slug: "di-tables-bar-line-nmat",
                description: "High-speed calculation sets with tables, bar graphs, and line charts.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Sufficiency Framework",
                slug: "data-sufficiency-nmat",
                description: "Evaluating sufficiency of Statement 1 vs Statement 2 without calculating final values.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        orderIndex: 3,
        durationMinutes: 40,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Logical Reasoning",
            slug: "logical-reasoning-nmat-core",
            weightage: "36 Questions (Equal Score Weightage)",
            chapters: [
              {
                name: "Deductive Logic & Categorical Syllogisms",
                slug: "deductive-logic-syllogisms-nmat",
                description: "Valid vs invalid conclusions from formal premises using Venn representation.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Critical Reasoning: Arguments, Assumptions & Inferences",
                slug: "critical-reasoning-nmat",
                description: "Short argument evaluation: assumptions, conclusions, strengthening/weakening, courses of action.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Linear, Circular & Grid Arrangements",
                slug: "arrangements-grid-nmat",
                description: "Sequential ordering, circular seating, multi-variable attribute matching.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Blood Relations, Directions & Series",
                slug: "relations-directions-series-nmat",
                description: "Family tree decoding, compass navigation, alphanumeric sequence completion.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Decision Criteria & Numerical Reasoning",
                slug: "decision-criteria-reasoning-nmat",
                description: "Eligibility criteria evaluation for candidates against documented conditions.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
    ],
  },

  cmat: {
    examSlug: "cmat",
    examName: "Common Management Admission Test 2026",
    shortName: "CMAT",
    defaultTaxonomy: "OFFICIAL_SYLLABUS",
    sections: [
      {
        name: "Quantitative Techniques & Data Interpretation",
        slug: "qt-di",
        orderIndex: 1,
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        topics: [
          {
            name: "Quantitative Techniques & Data Interpretation",
            slug: "qt-di-core",
            weightage: "20 Questions (80 Marks)",
            chapters: [
              {
                name: "Arithmetic: Percentages, Profit/Loss, SI/CI, TSD, Time-Work",
                slug: "arithmetic-cmat-qt",
                description: "Commercial arithmetic fundamentals, simple and compound interest, time-speed-distance, work and wages.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Algebra, Quadratic Equations & Progressions",
                slug: "algebra-progressions-cmat",
                description: "Linear equations, quadratic roots, arithmetic and geometric series.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Geometry, Trigonometry & Mensuration",
                slug: "geometry-mensuration-cmat",
                description: "Properties of triangles, circles, quadrilaterals, heights and distances, surface areas and volumes.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Permutations, Combinations & Probability",
                slug: "pnc-probability-cmat",
                description: "Arrangements, selections, probability of simple and compound events.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Number System, HCF & LCM",
                slug: "number-system-cmat",
                description: "Divisibility tests, prime numbers, factor properties, HCF and LCM word problems.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Interpretation: Tables, Charts & Graphs",
                slug: "di-tables-charts-cmat",
                description: "Direct computation from tables, bar charts, pie charts, and trend line graphs.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Logical Reasoning",
        slug: "lr",
        orderIndex: 2,
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        topics: [
          {
            name: "Logical Reasoning",
            slug: "lr-cmat-core",
            weightage: "20 Questions (80 Marks)",
            chapters: [
              {
                name: "Analytical Puzzles & Seating Arrangements",
                slug: "puzzles-seating-cmat",
                description: "Linear and circular seating, scheduling, ranking, floor puzzles.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Blood Relations, Direction Sense & Coding-Decoding",
                slug: "relations-directions-coding-cmat",
                description: "Family tree identification, cardinal turns, pattern substitution coding.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Number & Letter Series, Analogies & Classifications",
                slug: "series-analogies-cmat",
                description: "Alphanumeric pattern identification, odd-one-out, semantic and numerical analogies.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Syllogisms & Deductive Statements",
                slug: "syllogisms-statements-cmat",
                description: "Evaluating conclusions drawn from categorical statements.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Statement & Arguments / Assumptions / Conclusions",
                slug: "statement-arguments-assumptions-cmat",
                description: "Evaluating strong vs weak arguments, underlying assumptions, and necessary conclusions.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Language Comprehension",
        slug: "language-comprehension",
        orderIndex: 3,
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        topics: [
          {
            name: "Language Comprehension",
            slug: "language-comp-cmat-core",
            weightage: "20 Questions (80 Marks)",
            chapters: [
              {
                name: "Reading Comprehension Passages",
                slug: "reading-comprehension-cmat",
                description: "Passages with direct factual, inference, vocabulary, and main idea questions.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Sentence Correction & English Grammar",
                slug: "sentence-correction-grammar-cmat",
                description: "Spotting grammatical errors, subject-verb agreement, prepositions, tense consistency.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Vocabulary: Synonyms, Antonyms & One-Word Substitution",
                slug: "vocab-synonyms-antonyms-cmat",
                description: "Direct word synonyms, antonyms, and one-word substitutes for definitions.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Idioms, Phrases & Phrasal Verbs",
                slug: "idioms-phrases-cmat",
                description: "Standard idiomatic expressions, everyday proverbs, common phrasal verbs.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Para Jumbles & Sentence Completion",
                slug: "para-jumbles-completion-cmat",
                description: "Paragraph rearrangement and contextual sentence fill-ins.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "General Awareness",
        slug: "general-awareness",
        orderIndex: 4,
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        topics: [
          {
            name: "General Awareness",
            slug: "general-awareness-cmat-core",
            weightage: "20 Questions (80 Marks)",
            chapters: [
              {
                name: "Indian Economy, Budget & Banking Sector",
                slug: "indian-economy-budget-cmat",
                description: "Union budget allocations, RBI policies, GDP projections, banking reforms, monetary terms.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Indian Polity, Constitution & Governance",
                slug: "indian-polity-constitution-cmat",
                description: "Constitutional articles, fundamental rights, key statutory commissions, parliament procedures.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "History, Geography & Cultural Heritage",
                slug: "history-geography-cmat",
                description: "Modern Indian history, geographical landmarks, national parks, UNESCO heritage sites.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Current National & International Affairs",
                slug: "current-affairs-cmat",
                description: "Bilateral summits, international organizations (UN, G20, ASEAN), key national policies.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Science, Technology, Sports & Awards",
                slug: "science-tech-sports-cmat",
                description: "Scientific achievements, Nobel and national prizes, Olympic and cricket tournaments, tech innovations.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Innovation & Entrepreneurship",
        slug: "innovation-entrepreneurship",
        orderIndex: 5,
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        topics: [
          {
            name: "Innovation & Entrepreneurship",
            slug: "innovation-entrepreneurship-core",
            weightage: "20 Questions (80 Marks - Official Mandatory Section)",
            chapters: [
              {
                name: "Foundations of Entrepreneurship & Entrepreneurial Mindset",
                slug: "foundations-entrepreneurship",
                description: "Types of entrepreneurs (social, corporate, serial), risk-taking, opportunity recognition, intrapreneurship.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Ideation, Design Thinking & Product-Market Fit",
                slug: "ideation-design-thinking-pmf",
                description: "Empathy mapping, prototyping, validated learning, achieving product-market fit (PMF), pivoting.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Business Models, Lean Startup & MVP Development",
                slug: "business-models-lean-startup-mvp",
                description: "Business Model Canvas (BMC), Lean Canvas components, Minimum Viable Product (MVP) testing.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Startup Funding: Bootstrapping, Angels, VC & Term Sheets",
                slug: "startup-funding-vc-term-sheets",
                description: "Pre-seed, seed, Series A-D rounds, Angel networks, Venture Capital, term sheets, cap table dilution.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Intellectual Property Rights (Patents, Trademarks, Copyrights)",
                slug: "intellectual-property-rights",
                description: "IP law in India: patents (criteria & duration), trademarks, copyrights, trade secrets, geographical indications (GI).",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Government Initiatives: Startup India, Atal Innovation Mission & MSME",
                slug: "govt-initiatives-startup-india",
                description: "Startup India Action Plan, AIM, Atal Tinkering Labs, Mudra Yojana, MSME classification thresholds.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Startup Finance: Burn Rate, Runway, CAC, LTV & Unit Economics",
                slug: "startup-finance-unit-economics",
                description: "Burn rate, cash runway, Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), gross margin economics.",
                orderIndex: 7,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
    ],
  },

  mat: {
    examSlug: "mat",
    examName: "Management Aptitude Test 2026",
    shortName: "MAT",
    defaultTaxonomy: "OFFICIAL_SYLLABUS",
    sections: [
      {
        name: "Language Comprehension",
        slug: "language-comp",
        orderIndex: 1,
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Language Comprehension",
            slug: "lang-comp-mat-core",
            weightage: "30 Questions (20% of Exam)",
            chapters: [
              {
                name: "Reading Comprehension",
                slug: "rc-mat",
                description: "Short passages assessing central message, factual retrieval, and inference.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Vocabulary, Synonyms & Antonyms",
                slug: "vocab-synonyms-antonyms-mat",
                description: "Synonym and antonym identification, word substitutions, spelling corrections.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Grammar, Tenses & Sentence Correction",
                slug: "grammar-correction-mat",
                description: "Grammar rules, subject-verb agreement, modifiers, correct verb forms.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Para Jumbles & Sentence Completion",
                slug: "jumbles-completion-mat",
                description: "Coherent sequence of 4 sentences, single and double word fills.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Idioms, Phrases & Contextual Usage",
                slug: "idioms-usage-mat",
                description: "Contextual usage of idiomatic expressions and common phrases.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Intelligence and Critical Reasoning",
        slug: "intelligence-reasoning",
        orderIndex: 2,
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Intelligence & Critical Reasoning",
            slug: "icr-mat-core",
            weightage: "30 Questions (20% of Exam)",
            chapters: [
              {
                name: "Analogies, Series & Coding-Decoding",
                slug: "analogies-series-coding-mat",
                description: "Letter/number sequence continuation, symbol substitution, relational analogies.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Blood Relations & Direction Traversal",
                slug: "blood-relations-directions-mat",
                description: "Maternal/paternal relations, compass turns, distance travelled from origin.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Linear & Circular Seating Arrangements",
                slug: "seating-arrangements-mat",
                description: "Arranging people in lines and around tables with fixed constraints.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Syllogisms & Venn Logic",
                slug: "syllogisms-venn-mat",
                description: "Categorical deductive logic and Euler/Venn diagram representation.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Statement & Conclusions / Assumptions / Course of Action",
                slug: "statements-course-action-mat",
                description: "Determining whether assumptions are implicit, conclusions follow, or actions are valid.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Critical Reasoning & Data Sufficiency Logic",
                slug: "critical-reasoning-ds-mat",
                description: "Short logical arguments and evaluation of analytical conditions.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Mathematical Skills",
        slug: "mathematical-skills",
        orderIndex: 3,
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Mathematical Skills",
            slug: "math-skills-mat-core",
            weightage: "30 Questions (20% of Exam)",
            chapters: [
              {
                name: "Percentages, Profit & Loss, Interest",
                slug: "percentages-profit-loss-interest-mat",
                description: "Basic arithmetic calculations: percentages, marked price, discount, simple and compound interest.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Ratio, Proportion, Mixtures & Alligations",
                slug: "ratio-mixtures-alligations-mat",
                description: "Proportions, mixtures, replacement rules, average weighted mixtures.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Time & Work, Time Speed & Distance",
                slug: "time-work-tsd-mat",
                description: "Work efficiency, pipes and cisterns, average speed, train crossings, boats and streams.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Number System, HCF & LCM",
                slug: "number-system-hcf-lcm-mat",
                description: "Divisibility, prime factorization, highest common factor, least common multiple.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Elementary Algebra & Equations",
                slug: "elementary-algebra-mat",
                description: "Linear simultaneous equations, quadratic expressions, simple progressions.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Geometry, Mensuration & Trigonometry",
                slug: "geometry-mensuration-mat",
                description: "Plane figures, triangle formulas, circle geometry, volume and surface area calculations.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Data Analysis and Sufficiency",
        slug: "data-analysis-sufficiency",
        orderIndex: 4,
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Data Analysis & Sufficiency",
            slug: "data-analysis-sufficiency-mat-core",
            weightage: "30 Questions (20% of Exam)",
            chapters: [
              {
                name: "Tables & Tabular Comparisons",
                slug: "tables-tabular-mat",
                description: "Evaluating tabular information, percentage share comparisons, sum ratios.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Bar Charts, Line Graphs & Trends",
                slug: "bar-line-graphs-mat",
                description: "Interpreting historical trends, comparative bars, annual growth rates.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Pie Charts & Proportions",
                slug: "pie-charts-mat",
                description: "Sector proportions, degrees to percentage conversion, multi-sector shares.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Sufficiency (Arithmetic & Algebra)",
                slug: "data-sufficiency-mat",
                description: "Checking whether Statement 1 or Statement 2 independently answers the question.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Caselets & Unstructured Data Analysis",
                slug: "caselets-unstructured-mat",
                description: "Extracting tabular data from narrative paragraphs to solve questions.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Economic & Business Environment",
        slug: "economic-business-env",
        orderIndex: 5,
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        topics: [
          {
            name: "Economic & Business Environment",
            slug: "indian-global-env-mat-core",
            weightage: "30 Questions (20% of Exam)",
            chapters: [
              {
                name: "Indian Economy, Union Budget & Monetary Policy",
                slug: "indian-economy-monetary-policy-mat",
                description: "Key economic indicators, Union Budget announcements, RBI policy repo rates, taxation.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Banking, Capital Markets & Financial Institutions",
                slug: "banking-capital-markets-mat",
                description: "SEBI regulations, stock exchanges (BSE/NSE), mutual funds, public and private sector banks.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Corporate India, Top Conglomerates & Business Leaders",
                slug: "corporate-india-business-leaders-mat",
                description: "Prominent Indian business houses, corporate CEOs, brand acquisitions, industry milestones.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "International Economic Organizations (IMF, World Bank, WTO, G20)",
                slug: "international-organizations-mat",
                description: "Headquarters, leadership, and global roles of multilateral trade and financial institutions.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Current Affairs, National Policies & Global Trade",
                slug: "current-affairs-global-trade-mat",
                description: "Important national initiatives, bilateral trade pacts, global supply chains, economic summits.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
    ],
  },

  "mah-cet": {
    examSlug: "mah-cet",
    examName: "MAH MBA/MMS CET 2026",
    shortName: "MAH CET",
    defaultTaxonomy: "OFFICIAL_SYLLABUS",
    sections: [
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        orderIndex: 1,
        questionCount: 75,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Logical Reasoning",
            slug: "lr-mah-cet-core",
            weightage: "75 Questions (37.5% of Exam)",
            chapters: [
              {
                name: "Complex Seating Arrangements (Multi-Row, Circular with Attributes)",
                slug: "complex-seating-mah-cet",
                description: "Dual-row parallel seating, concentric circle arrangements, seating combined with attributes (colors, cities, cars).",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Floor Puzzles, Scheduling & Sequential Ordering",
                slug: "floor-puzzles-scheduling-mah-cet",
                description: "Multi-floor building puzzles, day/month/year schedule sequencing, box stacking constraints.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Blood Relations & Coded Family Trees",
                slug: "blood-relations-coded-mah-cet",
                description: "Multi-generation family trees, coded relations ($A * B$ means $A$ is sister of $B$).",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Direction Sense & Path Optimization",
                slug: "direction-sense-mah-cet",
                description: "Complex multi-turn navigation, Pythagoras distance between points, shadow positions at sunrise/sunset.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Syllogisms (Reverse & Conditional Syllogisms)",
                slug: "syllogisms-reverse-mah-cet",
                description: "Categorical syllogisms, 'only a few' conditions, reverse syllogisms (finding premises from conclusion).",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Coding-Decoding, Input-Output Machine Rearrangement",
                slug: "coding-machine-rearrangement-mah-cet",
                description: "Step-by-step alphanumeric machine rearrangement shifting words/numbers in ascending/alphabetical order.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Critical Reasoning: Course of Action, Strong/Weak Arguments",
                slug: "critical-reasoning-arguments-mah-cet",
                description: "Evaluating strong vs weak arguments, feasible courses of action, cause-and-effect relations.",
                orderIndex: 7,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Abstract Reasoning",
        slug: "abstract-reasoning",
        orderIndex: 2,
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Abstract Reasoning",
            slug: "abstract-reasoning-mah-cet-core",
            weightage: "25 Questions (Unique Visual Section)",
            chapters: [
              {
                name: "Figure Series Completion & Step Increments",
                slug: "figure-series-completion",
                description: "Determining the next figure in a sequence based on clockwise/counter-clockwise rotation and symbol addition.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Visual Analogies & Transformation Rules",
                slug: "visual-analogies-transformations",
                description: "Identifying visual rule changes between Figure A -> Figure B, and applying them to Figure C -> Figure D.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Odd Figure Out & Rotational Invariance",
                slug: "odd-figure-out-rotations",
                description: "Spotting the geometric outlier that cannot be obtained by pure planar rotation of the other figures.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Mirror & Water Reflections of Composite Shapes",
                slug: "mirror-water-reflections",
                description: "Lateral and vertical reflections of asymmetric symbols and geometric shapes.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Figure Matrices & Embedded Pattern Detection",
                slug: "figure-matrices-embedded-patterns",
                description: "3x3 figure matrices with row/column transformation rules, identifying hidden embedded shapes.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Paper Folding, Punching & Visual Sequence Unfolding",
                slug: "paper-folding-punching",
                description: "Predicting symmetric punched holes when transparent or folded paper sheets are unfolded.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "quantitative-aptitude",
        orderIndex: 3,
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Quantitative Aptitude",
            slug: "qa-mah-cet-core",
            weightage: "50 Questions (25% of Exam)",
            chapters: [
              {
                name: "Speed Math, Approximations & Number Series",
                slug: "speed-math-approximations-mah-cet",
                description: "Rapid mental calculation, Vedic math shortcuts, simplifying complex approximations, finding missing/wrong numbers in series.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Arithmetic: Percentages, Profit/Loss, Ratios, Averages",
                slug: "arithmetic-commercial-mah-cet",
                description: "Percentages, discounts, partnerships, mixtures and alligations, simple and compound interest.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Time & Work, Time Speed Distance",
                slug: "time-work-tsd-mah-cet",
                description: "Work efficiency, wages, pipes and cisterns, train speeds, boats and streams, circular tracks.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Algebra & Quadratic Equation Comparison (x vs y)",
                slug: "quadratic-comparisons-mah-cet",
                description: "Solving two quadratic equations simultaneously and establishing mathematical inequalities between roots (x > y, x < y, x = y).",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Mensuration & Geometry Calculations",
                slug: "mensuration-geometry-mah-cet",
                description: "Areas and perimeters of plane figures, surface areas and volumes of 3D solids.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Data Interpretation: Tabular, Bar, Line & Radar Sets",
                slug: "data-interpretation-mah-cet",
                description: "Speed calculation across multiple DI sets: tables, bar graphs, pie charts, and radar charts.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
      {
        name: "Verbal Ability / Reading Comprehension",
        slug: "verbal-ability-rc",
        orderIndex: 4,
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Verbal Ability & Reading Comprehension",
            slug: "varc-mah-cet-core",
            weightage: "50 Questions (25% of Exam)",
            chapters: [
              {
                name: "Speed Reading Comprehension Passages",
                slug: "speed-rc-mah-cet",
                description: "Business and social passages with direct factual questions and rapid inferences.",
                orderIndex: 1,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Error Spotting & Grammar Rules",
                slug: "error-spotting-grammar-mah-cet",
                description: "Spotting grammatical errors in five-part divided sentences.",
                orderIndex: 2,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Sentence Improvement & Phrase Replacement",
                slug: "sentence-improvement-mah-cet",
                description: "Selecting correct grammatical phrases to replace underlined sentence parts.",
                orderIndex: 3,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Para Jumbles & Coherent Paragraph Ordering",
                slug: "para-jumbles-mah-cet",
                description: "Rearranging six sentences and identifying first, third, and final sentences.",
                orderIndex: 4,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Cloze Test & Double Fillers",
                slug: "cloze-test-double-fillers-mah-cet",
                description: "Filling blanks in continuous paragraphs testing contextual vocabulary and grammar.",
                orderIndex: 5,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
              {
                name: "Vocabulary: Synonyms, Antonyms & Idioms",
                slug: "vocabulary-synonyms-antonyms-mah-cet",
                description: "Direct lexical synonyms, antonyms, idioms, and contextual phrases.",
                orderIndex: 6,
                taxonomyType: "OFFICIAL_SYLLABUS",
              },
            ],
          },
        ],
      },
    ],
  },

  gmat: {
    examSlug: "gmat",
    examName: "Graduate Management Admission Test 2026",
    shortName: "GMAT",
    defaultTaxonomy: "RECOMMENDED_PREPARATION_TAXONOMY",
    sections: [
      {
        name: "Quantitative Reasoning",
        slug: "quantitative-reasoning",
        orderIndex: 1,
        durationMinutes: 45,
        questionCount: 21,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Problem Solving: Arithmetic",
            slug: "gmat-quant-arithmetic",
            weightage: "Problem Solving (Arithmetic Core)",
            chapters: [
              {
                name: "Percentages, Fractions, Decimals & Rate Problems",
                slug: "gmat-percentages-fractions-rates",
                description: "Base percent calculations, compound percent changes, fraction operations, unit rates.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Ratio, Proportion & Work/Speed Rates",
                slug: "gmat-ratio-rates-motion",
                description: "Direct and inverse proportions, work rate equations (1/t), relative velocity and meeting times.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Statistics: Mean, Median, Mode, Standard Deviation & Weighted Averages",
                slug: "gmat-statistics-distributions",
                description: "Properties of arithmetic mean, median in even/odd sets, standard deviation spread, weighted average mixtures.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Number Properties: Divisibility, Prime Factors & Remainders",
                slug: "gmat-number-properties-primes",
                description: "Even/odd integer properties, prime factorization, greatest common divisor, least common multiple, remainder patterns.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Integer Constraints & Sets",
                slug: "gmat-integers-sets-venn",
                description: "Consecutive integers, positive/negative product rules, set operations, 2-set Venn calculations.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Problem Solving: Algebra",
            slug: "gmat-quant-algebra",
            weightage: "Problem Solving (Algebra Core)",
            chapters: [
              {
                name: "Linear & Simultaneous Equations",
                slug: "gmat-linear-simultaneous-equations",
                description: "Solving systems of equations, substitution vs elimination, equations with fractional terms.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Quadratic Equations & Factoring",
                slug: "gmat-quadratic-factoring",
                description: "Factoring quadratics, difference of squares, FOIL expansions, evaluating root signs.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Inequalities, Absolute Value & Intervals",
                slug: "gmat-inequalities-absolute-value",
                description: "Multiplying/dividing by negative terms, absolute value distance interpretations on number lines.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Exponents, Roots, Surds & Scientific Notation",
                slug: "gmat-exponents-roots-surds",
                description: "Laws of exponents, negative and fractional exponents, square roots, radical simplification.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Functions, Sequences & Step Progressions",
                slug: "gmat-functions-sequences",
                description: "Custom defined function symbols, sequence recurrence formulas (A_n = A_{n-1} + d).",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Permutations, Combinations & Probability",
                slug: "gmat-pnc-probability",
                description: "Fundamental counting rule, combinations formula, independent probability, 'at least one' complement rule.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "Verbal Reasoning",
        slug: "verbal-reasoning",
        orderIndex: 2,
        durationMinutes: 45,
        questionCount: 23,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Critical Reasoning",
            slug: "gmat-critical-reasoning",
            weightage: "Core Verbal (Approx. 10-12 Questions)",
            chapters: [
              {
                name: "Argument Deconstruction & Underlying Assumptions",
                slug: "gmat-assumptions-premise",
                description: "Isolating conclusion from premises, applying the Negation Technique to identify necessary assumptions.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Weaken the Argument",
                slug: "gmat-weaken-argument",
                description: "Identifying new information that attacks the unstated logical gap or presents an alternative cause.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Strengthen the Argument",
                slug: "gmat-strengthen-argument",
                description: "Validating the underlying assumption, ruling out alternative causes, showing cause and effect hold.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Inferences, Must-Be-True & Logical Conclusions",
                slug: "gmat-inferences-conclusions",
                description: "Deriving claims that must strictly be true based solely on the provided argument premises without extrapolation.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Method of Reasoning & Boldface Argument Roles",
                slug: "gmat-method-reasoning-boldface",
                description: "Identifying the logical role played by boldfaced sentences (premise, counter-claim, conclusion, consideration).",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Evaluate the Argument, Paradoxes & Flaws",
                slug: "gmat-evaluate-paradox-flaw",
                description: "Identifying questions that test argument validity, resolving apparent discrepancies, naming reasoning flaws.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
          {
            name: "Reading Comprehension",
            slug: "gmat-reading-comprehension",
            weightage: "Core Verbal (Approx. 11-13 Questions across 3-4 Passages)",
            chapters: [
              {
                name: "Main Idea & Primary Purpose Analysis",
                slug: "gmat-rc-main-idea",
                description: "Synthesizing the overall purpose of the passage without getting bogged down in specific technical details.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Supporting Details & Precise Retrieval",
                slug: "gmat-rc-supporting-details",
                description: "Locating and verifying specific facts directly stated in the text, avoiding attractive distortions.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Author's Tone, Attitude & Perspective",
                slug: "gmat-rc-authors-tone",
                description: "Inferring the author's stance toward cited research or competing theories (critical, qualified endorsement, objective).",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Logical Structure & Paragraph Interrelationships",
                slug: "gmat-rc-logical-structure",
                description: "Analyzing the transition between paragraphs: introducing a model, offering critique, proposing reconciliation.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Application & Situational Analogies",
                slug: "gmat-rc-application-analogies",
                description: "Applying principles articulated in the passage to novel external situations and hypothetical scenarios.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
      {
        name: "Data Insights",
        slug: "data-insights",
        orderIndex: 3,
        durationMinutes: 45,
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        topics: [
          {
            name: "Data Insights & Reasoning",
            slug: "gmat-data-insights-core",
            weightage: "Core DI (20 Questions - Integrated Reasoning & DS)",
            chapters: [
              {
                name: "Data Sufficiency: Pure Quantitative Analysis",
                slug: "gmat-data-sufficiency-quant",
                description: "Evaluating whether Statement (1) and Statement (2) independently or together answer numeric and algebraic questions.",
                orderIndex: 1,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Data Sufficiency: Real-World Business & Value Sufficiency",
                slug: "gmat-data-sufficiency-business",
                description: "Determining whether business word problems have unique solutions based on stated constraints.",
                orderIndex: 2,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Multi-Source Reasoning: Tabbed Synthesis & Discrepancies",
                slug: "gmat-multi-source-reasoning",
                description: "Synthesizing information across 2 to 3 tabs containing emails, policy briefs, and statistical summaries.",
                orderIndex: 3,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Table Analysis: Sortable Spreadsheets & Statistical Validation",
                slug: "gmat-table-analysis",
                description: "Interactively sorting multi-column tables to calculate medians, proportions, correlations, and verify hypotheses.",
                orderIndex: 4,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Graphics Interpretation: Scatter, Trend Lines, Bar & Bubble Charts",
                slug: "gmat-graphics-interpretation",
                description: "Interpreting visual charts and selecting optimal dropdown completions describing relationships and statistics.",
                orderIndex: 5,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
              {
                name: "Two-Part Analysis: Dual-Column Simultaneous Optimization",
                slug: "gmat-two-part-analysis",
                description: "Solving dual-variable interrelated problems across quantitative formulas, logic games, and trade-off decisions.",
                orderIndex: 6,
                taxonomyType: "RECOMMENDED_PREPARATION_TAXONOMY",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Returns canonical taxonomy info for an exam slug
 */
export function getCanonicalExamData(examSlug: string): CanonicalExamChaptersData | undefined {
  return CANONICAL_EXAM_TAXONOMY[examSlug.toLowerCase()];
}

/**
 * Returns all chapters for a given exam
 */
export function getAllChaptersForExam(examSlug: string): Array<
  CanonicalChapterDefinition & {
    sectionName: string;
    sectionSlug: string;
    topicName: string;
    topicSlug: string;
  }
> {
  const exam = getCanonicalExamData(examSlug);
  if (!exam) return [];

  const chaptersList: Array<
    CanonicalChapterDefinition & {
      sectionName: string;
      sectionSlug: string;
      topicName: string;
      topicSlug: string;
    }
  > = [];

  for (const section of exam.sections) {
    for (const topic of section.topics) {
      for (const chapter of topic.chapters) {
        chaptersList.push({
          ...chapter,
          sectionName: section.name,
          sectionSlug: section.slug,
          topicName: topic.name,
          topicSlug: topic.slug,
        });
      }
    }
  }

  return chaptersList;
}

/**
 * Returns summary counts of official vs recommended taxonomy chapters across all exams
 */
export function getTaxonomyStatistics() {
  let officialCount = 0;
  let recommendedCount = 0;
  let totalExams = 0;
  let totalSections = 0;
  let totalTopics = 0;
  let totalChapters = 0;

  for (const exam of Object.values(CANONICAL_EXAM_TAXONOMY)) {
    totalExams++;
    for (const section of exam.sections) {
      totalSections++;
      for (const topic of section.topics) {
        totalTopics++;
        for (const chapter of topic.chapters) {
          totalChapters++;
          if (chapter.taxonomyType === "OFFICIAL_SYLLABUS") {
            officialCount++;
          } else {
            recommendedCount++;
          }
        }
      }
    }
  }

  return {
    totalExams,
    totalSections,
    totalTopics,
    totalChapters,
    officialCount,
    recommendedCount,
  };
}
