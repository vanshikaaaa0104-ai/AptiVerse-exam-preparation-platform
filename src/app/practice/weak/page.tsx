"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Target, Clock, ArrowRight, BookOpen, RotateCcw, CheckCircle2, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WeakAreaWorkoutPage() {
  const weakTopics = [
    {
      topic: "Time & Work",
      section: "Quantitative Aptitude",
      accuracy: 48,
      attempts: 14,
      avgTime: "2m 15s",
      targetBenchmark: "1m 45s",
      recommendedAction: "Review LCM Work Units Method & Practice 10 Medium questions.",
      slug: "time-work",
    },
    {
      topic: "Linear & Circular Arrangements",
      section: "Logical Reasoning",
      accuracy: 53,
      attempts: 18,
      avgTime: "2m 40s",
      targetBenchmark: "2m 00s",
      recommendedAction: "Review Alternate Facing In/Out deduction rules & 2-Variable Grids.",
      slug: "arrangements",
    },
    {
      topic: "Para Jumbles & Coherence",
      section: "Verbal Ability",
      accuracy: 57,
      attempts: 21,
      avgTime: "1m 50s",
      targetBenchmark: "1m 30s",
      recommendedAction: "Practice Mandatory Pronoun Pairing & Acronym-Chronology identification.",
      slug: "para-jumbles",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/practice" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Practice Hub</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Weak Area Workouts
              </h1>
              <Badge variant="warning">AUTOMATED DIAGNOSTICS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Deterministic remediation sets targeting your sub-60% accuracy topics to maximize percentile gain.
            </p>
          </div>

          <Link href="/quiz/weak-drill-01">
            <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
              <Target className="h-4 w-4" />
              <span>Launch Combined 10-Q Workout</span>
            </Button>
          </Link>
        </div>

        {/* Weak Topic Cards */}
        <div className="space-y-4">
          {weakTopics.map((item, idx) => (
            <Card
              key={idx}
              className="border border-slate-800 bg-[#0e1422] p-5 sm:p-6 hover:border-amber-500/40 transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.topic}
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {item.section}
                    </span>
                    <Badge variant="destructive" className="text-[10px] font-mono">
                      {item.accuracy}% Accuracy
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.recommendedAction}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span>Attempts: <strong className="text-white">{item.attempts}</strong></span>
                    <span>Avg Time: <strong className="text-amber-400">{item.avgTime}</strong></span>
                    <span>Target: <strong className="text-emerald-400">{item.targetBenchmark}</strong></span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <Link href={`/learn/quant/${item.slug}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Revise Theory</span>
                    </Button>
                  </Link>
                  <Link href={`/quiz/drill-${item.slug}`}>
                    <Button variant="default" size="sm" className="gap-1.5 text-xs">
                      <Target className="h-3.5 w-3.5" />
                      <span>Start Drill</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
