"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  ArrowRight,
  ChevronLeft,
  BookOpen,
  Zap,
  AlertTriangle,
  Sparkles,
  Eye,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AuthorQuestionPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("arithmetic");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [questionType, setQuestionType] = useState("MCQ");
  const [questionText, setQuestionText] = useState("");
  const [passageText, setPassageText] = useState("");
  const [options, setOptions] = useState([
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [detailedSolution, setDetailedSolution] = useState("");
  const [shortcutMethod, setShortcutMethod] = useState("");
  const [conceptTested, setConceptTested] = useState("");
  const [commonTrap, setCommonTrap] = useState("");
  const [sourceAuthority, setSourceAuthority] = useState("AptiVerse Faculty Authoring");

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleOptionChange = (index: number, text: string) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index].text = text;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/admin/verification");
    }, 1200);
  };

  return (
    <AppShell userRole="ADMIN">
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Link href="/admin/questions" className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1 font-medium">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Question Bank</span>
          </Link>
        </div>

        {/* Header Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
                Author New Question
              </h1>
              <Badge variant="indigo">4-STAGE PIPELINE: DRAFT</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Create structured questions with mandatory 4-part solutions, speed shortcuts, and source attribution.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="h-4 w-4" />
            <span>Question created in DRAFT state and sent to Verification Queue!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Metadata Bar */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
              1. Taxonomy &amp; Classification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Topic Domain</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                >
                  <option value="arithmetic">Arithmetic</option>
                  <option value="algebra">Algebra</option>
                  <option value="geometry">Geometry</option>
                  <option value="modern-math">Modern Mathematics</option>
                  <option value="dilr">DILR Puzzles &amp; Tournaments</option>
                  <option value="varc">Reading Comprehension</option>
                  <option value="special">XAT / CMAT Specialists</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                >
                  <option value="MCQ">Standard MCQ</option>
                  <option value="TITA">TITA (Numerical Text)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Question Text & Passage */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
              2. Content &amp; Options
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Reading Passage / Context (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Include RC passage or DI caselet narrative..."
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Question Text *</label>
              <textarea
                rows={3}
                required
                placeholder="Enter complete question problem statement..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {questionType === "MCQ" && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Answer Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map((opt, idx) => (
                    <div key={opt.label} className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {opt.label}
                      </span>
                      <input
                        type="text"
                        required
                        placeholder={`Option ${opt.label} text`}
                        value={opt.text}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Correct Answer Option:</label>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="px-3 py-1.5 rounded-xl glass-input text-xs text-emerald-700 dark:text-emerald-400 font-bold"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 4-Part Solution Suite */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
              3. 4-Part Pedagogical Solution Engine
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                1. Detailed Step-by-Step Proof *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Comprehensive mathematical or logical derivation..."
                value={detailedSolution}
                onChange={(e) => setDetailedSolution(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                2. Speed Shortcut / Elimination Hack *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Quick mental hack or formula elimination method..."
                value={shortcutMethod}
                onChange={(e) => setShortcutMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">3. Concept Tested</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TSD Post-Meeting Travel Ratio"
                  value={conceptTested}
                  onChange={(e) => setConceptTested(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-400">4. Common Trap / Distractor Alert</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inverting square root ratio"
                  value={commonTrap}
                  onChange={(e) => setCommonTrap(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Submission CTA */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Submitted questions are placed in <strong className="text-amber-700 dark:text-amber-400">DRAFT</strong> state for review.
            </p>
            <Button variant="accent" size="lg" type="submit" className="gap-2 shadow-lg shadow-indigo-600/20">
              <ShieldCheck className="h-4 w-4" />
              <span>Save &amp; Submit to Audit Queue</span>
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
