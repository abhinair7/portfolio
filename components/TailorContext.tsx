"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface TailorResult {
  roleName: string;
  heroTagline: string;
  skills: { title: string; description: string }[];
  experience: { index: number; bullets: string[]; impacts: string[] }[];
  projectOrder: number[];
  matchHighlights: string[];
}

interface TailorState {
  result: TailorResult | null;
  apply: (r: TailorResult) => void;
  reset: () => void;
}

const TailorCtx = createContext<TailorState | null>(null);

export function TailorProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<TailorResult | null>(null);
  const apply = useCallback((r: TailorResult) => setResult(r), []);
  const reset = useCallback(() => setResult(null), []);
  return <TailorCtx.Provider value={{ result, apply, reset }}>{children}</TailorCtx.Provider>;
}

export function useTailor() {
  const ctx = useContext(TailorCtx);
  if (!ctx) throw new Error("useTailor must be used within TailorProvider");
  return ctx;
}
