"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  AlertTriangle,
  AlertCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { formatTimeRemaining } from "@/lib/utils";

export interface SectionTimerConfig {
  id: string;
  name: string;
  durationSec: number;
  questionCount?: number;
}

export interface QuizTimerTickData {
  totalRemainingSec: number;
  sectionRemainingSec: number;
  totalElapsedSec: number;
  activeSectionIndex: number;
}

export interface QuizTimerProps {
  /** Unique ID of the quiz or mock attempt for resilient synchronization across storage & tabs */
  testId?: string;

  /** Total test duration in seconds (for single-section tests or overall shared test pools) */
  totalDurationSec?: number;

  /** Initial seconds remaining (overrides totalDurationSec if resuming an in-progress attempt) */
  initialSecondsRemaining?: number;

  /** Multi-section configuration */
  sections?: SectionTimerConfig[];

  /** Currently active section index (0-based) */
  activeSectionIndex?: number;

  /** Whether sections are strictly timed and locked (e.g. CAT 40m per section) */
  isSectionLocked?: boolean;

  /** Callback invoked when the overall test time reaches zero */
  onAutoSubmit: () => void;

  /** Callback invoked when a specific section timer expires (for multi-section tests) */
  onSectionTimeUp?: (completedSectionIndex: number, nextSectionIndex: number | null) => void;

  /** Callback invoked every second with current synchronized timings */
  onTick?: (data: QuizTimerTickData) => void;

  /** Controlled callback if the timer triggers or requests section change */
  onSectionChange?: (newIndex: number) => void;

  /** Warning threshold in seconds (default: 300s = 5 minutes) */
  warningThresholdSec?: number;

  /** Danger threshold in seconds (default: 60s = 1 minute) */
  dangerThresholdSec?: number;

  /** Visual variant */
  variant?: "compact" | "detailed" | "dual" | "pill";

  /** Optional container CSS classes */
  className?: string;

  /** Whether the timer is currently paused */
  isPaused?: boolean;

  /** Whether to show the expandable section timing breakdown */
  showSectionBreakdown?: boolean;
}

