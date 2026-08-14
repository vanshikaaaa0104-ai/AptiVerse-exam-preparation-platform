"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Target,
  Sparkles,
  Bookmark,
  RotateCcw,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Layers,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS, type VerifiedQuestionItem } from "@/lib/seed-data";
import confetti from "canvas-confetti";

export default function QuizResultPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const resolvedParams = use(params);
  const questions = SAMPLE_VERIFIED_QUESTIONS;

  const [activeFilter, setActiveFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "SKIPPED">("ALL");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedOption: string | null; timeSpentSec: number }>>({});

  useEffect(() => {
    // Load student attempt responses from sessionStorage
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(`attempt-${resolvedParams.quizId}`);
      if (raw) {
        try {
          setUserAnswers(JSON.parse(raw));
        } catch (e) {
          console.error("Failed to parse attempt data", e);
        }
      }
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignored in SSR
    }
  }, [resolvedParams.quizId]);

  // Compute evaluation stats
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let totalScore = 0;
  let totalTime = 0;

  questions.forEach((q, idx) => {
    const userOption = userAnswers[idx]?.selectedOption;
    const timeSpent = userAnswers[idx]?.timeSpentSec || 90;
    totalTime += timeSpent;

    if (!userOption) {
      skippedCount++;
    } else if (userOption === q.correctAnswer) {
      correctCount++;
      totalScore += 3;
    } else {
      incorrectCount++;
      totalScore -= 1;
    }
  });

  const accuracyPct =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredQuestions = questions.filter((q, idx) => {
    const userOpt = userAnswers[idx]?.selectedOption;
    if (activeFilter === "ALL") return true;
    if (activeFilter === "CORRECT") return userOpt === q.correctAnswer;
    if (activeFilter === "INCORRECT") return userOpt && userOpt !== q.correctAnswer;
    if (activeFilter === "SKIPPED") return !userOpt;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Top Summary Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Practice Drill Performance Report
                </h1>
                <p className="text-xs text-slate-300">
                  Drill #{resolvedParams.quizId} • Evaluated with +3 / -1 Server Scoring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/quiz/${resolvedParams.quizId}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake Drill</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="accent" size="sm" className="gap-1.5 text-xs">
                  <span>Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Metric Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Total Score</p>
              <p className="text-xl font-extrabold text-indigo-400 mt-0.5">
                {totalScore > 0 ? `+${totalScore}` : totalScore}
                <span className="text-xs text-slate-400 font-normal"> / {questions.length * 3}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Accuracy Rate</p>
              <p
                className={`text-xl font-extrabold mt-0.5 ${
                  accuracyPct >= 75
                    ? "text-emerald-400"
                    : accuracyPct >= 50
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {accuracyPct}%
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Correct / Attempted</p>
              <p className="text-xl font-extrabold text-white mt-0.5">
                {correctCount} <span className="text-xs text-slate-400 font-normal">/ {correctCount + incorrectCount}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Avg Time / Question</p>
              <p className="text-xl font-extrabold text-blue-400 mt-0.5">
                {Math.round(totalTime / questions.length)}s
              </p>
            </div>
          </div>
        </div>

        {/* Question Filter Tabs */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Itemized Solution Breakdown</h2>
            <p className="text-xs text-slate-400">Step-by-step proofs, speed shortcuts, and common trap analysis</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(["ALL", "CORRECT", "INCORRECT", "SKIPPED"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed 4-Part Solution Cards */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const userChoice = userAnswers[originalIndex]?.selectedOption;
            const isCorrect = userChoice === q.correctAnswer;
            const isSkipped = !userChoice;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <Card
                key={q.id}
                className="border border-slate-800 bg-[#0e1422] p-5 sm:p-7 space-y-6"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-white font-mono">
                      Question #{originalIndex + 1}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {q.difficulty}
                    </Badge>
                    <Badge variant="indigo" className="text-[10px]">
                      {q.topicSlug}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <Badge variant="success" className="gap-1 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Correct (+3.0)</span>
                      </Badge>
                    ) : isSkipped ? (
                      <Badge variant="warning" className="gap-1 text-xs">
                        <span>Skipped (0.0)</span>
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1 text-xs">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Incorrect (-1.0)</span>
                      </Badge>
                    )}

                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/40"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Passage Text if applicable */}
                {q.passageText && (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
                    {q.passageText}
                  </div>
                )}

                {/* Question Text */}
                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {q.questionText}
                </p>

                {/* Options Review Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isOptionCorrect = opt.label === q.correctAnswer;
                    const isUserPick = opt.label === userChoice;

                    let optionBorder = "border-slate-800 bg-slate-900/60 text-slate-300";
                    if (isOptionCorrect) {
                      optionBorder = "border-emerald-500/60 bg-emerald-950/30 text-emerald-200 font-medium";
                    } else if (isUserPick && !isOptionCorrect) {
                      optionBorder = "border-red-500/60 bg-red-950/30 text-red-200 line-through";
                    }

                    return (
                      <div
                        key={opt.label}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-3 ${optionBorder}`}
                      >
                        <span
                          className={`h-5 w-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isOptionCorrect
                              ? "bg-emerald-500 text-white"
                              : isUserPick
                              ? "bg-red-500 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* 4-Part Solution Panel */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  {/* Part 1: Step-by-Step Mathematical/Logical Derivation */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                      <BookOpen className="h-4 w-4 text-indigo-400" />
                      <span>1. Step-by-Step Detailed Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {q.solution.detailedText}
                    </p>
                    <div className="space-y-1.5 pl-2 border-l-2 border-indigo-500/40 text-xs font-mono text-slate-300">
                      {q.solution.stepByStep.map((step, sIdx) => (
                        <p key={sIdx}>{step}</p>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Speed Shortcut Method */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Zap className="h-4 w-4" />
                      <span>2. Speed Shortcut / Elimination Hack</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {q.solution.shortcutMethod}
                    </p>
                  </div>

                  {/* Part 3 & 4 Grid: Concept Tested & Common Pitfall */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        3. Concept Tested
                      </p>
                      <p className="text-xs text-slate-200 font-medium">
                        {q.solution.conceptTested}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                      <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>4. Common Mistake / Trap</span>
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {q.solution.commonMistakeTrap}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
