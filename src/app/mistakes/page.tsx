"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  BookOpen,
  Filter,
  ArrowRight,
  Zap,
  HelpCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";

export default function MistakeBookPage() {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [activeQuestionToSolve, setActiveQuestionToSolve] = useState<string | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<string | null>(null);
  const [retryFeedback, setRetryFeedback] = useState<"CORRECT" | "INCORRECT" | null>(null);

  // Sample mistake book records
  const mistakes = [
    {
      id: "q-tw-002",
      question: SAMPLE_VERIFIED_QUESTIONS[1],
      myPreviousAnswer: "A",
      correctAnswer: "B",
      topic: "Time & Work",
      section: "Quantitative Aptitude",
      attemptsCount: 2,
      lastMistakeDate: "Yesterday",
    },
    {
      id: "q-dm-004",
      question: SAMPLE_VERIFIED_QUESTIONS[3],
      myPreviousAnswer: "A",
      correctAnswer: "B",
      topic: "Ethical Cases",
      section: "XAT Decision Making",
      attemptsCount: 1,
      lastMistakeDate: "12 Aug",
    },
  ];

  const handleMarkResolved = (id: string) => {
    setResolvedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStartRetry = (id: string) => {
    setActiveQuestionToSolve(id);
    setRetryAnswer(null);
    setRetryFeedback(null);
  };

  const handleCheckRetry = (correctAnswer: string) => {
    if (retryAnswer === correctAnswer) {
      setRetryFeedback("CORRECT");
      if (activeQuestionToSolve && !resolvedIds.includes(activeQuestionToSolve)) {
        setResolvedIds((prev) => [...prev, activeQuestionToSolve]);
      }
    } else {
      setRetryFeedback("INCORRECT");
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Mistake Book & Error Recovery
              </h1>
              <Badge variant="warning">
                {mistakes.length - resolvedIds.length} Unresolved Errors
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every incorrect question is automatically logged here. Re-solve mistakes to permanently master concepts.
            </p>
          </div>
        </div>

        {/* Empty state if all resolved */}
        {mistakes.length > 0 && mistakes.length === resolvedIds.length && (
          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">All Mistakes Resolved!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Outstanding work! You have successfully reviewed and resolved all logged errors in your mistake book.
            </p>
            <Link href="/practice">
              <Button variant="accent" size="sm" className="mt-2">
                <span>Start New Practice Set</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Mistakes List */}
        <div className="space-y-6">
          {mistakes.map((item) => {
            const isResolved = resolvedIds.includes(item.id);
            const isRetrying = activeQuestionToSolve === item.id;

            return (
              <Card
                key={item.id}
                className={`border p-6 space-y-5 transition-all ${
                  isResolved
                    ? "border-emerald-500/30 bg-emerald-950/10 opacity-75"
                    : "border-slate-800 bg-[#0e1422]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Badge variant={isResolved ? "success" : "destructive"} className="text-[10px]">
                      {isResolved ? "RESOLVED ✓" : "UNRESOLVED MISTAKE"}
                    </Badge>
                    <Badge variant="indigo" className="text-[10px]">
                      {item.topic}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      Logged {item.lastMistakeDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkResolved(item.id)}
                      className={`px-3 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isResolved
                          ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isResolved ? "Mark Unresolved" : "Mark Learned"}</span>
                    </button>
                  </div>
                </div>

                {/* Question Details */}
                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {item.question.questionText}
                </p>

                {/* Previous Error Callout */}
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between text-xs font-mono">
                  <span className="text-red-300">
                    Your Previous Choice: <strong className="line-through">Option {item.myPreviousAnswer}</strong>
                  </span>
                  <span className="text-emerald-400">
                    Correct Answer: <strong>Option {item.correctAnswer}</strong>
                  </span>
                </div>

                {/* Interactive Re-Solve Drawer / In-Place Solver */}
                {isRetrying ? (
                  <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Re-solve in Place:
                      </p>
                      <button
                        onClick={() => setActiveQuestionToSolve(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-2">
                      {item.question.options.map((opt) => (
                        <div
                          key={opt.label}
                          onClick={() => setRetryAnswer(opt.label)}
                          className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer ${
                            retryAnswer === opt.label
                              ? "bg-indigo-950/40 border-indigo-500 text-white"
                              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-bold text-indigo-400">{opt.label}.</span>
                          <span>{opt.text}</span>
                        </div>
                      ))}
                    </div>

                    {retryFeedback === "CORRECT" && (
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/50 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Correct! Mistake marked as resolved.</span>
                      </div>
                    )}

                    {retryFeedback === "INCORRECT" && (
                      <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/50 text-xs text-red-300 font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span>Incorrect. Review the speed shortcut below.</span>
                      </div>
                    )}

                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => handleCheckRetry(item.correctAnswer)}
                      disabled={!retryAnswer}
                    >
                      Check Answer
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartRetry(item.id)}
                    className="gap-2 text-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Re-solve this Question Now</span>
                  </Button>
                )}

                {/* 4-Part Solution Excerpt */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">
                    Shortcut Method & Solution:
                  </p>
                  <p className="leading-relaxed">{item.question.solution.shortcutMethod}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
