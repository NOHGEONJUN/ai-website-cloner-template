"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GrantCard } from "@/components/GrantCard";
import { Pagination } from "@/components/Pagination";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ALL_GRANTS, NEW_ALERT_GRANT } from "@/lib/mock-data";

const PAGE_SIZE = 8;
const POOL = [NEW_ALERT_GRANT, ...ALL_GRANTS];

/**
 * 관심 공고 (saved notices) — /gov-grant/saved.
 * ⚠ Layout is a reconstruction: the live page is login-only (URL confirmed via
 * the detail-404 "저장한 공고로 돌아가기" link). See docs/research/components/saved-page.spec.md.
 */
export default function GovGrantSavedPage() {
  const { ids } = useBookmarks();
  const [page, setPage] = useState(1);

  const saved = useMemo(() => POOL.filter((g) => ids.includes(g.id)), [ids]);
  const pageCount = Math.ceil(saved.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(pageCount, 1));
  const visible = saved.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-6 px-8 py-6">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-32 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-panel">
              <Bookmark className="size-6 text-ink-light" />
            </span>
            <p className="text-lg font-bold text-ink">저장한 공고가 없습니다</p>
            <p className="text-sm text-ink-light">과제 검색에서 관심 있는 공고를 저장해보세요.</p>
            <Link
              href="/gov-grant/search"
              className="mt-2 rounded-[5px] bg-brand-soft px-4 py-[11px] text-sm font-bold text-brand hover:brightness-95"
            >
              과제 검색하러 가기
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-ink-muted">
              총 <span className="font-bold text-ink">{saved.length}</span>건의 과제가 저장되었습니다
            </p>
            <div className="flex flex-col gap-6">
              {visible.map((g) => (
                <GrantCard key={g.id} grant={g} />
              ))}
            </div>
            <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
          </>
        )}
      </div>
    </AppShell>
  );
}
