"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Layers,
  FileText,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function LearnIndexPage() {
  const tracks = [
    {
      slug: "quant",
      title: "Quantitative Aptitude",
      description:
        "Comprehensive preparation for Arithmetic, Algebra, Geometry & Mensuration, Number System, and Modern Mathematics.",
      icon: Calculator,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      totalTopics: 18,
      completedTopics: 11,
      totalConcepts: 48,
      completedConcepts: 32,
      weightage: "33% in CAT / 30% in XAT & SNAP",
      subTracks: [
        { name: "Arithmetic (TSD, Work, %, Profit & Loss)", count: "6 Topics" },
        { name: "Algebra (Quadratics, Polynomials, Logs)", count: "5 Topics" },
        { name: "Geometry & Mensuration (Triangles, Circles)", count: "4 Topics" },
        { name: "Modern Math (P&C, Probability)", count: "3 Topics" },
      ],
    },
    {
      slug: "dilr",
      title: "Data Interpretation & Logical Reasoning",
      description:
        "Constraint-based reasoning sets, tournament matrix deduction, circular arrangements, missing data tables, and mixed graphs.",
      icon: Layers,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      totalTopics: 14,
      completedTopics: 8,
      totalConcepts: 36,
      completedConcepts: 22,
      weightage: "30% in CAT / High weightage across all exams",
      subTracks: [
        { name: "Tabular DI & Mixed Caselets", count: "4 Topics" },
        { name: "Arrangements (Linear, Circular, Matrix)", count: "4 Topics" },
        { name: "Games & Tournaments (Round-Robin, Knockout)", count: "3 Topics" },
        { name: "Binary Logic & Truth-Tellers", count: "3 Topics" },
      ],
    },
    {
      slug: "varc",
      title: "Verbal Ability & Reading Comprehension",
      description:
        "Passage analysis across Philosophy, Tech, Economics, and Sociology. Para Jumbles, Para Summary, and Sentence Coherence.",
      icon: FileText,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      totalTopics: 12,
      completedTopics: 9,
      totalConcepts: 30,
      completedConcepts: 24,
      weightage: "36% in CAT / 34% in XAT",
      subTracks: [
        { name: "RC Central Idea & Author Purpose", count: "4 Topics" },
        { name: "RC Inference & Attitude Spectrum", count: "3 Topics" },
        { name: "Para Jumbles & Coherence (TITA & MCQ)", count: "3 Topics" },
        { name: "Para Summary & Odd Sentence Out", count: "2 Topics" },
      ],
    },
    {
      slug: "special",
      title: "Exam-Specific Specialist Modules",
      description:
        "XAT Decision Making, CMAT Innovation & Entrepreneurship, MAT Economic & Business Environment, and MAH CET Abstract Reasoning.",
      icon: Sparkles,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      totalTopics: 10,
      completedTopics: 4,
      totalConcepts: 25,
      completedConcepts: 10,
      weightage: "Exam-Specific Core Subjects",
      subTracks: [
        { name: "XAT Decision Making (Ethical & Business Cases)", count: "3 Topics" },
        { name: "CMAT Innovation & Entrepreneurship", count: "3 Topics" },
        { name: "MAT Economic & Business Environment", count: "2 Topics" },
        { name: "MAH CET Abstract / Visual Reasoning", count: "2 Topics" },
      ],
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
                Curriculum & Concept Pathways
              </h1>
              <Badge variant="indigo">CANONICAL KNOWLEDGE GRAPH</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Master fundamentals once with rich pedagogical theory, formula flashcards, speed shortcuts, and common trap warnings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/practice/weak">
              <Button variant="secondary" size="sm" className="gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                <span>Revise Weak Areas</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => {
            const completionPct = Math.round(
              (track.completedConcepts / track.totalConcepts) * 100
            );

            return (
              <Card
                key={track.slug}
                className="border border-slate-800 bg-[#0e1422] flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
              >
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl border ${track.color}`}>
                        <track.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {track.title}
                        </CardTitle>
                        <span className="text-[11px] font-mono text-indigo-400 font-medium">
                          {track.weightage}
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold font-mono text-white">
                      {completionPct}%
                    </span>
                  </div>

                  <CardDescription className="text-xs text-slate-300 leading-relaxed">
                    {track.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">Concept Mastery</span>
                      <span className="text-slate-200 font-mono">
                        {track.completedConcepts} / {track.totalConcepts} Concepts
                      </span>
                    </div>
                    <Progress value={completionPct} className="h-2" />
                  </div>

                  {/* Sub-track Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    {track.subTracks.map((sub, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px]"
                      >
                        <p className="text-slate-300 font-medium truncate">{sub.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{sub.count}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link href={`/learn/${track.slug}`}>
                      <Button variant="default" className="w-full justify-between group">
                        <span>Explore {track.title} Topics</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
