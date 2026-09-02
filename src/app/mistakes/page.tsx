"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  BookOpen,
  Filter,
  ArrowRight,
  Zap,
  HelpCircle,
  Trash2,
  Check,
  Search,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MistakeItem {
  id: string;
  exam: string;
  section: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  options?: string[];
  myPreviousAnswer: string;
  correctAnswer: string;
  explanation: string;
  stepByStep: string[];
  shortcutTrick?: string;
  commonTrap?: string;
  attemptsCount: number;
  lastAttemptDate: string;
  isReviewed: boolean;
}

const INITIAL_MISTAKES: MistakeItem[] = [
  {
    id: "m-001",
    exam: "CAT",
    section: "Quantitative Aptitude",
    topic: "Time & Work",
    difficulty: "MEDIUM",
    prompt: "A and B working alternately, starting with A on day 1, take 19 days to complete a task. If B starts on day 1 instead, they take 19.5 days. In how many days can A alone complete the whole task?",
    options: ["24 days", "20 days", "22 days", "26 days"],
    myPreviousAnswer: "20 days",
    correctAnswer: "24 days",
    explanation: "Case 1: 10A + 9B = W. Case 2: 9.5A + 10B = W. Equating gives 0.5A = B => A = 2B. Total work = 10(2B) + 9B = 29B units.",
    stepByStep: [
      "Step 1: Set up alternating day work formulas.",
      "Step 2: Balance fractional unit contributions.",
      "Step 3: Solve for individual efficiency ratio.",
    ],
    shortcutTrick: "The difference in total days directly yields the unit ratio of workers without guessing.",
    commonTrap: "Confusing who works on odd vs even days in alternating schedules.",
    attemptsCount: 2,
    lastAttemptDate: "Yesterday",
    isReviewed: false,
  },
  {
    id: "m-002",
    exam: "XAT",
    section: "Decision Making",
    topic: "Ethical Cases",
    difficulty: "HARD",
    prompt: "An engineering director discovers a rare software glitch in a medical device that occurs in 0.01% of patients with a specific genetic marker. Recalling all units will delay an IPO by 8 months and cost ₹40 Crores. What is the most ethically and managerially sound course of action?",
    options: [
      "Issue an immediate transparent safety bulletin and patch/recall for the affected subgroup while communicating proactively.",
      "Proceed with the IPO as scheduled and quietly release a software update 6 months later.",
      "Settle individual malpractice claims out of court as they arise.",
      "Deny the software vulnerability until external audits prove causality.",
    ],
    myPreviousAnswer: "Proceed with the IPO as scheduled and quietly release a software update 6 months later.",
    correctAnswer: "Issue an immediate transparent safety bulletin and patch/recall for the affected subgroup while communicating proactively.",
    explanation: "In XAT Decision Making, patient safety and ethical transparency strictly supersede financial valuation or IPO timelines.",
    stepByStep: [
      "Identify primary stakeholder: Human safety.",
      "Identify secondary stakeholder: Regulatory compliance and corporate transparency.",
      "Choose the solution that addresses physical risk proactively.",
    ],
    shortcutTrick: "Human safety & ethics always trump quarterly profits.",
    commonTrap: "Choosing covert solutions to protect short-term corporate valuation.",
    attemptsCount: 1,
    lastAttemptDate: "2 days ago",
    isReviewed: false,
  },
  {
    id: "m-003",
    exam: "CAT",
    section: "Data Interpretation & LR",
    topic: "Arrangements",
    difficulty: "MEDIUM",
    prompt: "Six people P, Q, R, S, T, and U sit in a circle facing the center. P is between Q and R. S is second to the left of U. T is to the immediate right of R. Who is sitting opposite to P?",
    options: ["S", "T", "U", "Q"],
    myPreviousAnswer: "T",
    correctAnswer: "S",
    explanation: "Arranging them clockwise from P: P, R, T, S, U, Q. Opposite to P (position 1) in 6-person circle is position 4 = S.",
    stepByStep: [
      "Step 1: Place P at position 1.",
      "Step 2: Place R at pos 2 and T at pos 3 based on immediate right clue.",
      "Step 3: S is 2nd left of U => S is pos 4, U is pos 5.",
      "Step 4: Opposite to P (pos 1) is pos 4 = S.",
    ],
    shortcutTrick: "In a 6-person circle, opposite index is (i + 3) mod 6.",
    commonTrap: "Confusing clockwise vs anti-clockwise facing inside the circle.",
    attemptsCount: 1,
    lastAttemptDate: "3 days ago",
    isReviewed: true,
  },
  {
    id: "m-004",
    exam: "SNAP",
    section: "Quantitative & DI",
    topic: "Time Speed Distance",
    difficulty: "EASY",
    prompt: "Two trains 140m and 160m long run on parallel tracks in opposite directions at 60 km/h and 48 km/h respectively. In how many seconds will they completely cross each other?",
    options: ["10 seconds", "12 seconds", "15 seconds", "8 seconds"],
    myPreviousAnswer: "15 seconds",
    correctAnswer: "10 seconds",
    explanation: "Total Distance = 140 + 160 = 300 meters. Relative Speed = 60 + 48 = 108 km/h = 30 m/s. Time = 300 / 30 = 10 seconds.",
    stepByStep: [
      "Total distance = 140 + 160 = 300m",
      "Relative speed (opposite) = 60 + 48 = 108 km/h = 30 m/s",
      "Time = 300 / 30 = 10 s",
    ],
    shortcutTrick: "108 km/h = 6 × 5 m/s = 30 m/s => 300/30 = 10s.",
    commonTrap: "Subtracting speeds instead of adding for opposite directions.",
    attemptsCount: 1,
    lastAttemptDate: "5 days ago",
    isReviewed: false,
  },
];

