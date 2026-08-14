"use client";

import React from "react";
import Link from "next/link";
import { Clock, ChevronLeft, Zap, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const paceData = [
  { topic: "Percentages", actualSec: 85, benchmarkSec: 90, status: "FAST" },
  { topic: "Time & Work", actualSec: 135, benchmarkSec: 105, status: "SLOW" },
  { topic: "Relative Speed", actualSec: 110, benchmarkSec: 100, status: "OPTIMAL" },
  { topic: "Quadratics", actualSec: 95, benchmarkSec: 90, status: "OPTIMAL" },
  { topic: "Arrangements", actualSec: 160, benchmarkSec: 120, status: "SLOW" },
  { topic: "Tournaments", actualSec: 140, benchmarkSec: 130, status: "OPTIMAL" },
  { topic: "RC Main Idea", actualSec: 80, benchmarkSec: 90, status: "FAST" },
  { topic: "Para Jumbles", actualSec: 115, benchmarkSec: 85, status: "SLOW" },
];

export default function SpeedAnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/analytics" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Analytics</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Solving Pace & Speed Diagnostics
              </h1>
              <Badge variant="indigo">TELEMETRY</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Analyze your solving pace in seconds compared to 99th percentile target benchmarks.
            </p>
          </div>
        </div>

        {/* Speed Chart */}
        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Average Time per Question (Seconds)</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-400 font-medium">
                <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500"></span> Actual Time
              </span>
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="h-2.5 w-2.5 rounded-sm bg-slate-600"></span> Benchmark
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paceData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="topic" stroke="#64748b" fontSize={11} angle={-25} textAnchor="end" />
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
                <Bar dataKey="actualSec" name="Actual Seconds" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="benchmarkSec" name="Target Benchmark (s)" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Speed Optimization Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border border-amber-500/30 bg-amber-950/15 p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Pace Alert: Arrangements & Time-Work</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are spending <strong className="text-white">+40s over benchmark</strong> on seating arrangements sets. Review the 2-variable grid elimination shortcut.
            </p>
          </Card>

          <Card className="border border-emerald-500/30 bg-emerald-950/15 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Zap className="h-4 w-4" />
              <span>Speed Strength: RC & Percentages</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are solving Percentages questions <strong className="text-white">5s faster than benchmark</strong> with an 88% accuracy rate.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
