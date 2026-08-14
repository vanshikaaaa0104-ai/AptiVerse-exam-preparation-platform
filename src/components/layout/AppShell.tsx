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
    <div className="flex min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <Sidebar userRole={userRole} />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-50 w-72 max-w-[80vw] bg-[#0b0f19] h-full shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
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

      {/* Mobile Bottom Tab Dock */}
      <MobileNav />
    </div>
  );
}
