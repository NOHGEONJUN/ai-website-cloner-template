"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pencil, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER } from "@/lib/mock-data";

const TABS = [
  { label: "맞춤 추천", href: "/gov-grant/recommend" },
  { label: "과제 검색", href: "/gov-grant/search" },
  { label: "관심 공고", href: "/gov-grant/saved" },
];

export function TopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 flex h-[72px] shrink-0 items-center gap-6 border-b-[1.5px] border-line bg-white px-8">
      <Link href="/gov-grant/recommend" className="text-[22px] font-bold text-ink transition-colors hover:text-brand">
        정부 과제 추천
      </Link>
      <span className="h-5 w-[2px] bg-gray-soft" />

      <nav className="flex items-center gap-10">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "text-[15px] font-bold transition-colors",
              pathname === t.href ? "text-brand" : "text-gray-soft hover:text-ink-light",
            )}
          >
            {t.label}
          </Link>
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
