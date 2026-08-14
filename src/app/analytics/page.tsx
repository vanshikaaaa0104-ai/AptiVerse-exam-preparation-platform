"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  Zap,
  Flame,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const accuracyHistory = [
  { test: "Drill 1", acc: 60 },
  { test: "Drill 2", acc: 68 },
  { test: "Drill 3", acc: 64 },
  { test: "Drill 4", acc: 75 },
  { test: "Mock 1", acc: 72 },
  { test: "Drill 5", acc: 84 },
  { test: "Drill 6", acc: 80 },
  { test: "Full Mock 1", acc: 78.9 },
];

const difficultyData = [
  { level: "Easy", accuracy: 91, attempted: 120, avgTimeSec: 65 },
  { level: "Medium", accuracy: 74, attempted: 165, avgTimeSec: 105 },
  { level: "Hard", accuracy: 56, attempted: 63, avgTimeSec: 150 },
];

export default function AnalyticsOverviewPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Performance Analytics & Mastery
              </h1>
              <Badge variant="indigo">TELEMETRY ENGINE</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Precision diagnostics tracking accuracy, solving pace, difficulty scaling, and topic-wise mastery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/analytics/topics">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>Mastery Heatmap</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Overall Accuracy</span>
              <Target className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">75.4%</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3 w-3" /> +4.2% this week
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Questions Solved</span>
              <Layers className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">348 Qs</p>
            <p className="text-[11px] text-slate-400">
              Goal: <strong className="text-white">500 Qs</strong> by Sunday
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Avg Solving Pace</span>
              <Clock className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">1m 42s</p>
            <p className="text-[11px] text-slate-400">
              Target: <strong className="text-emerald-400">1m 30s</strong>
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>CAT Mock Percentile</span>
              <Award className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-2xl font-extrabold text-purple-400 font-mono">98.4 %ile</p>
            <p className="text-[11px] text-slate-400">National Full Mock #01</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Historical Progression Trend */}
          <Card className="lg:col-span-8 border border-slate-800 bg-[#0e1422] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Historical Test Accuracy Trend</h3>
                <p className="text-xs text-slate-400">Progress across practice drills and full mocks</p>
              </div>
              <Badge variant="indigo" className="text-[10px] font-mono">LAST 8 SESSIONS</Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="test" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} />
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
                    dataKey="acc"
                    name="Accuracy %"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#accGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Difficulty Tier Analysis */}
          <Card className="lg:col-span-4 border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Difficulty Scaling</h3>
              <p className="text-xs text-slate-400">Performance across Easy, Medium, and Hard tiers</p>
            </div>

            <div className="space-y-4">
              {difficultyData.map((d) => (
                <div key={d.level} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{d.level} Level</span>
                    <span className="font-mono font-bold text-indigo-400">{d.accuracy}% Acc</span>
                  </div>
                  <Progress value={d.accuracy} className="h-2" />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{d.attempted} Attempted</span>
                    <span>Avg {d.avgTimeSec}s / Q</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              Insight: <strong className="text-white">Hard questions</strong> require formula review to improve pace.
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
