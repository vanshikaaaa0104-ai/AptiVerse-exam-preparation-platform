"use client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "STUDENT" | "ADMIN";
  targetExam: string;
  targetExamName?: string;
  targetDate: string;
  prepLevel: "Beginner" | "Intermediate" | "Advanced";
  phone?: string;
  dailyQuestionGoal: number;
  dailyStudyTimeMin: number;
  weeklyMockGoal: number;
  preferredStudyTime: "Morning" | "Afternoon" | "Evening" | "Night";
  isOnboarded: boolean;
  joinedDate: string;
  // Stats
  questionsAttempted: number;
  accuracy: number;
  mocksCompleted: number;
  currentStreak: number;
  studyTimeHours: number;
  level: number;
  totalXp: number;
  strongTopics: string[];
  weakTopics: string[];
  lastTopic?: {
    title: string;
    section: string;
    href: string;
    progress: number;
  };
}

const DEFAULT_DEMO_STUDENT: UserProfile = {
  id: "student-001",
  name: "Aman Sharma",
  email: "aman.sharma@aptiverse.ai",
  password: "password123",
  role: "STUDENT",
  targetExam: "cat",
  targetExamName: "CAT 2026",
  targetDate: "2026-11-29",
  prepLevel: "Intermediate",
  phone: "+91 98765 43210",
  dailyQuestionGoal: 25,
  dailyStudyTimeMin: 120,
  weeklyMockGoal: 2,
  preferredStudyTime: "Evening",
  isOnboarded: true,
  joinedDate: "2026-01-15",
  questionsAttempted: 348,
  accuracy: 75.4,
  mocksCompleted: 6,
  currentStreak: 12,
  studyTimeHours: 48,
  level: 4,
  totalXp: 2450,
  strongTopics: ["Percentages & Profit Loss", "Linear Arrangements", "Vocabulary & Grammar", "Speed Arithmetic"],
  weakTopics: ["Time & Work", "Circular Arrangements & Tournaments", "Inference in RC", "Odd Sentence Out"],
  lastTopic: {
    title: "Time & Work – Alternating Days & Pipes",
    section: "Quantitative Aptitude",
    href: "/quiz/time-work",
    progress: 60,
  },
};

const DEFAULT_DEMO_ADMIN: UserProfile = {
  id: "admin-001",
  name: "Dr. Rajesh Iyer (SME Lead)",
  email: "admin@aptiverse.ai",
  password: "adminpassword",
  role: "ADMIN",
  targetExam: "cat",
  targetExamName: "CAT 2026",
  targetDate: "2026-11-29",
  prepLevel: "Advanced",
  dailyQuestionGoal: 50,
  dailyStudyTimeMin: 180,
  weeklyMockGoal: 5,
  preferredStudyTime: "Morning",
  isOnboarded: true,
  joinedDate: "2025-06-01",
  questionsAttempted: 1240,
  accuracy: 94.2,
  mocksCompleted: 24,
  currentStreak: 45,
  studyTimeHours: 210,
  level: 10,
  totalXp: 18900,
  strongTopics: ["All Quant & Algebra", "Advanced DILR Games", "Philosophy Passages"],
  weakTopics: [],
};

const STORAGE_KEY_CURRENT = "aptiverse_current_user_v2";
const STORAGE_KEY_USERS = "aptiverse_registered_users_v2";

const EXAM_DISPLAY_NAMES: Record<string, string> = {
  cat: "CAT 2026",
  xat: "XAT 2026",
  nmat: "NMAT 2026",
  snap: "SNAP 2026",
  cmat: "CMAT 2026",
  mat: "MAT 2026",
  "mah-cet": "MAH MBA CET 2026",
};

function notifyAuthChange(user: UserProfile | null) {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("aptiverse_auth_changed", { detail: user }));
    } catch {
      // ignore
    }
  }
}

export function getStoredCurrentUser(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_DEMO_STUDENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load user from localStorage", e);
  }
  return DEFAULT_DEMO_STUDENT;
}

