"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sliders, Clock, Target, ArrowRight, Layers, CheckCircle2, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomQuizBuilderPage() {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState("qa");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["time-work", "time-speed-distance"]);
  const [difficulty, setDifficulty] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMode, setTimerMode] = useState<"TIMED" | "UNTIMED">("TIMED");

  const topicsByTrack: Record<string, { id: string; name: string }[]> = {
    qa: [
      { id: "time-speed-distance", name: "Time, Speed & Distance" },
      { id: "time-work", name: "Time & Work" },
      { id: "percentages", name: "Percentages & Profit-Loss" },
      { id: "quadratic-equations", name: "Quadratic Equations" },
      { id: "geometry", name: "Triangles & Circles" },
      { id: "modern-math", name: "Permutations & Combinations" },
    ],
    dilr: [
      { id: "arrangements", name: "Linear & Circular Arrangements" },
      { id: "tournaments", name: "Games & Tournaments" },
      { id: "tables-caselets", name: "Missing Data Tables & Caselets" },
      { id: "binary-logic", name: "Binary Logic & Truth Tellers" },
    ],
    varc: [
      { id: "rc-main-idea", name: "RC: Central Thesis & Main Idea" },
      { id: "rc-inference", name: "RC: Inference & Tone Spectrum" },
      { id: "para-jumbles", name: "Para Jumbles & Coherence" },
      { id: "para-summary", name: "Para Summary & Odd Sentence" },
    ],
    special: [
      { id: "xat-dm", name: "XAT Decision Making" },
      { id: "cmat-innovation", name: "CMAT Innovation & Entrepreneurship" },
      { id: "mat-economy", name: "MAT Economic & Business Env" },
      { id: "mah-cet-abstract", name: "MAH CET Abstract Reasoning" },
    ],
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleLaunch = () => {
    router.push("/quiz/custom-drill-01");
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/practice" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Practice Hub</span>
          </Link>
        </div>

        <div className="space-y-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Custom Drill Builder
            </h1>
            <Badge variant="indigo">CONFIGURABLE</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Design a custom question set calibrated to your exact target topics, difficulty preferences, and timing constraints.
          </p>
        </div>

        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-6">
          {/* Step 1: Select Subject Track */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              1. Choose Subject Track
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "qa", label: "Quant Aptitude" },
                { id: "dilr", label: "DILR" },
                { id: "varc", label: "VARC" },
                { id: "special", label: "Exam Special" },
              ].map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => {
                    setSelectedTrack(track.id);
                    setSelectedTopics([]);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    selectedTrack === track.id
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Topics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                2. Select Specific Subtopics
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedTopics.length} selected
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topicsByTrack[selectedTrack]?.map((t) => {
                const isChecked = selectedTopics.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTopic(t.id)}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? "bg-indigo-950/40 border-indigo-500/50 text-white"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span>{t.name}</span>
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center border ${
                        isChecked
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "border-slate-700"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Difficulty */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              3. Difficulty Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["ALL", "EASY", "MEDIUM", "HARD"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    difficulty === d
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Question Count & Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                4. Number of Questions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      questionCount === num
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                5. Timer Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "TIMED", label: "Timed (1.5m / Q)" },
                  { id: "UNTIMED", label: "Untimed Practice" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setTimerMode(mode.id as "TIMED" | "UNTIMED")}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      timerMode === mode.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Estimated duration: <strong className="text-white">{questionCount * 1.5} minutes</strong>
            </div>
            <Button
              variant="accent"
              size="lg"
              onClick={handleLaunch}
              disabled={selectedTopics.length === 0}
              className="gap-2 shadow-lg shadow-indigo-600/20"
            >
              <span>Build & Start Drill</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