export function QuizTimer({
  testId,
  totalDurationSec = 900,
  initialSecondsRemaining,
  sections,
  activeSectionIndex = 0,
  isSectionLocked = false,
  onAutoSubmit,
  onSectionTimeUp,
  onTick,
  onSectionChange,
  warningThresholdSec = 300,
  dangerThresholdSec = 60,
  variant = "detailed",
  className = "",
  isPaused = false,
  showSectionBreakdown = true,
}: QuizTimerProps) {
  const hasSubmittedRef = useRef(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const hasSections = Array.isArray(sections) && sections.length > 0;
  const currentSection = hasSections ? sections[activeSectionIndex] || sections[0] : null;

  // Initial calculation of total seconds
  const initialTotal = initialSecondsRemaining !== undefined
    ? initialSecondsRemaining
    : hasSections && isSectionLocked
    ? sections.reduce((acc, s) => acc + s.durationSec, 0)
    : totalDurationSec;

  const initialSecDuration = hasSections && currentSection
    ? currentSection.durationSec
    : initialTotal;

  const [totalRemainingSec, setTotalRemainingSec] = useState<number>(initialTotal);
  const [sectionRemainingSec, setSectionRemainingSec] = useState<number>(initialSecDuration);

  // Target wall-clock end timestamps for drift-free precision (initialized to null to stay pure during render)
  const targetEndTimeRef = useRef<number | null>(null);
  const targetSectionEndTimeRef = useRef<number | null>(null);
  const elapsedSecondsRef = useRef<number>(0);

  // Storage Key for cross-tab and refresh synchronization
  const storageKey = testId ? `aptiverse_quiz_timer_${testId}` : null;

  // Handle Automatic Submission
  const triggerAutoSubmit = useCallback(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setIsAutoSubmitting(true);

    if (storageKey && typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {}
    }

    onAutoSubmit();
  }, [onAutoSubmit, storageKey]);

  // Setup initial targets on mount
  useEffect(() => {
    const now = Date.now();

    if (storageKey && typeof window !== "undefined") {
      try {
        const savedData = sessionStorage.getItem(storageKey);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.targetEndTime && parsed.targetEndTime > now) {
            targetEndTimeRef.current = parsed.targetEndTime;
            if (parsed.targetSectionEndTime) {
              targetSectionEndTimeRef.current = parsed.targetSectionEndTime;
            }
            return;
          }
        }
      } catch {}
    }

    // Set fresh targets
    const totalEnd = now + initialTotal * 1000;
    const secEnd = now + initialSecDuration * 1000;
    targetEndTimeRef.current = totalEnd;
    targetSectionEndTimeRef.current = secEnd;

    if (storageKey && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            targetEndTime: totalEnd,
            targetSectionEndTime: secEnd,
            activeSectionIndex,
          })
        );
      } catch {}
    }
  }, [storageKey, initialTotal, initialSecDuration, activeSectionIndex]);

  // Synchronize when activeSectionIndex changes from parent
  const prevSectionIdxRef = useRef(activeSectionIndex);
  useEffect(() => {
    if (!hasSections || !currentSection) return;

    if (prevSectionIdxRef.current !== activeSectionIndex) {
      prevSectionIdxRef.current = activeSectionIndex;
      if (isSectionLocked) {
        const secDuration = currentSection.durationSec;
        const newSecEnd = Date.now() + secDuration * 1000;
        targetSectionEndTimeRef.current = newSecEnd;

        if (storageKey && typeof window !== "undefined") {
          try {
            const savedData = sessionStorage.getItem(storageKey);
            if (savedData) {
              const parsed = JSON.parse(savedData);
              parsed.activeSectionIndex = activeSectionIndex;
              parsed.targetSectionEndTime = newSecEnd;
              sessionStorage.setItem(storageKey, JSON.stringify(parsed));
            }
          } catch {}
        }
      }
    }
  }, [activeSectionIndex, hasSections, currentSection, isSectionLocked, storageKey]);

  // Cross-Tab Synchronization via Storage Event
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.targetEndTime) {
            targetEndTimeRef.current = parsed.targetEndTime;
          }
          if (parsed.targetSectionEndTime) {
            targetSectionEndTimeRef.current = parsed.targetSectionEndTime;
          }
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  // Resilient High-Frequency Timer Loop with Wall-Clock Delta Calculation
  useEffect(() => {
    if (isPaused || isAutoSubmitting) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (!targetEndTimeRef.current) return;

      // 1. Calculate overall test remaining seconds
      const currentTotalRemaining = Math.max(
        0,
        Math.floor((targetEndTimeRef.current - now) / 1000)
      );
      setTotalRemainingSec(currentTotalRemaining);

      // 2. Calculate current section remaining seconds
      let currentSecRemaining = currentTotalRemaining;
      if (hasSections && isSectionLocked && targetSectionEndTimeRef.current) {
        currentSecRemaining = Math.max(
          0,
          Math.floor((targetSectionEndTimeRef.current - now) / 1000)
        );
        setSectionRemainingSec(currentSecRemaining);
      } else {
        setSectionRemainingSec(currentTotalRemaining);
      }

      elapsedSecondsRef.current += 1;

      // 3. Fire onTick callback
      if (onTick) {
        onTick({
          totalRemainingSec: currentTotalRemaining,
          sectionRemainingSec: currentSecRemaining,
          totalElapsedSec: elapsedSecondsRef.current,
          activeSectionIndex,
        });
      }

      // 4. Section Timer Expiration (Locked Multi-Section Mode)
      if (hasSections && isSectionLocked && currentSecRemaining <= 0) {
        if (activeSectionIndex < (sections?.length || 1) - 1) {
          const nextIndex = activeSectionIndex + 1;
          if (onSectionTimeUp) {
            onSectionTimeUp(activeSectionIndex, nextIndex);
          }
          if (onSectionChange) {
            onSectionChange(nextIndex);
          }
          // Advance section target
          const nextDuration = sections?.[nextIndex]?.durationSec || 2400;
          targetSectionEndTimeRef.current = Date.now() + nextDuration * 1000;
          return;
        } else {
          // Last section expired -> Trigger Auto Submit
          triggerAutoSubmit();
          return;
        }
      }

      // 5. Total Test Timer Expiration
      if (currentTotalRemaining <= 0) {
        triggerAutoSubmit();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [
    isPaused,
    isAutoSubmitting,
    hasSections,
    isSectionLocked,
    activeSectionIndex,
    sections,
    onTick,
    onSectionTimeUp,
    onSectionChange,
    triggerAutoSubmit,
  ]);

  // Visual Urgency Tiers
  const effectiveUrgencyTime = hasSections && isSectionLocked ? sectionRemainingSec : totalRemainingSec;
  const isDanger = effectiveUrgencyTime <= dangerThresholdSec;
  const isWarning = !isDanger && effectiveUrgencyTime <= warningThresholdSec;

  const statusColorClass = isDanger
    ? "bg-red-950/80 border-red-500/60 text-red-300 shadow-red-950/50"
    : isWarning
    ? "bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-amber-950/50"
    : "bg-slate-900 border-slate-800 text-slate-200 shadow-slate-950/50";

  const clockIconClass = isDanger
    ? "text-red-400 animate-pulse"
    : isWarning
    ? "text-amber-400 animate-pulse"
    : "text-indigo-400";

  const badgeTextClass = isDanger
    ? "text-red-400 animate-pulse font-extrabold"
    : isWarning
    ? "text-amber-400 font-bold"
    : "text-slate-100 font-mono";

  // Pill variant
  if (variant === "pill") {
    return (
      <div
        id="quiz-timer-pill"
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold shadow-inner ${statusColorClass} ${className}`}
      >
        <Clock className={`h-3.5 w-3.5 ${clockIconClass}`} />
        <span className={badgeTextClass}>
          {formatTimeRemaining(effectiveUrgencyTime)}
        </span>
        {isDanger && (
          <span className="text-[10px] uppercase font-sans font-bold bg-red-600/30 text-red-200 px-1.5 py-0.2 rounded-sm animate-pulse">
            Time Low
          </span>
        )}
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div
        id="quiz-timer-compact"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono shadow-inner ${statusColorClass} ${className}`}
      >
        <Clock className={`h-4 w-4 ${clockIconClass}`} />
        <div className="flex flex-col text-left">
          <span className={`text-sm tracking-wider leading-none ${badgeTextClass}`}>
            {formatTimeRemaining(effectiveUrgencyTime)}
          </span>
          {hasSections && (
            <span className="text-[9px] text-slate-400 font-sans mt-0.5 leading-none">
              {currentSection?.name || "Section"}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Detailed / Dual Variant (Default)
  return (
    <div id="quiz-timer" className={`relative inline-block select-none ${className}`}>
      {/* Auto-Submit Modal Overlay if time reached zero */}
      {isAutoSubmitting && (
        <div
          id="quiz-timer-auto-submit-banner"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl shadow-red-950/60">
            <div className="h-14 w-14 rounded-2xl bg-red-950/80 border border-red-500/50 mx-auto flex items-center justify-center text-red-400 animate-bounce">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">Time Expired!</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                The allocated exam duration has ended. Your responses are being synchronized and submitted automatically.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-indigo-300 bg-slate-950/60 py-2 px-4 rounded-xl border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Saving attempt &amp; generating scorecard...</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Timer Display Box */}
      <div
        id="quiz-timer-display"
        className={`flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border transition-all duration-300 shadow-sm ${statusColorClass}`}
      >
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${clockIconClass}`} />

          {/* If Multi-Section: Show Section Time & Total Exam Time */}
          {hasSections && isSectionLocked ? (
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
                    {currentSection?.name}
                  </span>
                  <Lock className="h-2.5 w-2.5 text-slate-400" />
                </div>
                <span className={`text-sm tracking-wider font-mono ${badgeTextClass}`}>
                  {formatTimeRemaining(sectionRemainingSec)}
                </span>
              </div>

              <div className="h-6 w-px bg-slate-800" />

              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-sans tracking-wide">
                  Total Exam
                </span>
                <span className="text-xs font-mono font-semibold text-slate-300">
                  {formatTimeRemaining(totalRemainingSec)}
                </span>
              </div>
            </div>
          ) : (
            /* Single Section or Shared Pool */
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                Time Remaining
              </span>
              <span className={`text-sm sm:text-base tracking-wider font-mono ${badgeTextClass}`}>
                {formatTimeRemaining(totalRemainingSec)}
              </span>
            </div>
          )}
        </div>

        {/* Warning Indicator Chip */}
        {isDanger && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-red-200 bg-red-600/30 px-2 py-0.5 rounded-lg border border-red-500/40 animate-pulse">
            <AlertCircle className="h-3 w-3" />
            <span>FINAL MINUTE</span>
          </span>
        )}

        {/* Breakdown Dropdown Toggle (for multi-section tests) */}
        {hasSections && showSectionBreakdown && (
          <button
            type="button"
            onClick={() => setIsBreakdownOpen((prev) => !prev)}
            aria-label="Toggle section timings breakdown"
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isBreakdownOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Expandable Section Timing Breakdown Dropdown */}
      {hasSections && showSectionBreakdown && isBreakdownOpen && (
        <div
          id="quiz-timer-section-breakdown"
          className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0e1422] border border-slate-800 rounded-2xl p-3 shadow-xl z-40 space-y-2 animate-in fade-in slide-from-top-2 duration-150"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-white">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              <span>Section Timings Synchronized</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {isSectionLocked ? "Locked Sections" : "Flexible Pool"}
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {sections?.map((sec, idx) => {
              const isActive = idx === activeSectionIndex;
              const isPast = idx < activeSectionIndex;

              return (
                <div
                  key={sec.id}
                  className={`p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-indigo-950/60 border border-indigo-500/40 text-white"
                      : isPast
                      ? "bg-slate-950/40 text-slate-500"
                      : "bg-slate-950/60 text-slate-400 border border-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isPast ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : isActive ? (
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                    ) : (
                      <Lock className="h-3 w-3 text-slate-600" />
                    )}
                    <div>
                      <p className="font-semibold leading-none">{sec.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {sec.questionCount ? `${sec.questionCount} Questions` : "Section"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    {isActive ? (
                      <span className="text-amber-400 font-bold">
                        {formatTimeRemaining(sectionRemainingSec)}
                      </span>
                    ) : isPast ? (
                      <span className="text-slate-500">Completed</span>
                    ) : (
                      <span className="text-slate-400">
                        {formatTimeRemaining(sec.durationSec)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Overall Test Time</span>
            <span className="font-mono font-bold text-white">
              {formatTimeRemaining(totalRemainingSec)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
