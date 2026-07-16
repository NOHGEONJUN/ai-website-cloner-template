"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/hooks/useBookmarks";

/**
 * 관심 공고 등록 toggle. Saved state (filled icon + label swap) is a
 * reconstruction — the live saved flow is login-only.
 */
export function BookmarkButton({ grantId }: { grantId: string }) {
  const { ids, toggle } = useBookmarks();
  const saved = ids.includes(grantId);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(grantId);
      }}
      className="flex h-9 shrink-0 items-center gap-[5px] rounded-[5px] border-[1.5px] border-line bg-panel px-3 text-sm font-bold text-ink hover:bg-line/60"
    >
      <Bookmark className={cn("size-4", saved && "fill-brand text-brand")} />
      {saved ? "관심 공고 저장됨" : "관심 공고 등록"}
    </button>
  );
}
