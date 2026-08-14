"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Bell, Lock, ShieldCheck, Moon, Sun, Monitor, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Settings & Preferences
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure notifications, interface theme, security, and account preferences.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-6">
          <div className="space-y-1 pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-indigo-400" />
              <span>Notification Preferences</span>
            </h2>
            <p className="text-xs text-slate-400">Manage how and when AptiVerse reaches out to you.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Daily Streak Reminders</p>
                <p className="text-[11px] text-slate-400">Receive gentle alerts at 8:00 PM if your daily goal is incomplete.</p>
              </div>
              <input
                type="checkbox"
                checked={streakReminders}
                onChange={(e) => setStreakReminders(e.target.checked)}
                className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <p className="text-xs font-semibold text-white">National Mock Notifications</p>
                <p className="text-[11px] text-slate-400">Get notified when new all-India full mocks go live.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
