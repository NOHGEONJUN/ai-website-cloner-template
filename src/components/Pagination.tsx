"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

function NavButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-full",
        disabled ? "cursor-not-allowed text-ink-light opacity-50" : "text-gray-soft hover:bg-gray-100",
      )}
    >
      {children}
    </button>
  );
}

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;
  // live app shows a 10-page window
  const start = Math.floor((page - 1) / 10) * 10 + 1;
  const pages = Array.from({ length: Math.min(10, pageCount - start + 1) }, (_, i) => start + i);
  return (
    <div className="flex items-center justify-center gap-2.5 py-6">
      <NavButton disabled={page === 1} onClick={() => onChange(1)}>
        <ChevronsLeft className="size-4" />
      </NavButton>
      <NavButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="size-4" />
      </NavButton>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "flex size-10 items-center justify-center rounded-full",
            p === page ? "bg-brand-tag font-bold text-brand" : "text-gray-soft hover:bg-gray-100",
          )}
        >
          {p}
        </button>
      ))}
      <NavButton disabled={page === pageCount} onClick={() => onChange(page + 1)}>
        <ChevronRight className="size-4" />
      </NavButton>
      <NavButton disabled={page === pageCount} onClick={() => onChange(pageCount)}>
        <ChevronsRight className="size-4" />
      </NavButton>
    </div>
  );
}
