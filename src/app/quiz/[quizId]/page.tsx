"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Target,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Send,
  RotateCcw,
  Zap,
  BookOpen,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SAMPLE_VERIFIED_QUESTIONS, type VerifiedQuestionItem } from "@/lib/seed-data";
import { formatTimeRemaining } from "@/lib/utils";
import { QuizTimer, type QuizTimerTickData } from "@/components/quiz";

type PaletteStatus =
  | "NOT_VISITED"
  | "SKIPPED"
  | "ANSWERED"
  | "MARKED_FOR_REVIEW"
  | "ANSWERED_AND_MARKED";

interface QuestionState {
  selectedOption: string | null;
  paletteStatus: PaletteStatus;
  timeSpentSec: number;
}

export default function QuizRunnerPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Load sample questions (stripped of solutions/answers on the client)
  const questions = SAMPLE_VERIFIED_QUESTIONS;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>("Just now");

  // Local state tracking student responses without answers exposed
  const [userResponses, setUserResponses] = useState<Record<number, QuestionState>>(() => {
    const initial: Record<number, QuestionState> = {};
    for (let i = 0; i < totalQuestions; i++) {
      initial[i] = {
        selectedOption: null,
        paletteStatus: i === 0 ? "SKIPPED" : "NOT_VISITED",
        timeSpentSec: 0,
      };
    }
    return initial;
  });

  const currentQ = questions[currentIndex];
  const currentState = userResponses[currentIndex] || {
    selectedOption: null,
    paletteStatus: "NOT_VISITED",
    timeSpentSec: 0,
  };

  // Timer tick handler for tracking per-question time spent
  const handleTimerTick = (data: QuizTimerTickData) => {
    setUserResponses((prev) => {
      const cur = prev[currentIndex];
      if (!cur) return prev;
      return {
        ...prev,
        [currentIndex]: {
          ...cur,
          timeSpentSec: (cur.timeSpentSec || 0) + 1,
        },
      };
    });
  };

  // Handle Option Selection
  const handleSelectOption = (label: string) => {
    setUserResponses((prev) => {
      const isMarked =
        prev[currentIndex].paletteStatus === "MARKED_FOR_REVIEW" ||
        prev[currentIndex].paletteStatus === "ANSWERED_AND_MARKED";

      return {
        ...prev,
        [currentIndex]: {
          ...prev[currentIndex],
          selectedOption: label,
          paletteStatus: isMarked ? "ANSWERED_AND_MARKED" : "ANSWERED",
        },
      };
    });
    setLastSavedTime("Just now");
  };

  // Clear current response
  const handleClearResponse = () => {
    setUserResponses((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: null,
        paletteStatus: "SKIPPED",
      },
    }));
  };

  // Mark for review toggle
  const handleMarkForReview = () => {
    setUserResponses((prev) => {
      const hasAnswer = prev[currentIndex].selectedOption !== null;
      const isAlreadyMarked =
        prev[currentIndex].paletteStatus === "MARKED_FOR_REVIEW" ||
        prev[currentIndex].paletteStatus === "ANSWERED_AND_MARKED";

      let nextStatus: PaletteStatus;
      if (isAlreadyMarked) {
        nextStatus = hasAnswer ? "ANSWERED" : "SKIPPED";
      } else {
        nextStatus = hasAnswer ? "ANSWERED_AND_MARKED" : "MARKED_FOR_REVIEW";
      }

      return {
        ...prev,
        [currentIndex]: {
          ...prev[currentIndex],
          paletteStatus: nextStatus,
        },
      };
    });

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setUserResponses((prev) => {
        if (prev[nextIdx]?.paletteStatus === "NOT_VISITED") {
          return {
            ...prev,
            [nextIdx]: { ...prev[nextIdx], paletteStatus: "SKIPPED" },
          };
        }
        return prev;
      });
      setCurrentIndex(nextIdx);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setUserResponses((prev) => {
      if (prev[idx]?.paletteStatus === "NOT_VISITED") {
        return {
          ...prev,
          [idx]: { ...prev[idx], paletteStatus: "SKIPPED" },
        };
      }
      return prev;
    });
    setCurrentIndex(idx);
    setIsPaletteDrawerOpen(false);
  };

  // Submit test attempt & calculate results
  const handleSubmit = () => {
    // Store attempt in sessionStorage / local state for instant results review
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `attempt-${resolvedParams.quizId}`,
        JSON.stringify(userResponses)
      );
    }
    router.push(`/quiz/${resolvedParams.quizId}/result`);
  };

  // Palette counts
  const counts = Object.values(userResponses).reduce(
    (acc, q) => {
      acc[q.paletteStatus] = (acc[q.paletteStatus] || 0) + 1;
      return acc;
    },
    {} as Record<PaletteStatus, number>
  );

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white select-none">
      {/* Top Test Navigation Bar */}
      <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            QZ
          </div>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              AptiVerse Practice Drill #{resolvedParams.quizId}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              {totalQuestions} Questions • +3 / -1 Marking
            </p>
          </div>
        </div>

        {/* Center: Live Synchronized QuizTimer */}
        <QuizTimer
          testId={`quiz-${resolvedParams.quizId}`}
          totalDurationSec={900}
          onAutoSubmit={handleSubmit}
          onTick={handleTimerTick}
          variant="detailed"
        />

        {/* Right: Autosave Status & Submit Button */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Autosaved {lastSavedTime}
          </span>

          <button
            onClick={() => setIsPaletteDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Open Question Palette"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="shadow-md shadow-indigo-600/20"
          >
            <span>Submit Quiz</span>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      {/* Main Body: Question Viewer & Question Palette */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Question Display (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Question Meta Header */}
          <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-white font-mono">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <Badge
                variant={
                  currentQ.difficulty === "EASY"
                    ? "success"
                    : currentQ.difficulty === "HARD"
                    ? "destructive"
                    : "indigo"
                }
                className="text-[10px]"
              >
                {currentQ.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {currentQ.questionType}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Marking: <strong className="text-emerald-400">+3.0</strong> / <strong className="text-red-400">-1.0</strong></span>
            </div>
          </div>

          {/* Passage Box (if applicable) */}
          {currentQ.passageText && (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 max-h-64 overflow-y-auto">
              <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                Reading Passage / Context
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                {currentQ.passageText}
              </p>
            </div>
          )}

          {/* Question Text */}
          <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-6">
            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
              {currentQ.questionText}
            </p>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = currentState.selectedOption === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`p-4 rounded-xl border text-sm flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-950/40 border-indigo-500 text-white shadow-xs"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {opt.label}
                    </div>
                    <span className="leading-relaxed text-xs sm:text-sm pt-0.5">
                      {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Navigation Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="gap-1 text-xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearResponse}
                disabled={!currentState.selectedOption}
                className="gap-1 text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkForReview}
                className="gap-1.5 text-xs text-violet-400 border-violet-500/30 hover:bg-violet-950/30"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>
                  {currentState.paletteStatus === "MARKED_FOR_REVIEW" ||
                  currentState.paletteStatus === "ANSWERED_AND_MARKED"
                    ? "Unmark Review"
                    : "Mark for Review"}
                </span>
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === totalQuestions - 1}
                className="gap-1 text-xs"
              >
                <span>Next Question</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Question Palette (4 Cols) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Question Palette</h3>
              <Badge variant="indigo" className="text-[10px]">
                {totalQuestions} Questions
              </Badge>
            </div>

            {/* Status Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-md bg-emerald-500 border border-emerald-600"></span>
                <span>Answered ({counts.ANSWERED || 0})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-md bg-violet-600 border border-violet-400"></span>
                <span>Marked ({counts.MARKED_FOR_REVIEW || 0})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-md bg-amber-500/20 border border-amber-500"></span>
                <span>Skipped ({counts.SKIPPED || 0})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-md bg-slate-800 border border-slate-700"></span>
                <span>Unvisited ({counts.NOT_VISITED || 0})</span>
              </div>
            </div>

            {/* Question Number Matrix */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-800">
              {questions.map((_, idx) => {
                const state = userResponses[idx] || { paletteStatus: "NOT_VISITED" };
                const isCurrent = currentIndex === idx;

                let stateClasses = "bg-slate-800/80 border-slate-700 text-slate-400";
                if (state.paletteStatus === "ANSWERED") {
                  stateClasses = "bg-emerald-500 border-emerald-600 text-white font-bold";
                } else if (state.paletteStatus === "MARKED_FOR_REVIEW") {
                  stateClasses = "bg-violet-950 border-violet-500 text-violet-300 font-bold";
                } else if (state.paletteStatus === "ANSWERED_AND_MARKED") {
                  stateClasses = "bg-violet-600 border-emerald-400 text-white font-bold relative";
                } else if (state.paletteStatus === "SKIPPED") {
                  stateClasses = "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 w-9 rounded-xl border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${stateClasses} ${
                      isCurrent ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#080c14] scale-105" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0e1422] border border-slate-700 p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Submit Practice Drill?</h3>
              <p className="text-xs text-slate-400">
                Review your attempt summary before completing the evaluation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-sans">Answered</p>
                <p className="text-base font-bold text-emerald-400">
                  {(counts.ANSWERED || 0) + (counts.ANSWERED_AND_MARKED || 0)}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-sans">Marked for Review</p>
                <p className="text-base font-bold text-violet-400">
                  {(counts.MARKED_FOR_REVIEW || 0) + (counts.ANSWERED_AND_MARKED || 0)}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-sans">Skipped</p>
                <p className="text-base font-bold text-amber-400">{counts.SKIPPED || 0}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-sans">Unvisited</p>
                <p className="text-base font-bold text-slate-400">{counts.NOT_VISITED || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Back to Test
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleSubmit}
              >
                Confirm Submission
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
