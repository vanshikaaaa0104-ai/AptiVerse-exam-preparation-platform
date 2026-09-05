# AptiVerse Unified Topic Taxonomy & Canonical Knowledge Graph

## 1. Knowledge Graph Architecture

Rather than creating duplicate question banks and siloed syllabi for each exam, AptiVerse implements a **Canonical Knowledge Graph**. 

```
Canonical Knowledge Graph
  ├── QA (Quantitative Aptitude)
  │     ├── Arithmetic
  │     │     ├── Percentages ───► [CAT QA] / [XAT QA-DI] / [SNAP Quant] / [NMAT Quant] / [CMAT QT-DI] / [MAT Math] / [MAH CET QA]
  │     │     ├── Profit & Loss
  │     │     ├── Simple & Compound Interest
  │     │     ├── Ratio, Proportion & Variation
  │     │     ├── Averages, Mixtures & Alligation
  │     │     ├── Time & Work, Pipes & Cisterns
  │     │     └── Time, Speed & Distance, Races, Boats & Streams
  │     ├── Algebra
  │     ├── Number System
  │     ├── Geometry & Mensuration
  │     └── Modern Mathematics
  ├── DILR (Data Interpretation & Logical Reasoning)
  ├── VARC (Verbal Ability & Reading Comprehension)
  └── Exam-Specific Extensions (XAT Decision Making, CMAT Innovation & Entrepreneurship, MAT Economy, MAH CET Abstract Reasoning, General Awareness)
```

---

## 2. Core Quantitative Aptitude Taxonomy

