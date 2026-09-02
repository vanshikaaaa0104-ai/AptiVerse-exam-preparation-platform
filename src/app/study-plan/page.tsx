"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Flame,
  FileCheck2,
  TrendingUp,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  Edit2,
  Save,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TaskItem {
  id: string;
  title: string;
  topic: string;
  section: string;
  type: "PRACTICE" | "THEORY" | "MOCK";
  durationMin: number;
  completed: boolean;
  href: string;
}

export default function StudyPlanPage() {
  const [targetExam, setTargetExam] = useState("CAT 2026");
  const [targetDate, setTargetDate] = useState("2026-11-29");
  const [dailyQuestionGoal, setDailyQuestionGoal] = useState(25);
  const [dailyStudyTimeMin, setDailyStudyTimeMin] = useState(120);
  const [weeklyMockGoal, setWeeklyMockGoal] = useState(2);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  // Calculate days remaining
  const calculateDaysLeft = () => {
    const target = new Date(targetDate);
    const now = new Date();
    const diff = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    return diff;
  };

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "task-1",
      title: "Solve 10 Questions: Time & Work (Weak Area Workout)",
      topic: "Time & Work",
      section: "Quantitative Aptitude",
      type: "PRACTICE",
      durationMin: 20,
      completed: true,
      href: "/quiz/time-work",
    },
    {
      id: "task-2",
      title: "Review 4-Part Concepts: Circular Arrangements & Tournaments",
      topic: "Arrangements",
      section: "DILR",
      type: "THEORY",
      durationMin: 25,
      completed: true,
      href: "/learn/dilr/circular-arrangement",
    },
    {
      id: "task-3",
      title: "Solve Daily Streak Challenge (5 Multi-Discipline Questions)",
      topic: "Daily Sprint",
      section: "All Sections",
      type: "PRACTICE",
      durationMin: 15,
      completed: false,
      href: "/practice/daily",
    },
    {
      id: "task-4",
      title: "Attempt CAT QA Sectional Speed Simulator #01",
      topic: "Full QA",
      section: "Quantitative Aptitude",
      type: "MOCK",
      durationMin: 40,
      completed: false,
      href: "/mocks",
    },
    {
      id: "task-5",
      title: "Review 7 Mistake Book Items in Reading Comprehension",
      topic: "Inference & RC",
      section: "VARC",
      type: "PRACTICE",
      durationMin: 20,
      completed: false,
      href: "/mistakes",
    },
  ]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Personalized Study Plan &amp; Milestones
              </h1>
              <Badge variant="verified">V2.0 AI PLANNER</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Adaptive daily routine, weekly targets, and syllabus completion velocity calibrated for {targetExam}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isEditingGoal ? "accent" : "secondary"}
              size="sm"
              onClick={() => setIsEditingGoal((prev) => !prev)}
              className="gap-2"
            >
              {isEditingGoal ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              <span>{isEditingGoal ? "Save Targets" : "Customize Targets"}</span>
            </Button>
          </div>
        </div>

        {/* Goal Configuration & Exam Countdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] border-indigo-500/20">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-indigo-400" />
                  Target Exam
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-300">Active</span>
              </div>
              {isEditingGoal ? (
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="CAT 2026">CAT 2026</option>
                  <option value="XAT 2026">XAT 2026</option>
                  <option value="NMAT by GMAC 2026">NMAT by GMAC 2026</option>
                  <option value="SNAP 2026">SNAP 2026</option>
                  <option value="MAH MBA CET 2026">MAH MBA CET 2026</option>
                  <option value="CMAT 2026">CMAT 2026</option>
                  <option value="MAT 2026">MAT 2026</option>
                </select>
              ) : (
                <p className="text-xl font-extrabold text-white">{targetExam}</p>
              )}
              <span className="text-[11px] text-slate-400 block">
                Target Date: {new Date(targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  Exam Countdown
                </span>
                <Badge variant="warning" className="text-[9px]">
                  ON TRACK
                </Badge>
              </div>
              <p className="text-2xl font-black text-amber-400">{calculateDaysLeft()} Days Left</p>
              <span className="text-[11px] text-slate-400 block">
                Syllabus Sprint Window: Active
              </span>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  Daily Targets
                </span>
              </div>
              {isEditingGoal ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Questions:</span>
                    <input
                      type="number"
                      value={dailyQuestionGoal}
                      onChange={(e) => setDailyQuestionGoal(Number(e.target.value))}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Minutes:</span>
                    <input
                      type="number"
                      value={dailyStudyTimeMin}
                      onChange={(e) => setDailyStudyTimeMin(Number(e.target.value))}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xl font-extrabold text-white">
                    {dailyQuestionGoal} Qs • {dailyStudyTimeMin} Mins
                  </p>
                  <span className="text-[11px] text-slate-400 block">
                    Current: 16/25 Qs Solved Today
                  </span>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-blue-400" />
                  Weekly Mock Target
                </span>
              </div>
              {isEditingGoal ? (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Mocks/Week:</span>
                  <input
                    type="number"
                    value={weeklyMockGoal}
                    onChange={(e) => setWeeklyMockGoal(Number(e.target.value))}
                    className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white"
                  />
                </div>
              ) : (
                <>
                  <p className="text-xl font-extrabold text-white">
                    {weeklyMockGoal} Mocks / Week
                  </p>
                  <span className="text-[11px] text-slate-400 block">
                    1 of 2 attempted this week
                  </span>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview Card */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-400" />
                  <span>Overall Preparation &amp; Weekly Velocity</span>
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Calculated across syllabus completion, mock test frequency, and daily solving discipline.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Daily Task Completion</span>
                  <span className="text-sm font-bold text-indigo-400">
                    {completedCount} of {totalTasks} Tasks ({progressPercent}%)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressPercent} className="h-2.5 bg-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Quant Mastery</span>
                <span className="text-sm font-bold text-emerald-400">68% Complete</span>
                <span className="text-[10px] text-slate-500 block">Arithmetic &amp; Algebra</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">DILR Sets</span>
                <span className="text-sm font-bold text-indigo-400">54% Complete</span>
                <span className="text-[10px] text-slate-500 block">Focus: Games &amp; Tournaments</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">VARC Accuracy</span>
                <span className="text-sm font-bold text-amber-400">76% Accuracy</span>
                <span className="text-[10px] text-slate-500 block">Focus: Inference Passages</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span>Today&apos;s Action Tasks</span>
              </h2>
              <p className="text-xs text-slate-400">
                Complete daily curated tasks to hit your target percentile benchmark.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {tasks.filter((t) => !t.completed).length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  task.completed
                    ? "bg-slate-950/40 border-slate-800/60 opacity-80"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-500 hover:text-indigo-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <p
                      className={`text-sm font-semibold transition-all ${
                        task.completed ? "line-through text-slate-400" : "text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <Badge
                        variant={
                          task.type === "MOCK"
                            ? "default"
                            : task.type === "PRACTICE"
                            ? "indigo"
                            : "verified"
                        }
                        className="text-[9px]"
                      >
                        {task.type}
                      </Badge>
                      <span>{task.section}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.durationMin} mins
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Link href={task.href}>
                    <Button
                      variant={task.completed ? "outline" : "accent"}
                      size="sm"
                      className="text-xs h-8 gap-1.5"
                    >
                      <span>{task.completed ? "Review Again" : "Start Task"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
