"use client";

import { useState } from "react";
import { Pencil, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER } from "@/lib/mock-data";

const TABS = ["맞춤 추천", "과제 검색", "관심 공고"];

export function TopBar() {
  const [tab, setTab] = useState(0);
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-6 border-b border-line bg-white px-8">
      <h1 className="text-[22px] font-bold text-ink">정부 과제 추천</h1>
      <span className="h-4 w-px bg-line" />

      <nav className="flex items-center gap-6">
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            className={cn(
              "text-[15px] font-bold transition-colors",
              i === tab ? "text-brand" : "text-ink-light hover:text-ink-muted",
            )}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-[5px] bg-brand-soft px-4 py-[11px] text-sm font-bold text-brand hover:brightness-95"
        >
          <Pencil className="size-3.5" />
          나의 요건 수정하기
        </button>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-tag text-xs font-bold text-brand-2">
            {USER.initial}
          </span>
          <span className="text-sm font-bold text-ink">{USER.name}</span>
          <ChevronDown className="size-3.5 text-ink-light" />
        </div>
      </div>
    </header>
  );
}
