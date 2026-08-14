"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  BarChart2,
  Layers,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const accuracyTrendData = [
  { day: "Mon", accuracy: 62, target: 75, questions: 22 },
  { day: "Tue", accuracy: 68, target: 75, questions: 28 },
  { day: "Wed", accuracy: 64, target: 75, questions: 25 },
  { day: "Thu", accuracy: 74, target: 75, questions: 30 },
  { day: "Fri", accuracy: 71, target: 75, questions: 26 },
  { day: "Sat", accuracy: 82, target: 75, questions: 35 },
  { day: "Sun", accuracy: 78, target: 75, questions: 32 },
];

const speedBenchmarkData = [
  { topic: "Percentages", actualSec: 85, benchmarkSec: 90 },
  { topic: "Time & Work", actualSec: 135, benchmarkSec: 105 },
  { topic: "Arrangements", actualSec: 160, benchmarkSec: 120 },
  { topic: "Para Jumbles", actualSec: 110, benchmarkSec: 90 },
  { topic: "RC Inference", actualSec: 95, benchmarkSec: 100 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sections">("overview");

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Top Welcome Banner & Daily Motivation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Good morning, Aman 👋
              </h1>
              <Badge variant="verified" className="text-[10px]">
                CAT 2026 Aspirant
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ready for today&apos;s challenge? You are on a <span className="text-amber-400 font-semibold">12-day streak</span>. Complete 9 more questions to hit your daily goal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/practice/daily">
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <Flame className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
                <span>Solve Daily Challenge</span>
              </Button>
            </Link>
            <Link href="/mocks/cat-2026-national-full-mock-01/instructions">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Launch Full Mock #01</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Row 1: Daily Goal, Exam Readiness, Continue Learning */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          {/* Today's Goal Card (4 Cols) */}
          <Card className="lg:col-span-4 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 via-[#0e1422] to-[#0e1422] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Target className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base font-semibold">Today&apos;s Goal</CardTitle>
                </div>
                <Badge variant="indigo" className="text-[11px] font-mono font-bold">
                  16 / 25 Qs
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400 pt-1">
                Maintain consistency to compound your exam speed and accuracy.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Daily Target Completion</span>
                  <span className="text-indigo-400 font-mono">64%</span>
                </div>
                <Progress value={64} className="h-2.5" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Streak</p>
                    <p className="text-xs font-bold text-white">12 Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Zap className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">XP Today</p>
                    <p className="text-xs font-bold text-white">+180 XP</p>
                  </div>
                </div>
              </div>

              <Link href="/practice" className="block pt-1">
                <Button variant="default" className="w-full justify-between group">
                  <span>Continue Practice Session</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Target Exam Readiness (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0e1422] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">CAT 2026 Readiness</CardTitle>
                    <Badge variant="verified" className="text-[10px]">VERIFIED</Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400 pt-0.5">
                    Sectional mastery benchmarked against 99th percentile cutoff criteria.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-indigo-400 font-mono">68%</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Overall Index</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3.5">
              {/* Section 1: QA */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Quantitative Aptitude (QA)</span>
                  <span className="text-emerald-400 font-bold font-mono">72% Mastery</span>
                </div>
                <Progress value={72} indicatorClassName="bg-emerald-500" className="h-2" />
              </div>

              {/* Section 2: DILR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Data Interpretation & LR (DILR)</span>
                  <span className="text-amber-400 font-bold font-mono">61% Mastery</span>
                </div>
                <Progress value={61} indicatorClassName="bg-amber-500" className="h-2" />
              </div>

              {/* Section 3: VARC */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Verbal Ability & RC (VARC)</span>
                  <span className="text-indigo-400 font-bold font-mono">74% Mastery</span>
                </div>
                <Progress value={74} indicatorClassName="bg-indigo-500" className="h-2" />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Target Mock Score: <strong className="text-white">92 / 198</strong></span>
                <Link href="/analytics/sections" className="text-indigo-400 hover:underline font-medium">
                  View Detailed Breakdown →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning Widget (3 Cols) */}
          <Card className="lg:col-span-3 border border-slate-800 bg-[#0e1422] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">IN PROGRESS</Badge>
                <span className="text-[11px] font-mono text-slate-400">Topic 4 of 12</span>
              </div>
              <CardTitle className="text-base font-semibold pt-1">Percentages</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Arithmetic • Successive changes & faulty balances
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Modules Completed</span>
                  <span className="font-mono font-bold text-white">7 / 15</span>
                </div>
                <Progress value={(7 / 15) * 100} className="h-2" />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">Next: Successive Discount Multipliers & Mental Hacks</span>
              </div>

              <Link href="/learn/quant/percentages" className="block">
                <Button variant="secondary" size="sm" className="w-full justify-center gap-1.5">
                  <span>Resume Module</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bento Grid Row 2: Next Best Action Banner & Weak Area Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Actionable Next Step Recommendation (7 Cols) */}
          <Card className="lg:col-span-7 border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0e1422] to-[#0e1422]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-white">
                      Recommended Next Action
                    </CardTitle>
                    <p className="text-[11px] text-amber-400/90 font-medium">
                      Automated Pedagogical Remediation
                    </p>
                  </div>
                </div>
                <Badge variant="warning" className="text-[10px]">
                  HIGH PRIORITY
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You are currently struggling with <strong className="text-white">Time & Work (48% Accuracy)</strong> and your average solving time is <strong className="text-amber-400 font-mono">2m 15s</strong> (benchmark: 1m 45s).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                    Step 1: Revise Theory
                  </p>
                  <p className="text-xs text-white font-medium">
                    LCM Units & Alternating Days Protocol
                  </p>
                  <p className="text-[10px] text-slate-400">Estimated duration: 8 minutes</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Step 2: Solve Drill
                  </p>
                  <p className="text-xs text-white font-medium">
                    10 Medium Target Questions
                  </p>
                  <p className="text-[10px] text-slate-400">Target accuracy: &gt; 80%</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/learn/quant/time-work">
                  <Button variant="default" size="sm" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Revise Concept (8 min)</span>
                  </Button>
                </Link>
                <Link href="/practice/weak">
                  <Button variant="accent" size="sm" className="gap-2">
                    <Target className="h-4 w-4" />
                    <span>Start 10-Question Drill</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas List (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0e1422]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base font-semibold">Priority Weak Areas</CardTitle>
                </div>
                <Link href="/mistakes" className="text-xs text-indigo-400 hover:underline">
                  Mistake Book (7) →
                </Link>
              </div>
              <CardDescription className="text-xs text-slate-400">
                Topics with accuracy &lt; 60% across the last 30 attempts.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Time & Work</p>
                  <p className="text-[10px] text-slate-400">Quantitative Aptitude • 14 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-[10px] font-mono">
                    48% Acc
                  </Badge>
                  <Link href="/practice/weak">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Linear & Circular Arrangements</p>
                  <p className="text-[10px] text-slate-400">Logical Reasoning • 18 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" className="text-[10px] font-mono">
                    53% Acc
                  </Badge>
                  <Link href="/practice/weak">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Para Jumbles & Coherence</p>
                  <p className="text-[10px] text-slate-400">Verbal Ability • 21 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" className="text-[10px] font-mono">
                    57% Acc
                  </Badge>
                  <Link href="/practice/weak">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bento Grid Row 3: Performance Telemetry (Accuracy Trend & Pace Benchmark) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Accuracy Trend Chart (7 Cols) */}
          <Card className="lg:col-span-7 border border-slate-800 bg-[#0e1422] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">7-Day Accuracy Trend</h3>
                <p className="text-xs text-slate-400">Daily practice accuracy vs 75% target benchmark</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-indigo-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Accuracy %
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-slate-600"></span> Target (75%)
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" textAnchor="middle" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0f19",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#accuracyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Solving Pace vs Benchmark (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0e1422] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Solving Pace (Seconds)</h3>
                <p className="text-xs text-slate-400">Actual average time vs Target benchmark</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                TELEMETRY
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speedBenchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="topic" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0f19",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="actualSec" name="Actual Time (s)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmarkSec" name="Benchmark (s)" fill="#64748b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
