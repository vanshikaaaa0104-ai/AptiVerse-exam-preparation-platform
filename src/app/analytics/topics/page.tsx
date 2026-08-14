"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ChevronLeft,
  Target,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TopicMasteryHeatmapPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");

  const topicsMastery = [
    { name: "Percentages & Multipliers", section: "QA", level: 5, accuracy: 88, attempts: 42, status: "MASTERED" },
    { name: "Profit, Loss & Discounts", section: "QA", level: 4, accuracy: 82, attempts: 38, status: "STRONG" },
    { name: "Time, Speed & Distance", section: "QA", level: 4, accuracy: 76, attempts: 35, status: "STRONG" },
    { name: "Time & Work", section: "QA", level: 2, accuracy: 48, attempts: 28, status: "WEAK" },
    { name: "Quadratic Equations", section: "QA", level: 4, accuracy: 74, attempts: 30, status: "STRONG" },
    { name: "Triangles & Geometry", section: "QA", level: 3, accuracy: 65, attempts: 26, status: "COMPETENT" },
    { name: "Linear Arrangements", section: "DILR", level: 2, accuracy: 53, attempts: 24, status: "WEAK" },
    { name: "Circular Seating Arrangements", section: "DILR", level: 3, accuracy: 62, attempts: 22, status: "COMPETENT" },
    { name: "Games & Tournaments", section: "DILR", level: 4, accuracy: 78, attempts: 20, status: "STRONG" },
    { name: "Tabular DI Reconstruction", section: "DILR", level: 3, accuracy: 68, attempts: 18, status: "COMPETENT" },
    { name: "RC Central Idea", section: "VARC", level: 4, accuracy: 80, attempts: 45, status: "STRONG" },
    { name: "RC Inference & Tone", section: "VARC", level: 4, accuracy: 74, attempts: 40, status: "STRONG" },
    { name: "Para Jumbles (TITA & MCQ)", section: "VARC", level: 2, accuracy: 57, attempts: 32, status: "WEAK" },
    { name: "Para Summary", section: "VARC", level: 5, accuracy: 85, attempts: 28, status: "MASTERED" },
    { name: "XAT Decision Making Ethics", section: "Special", level: 3, accuracy: 64, attempts: 18, status: "COMPETENT" },
    { name: "CMAT Innovation & Startups", section: "Special", level: 4, accuracy: 70, attempts: 15, status: "STRONG" },
  ];

  const filtered = topicsMastery.filter(
    (t) => selectedSubject === "all" || t.section.toLowerCase() === selectedSubject.toLowerCase()
  );

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
      case 4:
        return "bg-indigo-500/20 border-indigo-500/50 text-indigo-300";
      case 3:
        return "bg-blue-500/20 border-blue-500/50 text-blue-300";
      case 2:
        return "bg-amber-500/20 border-amber-500/50 text-amber-300";
      default:
        return "bg-red-500/20 border-red-500/50 text-red-300";
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
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
                Topic Mastery Heatmap
              </h1>
              <Badge variant="indigo">KNOWLEDGE GRAPH</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Visualizing your proficiency level (Level 1: Needs Practice to Level 5: Mastered) across all competitive exam topics.
            </p>
          </div>
        </div>

        {/* Heatmap Legend & Subject Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Subjects" },
              { id: "qa", label: "Quantitative Aptitude" },
              { id: "dilr", label: "DILR" },
              { id: "varc", label: "VARC" },
              { id: "special", label: "Specialists" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubject === s.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-amber-500/40 border border-amber-500"></span>
              <span>Lvl 2 (Weak)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-indigo-500/40 border border-indigo-500"></span>
              <span>Lvl 4 (Strong)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-emerald-500/40 border border-emerald-500"></span>
              <span>Lvl 5 (Mastered)</span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((topic, idx) => (
            <Card
              key={idx}
              className={`border p-4 space-y-3 transition-all duration-200 hover:scale-[1.02] cursor-pointer flex flex-col justify-between ${getHeatmapColor(
                topic.level
              )}`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    {topic.section}
                  </span>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-black/30">
                    Level {topic.level} / 5
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-tight">
                  {topic.name}
                </h3>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="opacity-75">Accuracy:</span>
                  <span className="font-bold">{topic.accuracy}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="opacity-75">Attempts:</span>
                  <span>{topic.attempts} Qs</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
