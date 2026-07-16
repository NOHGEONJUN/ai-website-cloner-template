"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Hero } from "@/components/Hero";
import { GrantCard } from "@/components/GrantCard";
import { Pagination } from "@/components/Pagination";
import { cn } from "@/lib/utils";
import { ALL_GRANTS, NEW_ALERT_GRANT, SORTS, TOTAL_COUNT } from "@/lib/mock-data";
import type { Grant } from "@/types/grant";

const PAGE_SIZE = 8;

const byRegistered = (a: Grant, b: Grant) => b.registeredAt.localeCompare(a.registeredAt);
const byDday = (a: Grant, b: Grant) => (a.dday ?? Infinity) - (b.dday ?? Infinity);

function sortGrants(grants: Grant[], sort: number): Grant[] {
  const list = [...grants];
  if (sort === 0) list.sort(byRegistered);
  else if (sort === 1) list.sort((a, b) => b.matchScore - a.matchScore || byRegistered(a, b));
  else list.sort(byDday);
  return list;
}

export default function GovGrantRecommendPage() {
  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => sortGrants(ALL_GRANTS, sort), [sort]);
  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-6 px-8 py-6">
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
                onClick={() => {
                  setSort(i);
                  setPage(1);
                }}
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

        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </div>
    </AppShell>
  );
}
