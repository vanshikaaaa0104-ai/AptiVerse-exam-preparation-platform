"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Trash2,
  BookOpen,
  Clock,
  Target,
  ArrowRight,
  Search,
  Zap,
  Plus,
  Edit2,
  Check,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";

interface BookmarkItem {
  id: string;
  exam: string;
  section: string;
  topic: string;
  difficulty: string;
  prompt: string;
  note: string;
  shortcutMethod?: string;
  commonTrap?: string;
  savedDate: string;
}

const INITIAL_BOOKMARKS: BookmarkItem[] = [
  {
    id: "b-001",
    exam: "CAT",
    section: "Quantitative Aptitude",
    topic: "Time Speed Distance",
    difficulty: "HARD",
    prompt: "Two trains start at the same time from Station A and Station B towards each other. After meeting, they take 4 hours and 9 hours respectively to reach Station B and Station A. Find the ratio of their speeds.",
    note: "Important post-meeting speed ratio theorem: S1 / S2 = √(t2 / t1) = √(9 / 4) = 3:2. Repeatedly tested in CAT Slot 1 & 2.",
    shortcutMethod: "S1/S2 = √(t2/t1) => √(9/4) = 3/2. Solved in 10 seconds.",
    commonTrap: "Inverting the times or forgetting the square root.",
    savedDate: "Yesterday",
  },
  {
    id: "b-002",
    exam: "CAT",
    section: "Verbal & Reading Comprehension",
    topic: "Reading Comprehension",
    difficulty: "MEDIUM",
    prompt: "Which of the following, if true, would most seriously weaken the author's hypothesis regarding linguistic determinism?",
    note: "High-yield VARC philosophy passage. Notice how the author avoids extreme language and how negative qualifiers weaken the thesis.",
    shortcutMethod: "Look for counter-examples where thought occurs independently of vocabulary.",
    commonTrap: "Picking an option that merely restates the author's assumption.",
    savedDate: "12 Aug 2026",
  },
  {
    id: "b-003",
    exam: "XAT",
    section: "Decision Making",
    topic: "Ethical Cases",
    difficulty: "HARD",
    prompt: "A manufacturing plant discovers effluent levels are 5% above state standards during heavy monsoon rains. Shutting down costs ₹15 Lakhs/day, affecting 300 casual workers. What should the plant manager do?",
    note: "XAT DM Rule: Environmental & human safety standards are non-negotiable. Temporary shutdown with partial stipend for workers is the optimal ethical balance.",
    shortcutMethod: "Avoid options that hide information or compromise on environmental law.",
    commonTrap: "Prioritizing casual worker wages over permanent community water toxicity.",
    savedDate: "15 Aug 2026",
  },
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(INITIAL_BOOKMARKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("ALL");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState("");

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSaveNote = (id: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, note: tempNoteText } : b))
    );
    setEditingNoteId(null);
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    if (selectedSection !== "ALL" && b.section !== selectedSection) return false;
    if (
      searchQuery &&
      !b.prompt.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !b.topic.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !b.note.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Saved Bookmarks &amp; Revision Notes
              </h1>
              <Badge variant="indigo">{bookmarks.length} Saved Items</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-yield tricky questions, formula proofs, and personal annotations compiled for rapid revision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/quiz/bookmarked-drill">
              <Button variant="accent" size="sm" className="gap-2 shadow-sm shadow-indigo-600/20">
                <Zap className="h-4 w-4" />
                <span>Practice Saved Questions</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes or question text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] text-slate-400 font-medium">Section:</span>
            {["ALL", "Quantitative Aptitude", "Verbal & Reading Comprehension", "Decision Making"].map(
              (sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedSection === sec
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {sec === "ALL" ? "All" : sec.split(" ")[0]}
                </button>
              )
            )}
          </div>
        </div>

        {/* Bookmarks List */}
        {filteredBookmarks.length === 0 ? (
          <div className="p-12 rounded-3xl border border-slate-800 bg-[#0e1422] text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-800">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Bookmarks in Selection</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save tricky questions while practicing or taking mocks to build your personalized formula sheet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((b) => (
              <Card key={b.id} className="border border-slate-800 bg-[#0e1422] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo" className="text-[10px]">
                      {b.exam}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {b.section}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-300">{b.topic}</span>
                    <Badge variant="outline" className="text-[9px] text-amber-300 border-amber-500/30">
                      {b.difficulty}
                    </Badge>
                    <span className="text-[11px] text-slate-500 font-mono">Saved {b.savedDate}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm font-medium text-white leading-relaxed">
                  {b.prompt}
                </p>

                {/* Personal Revision Note */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-indigo-400 text-[10px] uppercase flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Personal Revision Note
                    </p>
                    {editingNoteId !== b.id && (
                      <button
                        onClick={() => {
                          setEditingNoteId(b.id);
                          setTempNoteText(b.note);
                        }}
                        className="text-[10px] text-indigo-400 hover:text-indigo-200 flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>Edit Note</span>
                      </button>
                    )}
                  </div>

                  {editingNoteId === b.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNoteText}
                        onChange={(e) => setTempNoteText(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-indigo-500 text-xs text-white placeholder-slate-400"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNoteId(null)}
                          className="text-xs h-7 text-slate-400"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => handleSaveNote(b.id)}
                          className="text-xs h-7 gap-1"
                        >
                          <Check className="h-3 w-3" />
                          <span>Save</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="leading-relaxed">{b.note}</p>
                  )}
                </div>

                {/* Speed Shortcut */}
                {b.shortcutMethod && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <p className="font-semibold text-slate-400 mb-0.5 text-[10px] uppercase">
                      ⚡ Speed Shortcut:
                    </p>
                    <p>{b.shortcutMethod}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
