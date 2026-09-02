"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Target,
  Users,
  Layers,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Plus,
  Settings,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Activity,
  Flame,
  Award,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Total Registered Aspirants", value: "4,120", change: "+340 this month", icon: Users, color: "text-blue-400" },
    { label: "Daily Active Students", value: "1,480", change: "68% daily retention", icon: Activity, color: "text-emerald-400" },
    { label: "Total Tests Attempted", value: "28,940", change: "+2,180 this week", icon: Target, color: "text-indigo-400" },
    { label: "Platform Average Score", value: "68.4%", change: "+3.2% cohort growth", icon: TrendingUp, color: "text-amber-400" },
  ];

  const examPopularity = [
    { exam: "CAT 2026", attempts: "12,450", share: 43, color: "bg-indigo-500" },
    { exam: "SNAP 2026", attempts: "5,120", share: 18, color: "bg-purple-500" },
    { exam: "NMAT 2026", attempts: "4,300", share: 15, color: "bg-emerald-500" },
    { exam: "XAT 2026", attempts: "3,890", share: 13, color: "bg-amber-500" },
    { exam: "MAH MBA CET", attempts: "1,820", share: 6, color: "bg-cyan-500" },
    { exam: "CMAT 2026", attempts: "860", share: 3, color: "bg-rose-500" },
    { exam: "MAT 2026", attempts: "500", share: 2, color: "bg-slate-500" },
  ];

  const commonWeakTopics = [
    { topic: "Time & Work (Alternating cycles)", section: "Quantitative Aptitude", avgAccuracy: "42%", failRate: "58%" },
    { topic: "Games & Tournaments (Knockout/Round-Robin)", section: "Logical Reasoning", avgAccuracy: "46%", failRate: "54%" },
    { topic: "Inference & Author's Implicit Bias", section: "VARC", avgAccuracy: "51%", failRate: "49%" },
    { topic: "Circular Arrangements with Facing In/Out", section: "Logical Reasoning", avgAccuracy: "53%", failRate: "47%" },
    { topic: "Permutation & Combination (Derangements)", section: "Modern Math", avgAccuracy: "48%", failRate: "52%" },
  ];

  const hardestQuestions = [
    { code: "Q-CAT-QA-109", topic: "Work & Efficiency Pipes", difficulty: "Hard", wrongRate: "68%", attempts: 1840 },
    { code: "Q-XAT-DM-204", topic: "Ethical Whistleblower Dilemma", difficulty: "Hard", wrongRate: "64%", attempts: 1210 },
    { code: "Q-SNAP-LR-312", topic: "12-Person Dual-Row Arrangement", difficulty: "Hard", wrongRate: "61%", attempts: 1950 },
    { code: "Q-NMAT-LS-401", topic: "Complex Cloze Passage Idioms", difficulty: "Hard", wrongRate: "59%", attempts: 1420 },
  ];

  return (
    <AppShell userRole="ADMIN">
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Admin &amp; Academic Governance Suite
              </h1>
              <Badge variant="warning">AptiVerse V2.0 Admin</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cohorts telemetry, question proofing workflows, syllabus weightages, and 7-exam simulators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/questions/new">
              <Button variant="accent" size="sm" className="gap-1.5 shadow-md shadow-indigo-600/20">
                <Plus className="h-4 w-4" />
                <span>Author New Question</span>
              </Button>
            </Link>
            <Link href="/admin/verification">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Audit Queue (12)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 KPI Cohort Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <Card key={idx} className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{s.label}</span>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-white font-mono">{s.value}</p>
              <p className="text-[11px] text-slate-400 font-medium">{s.change}</p>
            </Card>
          ))}
        </div>

        {/* Exam Popularity & Cohort Weak Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Most Attempted Exams (6 Cols) */}
          <Card className="lg:col-span-6 border border-slate-800 bg-[#0e1422] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Most Attempted Examinations</h3>
                <p className="text-xs text-slate-400">Distribution of mock and sectional tests across 7 target exams</p>
              </div>
              <Badge variant="indigo" className="text-[10px]">ALL 7 EXAMS</Badge>
            </div>

            <div className="space-y-3.5">
              {examPopularity.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{item.exam}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {item.attempts} attempts ({item.share}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Common Weak Topics across Cohort (6 Cols) */}
          <Card className="lg:col-span-6 border border-slate-800 bg-[#0e1422] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Cohort Weak Topic Bottlenecks</h3>
                <p className="text-xs text-slate-400">High failure rate topics requiring curriculum reinforcement</p>
              </div>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>

            <div className="space-y-2.5">
              {commonWeakTopics.map((wt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{wt.topic}</p>
                    <p className="text-[10px] text-slate-400">{wt.section}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-[10px] font-mono">
                      {wt.failRate} Error Rate
                    </Badge>
                    <p className="text-[10px] text-slate-400 mt-0.5">Avg: {wt.avgAccuracy}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Most Difficult Questions in Question Bank */}
        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Most Challenging Canonical Questions</h3>
              <p className="text-xs text-slate-400">Questions with lowest completion rates across student diagnostic runs</p>
            </div>
            <Link href="/admin/questions">
              <Button variant="ghost" size="sm" className="text-xs text-indigo-400 hover:text-indigo-300">
                View Full Bank (1,240) →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {hardestQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-indigo-400 font-bold">{q.code}</span>
                    <Badge variant="destructive" className="text-[10px]">{q.difficulty}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-white line-clamp-1">{q.topic}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{q.attempts} Attempts</span>
                  <span className="text-rose-400 font-bold">{q.wrongRate} Wrong</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Admin Navigation Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                4-Stage Verification Queue
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review and approve draft questions with mandatory 10-point mathematical proof and copyright clearance checklists.
              </p>
            </div>
            <Link href="/admin/verification">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Open Verification Queue</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                Question Bank Repository
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter and inspect 1,240+ questions across Quant, DILR, VARC, and exam specialists with tag taxonomies.
              </p>
            </div>
            <Link href="/admin/questions">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Manage Questions</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Mock Test Builder
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assemble official exam version blueprints, configure locked sectional timers, and deploy live all-India full mocks.
              </p>
            </div>
            <Link href="/admin/mock-tests">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Mock Assembler</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
