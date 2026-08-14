"use client";

import React from "react";
import Link from "next/link";
import {
  Target,
  Flame,
  Zap,
  Sliders,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PracticeHubPage() {
  const modes = [
    {
      id: "weak",
      title: "Targeted Weak Area Workout",
      desc: "Instant 10-question drill dynamically generated from your <60% accuracy topics (Time & Work, Arrangements, Para Jumbles).",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      badge: "AI RECOMMENDED",
      badgeVariant: "warning" as const,
      href: "/practice/weak",
      stats: "10 Questions • ~18 Mins",
    },
    {
      id: "daily",
      title: "Daily Streak Challenge",
      desc: "5 curated questions across QA, DILR, and VARC to maintain your 12-day active streak and earn +150 bonus XP.",
      icon: Flame,
      color: "text-red-400 bg-red-500/10 border-red-500/30",
      badge: "ACTIVE TODAY",
      badgeVariant: "success" as const,
      href: "/practice/daily",
      stats: "5 Questions • ~8 Mins",
    },
    {
      id: "custom",
      title: "Custom Drill Builder",
      desc: "Customize your own drill: filter by specific subtopics, choose difficulty (Easy, Medium, Hard), and toggle timer mode.",
      icon: Sliders,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      badge: "FLEXIBLE",
      badgeVariant: "indigo" as const,
      href: "/practice/custom",
      stats: "Configurable Parameters",
    },
    {
      id: "previous-year",
      title: "Verified Previous Year Papers",
      desc: "Practice with authentic past entrance exam sets categorized by year and slot with full 4-part solutions.",
      icon: FileCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      badge: "AUTHENTIC",
      badgeVariant: "verified" as const,
      href: "/practice/previous-year",
      stats: "CAT / XAT / SNAP Sets",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Practice & Workout Hub
              </h1>
              <Badge variant="indigo">ADAPTIVE DRILLS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your practice modality: strengthen weak topics, build speed, or customize difficulty-scaled sets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/quiz/demo-drill-01">
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <Target className="h-4 w-4" />
                <span>Instant 10-Q Sprint</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Practice Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              className="border border-slate-800 bg-[#0e1422] flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl border ${mode.color}`}>
                    <mode.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={mode.badgeVariant} className="text-[10px]">
                    {mode.badge}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {mode.title}
                  </CardTitle>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                    {mode.stats}
                  </span>
                </div>

                <CardDescription className="text-xs text-slate-300 leading-relaxed">
                  {mode.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <Link href={mode.href}>
                  <Button variant="default" className="w-full justify-between group">
                    <span>Launch Mode</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
