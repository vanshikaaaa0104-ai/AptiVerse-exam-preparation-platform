"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Layers,
  Calculator,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  FileCheck2,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INITIAL_EXAMS_DATA } from "@/lib/seed-data";

export default function ExamDetailPage({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}) {
  const resolvedParams = use(params);
  const exam = INITIAL_EXAMS_DATA.find((e) => e.slug === resolvedParams.examSlug);

  if (!exam) {
    notFound();
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/exams" className="hover:text-white transition-colors">
            Exams Directory
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{exam.name}</span>
        </div>

        {/* Hero Banner with Authority Badges */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {exam.name} ({exam.version.year})
                </h1>
                <Badge variant="verified" className="text-xs">
                  {exam.version.verificationStatus}
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {exam.description}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
              <a
                href={exam.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <span>{exam.conductingBody} Official Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-[10px] text-slate-400 font-mono">
                Source: {exam.version.sourceAuthority}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            <Link href="/mocks">
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <FileCheck2 className="h-4 w-4" />
                <span>Launch {exam.shortName} Mock Test</span>
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="secondary" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span>Practice Question Bank</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Exam Blueprint Grid: Key Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Duration</span>
              <Clock className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">
              {exam.version.totalDurationMinutes} Mins
            </p>
            <p className="text-[11px] text-slate-400">
              {exam.version.hasSectionalTiming
                ? "Sectional time limits strictly locked."
                : "Free navigation across sections."}
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Assessment</span>
              <Layers className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">
              {exam.version.totalQuestions} Qs
            </p>
            <p className="text-[11px] text-slate-400">
              Total Marks: <strong className="text-white">{exam.version.totalMarks}</strong>
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Section Navigation</span>
              {exam.version.allowSectionSwitching ? (
                <Unlock className="h-4 w-4 text-emerald-400" />
              ) : (
                <Lock className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <p className="text-sm font-bold text-white">
              {exam.version.allowSectionSwitching ? "Free Switching" : "Fixed Sequence"}
            </p>
            <p className="text-[11px] text-slate-400">
              {exam.version.allowSectionSwitching
                ? "Switch sections at any time."
                : "Must complete each section sequentially."}
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>On-Screen Calculator</span>
              <Calculator className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-sm font-bold text-white">
              {exam.version.hasCalculator ? "Allowed (Basic)" : "Not Allowed"}
            </p>
            <p className="text-[11px] text-slate-400">
              {exam.version.hasCalculator
                ? "Standard digital calculator provided in UI."
                : "Mental calculation required."}
            </p>
          </Card>
        </div>

        {/* Official Section Breakdown Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Sectional Structure & Marking Scheme</h2>
              <p className="text-xs text-slate-400">Official section breakdown and scoring weights</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0e1422]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Section Name</th>
                  <th className="p-4">Questions</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Correct Marks</th>
                  <th className="p-4">Negative Marking</th>
                  <th className="p-4">TITA Allowed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {exam.sections.map((sec) => (
                  <tr key={sec.slug} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-sans font-semibold text-white">
                      {sec.name}
                    </td>
                    <td className="p-4 text-slate-300 font-bold">{sec.questionCount}</td>
                    <td className="p-4 text-slate-300">
                      {sec.durationMinutes ? `${sec.durationMinutes} mins` : "Global Timer"}
                    </td>
                    <td className="p-4 text-emerald-400 font-bold">+{sec.positiveMarks}</td>
                    <td className="p-4 text-red-400 font-bold">
                      {sec.negativeMarks > 0 ? `-${sec.negativeMarks}` : "0 (None)"}
                    </td>
                    <td className="p-4 text-slate-300">
                      {sec.titaNegativeMarks === 0 ? "Yes (0 Negative)" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Preparation Taxonomy */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Recommended Preparation Taxonomy</h2>
                <Badge variant="derived" className="text-[10px]">DERIVED FROM PAST PAPERS</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Curated knowledge graph topics calibrated to historical weightages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exam.sections.map((sec) => (
              <Card key={sec.slug} className="border border-slate-800 bg-[#0e1422] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{sec.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {sec.questionCount} Qs
                  </Badge>
                </div>

                {sec.topics.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {sec.topics.map((t) => (
                      <div key={t.slug} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                          <span>{t.name}</span>
                          <span className="text-[10px] text-indigo-400 font-mono">{t.weightage}</span>
                        </div>
                        <div className="pl-2 border-l border-slate-800 space-y-1">
                          {t.subtopics.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/learn/quant/${sub.slug}`}
                              className="block text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
                            >
                              • {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4">
                    Universal taxonomy items mapped. Check subject tracks in Curriculum.
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
