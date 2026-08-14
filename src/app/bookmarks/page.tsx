"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2, BookOpen, Clock, Target, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: "q-tsd-001",
      question: SAMPLE_VERIFIED_QUESTIONS[0],
      note: "Important post-meeting speed ratio formula: S1/S2 = √(t2/t1). Remember for CAT Slot 1.",
      savedDate: "10 Aug 2026",
    },
    {
      id: "q-rc-003",
      question: SAMPLE_VERIFIED_QUESTIONS[2],
      note: "High-yield VARC philosophy passage. Notice how the author avoids extreme language.",
      savedDate: "12 Aug 2026",
    },
  ]);

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Saved Bookmarks & Notes
              </h1>
              <Badge variant="indigo">{bookmarks.length} Saved Items</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated tricky questions and custom revision notes for last-minute review.
            </p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="p-12 rounded-3xl border border-slate-800 bg-[#0e1422] text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-800">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Bookmarks Saved Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save tricky questions while practicing to compile your personalized high-yield formula notes here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookmarks.map((b) => (
              <Card key={b.id} className="border border-slate-800 bg-[#0e1422] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {b.question.difficulty}
                    </Badge>
                    <Badge variant="indigo" className="text-[10px]">
                      {b.question.topicSlug}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">Saved {b.savedDate}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm font-medium text-white leading-relaxed">
                  {b.question.questionText}
                </p>

                {/* Personal Note */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200">
                  <p className="font-semibold text-indigo-400 mb-0.5 text-[10px] uppercase">
                    Personal Note:
                  </p>
                  <p>{b.note}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <p className="font-semibold text-slate-400 mb-0.5 text-[10px] uppercase">
                    Speed Shortcut:
                  </p>
                  <p>{b.question.solution.shortcutMethod}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
