"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Hero } from "@/components/Hero";
import { GrantCard } from "@/components/GrantCard";
import { Pagination } from "@/components/Pagination";
import { cn } from "@/lib/utils";
import { ALL_GRANTS, NEW_ALERT_GRANT, SORTS, TOTAL_COUNT } from "@/lib/mock-data";
import { sortRecommendGrants } from "@/lib/search";

const PAGE_SIZE = 8;

const intParam = (v: string | null, fallback: number) => {
  const n = parseInt(v ?? "", 10);
  return Number.isNaN(n) ? fallback : n;
};

/* URL is the source of truth for page/sort so refresh, deep links, and
   back/forward keep list state (an enhancement — the live app keeps it in memory). */
function RecommendPageInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const sort = Math.min(Math.max(intParam(sp.get("sort"), 1), 0), SORTS.length - 1);

  const sorted = useMemo(() => sortRecommendGrants(ALL_GRANTS, sort), [sort]);
  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const page = Math.min(Math.max(intParam(sp.get("page"), 1), 1), pageCount);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const update = (next: { page?: number; sort?: number }) => {
    const q = new URLSearchParams(sp.toString());
    const merged = { page, sort, ...next };
    if (merged.page === 1) q.delete("page");
    else q.set("page", String(merged.page));
    if (merged.sort === 1) q.delete("sort");
    else q.set("sort", String(merged.sort));
    router.replace(`?${q.toString()}`, { scroll: false });
    if (next.page !== undefined) window.scrollTo({ top: 0 });
  };

  return (
    <AppShell>
      {/* px-8 + 1136px content column = original's computed content width */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-8 py-6">
        <Hero />

        {/* new alert */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">
            <span className="size-1.5 rounded-full bg-white" />새 알림 추천
          </span>
          <span className="text-[13px] text-ink-light">AI가 새로 매칭한 과제입니다</span>
        </div>

        <GrantCard grant={NEW_ALERT_GRANT} />

        {/* result bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            총 <span className="font-bold text-ink">{TOTAL_COUNT}</span>건의 과제가 추천되었습니다
          </p>
          <div className="flex items-center gap-4">
            {SORTS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => update({ sort: i, page: 1 })}
                className={cn(
                  "text-[13px]",
                  i === sort ? "font-bold text-ink" : "text-ink-light hover:text-ink-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* grant list */}
        <div className="flex flex-col gap-6">
          {visible.map((g) => (
            <GrantCard key={g.id} grant={g} />
          ))}
        </div>

        <Pagination page={page} pageCount={pageCount} onChange={(p) => update({ page: p })} />
      </div>
    </AppShell>
  );
}

export default function GovGrantRecommendPage() {
  return (
    <Suspense fallback={null}>
      <RecommendPageInner />
    </Suspense>
  );
}
