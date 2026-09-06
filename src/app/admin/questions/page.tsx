"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Edit,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";

export default function AdminQuestionsTablePage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const sampleQuestions = [
    ...SAMPLE_VERIFIED_QUESTIONS,
    {
      id: "q-alg-005",
      topicSlug: "algebra",
      subtopicSlug: "quadratic-equations",
      difficulty: "HARD" as const,
      questionType: "MCQ" as const,
      questionText: "Find the range of values of k for which the roots of x^2 - (k-3)x + k = 0 are real and distinct.",
      options: [
        { label: "A", text: "k < 1 or k > 9" },
        { label: "B", text: "1 < k < 9" },
        { label: "C", text: "k <= 1" },
        { label: "D", text: "k >= 9" },
      ],
      correctAnswer: "A",
      estimatedTimeSec: 110,
      isDemo: true,
      source: "Faculty Submission",
      verificationStatus: "REVIEW",
      solution: {
        detailedText: "Discriminant Δ = b^2 - 4ac > 0. (k-3)^2 - 4(1)(k) > 0 => k^2 - 10k + 9 > 0 => (k-1)(k-9) > 0 => k < 1 or k > 9.",
        stepByStep: ["1. Calculate Δ", "2. Factorize quadratic in k", "3. Apply wavy curve"],
        shortcutMethod: "Quick roots of k^2 - 10k + 9 are 1 and 9. Outer intervals: k < 1 or k > 9.",
        conceptTested: "Quadratic Discriminant Nature of Roots",
        commonMistakeTrap: "Choosing inside interval 1 < k < 9.",
      },
    },
  ];

  const filtered = sampleQuestions.filter((q) => {
    const status = (q as any).verificationStatus || "VERIFIED";
    const matchesSearch =
      q.questionText.toLowerCase().includes(search.toLowerCase()) ||
      q.topicSlug.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedStatus === "ALL") return true;
    return status === selectedStatus;
  });

  return (
    <AppShell userRole="ADMIN">
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200 pb-12">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Link href="/admin" className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1 font-medium">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Admin Overview</span>
          </Link>
        </div>

        {/* Hero Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Question Bank Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Search, audit, and manage verified canonical questions across all subjects.
            </p>
          </div>

          <Link href="/admin/questions/new" className="z-10 shrink-0">
            <Button variant="accent" size="sm" className="gap-1.5 shadow-md shadow-indigo-600/20">
              <Plus className="h-4 w-4" />
              <span>Author Question</span>
            </Button>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search question text, topic, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "VERIFIED", "REVIEW", "DRAFT"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStatus === status
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "glass-nested text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Data Table */}
        <div className="overflow-hidden rounded-2xl glass-card">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.02] text-slate-700 dark:text-slate-400 font-sans uppercase font-bold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Question Preview</th>
                <th className="p-4">Topic</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-white/[0.06]">
              {filtered.map((q) => {
                const status = (q as any).verificationStatus || "VERIFIED";
                return (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{q.id}</td>
                    <td className="p-4 font-sans text-slate-900 dark:text-white max-w-xs sm:max-w-md truncate font-medium">
                      {q.questionText}
                    </td>
                    <td className="p-4 font-sans text-slate-700 dark:text-slate-300 capitalize">{q.topicSlug}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          q.difficulty === "HARD"
                            ? "destructive"
                            : q.difficulty === "EASY"
                            ? "success"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {q.difficulty}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={status === "VERIFIED" ? "verified" : "warning"}
                        className="text-[10px]"
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href="/admin/verification">
                          <button className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