export function setStoredCurrentUser(user: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(user));
    // Also save/update in user registry
    const users = getStoredUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    notifyAuthChange(user);
  } catch (e) {
    console.warn("Failed to save user to localStorage", e);
  }
}

export function getStoredUsers(): UserProfile[] {
  if (typeof window === "undefined") return [DEFAULT_DEMO_STUDENT, DEFAULT_DEMO_ADMIN];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load user list", e);
  }
  return [DEFAULT_DEMO_STUDENT, DEFAULT_DEMO_ADMIN];
}

export function registerNewUser(data: {
  name: string;
  email: string;
  password?: string;
  targetExam?: string;
  targetDate?: string;
  prepLevel?: "Beginner" | "Intermediate" | "Advanced";
  phone?: string;
}): UserProfile {
  const targetExam = data.targetExam || "cat";
  const targetExamName = EXAM_DISPLAY_NAMES[targetExam] || `${targetExam.toUpperCase()} 2026`;

  const newUser: UserProfile = {
    id: `student-${Date.now()}`,
    name: data.name.trim() || data.email.split("@")[0],
    email: data.email.trim().toLowerCase(),
    password: data.password || "password123",
    role: "STUDENT",
    targetExam: targetExam,
    targetExamName: targetExamName,
    targetDate: data.targetDate || "2026-11-29",
    prepLevel: data.prepLevel || "Beginner",
    phone: data.phone,
    dailyQuestionGoal: 20,
    dailyStudyTimeMin: 90,
    weeklyMockGoal: 1,
    preferredStudyTime: "Evening",
    isOnboarded: false,
    joinedDate: new Date().toISOString().split("T")[0],
    questionsAttempted: 0,
    accuracy: 0,
    mocksCompleted: 0,
    currentStreak: 1,
    studyTimeHours: 0,
    level: 1,
    totalXp: 100,
    strongTopics: [],
    weakTopics: [],
    lastTopic: {
      title: `${targetExam.toUpperCase()} Diagnostic Assessment`,
      section: "Core Foundations",
      href: `/exams/${targetExam}`,
      progress: 0,
    },
  };

  setStoredCurrentUser(newUser);
  return newUser;
}

export interface AuthResult {
  success: boolean;
  user?: UserProfile;
  error?: string;
  isNewUser?: boolean;
}

export function authenticateUser(email: string, password?: string): AuthResult {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const users = getStoredUsers();
  const matched = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (matched) {
    // If user has a password recorded, check match (case sensitive or forgiving)
    if (matched.password && password && matched.password !== password) {
      // If demo accounts, allow standard demo passwords
      return {
        success: false,
        error: "Incorrect password. If you forgot your password, please use the recovery link or sign in as Demo.",
      };
    }
    setStoredCurrentUser(matched);
    return { success: true, user: matched, isNewUser: !matched.isOnboarded };
  }

  // If user does not exist in registry yet, create a fresh profile for them so they can sign in without friction!
  const formattedName = cleanEmail
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const createdUser = registerNewUser({
    name: formattedName || "New Aspirant",
    email: cleanEmail,
    password: password || "password123",
    targetExam: "cat",
    prepLevel: "Intermediate",
  });

  return { success: true, user: createdUser, isNewUser: true };
}

export function loginUserByEmail(email: string): UserProfile {
  const res = authenticateUser(email);
  return res.user || DEFAULT_DEMO_STUDENT;
}

export function setDemoStudentSession(): UserProfile {
  setStoredCurrentUser(DEFAULT_DEMO_STUDENT);
  return DEFAULT_DEMO_STUDENT;
}

export function setDemoAdminSession(): UserProfile {
  setStoredCurrentUser(DEFAULT_DEMO_ADMIN);
  return DEFAULT_DEMO_ADMIN;
}

export function logoutCurrentUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    notifyAuthChange(null);
  } catch (e) {
    console.warn("Failed to clear current session", e);
  }
}