### 2.1 Number System
- **Natural Numbers, Integers, Rational & Real Numbers**: Properties, closure, classification.
- **Divisibility Rules & Remainders**: Standard rules (2 through 19), Euler's Totient theorem, Wilson's theorem, Fermat's Little Theorem, Chinese Remainder Theorem basics.
- **Factors & Multiples**: Number of factors, sum of factors, product of factors, even/odd factors, prime factorization.
- **HCF & LCM**: Fundamental theorem of arithmetic, highest common factor models, least common multiple word problems, decimal & fraction HCF/LCM.
- **Prime Numbers & Factorials**: Prime checks, prime distribution, highest power of a prime dividing $n!$ (Legendre's formula), trailing zeroes.
- **Unit Digit & Last Two Digits**: Cyclicity patterns (power cycles mod 10), binomial expansions for last two digits.
- **Base Systems**: Base conversion, operations in non-decimal bases, divisibility in base $b$.

### 2.2 Arithmetic
- **Percentages**: Base changes, successive percentage changes, percentage point differences, expenditure-consumption-price models.
- **Profit, Loss & Discount**: Cost price, selling price, marked price, successive discounts, faulty balances, dishoneest merchant problems, free items schemes.
- **Simple & Compound Interest**: Flat vs compounding, nominal vs effective rate of interest, compounding half-yearly/quarterly, equal annual installments (EMIs).
- **Ratio, Proportion & Partnership**: Compound ratio, mean and third proportional, direct and inverse variation, capital-time investment ratios, sleeping/working partner profit sharing.
- **Averages & Weighted Averages**: Arithmetic mean, deviation method, changes in average upon addition/removal of observations.
- **Mixtures & Alligation**: Replacement formulas ($c_n = c_0 (1 - x/v)^n$), alligation cross-rule, multi-stage dilutions.
- **Time & Work**: Man-days equivalence, individual efficiency, alternating days work, wages distribution, negative work (destructive workers).
- **Pipes & Cisterns**: Filling and emptying pipes, capacity calculations, leakages, alternating cycle valve timings.
- **Time, Speed & Distance (TSD)**: Average speed, constant distance/time relations, relative speed, meeting points.
- **Boats & Streams**: Upstream and downstream speed, round-trip travel times, stream velocity changes.
- **Races & Circular Motion**: Linear races (headstarts, beat margins), circular tracks (first meeting at starting point, distinct meeting points).

### 2.3 Algebra
- **Linear Equations**: Single and simultaneous equations, consistency conditions (unique, infinite, no solution), integral solutions (linear Diophantine equations).
- **Quadratic Equations**: Roots and coefficients relations ($\alpha + \beta, \alpha\beta$), nature of roots (discriminant $\Delta$), sign of quadratic expressions, common roots.
- **Polynomials & Higher Degree Equations**: Remainder and Factor theorems, Vieta's formulas for cubic and quartic equations.
- **Inequalities**: Linear inequalities, quadratic inequalities, wavy curve method (method of intervals), AM-GM inequality, Cauchy-Schwarz inequality.
- **Functions & Graphs**: Domain and range, composite functions $f(g(x))$, even/odd functions, periodic functions, transformations of graphs, inverse functions.
- **Sequences & Series**:
  - Arithmetic Progression (AP): $n^{\text{th}}$ term, sum of $n$ terms, arithmetic mean.
  - Geometric Progression (GP): $n^{\text{th}}$ term, sum of $n$ terms, infinite GP sum.
  - Arithmetico-Geometric Progression (AGP), Harmonic Progression (HP), special series ($\sum n, \sum n^2, \sum n^3$).
- **Logarithms, Indices & Surds**: Laws of indices, fundamental log properties, change of base rule, logarithmic inequalities, rationalization of surds.
- **Maxima & Minima**: Algebraic optimization, quadratic vertex, calculus-free bounds.

### 2.4 Geometry & Mensuration
- **Lines & Angles**: Parallel lines, transversals, alternate/corresponding angles.
- **Triangles**:
  - Properties: Angle sum, exterior angle theorem, triangle inequality.
  - Centers: Incenter, circumcenter, orthocenter, centroid, Euler line.
  - Congruence & Similarity: SAS, SSS, ASA, RHS criteria, ratio of areas in similar triangles.
  - Theorems: Pythagoras, Apollonius, Stewart's, Angle Bisector theorem, Ceva's and Menelaus' theorems.
- **Quadrilaterals & Polygons**: Parallelograms, rectangles, rhombuses, squares, trapezoids, cyclic quadrilaterals (Ptolemy's theorem, Brahmagupta's formula), interior/exterior angle formulas for $n$-sided regular polygons.
- **Circles**: Tangents, secants, chord properties, intersecting chord theorem, alternate segment theorem, common tangents (direct and transverse).
- **Coordinate Geometry**: Distance formula, section formula, slopes, equations of lines, distance from a point to a line, circles in Cartesian plane.
- **Mensuration 2D & 3D**: Areas and perimeters of plane figures; Surface areas and volumes of prisms, cylinders, pyramids, cones, spheres, hemispheres, frustums.

### 2.5 Modern Mathematics
- **Set Theory & Venn Diagrams**: Set operations (union, intersection, difference, complement), 2-set and 3-set Venn diagrams, principle of inclusion-exclusion.
- **Permutations & Combinations (P&C)**: Fundamental principle of counting, permutations with/without repetition, circular permutations, combinations, selection with constraints, partition of objects (derangements, stars and bars / multinomial distribution).
- **Probability**: Classical probability, addition and multiplication rules, conditional probability $P(A|B)$, Bayes' theorem, odds in favor/against, geometric probability.

---

## 3. Data Interpretation & Logical Reasoning (DILR)

### 3.1 Data Interpretation (DI)
- **Tables & Calculation Sets**: Tabular data, missing value tables, multidimensional tabular comparisons.
- **Bar Charts**: Single, stacked, grouped, and bidirectional bar graphs.
- **Line Graphs & Trends**: Multi-series time plots, growth and decline rates, compounded annual growth rates (CAGR).
- **Pie Charts**: Single pie charts, dual pie charts with interrelated percentages, degrees to percentages conversion.
- **Mixed & Radar Charts**: Combinations (e.g. Bar + Line, Pie + Table, Radar/Spider webs, Scatter plots).
- **Caselets**: Unstructured paragraph-based data, conversion to tables/equations.
- **Data Sufficiency (DS)**: Statement 1 alone, Statement 2 alone, both together, or neither.

### 3.2 Logical Reasoning (LR)
- **Arrangements**:
  - Linear Arrangements (Single and multi-row, facing North/South).
  - Circular & Polygonal Arrangements (Facing center, facing outwards, alternate facing).
  - Matrix / Grid Arrangements (Matching attributes like person, profession, city, car).
- **Grouping, Selection & Distribution**: Team selection with conditional constraints, distributing items under capacity bounds.
- **Scheduling & Ordering**: Days of the week, time slot allocation, sequence optimization.
- **Binary Logic**: Truth-tellers, Liars, and Alternators (Two-truth/one-lie scenarios).
- **Games & Tournaments**: Knockout tournaments, Round-Robin leagues, seeding mechanisms, table standings deduction, points tally constraints.
- **Routes & Networks**: Directed graphs, shortest paths, traffic flow conservation, maximum capacity pipelines.
- **Set-Based Reasoning (Advanced Venn Diagrams)**: 4-set Venn diagrams, maximization and minimization of overlapping regions.
- **Constraint-Based Puzzles**: Sudoku-like grids, balance scale weighing puzzles, cryptarithmetic (alphametic puzzles).

---

## 4. Verbal Ability & Reading Comprehension (VARC)

### 4.1 Reading Comprehension (RC)
- **Core Question Types**:
  - Main Idea & Primary Purpose
  - Central Argument & Structural Flow
  - Author's Tone, Attitude & Style
  - Direct & Indirect Inferences
  - Logical Conclusions & Extrapolations
  - Fact vs. Opinion / True vs. False based on passage
  - Critical Reasoning inside RC: Strengthen, Weaken, Underlying Assumption
  - Parallel Application & Situational Analogies
  - Paragraph Function & Author's Rhetorical Devices
  - Contextual Vocabulary & Figurative Meaning
- **Diverse Passage Domains**:
  - Philosophy & Ethics
  - Evolutionary Biology & Natural Sciences
  - Artificial Intelligence, Technology & Society
  - Macroeconomics, Markets & Development
  - World History & Political Thought
  - Sociology, Anthropology & Cultural Studies
  - Classical Literature & Art Criticism
  - Cognitive Psychology & Behavioral Science
  - Environmental Ecology & Climate Policy

### 4.2 Verbal Ability (VA)
- **Para Jumbles (Sentence Rearrangement)**: Coherence, mandatory pairs, chronological flow, pronoun antecedent references (both MCQ and TITA).
- **Para Summary**: Distilling core thesis, avoiding over-generalization, identifying distorted summaries.
- **Odd Sentence Out**: Identifying sentences that deviate from the paragraph’s underlying central narrative.
- **Para Completion / Sentence Insertion**: Choosing the most logical concluding or missing transitional sentence.
- **Grammar & Sentence Correction (SNAP/NMAT/CMAT/MAH CET)**: Subject-verb agreement, modifier placement, parallelism, idioms, tense consistency.
- **Vocabulary & Word Power (SNAP/NMAT/CMAT/MAT)**: Synonyms, antonyms, analogies, contextual fill in the blanks, phrasal verbs, foreign phrases.

---

## 5. Exam-Specific Subject Taxonomies

### 5.1 XAT: Decision Making & General Knowledge
- **Decision Making (DM)**:
  - **Ethical Dilemmas**: Whistleblowing, corporate governance, insider conflicts, compliance vs empathy.
  - **Business Strategy Cases**: Capacity expansion, pricing wars, marketing campaign tradeoffs, supply chain crises.
  - **Human Resource & Stakeholder Cases**: Employee appraisals, conflict resolution, union negotiations, team restructuring.
  - **Data-Driven Decision Making**: Mathematical and statistical caselets requiring quantitative decision evaluation.
- **General Knowledge (GK)**:
  - Static GK: Indian Polity, Constitution, World Geography, History, Science, Awards, Books & Authors.
  - Current Affairs: Date-versioned news from Economy, National/International Affairs, Summits, Sports, Bilateral MoUs.

### 5.2 CMAT: Innovation & Entrepreneurship
- **Foundations of Entrepreneurship**: Types of entrepreneurs, entrepreneurial mindset, ideation, opportunity recognition.
- **Business Models & Lean Startup**: Lean Canvas, Minimum Viable Product (MVP), product-market fit, pivoting strategies.
- **Startups & Funding Ecosystem**: Bootstrapping, Angel Investors, Venture Capital, Seed/Series funding rounds, Term sheets, Cap tables, Valuations.
- **Intellectual Property (IP)**: Patents, trademarks, copyrights, trade secrets, GI tags in India.
- **Government Initiatives & Schemes**: Startup India, Standup India, Atal Innovation Mission (AIM), Mudra Yojana, MSME classifications.
- **Business Terminology & Management Basics**: Burn rate, runway, CAC, LTV, EBITDA, Porter's Five Forces, SWOT, PESTLE.

### 5.3 MAT: Economic & Business Environment
- **Indian Economy & Fiscal Policy**: Union Budget, Fiscal Deficit, Monetary Policy (Repo, Reverse Repo, CRR, SLR), Inflation indices (CPI, WPI).
- **Banking, Finance & Capital Markets**: RBI regulations, SEBI, stock exchanges (BSE, NSE), mutual funds, IPOs, bond yields, NBFCs.
- **Corporate India & Global Conglomerates**: Mergers and acquisitions, CEOs and board chairpersons, brand-parent company mappings.
- **International Organizations**: IMF, World Bank, WTO, ADB, WEF, BRICS, G20.
- **Economic Terminology**: GDP, GNP, Balance of Payments, Foreign Direct Investment (FDI), Forex reserves.

### 5.4 MAH MBA CET: Abstract / Visual Reasoning
- **Figure Series Completion**: Sequential rotation (clockwise/counter-clockwise), step increments, alternate symbol inversions.
- **Pattern Completion & Analogy**: Figure A $\rightarrow$ Figure B is equivalent to Figure C $\rightarrow$ ?.
- **Classification & Odd Figure Out**: Geometric invariance, line segment count differences, rotational symmetry violations.
- **Mirror Images & Water Images**: Lateral and vertical reflections of composite figures.
- **Figure Matrix & Embedded Figures**: $3 \times 3$ symbol grids with row/column pattern transformation rules; finding embedded hidden shapes.
- **Paper Folding, Punching & Visual Sequences**: Unfolding symmetry predictions, transparent sheet overlapping patterns.

### 5.5 GMAT: Data Insights & Reasoning Taxonomy
*Labeled: Recommended Preparation Taxonomy (Derived from GMAC Published Exam Specifications & Past Trends)*
- **Data Insights (DI)**:
  - **Data Sufficiency (DS)**: Pure math and real-world scenarios requiring evaluation of Statement (1) and Statement (2) sufficiency without calculating exact values.
  - **Multi-Source Reasoning (MSR)**: Tabbed sources (emails, articles, data sheets) testing synthesis, discrepancy detection, and multi-step inference.
  - **Table Analysis**: Interactive sorting of spreadsheets, calculating medians, proportions, correlations, and checking conditional hypotheses.
  - **Graphics Interpretation**: Scatter plots, x/y trend lines, bar charts, bubble plots with fill-in-the-blank dropdown inference statements.
  - **Two-Part Analysis**: Dual-column answer grids requiring simultaneous solution of two related variables, trade-off optimization, or logic puzzles.
- **Quantitative Reasoning (QR)**:
  - Exclusively Problem Solving (PS) across Arithmetic and Algebra.
  - Geometry is strictly excluded per GMAC 2024+ format.
- **Verbal Reasoning (VR)**:
  - Critical Reasoning (CR): Assumptions, Weaken/Strengthen, Inference, Method of Reasoning, Flaw in the Argument, Evaluate the Argument.
  - Reading Comprehension (RC): Main Idea, Supporting Ideas, Inferences, Tone, Style, Logical Structure.
  - Sentence Correction is strictly excluded per GMAC 2024+ format.

---

## 6. Cross-Exam Unified Mapping Matrix

| Subject / Domain Area | CAT | XAT | SNAP | NMAT | CMAT | MAT | MAH CET | GMAT |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Arithmetic** | High | High | High | High | High | High | High | **High** |
| **Algebra** | High | Medium | Medium | Medium | Medium | Medium | Medium | **High** |
| **Geometry & Mensuration** | High | Medium | Medium | Low | Medium | Medium | Medium | — *(Excluded)* |
| **Number System** | Medium | Medium | Low | Low | Medium | Medium | Low | **High** |
| **Modern Math (P&C / Prob)** | Medium | High | High | High | Medium | Medium | Medium | **Medium** |
| **Data Interpretation** | High | High | Medium | High | High | High | High | **High (DI)** |
| **Analytical & Logical Reasoning**| High | High | High | High | High | High | High | **High (MSR/CR)** |
| **Reading Comprehension** | High | High | Low | High | Medium | High | High | **High** |
| **Verbal Ability / Grammar** | High (VA) | High (VA) | High (Grammar) | High (Vocab/Grammar) | High (Vocab) | High (Vocab) | High (Grammar) | — *(SC Excluded)* |
| **Critical Reasoning** | Medium | High | Low | Medium | Low | Medium | Low | **Core** |
| **Data Insights (DS/MSR/Charts)** | — | — | — | — | — | — | — | **Core** |
| **Decision Making** | — | **Core** | — | — | — | — | — | — |
| **Innovation & Entrepreneurship** | — | — | — | — | **Core** | — | — | — |
| **Economic & Business Env.** | — | — | — | — | — | **Core** | — | — |
| **Abstract / Visual Reasoning** | — | — | — | — | — | — | **Core** | — |
| **General Awareness / GK** | — | Part 2 | — | — | **Core** | — | — | — |
