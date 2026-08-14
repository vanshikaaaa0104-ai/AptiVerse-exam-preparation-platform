"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ConceptReaderPage({
  params,
}: {
  params: Promise<{ sectionSlug: string; topicSlug: string }>;
}) {
  const resolvedParams = use(params);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Dynamic concept theory data tailored to the topic
  const isTimeWork = resolvedParams.topicSlug === "time-work";
  const isTSD = resolvedParams.topicSlug === "time-speed-distance";
  const isRC = resolvedParams.topicSlug === "reading-comprehension";

  const title = isTimeWork
    ? "Time & Work: Efficiency & Man-Days Equivalence"
    : isTSD
    ? "Relative Speed, Meeting Points & Circular Tracks"
    : "Reading Comprehension: Primary Purpose & Core Thesis";

  const formulas = isTimeWork
    ? [
        "M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2 (Equivalence Theorem)",
        "Total Work = LCM of individual working days",
        "Combined Efficiency = Total Work / Combined Days",
        "Pipes & Cisterns: Net Flow Rate = Σ(Inlet Efficiencies) - Σ(Outlet Drain Rates)",
      ]
    : isTSD
    ? [
        "Relative Speed (Opposite Direction) = S1 + S2",
        "Relative Speed (Same Direction) = |S1 - S2|",
        "Time to First Meeting on Circular Track = Track Length / Relative Speed",
        "Distinct Meeting Points = (S1 ± S2) / HCF(S1, S2)",
      ]
    : [
        "Main Idea = Author's Problem + Proposed Thesis + Conclusive Stance",
        "Inference = Must be 100% logically necessitated by premises",
        "Strengthen Argument = Validates underlying unstated assumption",
        "Weaken Argument = Identifies alternative causal factor or flawed premise",
      ];

  const shortcuts = isTimeWork
    ? "For alternating days: Calculate the work completed in a full 2-day or 3-day cycle first. Do not solve day-by-day linearly to avoid cycle mismatch errors."
    : isTSD
    ? "Post-meeting travel ratio: If A and B meet at M and reach destinations in t1 and t2 hours, then S1 / S2 = √(t2 / t1). Solves complex train problems in 20 seconds."
    : "Para transitions: Read the first 2 sentences and the concluding sentence of each paragraph. The paragraph pivot words reveal the spine of the entire passage.";

  const traps = isTimeWork
    ? "Common Trap: Forgetting who works on the final partial day in alternating schedules, or assuming negative workers (drain pipes) work during positive worker shifts."
    : isTSD
    ? "Common Trap: Taking the simple arithmetic mean (S1 + S2)/2 when distance is constant instead of the harmonic mean 2S1S2 / (S1 + S2)."
    : "Common Trap: Choosing an option that is factually stated in paragraph 2, but only serves as supporting background rather than the author's primary thesis.";

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/learn/${resolvedParams.sectionSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Topics</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked((prev) => !prev)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Bookmark Concept"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsCompleted((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompleted
                  ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        {/* Concept Title Banner */}
        <div className="space-y-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" className="text-[10px]">
              CANONICAL CONCEPT
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> 8 min read
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Comprehensive theoretical foundation, proof derivation, speed shortcuts, and distractor traps.
          </p>
        </div>

        {/* Core Theory Body */}
        <div className="space-y-6 text-sm text-slate-200 leading-relaxed">
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>Core Theoretical Principles</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When tackling complex competitive exam questions, the standard fractional method ($1/A + 1/B$) introduces unnecessary arithmetic friction. The <strong className="text-indigo-400">Total Work Unit Method</strong> converts rate-of-work relationships into discrete integers by taking the Least Common Multiple (LCM) of individual completion times.
            </p>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 space-y-2">
              <p className="text-indigo-400 font-bold font-sans">Worked Proof Example:</p>
              <p>• A takes 12 days, B takes 18 days, C takes 24 days.</p>
              <p>• Total Work = LCM(12, 18, 24) = 72 units.</p>
              <p>• Efficiency of A = 72/12 = 6 units/day; B = 4 units/day; C = 3 units/day.</p>
              <p>• Combined daily rate = 6 + 4 + 3 = 13 units/day.</p>
              <p>• Combined completion time = 72 / 13 = 5.53 days (5 days and 7/13 of a day).</p>
            </div>
          </Card>

          {/* Formula Sheet Card */}
          <Card className="border border-indigo-500/30 bg-indigo-950/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Formula Flashcards & Invariants</span>
              </h2>
              <Badge variant="indigo" className="text-[10px]">
                KEY EXAM FORMULAS
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formulas.map((formula, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-100 flex items-start gap-2"
                >
                  <span className="text-indigo-400 font-bold">#{idx + 1}</span>
                  <span>{formula}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Speed Shortcut Method */}
          <Card className="border border-emerald-500/30 bg-emerald-950/15 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Zap className="h-4 w-4" />
              <span>Speed Shortcut & Elimination Technique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {shortcuts}
            </p>
          </Card>

          {/* Common Distractor Pitfalls */}
          <Card className="border border-amber-500/30 bg-amber-950/15 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Trap / Distractor Alert</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {traps}
            </p>
          </Card>
        </div>

        {/* Bottom Practice CTA */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0e1422] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Ready to test your concept mastery?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Solve 10 adaptive questions with step-by-step solutions and timer tracking.
            </p>
          </div>

          <Link href="/practice">
            <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-indigo-600/20">
              <Target className="h-4 w-4" />
              <span>Launch Practice Drill</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
