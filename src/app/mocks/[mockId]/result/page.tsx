"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Target,
  ArrowRight,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";
import confetti from "canvas-confetti";

export default function MockResultAnalysisPage({
  params,
}: {
  params: Promise<{ mockId: string }>;
}) {
  const resolvedParams = use(params);
  const questions = SAMPLE_VERIFIED_QUESTIONS;

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.55 },
      });
    } catch {
      // Ignored
    }
  }, []);

  const sectionalPerformance = [
    {
      name: "Verbal Ability & Reading Comprehension (VARC)",
      score: 34,
      maxScore: 72,
      accuracy: 78,
      percentile: "97.8 %ile",
      correct: 12,
      incorrect: 2,
      unattempted: 10,
      timeSpent: "38m 20s",
    },
    {
      name: "Data Interpretation & Logical Reasoning (DILR)",
      score: 22,
      maxScore: 60,
      accuracy: 71,
      percentile: "96.4 %ile",
      correct: 8,
      incorrect: 2,
      unattempted: 10,
      timeSpent: "39m 50s",
    },
    {
      name: "Quantitative Aptitude (QA)",
      score: 30,
      maxScore: 66,
      accuracy: 83,
      percentile: "98.9 %ile",
      correct: 11,
      incorrect: 3,
      unattempted: 8,
      timeSpent: "39m 10s",
    },
  ];

  const totalScore = sectionalPerformance.reduce((acc, s) => acc + s.score, 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Hero Banner: Estimated Percentile & Overall Score */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    CAT 2026 National Mock #01 Evaluation
                  </h1>
                  <Badge variant="verified">OFFICIAL EVALUATION</Badge>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Simulated under strict 40-min locked sectional parameters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/mocks">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Mocks Catalog</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="accent" size="sm" className="gap-1.5 text-xs">
                  <span>Back to Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Percentile & Score Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Scaled Percentile</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">98.4 %ile</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Total Raw Score</p>
              <p className="text-2xl font-extrabold text-indigo-400 mt-0.5">
                {totalScore} <span className="text-xs text-slate-400 font-normal">/ 198</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Overall Accuracy</p>
              <p className="text-2xl font-extrabold text-blue-400 mt-0.5">78.9%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Total Attempts</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">38 / 66 Qs</p>
            </div>
          </div>
        </div>

        {/* Section-by-Section Performance Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Sectional Performance & Cutoff Benchmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sectionalPerformance.map((sec, idx) => (
              <Card
                key={idx}
                className="border border-slate-800 bg-[#0e1422] p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-bold text-white">{sec.name.split("(")[0]}</h3>
                    <Badge variant="indigo" className="font-mono text-[10px]">
                      {sec.percentile}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-xs text-slate-400">Score</span>
                    <span className="text-lg font-bold text-white">
                      {sec.score} <span className="text-xs text-slate-400 font-normal">/ {sec.maxScore}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Accuracy</span>
                      <span className="font-mono font-bold text-emerald-400">{sec.accuracy}%</span>
                    </div>
                    <Progress value={sec.accuracy} indicatorClassName="bg-emerald-500" className="h-1.5" />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-center pt-2 border-t border-slate-800">
                    <div className="p-1 rounded bg-slate-900/60 text-emerald-400">
                      {sec.correct} Correct
                    </div>
                    <div className="p-1 rounded bg-slate-900/60 text-red-400">
                      {sec.incorrect} Wrong
                    </div>
                    <div className="p-1 rounded bg-slate-900/60 text-slate-400">
                      {sec.unattempted} Skipped
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Time Used: <strong className="text-white font-mono">{sec.timeSpent}</strong></span>
                  <span className="text-emerald-400 font-semibold">Cutoff Cleared ✓</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Question Solutions & Shortcuts</h2>
              <p className="text-xs text-slate-400">Review 4-part solutions and shortcuts for every question</p>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <Card key={q.id} className="border border-slate-800 bg-[#0e1422] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">Q#{idx + 1}</span>
                    <Badge variant="secondary" className="text-[10px]">{q.difficulty}</Badge>
                    <Badge variant="indigo" className="text-[10px]">{q.topicSlug}</Badge>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Answer: Option {q.correctAnswer}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white font-medium">{q.questionText}</p>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-indigo-400 font-sans">Speed Shortcut:</p>
                  <p className="leading-relaxed">{q.solution.shortcutMethod}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
