"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface TopicPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  topicSlug: string;
  chapterName?: string;
  chapterSlug?: string;
  subtopicName?: string;
  subtopicSlug?: string;
  examSlug?: string;
}

export function TopicPracticeModal({
  isOpen,
  onClose,
  topicName,
  topicSlug,
  chapterName,
  chapterSlug,
  subtopicName,
  subtopicSlug,
  examSlug = "cat",
}: TopicPracticeModalProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMode, setTimerMode] = useState<"TIMED" | "UNTIMED">("TIMED");

  const handleLaunchPractice = () => {
    onClose();
    const effectiveSlug = chapterSlug || subtopicSlug || topicSlug;
    const effectiveTitle = chapterName || subtopicName || topicName;
    const query = new URLSearchParams({
      topic: effectiveSlug,
      difficulty,
      count: questionCount.toString(),
      timed: timerMode === "TIMED" ? "true" : "false",
      exam: examSlug,
      title: effectiveTitle,
      ...(chapterSlug ? { chapter: chapterSlug } : {}),
    });
    router.push(`/quiz/${effectiveSlug}?${query.toString()}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#0e1422] border-slate-800 text-white">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" className="text-[10px]">
              V2.0 PRACTICE DRILL
            </Badge>
            {examSlug && (
              <Badge variant="outline" className="text-[10px] uppercase">
                {examSlug}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-400" />
            <span>Practice: {subtopicName || topicName}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Configure your practice session. Questions include step-by-step solutions, speed shortcuts, and common trap warnings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Difficulty Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Select Difficulty</label>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: "ALL", label: "Mixed", desc: "Adaptive" },
                  { id: "EASY", label: "Easy", desc: "Warm-up" },
                  { id: "MEDIUM", label: "Medium", desc: "Standard" },
                  { id: "HARD", label: "Hard", desc: "99th %ile" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDifficulty(item.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    difficulty === item.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="block text-xs font-bold">{item.label}</span>
                  <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Question Count</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 5, time: "~8 Mins", label: "Quick Sprint" },
                { count: 10, time: "~15 Mins", label: "Standard Drill" },
                { count: 20, time: "~30 Mins", label: "Deep Workout" },
              ].map((item) => (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => setQuestionCount(item.count)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    questionCount === item.count
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-bold">{item.count} Questions</span>
                  <span className="text-[10px] text-slate-400 block">{item.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timer Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Timer Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimerMode("TIMED")}
                className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  timerMode === "TIMED"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Clock className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold">Timed Simulation</span>
                  <span className="text-[10px] text-slate-400 block">Strict countdown timer</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setTimerMode("UNTIMED")}
                className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  timerMode === "UNTIMED"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold">Concept Learning</span>
                  <span className="text-[10px] text-slate-400 block">Relaxed practice & solve</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
            Cancel
          </Button>
          <Button variant="accent" size="sm" onClick={handleLaunchPractice} className="gap-2">
            <Zap className="h-4 w-4" />
            <span>Start Practice Drill</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
