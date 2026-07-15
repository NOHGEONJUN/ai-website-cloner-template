import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Hero } from "@/components/Hero";
import { GrantCard } from "@/components/GrantCard";
import { GRANTS, NEW_ALERT_GRANT, SORTS, TOTAL_COUNT } from "@/lib/mock-data";

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 py-6 text-sm">
      <button className="flex size-8 items-center justify-center rounded text-ink-light hover:bg-panel">
        <ChevronLeft className="size-4" />
      </button>
      {[1, 2, 3, 4, 5].map((p) => (
        <button
          key={p}
          className={
            p === 1
              ? "flex size-8 items-center justify-center rounded bg-brand-tag font-bold text-brand"
              : "flex size-8 items-center justify-center rounded text-ink-muted hover:bg-panel"
          }
        >
          {p}
        </button>
      ))}
      <button className="flex size-8 items-center justify-center rounded text-ink-light hover:bg-panel">
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

export default function GovGrantRecommendPage() {
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
                className={
                  i === 1
                    ? "text-[13px] font-bold text-ink"
                    : "text-[13px] text-ink-light hover:text-ink-muted"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* grant list */}
        <div className="flex flex-col gap-6">
          {GRANTS.map((g) => (
            <GrantCard key={g.id} grant={g} />
          ))}
        </div>

        <Pagination />
      </div>
    </AppShell>
  );
}
