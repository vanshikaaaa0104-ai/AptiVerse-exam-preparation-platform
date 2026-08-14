"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  FileCheck2,
  BarChart3,
  AlertCircle,
  Bookmark,
  Trophy,
  Award,
  User,
  Settings,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Flame,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: "default" | "warning" | "success" | "indigo";
  children?: { label: string; href: string }[];
}

export function Sidebar({ userRole = "STUDENT" }: { userRole?: string }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    learn: true,
    practice: true,
    mocks: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Learn Concepts",
      href: "/learn",
      icon: BookOpen,
      children: [
        { label: "Quantitative Aptitude", href: "/learn/quant" },
        { label: "Data Interpretation & LR", href: "/learn/dilr" },
        { label: "Verbal & Reading Comp", href: "/learn/varc" },
        { label: "Exam-Specific Subjects", href: "/learn/special" },
      ],
    },
    {
      label: "Practice Drills",
      href: "/practice",
      icon: Target,
      children: [
        { label: "Topic Practice", href: "/practice" },
        { label: "Custom Drill Builder", href: "/practice/custom" },
        { label: "Weak Area Workouts", href: "/practice/weak" },
        { label: "Daily Challenge", href: "/practice/daily" },
        { label: "Previous Year Papers", href: "/practice/previous-year" },
      ],
    },
    {
      label: "Mock Tests",
      href: "/mocks",
      icon: FileCheck2,
      badge: "LIVE",
      badgeVariant: "success",
      children: [
        { label: "National Full Mocks", href: "/mocks" },
        { label: "Sectional Speed Tests", href: "/mocks?type=sectional" },
      ],
    },
    {
      label: "Analytics & Mastery",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Mistake Book",
      href: "/mistakes",
      icon: AlertCircle,
      badge: 7,
      badgeVariant: "warning",
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: Bookmark,
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      icon: Trophy,
    },
    {
      label: "Achievements",
      href: "/achievements",
      icon: Award,
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      label: "Admin Overview",
      href: "/admin",
      icon: ShieldCheck,
    },
    {
      label: "Question Bank",
      href: "/admin/questions",
      icon: Target,
    },
    {
      label: "Verification Queue",
      href: "/admin/verification",
      icon: FileCheck2,
      badge: "12 Audit",
      badgeVariant: "indigo",
    },
    {
      label: "Mock Builder",
      href: "/admin/mock-tests",
      icon: Sparkles,
    },
    {
      label: "Exam Versions",
      href: "/admin/exam-versions",
      icon: Settings,
    },
  ];

  const isAdmin = ["ADMIN", "SUPERADMIN", "REVIEWER"].includes(userRole);

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-800/80 bg-[#0b0f19] h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                AptiVerse
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Learn. Practice. Improve.
            </p>
          </div>
        </Link>
      </div>

      {/* Target Exam Switcher / Quick Status */}
      <div className="px-4 pt-4 pb-2">
        <div className="p-2.5 rounded-xl border border-indigo-500/20 bg-indigo-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">
              CAT
            </div>
            <div>
              <p className="text-xs font-semibold text-white">CAT 2026</p>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Pattern
              </p>
            </div>
          </div>
          <Link
            href="/exams"
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
          >
            Switch
          </Link>
        </div>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
          Preparation OS
        </div>

        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const sectionKey = item.label.toLowerCase().split(" ")[0];
          const isOpen = openSections[sectionKey];
          const isActive =
            pathname === item.href ||
            (hasChildren &&
              item.children?.some((child) => pathname.startsWith(child.href)));

          return (
            <div key={item.label} className="space-y-0.5">
              <div
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer",
                  isActive && !hasChildren
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-xs"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                )}
                onClick={() => {
                  if (hasChildren) toggleSection(sectionKey);
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 flex-1"
                  onClick={(e) => {
                    if (hasChildren) e.stopPropagation();
                  }}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-indigo-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <Badge
                      variant={item.badgeVariant || "default"}
                      className="text-[10px] px-1.5 py-0 h-4"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180 text-slate-300"
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Submenu links */}
              {hasChildren && isOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  {item.children?.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          isChildActive
                            ? "text-indigo-400 bg-indigo-950/40 font-semibold"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Admin Navigation Section */}
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber-400 flex items-center justify-between">
              <span>Admin & Verification</span>
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>

            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-4">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* User Quick Info & Profile footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <Link href="/profile" className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
              AS
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                Aman Sharma
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                Level 4 • 2,450 XP
              </p>
            </div>
          </Link>
          <Link
            href="/settings"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
