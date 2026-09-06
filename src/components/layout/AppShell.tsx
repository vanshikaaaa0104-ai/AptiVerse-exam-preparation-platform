"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
  userRole?: string;
}

export function AppShell({ children, userRole = "STUDENT" }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Ambient Canvas Glow Blobs for Frosted Glass Refraction */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="ambient-orb ambient-orb-indigo -top-24 -left-24 w-[34rem] h-[34rem] opacity-75 dark:opacity-50" />
        <div className="ambient-orb ambient-orb-blue top-1/4 -right-32 w-[36rem] h-[36rem] opacity-70 dark:opacity-45" />
        <div className="ambient-orb ambient-orb-purple bottom-10 left-1/4 w-[30rem] h-[30rem] opacity-65 dark:opacity-40" />
        <div className="ambient-orb ambient-orb-rose top-2/3 right-1/4 w-[26rem] h-[26rem] opacity-60 dark:opacity-35" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Persistent Sidebar */}
        <Sidebar userRole={userRole} />

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative z-50 w-72 max-w-[80vw] bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-2xl h-full shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200 border-r border-slate-200 dark:border-white/[0.08]">
              <Sidebar userRole={userRole} />
            </div>
          </div>
        )}

        {/* Main Layout Container */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          <Topbar
            onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Tab Dock */}
      <MobileNav />
    </div>
  );
}
