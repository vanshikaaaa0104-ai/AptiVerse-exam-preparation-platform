"use client";

import React from "react";
import Link from "next/link";
import { Award, Flame, Target, Trophy, Zap, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AchievementsPage() {
  const achievements = [
    {
      id: "streak-7",
      title: "7-Day Consistency Warrior",
      desc: "Complete daily practice goals for 7 consecutive days.",
      unlocked: true,
      xp: 200,
      tier: "GOLD",
      icon: Flame,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      id: "first-mock",
      title: "First National Mock Complete",
      desc: "Finish a full 120-minute timed CAT simulator with evaluation.",
      unlocked: true,
      xp: 300,
      tier: "PLATINUM",
      icon: Trophy,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
    {
      id: "100-questions",
      title: "Centurion (100 Questions Solved)",
      desc: "Solve 100 verified aptitude questions across QA, DILR, and VARC.",
      unlocked: true,
      xp: 250,
      tier: "GOLD",
      icon: Target,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    },
    {
      id: "quant-master",
      title: "Arithmetic Speed Master",
      desc: "Achieve >85% accuracy in 5 consecutive Arithmetic speed drills.",
      unlocked: true,
      xp: 250,
      tier: "SILVER",
      icon: Zap,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      id: "streak-30",
      title: "30-Day Relentless Streak",
      desc: "Solve questions for 30 consecutive days without missing a beat.",
      unlocked: false,
      progress: "12 / 30 Days",
      xp: 500,
      tier: "DIAMOND",
      icon: Flame,
      color: "text-slate-500 bg-slate-900 border-slate-800",
    },
    {
      id: "99-percentile-mock",
      title: "The 99th Club",
      desc: "Score 99.0+ percentile in any verified national full mock test.",
      unlocked: false,
      progress: "Current Best: 98.4 %ile",
      xp: 1000,
      tier: "DIAMOND",
      icon: Award,
      color: "text-slate-500 bg-slate-900 border-slate-800",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Header & Level Progress Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    Level 4 Preparation Scholar
                  </h1>
                  <Badge variant="indigo">TIER 2</Badge>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  2,450 Total Earned XP • 550 XP to Level 5
                </p>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-2xl font-bold text-indigo-400">2,450 XP</span>
              <p className="text-[10px] text-slate-400 uppercase font-sans">Lifetime Points</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Level 5 Progress (3,000 XP Goal)</span>
              <span className="font-mono font-bold text-white">81.6%</span>
            </div>
            <Progress value={81.6} className="h-2.5" />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              className={`border p-5 space-y-4 flex flex-col justify-between ${
                ach.unlocked
                  ? "border-slate-800 bg-[#0e1422]"
                  : "border-slate-800/60 bg-[#0b0f19]/80 opacity-75"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl border ${ach.color}`}>
                    <ach.icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={ach.unlocked ? "verified" : "outline"} className="text-[10px]">
                      {ach.tier}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      +{ach.xp} XP
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.desc}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {ach.unlocked ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Unlocked
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" /> {ach.progress}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
