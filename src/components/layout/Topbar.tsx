"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopbarProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Topbar({ onMobileMenuToggle, isMobileMenuOpen }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      <header className="h-16 px-4 lg:px-8 border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Quick Search Trigger */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Search Bar Input / Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all text-xs font-medium group"
          >
            <Search className="h-4 w-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="flex-1 text-left">Search concepts, mocks, questions...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Preparation Metric Chips & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Streak Chip */}
          <Link
            href="/achievements"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
            title="12 Day Continuous Streak"
          >
            <Flame className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-xs font-bold font-mono">12d</span>
          </Link>

          {/* Daily Goal Progress Chip */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            title="Today's Goal: 16 of 25 Questions Completed"
          >
            <Target className="h-3.5 w-3.5 text-emerald-400" />
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span>16/25 Qs</span>
              <span className="text-[10px] text-emerald-500/70 font-mono">(64%)</span>
            </div>
          </Link>

          {/* XP & Level Chip */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            <Zap className="h-3.5 w-3.5 text-indigo-400 fill-indigo-400" />
            <span className="text-xs font-bold">2,450 XP</span>
          </div>

          {/* Target Exam Pill */}
          <Link
            href="/exams/cat"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 hover:text-white transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>CAT 2026</span>
          </Link>

          {/* Notifications Trigger */}
          <button
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#080c14]"></span>
          </button>
        </div>
      </header>

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl rounded-2xl bg-[#0e1422] border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="h-5 w-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Search QA, DILR, VARC topics, full mocks, previous year questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
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
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-950/40 border border-transparent hover:border-indigo-500/30 transition-colors group"
                    >
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item.title}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.type}
                      </Badge>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No results found for &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Percentages&rdquo;, &ldquo;Arrangements&rdquo;, or &ldquo;CAT Mock&rdquo;.
                  </div>
                )
              ) : (
                <div className="py-3 px-2 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/learn/quant"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <BookOpen className="h-4 w-4 text-indigo-400" />
                      <span>Quantitative Aptitude</span>
                    </Link>
                    <Link
                      href="/practice/weak"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <Target className="h-4 w-4 text-amber-400" />
                      <span>Target Weak Areas</span>
                    </Link>
                    <Link
                      href="/mocks"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <FileCheck2 className="h-4 w-4 text-emerald-400" />
                      <span>National Full Mocks</span>
                    </Link>
                    <Link
                      href="/leaderboard"
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <Trophy className="h-4 w-4 text-purple-400" />
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
