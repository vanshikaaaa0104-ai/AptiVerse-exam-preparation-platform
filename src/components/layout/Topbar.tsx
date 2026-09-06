"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Flame,
  Target,
  Zap,
  Bell,
  Menu,
  X,
  Compass,
  BookOpen,
  FileCheck2,
  Trophy,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { getStoredCurrentUser, UserProfile } from "@/lib/auth-storage";

interface TopbarProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Topbar({ onMobileMenuToggle, isMobileMenuOpen }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser();
    }
    return null;
  });

  useEffect(() => {
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserProfile | null>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
      } else {
        setCurrentUser(getStoredCurrentUser());
      }
    };

    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  const streak = currentUser?.currentStreak ?? 1;
  const xp = currentUser?.totalXp ?? 100;
  const questionsDone = currentUser?.questionsAttempted ? Math.min(currentUser.questionsAttempted, currentUser?.dailyQuestionGoal || 20) : 0;
  const questionGoal = currentUser?.dailyQuestionGoal || 20;
  const goalPercent = Math.round((questionsDone / questionGoal) * 100);
  const targetExamSlug = currentUser?.targetExam || "cat";
  const targetExamName = currentUser?.targetExamName || "CAT 2026";

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  const searchResults = [
    { title: "Time, Speed & Distance - Relative Speed", type: "Concept", href: "/learn/quant/time-speed-distance" },
    { title: "Percentages - Successive Change & Alligations", type: "Concept", href: "/learn/quant/percentages" },
    { title: "CAT 2026 National Full Mock #01", type: "Mock Test", href: "/mocks/cat-2026-national-01" },
    { title: "Linear Seating Arrangements Drill", type: "Practice", href: "/practice" },
    { title: "XAT Decision Making Ethical Dilemmas", type: "Exam Special", href: "/learn/special/xat-dm" },
  ].filter(
    (item) =>
      searchQuery &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <header className="h-16 px-4 lg:px-8 glass-topbar sticky top-0 z-30 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Quick Search Trigger */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Search Bar Input / Trigger (Glassmorphic) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl glass-input text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-medium group shadow-xs cursor-pointer"
          >
            <Search className="h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
            <span className="flex-1 text-left font-sans">Search concepts, mocks, questions...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Preparation Metric Chips & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Streak Chip */}
          <Link
            href="/achievements"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 backdrop-blur-sm border border-amber-500/25 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-all font-semibold shadow-xs"
            title={`${streak} Day Continuous Streak`}
          >
            <Flame className="h-4 w-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 animate-pulse" />
            <span className="text-xs font-bold font-mono">{streak}d</span>
          </Link>

          {/* Daily Goal Progress Chip */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors font-semibold shadow-xs"
            title={`Today's Goal: ${questionsDone} of ${questionGoal} Questions Completed`}
          >
            <Target className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <div className="flex items-center gap-1 text-xs">
              <span>{questionsDone}/{questionGoal} Qs</span>
              <span className="text-[10px] text-emerald-700/70 dark:text-emerald-400/70 font-mono">({goalPercent}%)</span>
            </div>
          </Link>

          {/* XP & Level Chip */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs">
            <Zap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
            <span className="text-xs font-bold font-mono">{xp.toLocaleString()} XP</span>
          </div>

          {/* Target Exam Pill */}
          <Link
            href={`/exams/${targetExamSlug}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-white transition-colors shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>{targetExamName}</span>
          </Link>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Notifications Trigger */}
          <button
            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#080c14]"></span>
          </button>

          {/* User Profile Quick Link */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group shadow-xs"
            title={`Signed in as ${currentUser?.name || 'Student'}`}
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
              {userInitials}
            </div>
            <span className="hidden xl:inline text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white max-w-[90px] truncate">
              {currentUser?.name?.split(" ")[0] || "Profile"}
            </span>
          </Link>
        </div>
      </header>

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl rounded-2xl glass-panel shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center gap-3">
              <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Search QA, DILR, VARC topics, full mocks, previous year questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
              {searchQuery ? (
                searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-500/30 transition-colors group"
                    >
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white">
                        {item.title}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.type}
                      </Badge>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-600 dark:text-slate-300">
                    No results found for &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Percentages&rdquo;, &ldquo;Arrangements&rdquo;, or &ldquo;CAT Mock&rdquo;.
                  </div>
                )
              ) : (
                <div className="py-3 px-2 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/learn/quant"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Quantitative Aptitude</span>
                    </Link>
                    <Link
                      href="/practice/weak"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <Target className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span>Target Weak Areas</span>
                    </Link>
                    <Link
                      href="/mocks"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <FileCheck2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>National Full Mocks</span>
                    </Link>
                    <Link
                      href="/leaderboard"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>National Leaderboard</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
