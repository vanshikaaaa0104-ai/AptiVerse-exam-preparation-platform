"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Lock,
  Calculator,
  Send,
  RotateCcw,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";
import { formatTimeRemaining } from "@/lib/utils";

type PaletteStatus =
  | "NOT_VISITED"
  | "SKIPPED"
  | "ANSWERED"
  | "MARKED_FOR_REVIEW"
  | "ANSWERED_AND_MARKED";

interface MockQuestionState {
  selectedOption: string | null;
  paletteStatus: PaletteStatus;
  timeSpentSec: number;
}

export default function MockAttemptSimulatorPage({
  params,
}: {
  params: Promise<{ mockId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Mock Sections Configuration (CAT-style strictly locked 40-minute sections)
  const sections = [
    { id: "varc", name: "VARC", durationSec: 2400, questionCount: 24 },
    { id: "dilr", name: "DILR", durationSec: 2400, questionCount: 20 },
    { id: "qa", name: "QA", durationSec: 2400, questionCount: 22 },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(2400); // 40 mins
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState("0");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Load questions
  const questions = SAMPLE_VERIFIED_QUESTIONS;
  const currentQ = questions[currentQIndex % questions.length];

  // Responses state
  const [responses, setResponses] = useState<Record<number, MockQuestionState>>(() => {
    const initial: Record<number, MockQuestionState> = {};
    for (let i = 0; i < 66; i++) {
      initial[i] = {
        selectedOption: null,
        paletteStatus: i === 0 ? "SKIPPED" : "NOT_VISITED",
        timeSpentSec: 0,
      };
    }
    return initial;
  });

  // Sectional Timer Effect
  useEffect(() => {
    if (sectionTimeRemaining <= 0) {
      // Auto-advance to next section if available, else submit test
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1);
        setSectionTimeRemaining(2400);
        setCurrentQIndex(0);
      } else {
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionTimeRemaining, currentSectionIndex]);

  const handleSelectOption = (label: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQIndex]: {
        ...prev[currentQIndex],
        selectedOption: label,
        paletteStatus:
          prev[currentQIndex]?.paletteStatus === "MARKED_FOR_REVIEW" ||
          prev[currentQIndex]?.paletteStatus === "ANSWERED_AND_MARKED"
            ? "ANSWERED_AND_MARKED"
            : "ANSWERED",
      },
    }));
  };

  const handleClear = () => {
    setResponses((prev) => ({
      ...prev,
      [currentQIndex]: {
        ...prev[currentQIndex],
        selectedOption: null,
        paletteStatus: "SKIPPED",
      },
    }));
  };

  const handleMarkReview = () => {
    setResponses((prev) => {
      const hasAns = prev[currentQIndex]?.selectedOption !== null;
      const isMarked =
        prev[currentQIndex]?.paletteStatus === "MARKED_FOR_REVIEW" ||
        prev[currentQIndex]?.paletteStatus === "ANSWERED_AND_MARKED";

      return {
        ...prev,
        [currentQIndex]: {
          ...prev[currentQIndex],
          paletteStatus: isMarked
            ? hasAns
              ? "ANSWERED"
              : "SKIPPED"
            : hasAns
            ? "ANSWERED_AND_MARKED"
            : "MARKED_FOR_REVIEW",
        },
      };
    });
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `mock-attempt-${resolvedParams.mockId}`,
        JSON.stringify(responses)
      );
    }
    router.push(`/mocks/${resolvedParams.mockId}/result`);
  };

  const currentSec = sections[currentSectionIndex];
  const currentState = responses[currentQIndex] || {
    selectedOption: null,
    paletteStatus: "NOT_VISITED",
  };

  // Calculator Logic
  const handleCalcBtn = (val: string) => {
    if (val === "C") {
      setCalcInput("0");
    } else if (val === "=") {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(calcInput.replace(/×/g, "*").replace(/÷/g, "/"));
        setCalcInput(String(res));
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => (prev === "0" ? val : prev + val));
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white select-none">
      {/* Top Exam Header */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Badge variant="verified" className="text-[10px]">
            CAT 2026 OFFICIAL SIMULATOR
          </Badge>
          <span className="hidden sm:inline text-xs font-semibold text-white">
            CAT 2026 National Full Mock #01
          </span>
        </div>

        {/* Section Tabs with Locking */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {sections.map((sec, idx) => {
            const isCurrent = currentSectionIndex === idx;
            const isLocked = currentSectionIndex > idx;
            return (
              <div
                key={sec.id}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isCurrent
                    ? "bg-indigo-600 text-white shadow-xs"
                    : isLocked
                    ? "text-slate-500 cursor-not-allowed"
                    : "text-slate-400"
                }`}
              >
                {isLocked && <Lock className="h-3 w-3" />}
                <span>{sec.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({sec.questionCount}Q)</span>
              </div>
            );
          })}
        </div>

        {/* Right: Section Timer & Calculator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalculatorOpen((prev) => !prev)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCalculatorOpen
                ? "bg-purple-600 text-white border-purple-500"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
            }`}
            title="Toggle On-Screen Calculator"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden md:inline font-mono">Calc</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-amber-400 shadow-inner">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTimeRemaining(sectionTimeRemaining)}</span>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="text-xs shadow-md shadow-indigo-600/20"
          >
            <span>Submit Mock</span>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Question Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-white font-mono">
                Section: {currentSec.name} • Question {currentQIndex + 1} of {currentSec.questionCount}
              </span>
              <Badge variant="indigo" className="text-[10px]">
                {currentQ.difficulty}
              </Badge>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">+3.0 / -1.0</span>
          </div>

          {/* Passage (if present) */}
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

          {/* Question & Options */}
          <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-6">
            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
              {currentQ.questionText}
            </p>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = currentState.selectedOption === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`p-4 rounded-xl border text-sm flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-950/40 border-indigo-500 text-white"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {opt.label}
                    </div>
                    <span className="text-xs sm:text-sm pt-0.5">{opt.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="gap-1 text-xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClear}
                disabled={!currentState.selectedOption}
                className="gap-1 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkReview}
                className="gap-1.5 text-xs text-violet-400 border-violet-500/30"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Mark for Review</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  setCurrentQIndex((prev) => Math.min(currentSec.questionCount - 1, prev + 1))
                }
                disabled={currentQIndex === currentSec.questionCount - 1}
                className="gap-1 text-xs"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Section Question Palette */}
        <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">{currentSec.name} Palette</h3>
              <Badge variant="indigo" className="text-[10px]">
                {currentSec.questionCount} Questions
              </Badge>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: currentSec.questionCount }).map((_, idx) => {
                const state = responses[idx] || { paletteStatus: "NOT_VISITED" };
                const isCurrent = currentQIndex === idx;

                let stateClasses = "bg-slate-800/80 border-slate-700 text-slate-400";
                if (state.paletteStatus === "ANSWERED") {
                  stateClasses = "bg-emerald-500 border-emerald-600 text-white font-bold";
                } else if (state.paletteStatus === "MARKED_FOR_REVIEW") {
                  stateClasses = "bg-violet-950 border-violet-500 text-violet-300 font-bold";
                } else if (state.paletteStatus === "ANSWERED_AND_MARKED") {
                  stateClasses = "bg-violet-600 border-emerald-400 text-white font-bold";
                } else if (state.paletteStatus === "SKIPPED") {
                  stateClasses = "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 w-9 rounded-xl border text-xs font-mono flex items-center justify-center cursor-pointer ${stateClasses} ${
                      isCurrent ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#080c14] scale-105" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Floating On-Screen Calculator Panel */}
          {isCalculatorOpen && (
            <Card className="border border-purple-500/40 bg-[#0e1422] p-4 space-y-3 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5" /> Basic On-Screen Calculator
                </span>
                <button
                  onClick={() => setIsCalculatorOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-mono text-lg font-bold text-emerald-400 overflow-x-auto">
                {calcInput}
              </div>

              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleCalcBtn(btn)}
                    className={`p-2.5 rounded-lg border text-center font-bold transition-colors cursor-pointer ${
                      btn === "="
                        ? "bg-emerald-600 text-white border-emerald-500"
                        : btn === "C"
                        ? "bg-red-600 text-white border-red-500"
                        : ["+", "-", "×", "÷"].includes(btn)
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0e1422] border border-slate-700 p-6 space-y-6 shadow-2xl">
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Submit Full Mock Test?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to end the test and generate your official percentile report?
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Return to Test
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleSubmit}
              >
                Confirm & Grade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
