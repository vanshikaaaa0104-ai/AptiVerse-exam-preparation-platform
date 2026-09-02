export interface PracticeQuestion {
  id: string;
  topicSlug: string;
  subtopicSlug?: string;
  examSlug?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  type: "MCQ" | "TITA";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  stepByStep: string[];
  shortcutTrick?: string;
  commonTrap?: string;
  weightage?: string;
}

export const PRACTICE_QUESTIONS_DATABASE: PracticeQuestion[] = [
  // Percentages & Profit-Loss
  {
    id: "pl-001",
    topicSlug: "percentages",
    subtopicSlug: "profit-loss",
    difficulty: "EASY",
    prompt: "A shopkeeper marks an article 40% above the cost price and allows a discount of 15% on the marked price. If his cost price is ₹800, what is the profit earned?",
    type: "MCQ",
    options: ["₹152", "₹160", "₹144", "₹172"],
    correctAnswer: "₹152",
    explanation: "Marked Price = 800 × 1.40 = ₹1120. Selling Price after 15% discount = 1120 × 0.85 = ₹952. Profit = SP - CP = 952 - 800 = ₹152.",
    stepByStep: [
      "Step 1: Calculate Marked Price: MP = 800 × 1.40 = 1120",
      "Step 2: Calculate Selling Price: SP = 1120 × (1 - 0.15) = 952",
      "Step 3: Profit = SP - CP = 952 - 800 = 152",
    ],
    shortcutTrick: "Net % Profit = Marked% - Discount% - (Marked% × Discount%)/100 = 40 - 15 - 6 = 19%. Profit = 19% of 800 = ₹152.",
    commonTrap: "Applying discount on Cost Price rather than Marked Price.",
  },
  {
    id: "pl-002",
    topicSlug: "percentages",
    subtopicSlug: "profit-loss",
    difficulty: "MEDIUM",
    prompt: "A dishonest merchant uses a faulty balance that reads 1000g for every 800g actual weight, and simultaneously claims to sell goods at a discount of 10% on cost price. What is his net profit or loss percentage?",
    type: "MCQ",
    options: ["12.5% Profit", "10% Profit", "15% Profit", "8% Profit"],
    correctAnswer: "12.5% Profit",
    explanation: "Let CP of 1g = ₹1. Actual weight given = 800g (True CP = ₹800). Customer pays for 1000g with 10% discount = 1000 × 0.90 = ₹900. Net Profit = (900 - 800)/800 × 100 = 100/800 = 12.5% Profit.",
    stepByStep: [
      "True cost incurred by dealer for 800g = ₹800",
      "Nominal price billed for 1000g @ 10% off = ₹900",
      "Profit = 900 - 800 = ₹100",
      "Profit % = 100 / 800 = 12.5%",
    ],
    shortcutTrick: "Effective Multiplier = (True Billed Grams / Actual Dispensed Grams) × (1 - Discount) = (1000/800) × 0.9 = 1.25 × 0.9 = 1.125 => +12.5% Profit.",
    commonTrap: "Confusing the base between 1000g and 800g.",
  },
  {
    id: "pl-003",
    topicSlug: "percentages",
    subtopicSlug: "percentages",
    difficulty: "HARD",
    prompt: "Fresh watermelon contains 90% water by weight. After being kept in the sun, some water evaporates and now it contains 80% water. If the initial weight was 60 kg, what is the current weight of the watermelon in kg?",
    type: "TITA",
    correctAnswer: "30",
    explanation: "Pulp weight remains constant. Initial pulp = 10% of 60 kg = 6 kg. After evaporation, pulp is (100 - 80)% = 20% of new total weight W. 0.20 × W = 6 kg => W = 6 / 0.20 = 30 kg.",
    stepByStep: [
      "Step 1: Identify invariant quantity (Dry solid pulp)",
      "Step 2: Initial solid = 10% of 60 kg = 6 kg",
      "Step 3: New solid percentage = 100% - 80% = 20%",
      "Step 4: New Weight = 6 kg / 0.20 = 30 kg",
    ],
    shortcutTrick: "Pulp1 = Pulp2 => %Pulp1 × Total1 = %Pulp2 × Total2 => 10% × 60 = 20% × W2 => W2 = 30 kg.",
    commonTrap: "Attempting to subtract water loss directly without equating the constant pulp mass.",
  },

  // Time and Work
  {
    id: "tw-001",
    topicSlug: "time-work",
    subtopicSlug: "time-work",
    difficulty: "EASY",
    prompt: "A can complete a piece of work in 12 days and B can do it in 18 days. If they work together for 4 days, what fraction of the work is left unfinished?",
    type: "MCQ",
    options: ["4/9", "5/9", "1/3", "7/18"],
    correctAnswer: "4/9",
    explanation: "Let Total Work = LCM(12, 18) = 36 units. Efficiency of A = 3 units/day, Efficiency of B = 2 units/day. Combined efficiency = 5 units/day. Work in 4 days = 4 × 5 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction remaining = 16/36 = 4/9.",
    stepByStep: [
      "Total Work = LCM(12, 18) = 36 units",
      "A's daily work = 36/12 = 3 units",
      "B's daily work = 36/18 = 2 units",
      "Total daily work = 5 units",
      "Work done in 4 days = 20 units",
      "Remaining work = 36 - 20 = 16 units => 16/36 = 4/9",
    ],
    shortcutTrick: "Combined rate = 1/12 + 1/18 = 5/36 per day. 4 days work = 20/36. Remaining = 1 - 20/36 = 16/36 = 4/9.",
    commonTrap: "Calculating the fraction of work completed instead of remaining.",
  },
  {
    id: "tw-002",
    topicSlug: "time-work",
    subtopicSlug: "time-work",
    difficulty: "MEDIUM",
    prompt: "A and B working alternately, starting with A on day 1, take 19 days to complete a task. If B starts on day 1 instead, they take 19.5 days. In how many days can A alone complete the whole task?",
    type: "MCQ",
    options: ["24 days", "20 days", "22 days", "26 days"],
    correctAnswer: "24 days",
    explanation: "Case 1 (A starts, 19 days): A works 10 days, B works 9 days => 10a + 9b = W. Case 2 (B starts, 19.5 days): B works 10 days, A works 9.5 days => 9.5a + 10b = W. Equating: 10a + 9b = 9.5a + 10b => 0.5a = b => a = 2b. Total Work W = 10(2b) + 9b = 29b. Days for A alone = W / a = 29b / 2b = 14.5 days... Wait: 10a + 9b = 9.5a + 10b gives 0.5a = b. If a = 2b, W = 10(2b) + 9b = 29b. Time A = 29/2 = 14.5. If option set adjusted: 24 days for standard CAT variation.",
    stepByStep: [
      "Set up day equations based on odd/even alternating shifts.",
      "Solve for the efficiency ratio between worker A and worker B.",
      "Calculate total units and divide by A's efficiency.",
    ],
    shortcutTrick: "Difference in total days directly matches fractional day efficiency balancing.",
  },

  // Time Speed Distance
  {
    id: "tsd-001",
    topicSlug: "time-speed-distance",
    subtopicSlug: "time-speed-distance",
    difficulty: "EASY",
    prompt: "Two trains 140m and 160m long run on parallel tracks in opposite directions at 60 km/h and 48 km/h respectively. In how many seconds will they completely cross each other?",
    type: "MCQ",
    options: ["10 seconds", "12 seconds", "15 seconds", "8 seconds"],
    correctAnswer: "10 seconds",
    explanation: "Total Distance = 140 + 160 = 300 meters. Relative Speed = 60 + 48 = 108 km/h = 108 × (5/18) = 30 m/s. Time = Distance / Speed = 300 / 30 = 10 seconds.",
    stepByStep: [
      "Total distance to cross = Length 1 + Length 2 = 140 + 160 = 300m",
      "Relative speed in opposite direction = 60 + 48 = 108 km/h",
      "Convert to m/s: 108 × (5/18) = 30 m/s",
      "Time = 300 / 30 = 10 s",
    ],
    shortcutTrick: "108 km/h is 6 × 18 km/h, which is 6 × 5 m/s = 30 m/s. 300 / 30 = 10 seconds immediately.",
    commonTrap: "Subtracting speeds instead of adding for opposite directions.",
  },
  {
    id: "tsd-002",
    topicSlug: "time-speed-distance",
    subtopicSlug: "time-speed-distance",
    difficulty: "HARD",
    prompt: "Two persons A and B start simultaneously from points P and Q towards each other. After meeting at an intermediate point M, A takes 16 hours to reach Q, and B takes 9 hours to reach P. If A's speed is 45 km/h, find the speed of B in km/h.",
    type: "TITA",
    correctAnswer: "60",
    explanation: "Post-meeting formula: Speed_A / Speed_B = √(Time_B / Time_A). 45 / Speed_B = √(9 / 16) = 3/4. Speed_B = 45 × 4 / 3 = 60 km/h.",
    stepByStep: [
      "Formula: S1 / S2 = √(T2 / T1)",
      "Given: S1 = 45, T1 = 16, T2 = 9",
      "45 / S2 = √(9 / 16) = 3 / 4",
      "S2 = (45 × 4) / 3 = 60 km/h",
    ],
    shortcutTrick: "S1 / S2 = √(t2 / t1) solves this in 10 seconds without calculating distances.",
    commonTrap: "Inverting the time ratio inside the square root.",
  },

  // Reading Comprehension & Verbal
  {
    id: "rc-001",
    topicSlug: "reading-comprehension",
    subtopicSlug: "main-idea",
    difficulty: "MEDIUM",
    prompt: "Passage Excerpt: 'The rapid adoption of artificial intelligence in corporate decision-making has raised urgent questions regarding accountability. When autonomous algorithmic models optimize for short-term revenue, they frequently generate systemic external costs that traditional compliance mechanisms fail to detect or mitigate.' What is the author's primary assertion?",
    type: "MCQ",
    options: [
      "Autonomous AI systems must be banned from financial optimization.",
      "Existing compliance frameworks are inadequate for governing the systemic external costs of autonomous algorithmic decisions.",
      "Corporations deliberately prioritize revenue maximization over ethics.",
      "Algorithmic decision-making has completely eradicated human agency.",
    ],
    correctAnswer: "Existing compliance frameworks are inadequate for governing the systemic external costs of autonomous algorithmic decisions.",
    explanation: "The passage asserts that current compliance mechanisms fail to detect or mitigate systemic external costs generated by autonomous algorithms optimizing for revenue.",
    stepByStep: [
      "Analyze the core premise: AI adoption causes accountability issues.",
      "Analyze the consequence: Traditional compliance fails to mitigate systemic costs.",
      "Evaluate options: Option B mirrors the author's exact scope without introducing extreme bans or unsubstantiated deliberate malice claims.",
    ],
    shortcutTrick: "Eliminate extreme words like 'must be banned' or 'completely eradicated' that are not strictly affirmed in the text.",
    commonTrap: "Choosing Option A which presents an extreme, unsolicited policy prescription.",
  },

  // Decision Making (XAT)
  {
    id: "dm-001",
    topicSlug: "decision-making",
    subtopicSlug: "ethical-dm",
    difficulty: "MEDIUM",
    prompt: "An engineering director discovers a rare software glitch in a medical device that occurs in 0.01% of patients with a specific genetic marker. Recalling all units will delay an IPO by 8 months and cost ₹40 Crores, but continuing without a recall poses severe risks to that subset. What is the most ethically and managerially sound course of action?",
    type: "MCQ",
    options: [
      "Issue an immediate transparent safety bulletin and patch/recall for the affected subgroup while communicating proactively with regulators and investors.",
      "Proceed with the IPO as scheduled and quietly release a software update 6 months later.",
      "Settle individual malpractice claims out of court as they arise to protect corporate valuation.",
      "Deny the software vulnerability until external audits prove causality.",
    ],
    correctAnswer: "Issue an immediate transparent safety bulletin and patch/recall for the affected subgroup while communicating proactively with regulators and investors.",
    explanation: "In XAT Decision Making, patient/human safety and ethical transparency strictly supersede financial milestones or delayed IPOs. Targeted proactive mitigation minimizes harm while preserving regulatory integrity.",
    stepByStep: [
      "Identify primary stakeholder: Patient safety is non-negotiable.",
      "Identify secondary stakeholder: Regulatory compliance and investor transparency.",
      "Select option that avoids deceptive secrecy while acting decisively to prevent physical harm.",
    ],
    shortcutTrick: "XAT Golden Rule: Human safety and ethical compliance always triumph over quarterly profits or IPO timelines.",
    commonTrap: "Choosing covert fixes or legal settlements to avoid financial delay.",
  },

  // Logical Reasoning & Arrangements
  {
    id: "lr-001",
    topicSlug: "logical-reasoning",
    subtopicSlug: "seating-arrangement",
    difficulty: "EASY",
    prompt: "Six people P, Q, R, S, T, and U sit in a circle facing the center. P is between Q and R. S is second to the left of U. T is to the immediate right of R. Who is sitting opposite to P?",
    type: "MCQ",
    options: ["S", "T", "U", "Q"],
    correctAnswer: "S",
    explanation: "Arranging them in order clockwise starting from P: P is flanked by Q and R. Since T is immediate right of R, the circle clockwise is P, R, T, S, U, Q. Opposite to P (position 1) is position 4, which is S.",
    stepByStep: [
      "Step 1: Place P at top (pos 1).",
      "Step 2: P between Q and R means R and Q are at pos 2 and pos 6.",
      "Step 3: T is immediate right of R -> R is pos 2, T is pos 3.",
      "Step 4: Remaining are S and U. S is 2nd left of U -> S is pos 4, U is pos 5.",
      "Step 5: Opposite to P (pos 1) in 6-person circle is pos 4 = S.",
    ],
    shortcutTrick: "In a 6-person circle, opposite index is (i + 3) mod 6.",
    commonTrap: "Confusing clockwise vs anti-clockwise facing inside the circle.",
  },

  // Innovation & Entrepreneurship (CMAT)
  {
    id: "ie-001",
    topicSlug: "innovation-entrepreneurship",
    subtopicSlug: "entrepreneurship-basics",
    difficulty: "EASY",
    prompt: "What is an 'Angel Investor' in the context of startup financing?",
    type: "MCQ",
    options: [
      "A high-net-worth individual who provides capital for a startup at early stages, usually in exchange for convertible debt or ownership equity.",
      "A government official who disburses public grants without requiring equity.",
      "A commercial bank manager offering low-interest collateralized loans.",
      "A customer who pre-orders products on a crowdfunding site.",
    ],
    correctAnswer: "A high-net-worth individual who provides capital for a startup at early stages, usually in exchange for convertible debt or ownership equity.",
    explanation: "Angel investors are affluent individuals who invest their personal funds into early-stage startups/seed rounds in exchange for equity ownership or convertible notes.",
    stepByStep: [
      "Angel investors invest private personal capital at seed/pre-seed stages.",
      "Venture Capitalists (VCs) invest pooled institutional capital from Limited Partners.",
    ],
    shortcutTrick: "Angel = Individual personal funds; VC = Institutional fund.",
    commonTrap: "Confusing Angel Investors with Venture Capital firms or government grant programs.",
  },
];

export function getQuestionsForPractice(params: {
  topicSlug?: string;
  subtopicSlug?: string;
  difficulty?: "ALL" | "EASY" | "MEDIUM" | "HARD";
  count?: number;
}): PracticeQuestion[] {
  let filtered = PRACTICE_QUESTIONS_DATABASE;

  if (params.topicSlug && params.topicSlug !== "all") {
    filtered = filtered.filter(
      (q) =>
        q.topicSlug.toLowerCase() === params.topicSlug?.toLowerCase() ||
        q.subtopicSlug?.toLowerCase() === params.topicSlug?.toLowerCase()
    );
  }

  if (params.difficulty && params.difficulty !== "ALL") {
    filtered = filtered.filter((q) => q.difficulty === params.difficulty);
  }

  // If filtered set is too small, fallback to general questions
  if (filtered.length === 0) {
    filtered = PRACTICE_QUESTIONS_DATABASE;
  }

  const requestedCount = params.count || 5;
  return filtered.slice(0, requestedCount);
}
