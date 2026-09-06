"use client";

import React, { useState, useEffect } from "react";
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
  Calendar,
  Compass,
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
import { getStoredCurrentUser, UserProfile } from "@/lib/auth-storage";

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
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser();
    }
    return null;
  });

  // Compute countdown to target exam
  const calculateDaysLeft = (targetDateStr?: string) => {
    if (!targetDateStr) return 88;
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 88;
  };

  const daysLeft = calculateDaysLeft(user?.targetDate);
  const examName = user?.targetExamName || (user?.targetExam ? user.targetExam.toUpperCase() + " 2026" : "CAT 2026");
  const studentFirstName = user?.name ? user.name.split(" ")[0] : "Student";
  const dailyGoal = user?.dailyQuestionGoal || 25;
  const completedToday = Math.min(16, dailyGoal);
  const completionPercent = Math.round((completedToday / dailyGoal) * 100);

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Top Welcome Banner & Daily Motivation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                Good morning, {studentFirstName} 👋
              </h1>
              <Badge variant="verified" className="text-[10px]">
                {examName} Aspirant
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
              {daysLeft} days remaining for {examName}. You are on a{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">{user?.currentStreak || 12}-day streak 🔥</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/practice/daily">
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <Flame className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
                <span>Solve Daily Challenge</span>
              </Button>
            </Link>
            <Link href={`/exams/${user?.targetExam || "cat"}`}>
              <Button variant="secondary" size="sm" className="gap-2">
                <Compass className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span>Explore {examName} Syllabus</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Row 1: Daily Goal, Exam Readiness, Continue Learning */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          {/* Today's Goal Card (4 Cols) */}
          <Card className="lg:col-span-4 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.05] dark:from-indigo-950/20 via-transparent to-transparent flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="neu-icon text-indigo-600 dark:text-indigo-400 shadow-indigo-500/20">
                    <Target className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base font-semibold font-heading text-slate-900 dark:text-white">Today&apos;s Goal</CardTitle>
                </div>
                <Badge variant="indigo" className="text-[11px] font-mono font-bold">
                  {completedToday} / {dailyGoal} Qs
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-700 dark:text-slate-300 pt-1">
                Maintain consistency to compound your exam speed and accuracy.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">Daily Target Completion</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">{completionPercent}%</span>
                </div>
                <Progress value={completionPercent} className="h-2.5" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl neu-stat">
                  <Flame className="h-4 w-4 text-amber-500 dark:text-amber-400 fill-amber-400" />
                  <div>
                    <p className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider">Streak</p>
                    <p className="text-xs font-bold font-mono text-slate-900 dark:text-white">{user?.currentStreak || 12} Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl neu-stat">
                  <Zap className="h-4 w-4 text-indigo-500 dark:text-indigo-400 fill-indigo-400" />
                  <div>
                    <p className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider">XP Today</p>
                    <p className="text-xs font-bold font-mono text-slate-900 dark:text-white">+{user?.totalXp || 2450} XP</p>
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
          <Card className="lg:col-span-5 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold font-heading text-slate-900 dark:text-white">{examName} Readiness</CardTitle>
                    <Badge variant="verified" className="text-[10px]">99th Percentile Goal</Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-700 dark:text-slate-300 pt-0.5">
                    Sectional mastery benchmarked against target cutoff criteria.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">68%</span>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 uppercase font-bold tracking-wider">Overall Index</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Quantitative Aptitude</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">72% Mastery</span>
                </div>
                <Progress value={72} indicatorClassName="bg-emerald-500" className="h-2" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Logical Reasoning &amp; DI</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">61% Mastery</span>
                </div>
                <Progress value={61} indicatorClassName="bg-amber-500" className="h-2" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Verbal Ability &amp; RC</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">74% Mastery</span>
                </div>
                <Progress value={74} indicatorClassName="bg-indigo-500" className="h-2" />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800/80">
                <span>Questions Solved: <strong className="text-slate-900 dark:text-white font-mono">{user?.questionsAttempted || 348}</strong></span>
                <Link href="/analytics" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                  Detailed Analytics →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning Widget (3 Cols) */}
          <Card className="lg:col-span-3 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">CONTINUE LEARNING</Badge>
                <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-medium">In Progress</span>
              </div>
              <CardTitle className="text-base font-semibold font-heading text-slate-900 dark:text-white pt-1">
                {user?.lastTopic?.title || "Time & Work – Pipes & Cisterns"}
              </CardTitle>
              <CardDescription className="text-xs text-slate-700 dark:text-slate-300">
                {user?.lastTopic?.section || "Quantitative Aptitude"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Module Progress</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{user?.lastTopic?.progress || 60}%</span>
                </div>
                <Progress value={user?.lastTopic?.progress || 60} className="h-2" />
              </div>

              <div className="p-3 rounded-xl glass-subtle text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">Next: Alternating work cycles & negative efficiency traps</span>
              </div>

              <Link href={user?.lastTopic?.href || "/quiz/time-work"} className="block">
                <Button variant="secondary" size="sm" className="w-full justify-center gap-1.5">
                  <span>Resume Learning</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bento Grid Row 2: Next Best Action Banner & Weak Area Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Actionable Next Step Recommendation (7 Cols) */}
          <Card className="lg:col-span-7 border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.05] dark:from-amber-950/10 via-transparent to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="neu-icon text-amber-500 dark:text-amber-400 shadow-amber-500/20">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold font-heading text-slate-900 dark:text-white">
                      Recommended for You
                    </CardTitle>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400/90 font-medium">
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
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                You are currently struggling with <strong className="text-slate-900 dark:text-white">Time &amp; Work (48% Accuracy)</strong> and your average solving time is <strong className="text-amber-600 dark:text-amber-400 font-mono">2m 15s</strong> (benchmark: 1m 45s).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl glass-subtle space-y-1">
                  <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Step 1: Revise Theory
                  </p>
                  <p className="text-xs text-slate-900 dark:text-white font-medium">
                    LCM Units &amp; Alternating Days Protocol
                  </p>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">Estimated duration: 8 minutes</p>
                </div>

                <div className="p-3 rounded-xl glass-subtle space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Step 2: Solve Drill
                  </p>
                  <p className="text-xs text-slate-900 dark:text-white font-medium">
                    10 Medium Target Questions
                  </p>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">Target accuracy: &gt; 80%</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/learn/quant/time-work">
                  <Button variant="default" size="sm" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Revise Concept (8 min)</span>
                  </Button>
                </Link>
                <Link href="/quiz/time-work">
                  <Button variant="accent" size="sm" className="gap-2">
                    <Target className="h-4 w-4" />
                    <span>Start 10-Question Drill</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas List (5 Cols) */}
          <Card className="lg:col-span-5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  <CardTitle className="text-base font-semibold font-heading text-slate-900 dark:text-white">Priority Weak Areas</CardTitle>
                </div>
                <Link href="/mistakes" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                  Mistake Book (7) →
                </Link>
              </div>
              <CardDescription className="text-xs text-slate-700 dark:text-slate-300">
                Topics with accuracy &lt; 60% across recent diagnostic sessions.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl glass-subtle">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Time &amp; Work</p>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">Quantitative Aptitude • 14 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-[10px] font-mono">
                    48% Acc
                  </Badge>
                  <Link href="/quiz/time-work">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-600 dark:text-indigo-400">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl glass-subtle">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Linear &amp; Circular Arrangements</p>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">Logical Reasoning • 18 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" className="text-[10px] font-mono">
                    53% Acc
                  </Badge>
                  <Link href="/quiz/linear-arrangements">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-600 dark:text-indigo-400">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl glass-subtle">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Para Jumbles &amp; Coherence</p>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">Verbal Ability • 21 Attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" className="text-[10px] font-mono">
                    57% Acc
                  </Badge>
                  <Link href="/quiz/para-jumbles">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-600 dark:text-indigo-400">
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
          <Card className="lg:col-span-7 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold font-heading text-slate-900 dark:text-white">7-Day Accuracy Trend</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">Daily practice accuracy vs 75% target benchmark</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Accuracy %
                </span>
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600"></span> Target (75%)
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
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis dataKey="day" stroke="#475569" textAnchor="middle" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#475569" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      borderColor: "var(--border)",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "var(--foreground)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
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
          <Card className="lg:col-span-5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold font-heading text-slate-900 dark:text-white">Solving Pace (Seconds)</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">Actual average time vs Target benchmark</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                TELEMETRY
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speedBenchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis dataKey="topic" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      borderColor: "var(--border)",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "var(--foreground)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                  <Bar dataKey="actualSec" name="Actual Time (s)" fill="#6366f1" radius={[4, 4, 0, 0]} />
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