export default function MistakeBookPage() {
  const [mistakes, setMistakes] = useState<MistakeItem[]>(INITIAL_MISTAKES);
  const [selectedExam, setSelectedExam] = useState("ALL");
  const [selectedSection, setSelectedSection] = useState("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeQuestionToSolve, setActiveQuestionToSolve] = useState<string | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<string | null>(null);
  const [retryFeedback, setRetryFeedback] = useState<"CORRECT" | "INCORRECT" | null>(null);

  const handleToggleReviewed = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isReviewed: !m.isReviewed } : m))
    );
  };

  const handleRemoveMistake = (id: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  const handleStartRetry = (id: string) => {
    setActiveQuestionToSolve(id);
    setRetryAnswer(null);
    setRetryFeedback(null);
  };

  const handleCheckRetry = (correctAnswer: string, mistakeId: string) => {
    if (retryAnswer === correctAnswer) {
      setRetryFeedback("CORRECT");
      setMistakes((prev) =>
        prev.map((m) => (m.id === mistakeId ? { ...m, isReviewed: true } : m))
      );
    } else {
      setRetryFeedback("INCORRECT");
    }
  };

  const filteredMistakes = mistakes.filter((m) => {
    if (selectedExam !== "ALL" && m.exam !== selectedExam) return false;
    if (selectedSection !== "ALL" && m.section !== selectedSection) return false;
    if (selectedDifficulty !== "ALL" && m.difficulty !== selectedDifficulty) return false;
    if (
      searchQuery &&
      !m.prompt.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.topic.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const unreviewedCount = mistakes.filter((m) => !m.isReviewed).length;

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Mistake Book &amp; Error Recovery
              </h1>
              <Badge variant="warning">{unreviewedCount} Unreviewed Errors</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every incorrect answer from tests and drills is captured here with full 4-part explanations. Re-solve to eliminate weak points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/practice/weak">
              <Button variant="accent" size="sm" className="gap-2">
                <Zap className="h-4 w-4" />
                <span>Weak Area Workout</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search error questions or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Exam Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Exam:</span>
              {["ALL", "CAT", "XAT", "SNAP", "NMAT", "MAH-CET"].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setSelectedExam(ex)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedExam === ex
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            {/* Section Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Section:</span>
              {["ALL", "Quantitative Aptitude", "Data Interpretation & LR", "Decision Making"].map(
                (sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSection(sec)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                      selectedSection === sec
                        ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {sec === "ALL" ? "All Sections" : sec}
                  </button>
                )
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Difficulty:</span>
              {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mistake Items List */}
        {filteredMistakes.length === 0 ? (
          <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/40 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <p className="text-base font-bold text-white">No mistakes matching current filter</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your mistake log is clear for this selection. Keep practicing to maintain high accuracy!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMistakes.map((item) => {
              const isSolving = activeQuestionToSolve === item.id;

              return (
                <Card
                  key={item.id}
                  className={`border transition-all ${
                    item.isReviewed
                      ? "bg-slate-950/40 border-slate-800/80 opacity-80"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="indigo" className="text-[10px]">
                          {item.exam}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {item.section}
                        </Badge>
                        <span className="text-xs font-semibold text-slate-300">
                          {item.topic}
                        </span>
                        <Badge
                          variant={
                            item.difficulty === "HARD"
                              ? "destructive"
                              : item.difficulty === "MEDIUM"
                              ? "warning"
                              : "verified"
                          }
                          className="text-[9px]"
                        >
                          {item.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleReviewed(item.id)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer ${
                            item.isReviewed
                              ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
                              : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                        >
                          <Check className="h-3 w-3" />
                          <span>{item.isReviewed ? "Reviewed" : "Mark as Reviewed"}</span>
                        </button>
                        <button
                          onClick={() => handleRemoveMistake(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors cursor-pointer"
                          title="Remove from Mistake Book"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Prompt */}
                    <p className="text-sm font-medium text-slate-100 leading-relaxed">
                      {item.prompt}
                    </p>

                    {/* Interactive Solve Mode */}
                    {isSolving ? (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                            <RotateCcw className="h-3.5 w-3.5" />
                            Re-Attempt in Place
                          </span>
                          <button
                            onClick={() => setActiveQuestionToSolve(null)}
                            className="text-[10px] text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>

                        {item.options && (
                          <div className="space-y-2">
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setRetryAnswer(opt)}
                                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                  retryAnswer === opt
                                    ? "bg-indigo-600/20 border-indigo-500 text-white font-semibold"
                                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <Button
                            variant="accent"
                            size="sm"
                            onClick={() => handleCheckRetry(item.correctAnswer, item.id)}
                            disabled={!retryAnswer}
                            className="text-xs gap-1.5"
                          >
                            <span>Verify Answer</span>
                          </Button>

                          {retryFeedback === "CORRECT" && (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              Correct! Marked as Reviewed.
                            </span>
                          )}
                          {retryFeedback === "INCORRECT" && (
                            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Incorrect. Check the solution below.
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleStartRetry(item.id)}
                          className="text-xs gap-1.5"
                        >
                          <RotateCcw className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Re-Attempt Question</span>
                        </Button>
                      </div>
                    )}

                    {/* 4-Part Solution & Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-emerald-400 block mb-0.5">
                          Correct Answer: {item.correctAnswer}
                        </span>
                        <p className="text-slate-300 leading-relaxed">{item.explanation}</p>
                      </div>

                      {item.shortcutTrick && (
                        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300">
                          <span className="font-bold block text-[11px] mb-0.5">⚡ Speed Shortcut:</span>
                          <span>{item.shortcutTrick}</span>
                        </div>
                      )}

                      {item.commonTrap && (
                        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-300">
                          <span className="font-bold block text-[11px] mb-0.5">⚠️ Common Trap:</span>
                          <span>{item.commonTrap}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
