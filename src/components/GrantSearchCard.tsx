"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Grant } from "@/types/grant";

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 max-md:flex-col max-md:gap-1">
      <span className="w-[95px] shrink-0 text-xs text-ink-light max-md:w-auto">{label}</span>
      <div className="min-w-0 flex-1 text-sm font-bold text-ink-2">{children}</div>
    </div>
  );
}

function ReqBox({ label, value, unknown }: { label: string; value: string; unknown: boolean }) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-[5px] p-5", unknown ? "bg-warn/10" : "bg-ok-soft")}>
      <span className={cn("text-xs", unknown ? "font-bold text-warn/50" : "text-ink-light")}>{label}</span>
      <span className={cn("text-sm font-bold leading-snug", unknown ? "text-warn" : "text-ink")}>{value}</span>
    </div>
  );
}

/**
 * Search-result card, extracted from /gov-grant/search (see
 * docs/research/components/grant-search-card.spec.md). Known match scores
 * render the green state (mirrors the recommend page); `matchUnknown` keeps
 * the live logged-out red "?/4" state.
 */
export function GrantSearchCard({ grant }: { grant: Grant }) {
  const unknown = grant.matchUnknown === true;
  const pct = Math.round((grant.matchScore / grant.matchTotal) * 100);
  return (
    <Link
      href={`/gov-grant/${grant.id}`}
      className="group flex w-full flex-col gap-[22px] rounded-[35px] border-[1.5px] border-line bg-white p-[43px] transition-opacity duration-200 md:hover:opacity-50 max-md:gap-[18px] max-md:rounded-[20px] max-md:p-5"
    >
      {/* header */}
      <div className="flex flex-col gap-1.5 border-b border-line pb-6 max-md:pb-[18px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-[3px]">
            {grant.isNew && (
              <span className="inline-flex shrink-0 items-center justify-center rounded-[2px] bg-ok px-2 py-1 text-xs font-bold text-white">
                NEW
              </span>
            )}
            {grant.dday != null && grant.dday >= 0 && (
              <span className="flex items-center justify-center rounded-[2px] bg-warn px-2 py-1 text-xs font-bold whitespace-nowrap text-white">
                D-{grant.dday}
              </span>
            )}
          </div>
          <BookmarkButton grantId={grant.id} />
        </div>
        <h3 className="text-base font-bold break-keep text-ink">{grant.title}</h3>
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-ink-light max-md:flex-wrap">
          <span className="shrink-0">공고명</span>
          <span className="shrink-0">|</span>
          <span className="truncate">{grant.noticeName}</span>
        </div>
      </div>

      {/* body */}
      <div className="flex items-stretch gap-[30px] max-md:flex-col max-md:gap-3.5">
        <div className="flex w-[437px] shrink-0 flex-col justify-between gap-3 rounded-[5px] bg-panel p-[25px] max-md:w-full max-md:p-4">
          <InfoRow label="신청 기간">{grant.period}</InfoRow>
          <InfoRow label="지원금">
            <span className="inline-flex items-center justify-center bg-brand-tag px-1.5 py-0.5 text-sm font-bold text-brand">
              {grant.amount}
            </span>
          </InfoRow>
          <InfoRow label="부처">{grant.ministry}</InfoRow>
          <InfoRow label="전문기관명">{grant.agency}</InfoRow>
          <InfoRow label="공고등록일">{grant.registeredAt}</InfoRow>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center gap-4 pl-[3px]">
              <span className={cn("text-xs font-bold whitespace-nowrap", unknown ? "text-warn" : "text-ink")}>
                요건 충족도 {unknown ? "?" : grant.matchScore}/{grant.matchTotal}
              </span>
              <div
                className={cn(
                  "relative h-4 min-h-4 flex-1 overflow-hidden rounded-full border-[1.5px]",
                  unknown ? "border-warn/30 bg-warn/10" : "border-ok/30 bg-ok/10",
                )}
              >
                {unknown ? (
                  <div className="mt-[1.5px] ml-[3px] size-2.5 rounded-full bg-warn" />
                ) : (
                  <div className="h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
                )}
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3 max-md:grid-cols-1">
              <ReqBox label="지원 가능 기관 유형" value={grant.orgTypes} unknown={unknown} />
              <ReqBox label="지원 가능 소재지" value={grant.regions} unknown={unknown} />
              <ReqBox label="지원 가능 매출액 / 사업연수" value={grant.revenue} unknown={unknown} />
              <ReqBox label="부설 연구소 필요 유무" value={grant.lab} unknown={unknown} />
            </div>
          </div>
        </div>
      </div>

      {/* footer row */}
      <div className="flex items-center justify-between gap-[7px] py-1.5 pr-1 max-md:flex-col max-md:items-start max-md:gap-3">
        <div className="flex flex-wrap gap-1.5">
          {grant.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-[2px] bg-brand-tag p-1.5 text-xs font-bold text-brand-2">
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="shrink-0 text-sm font-bold whitespace-nowrap text-brand underline underline-offset-2"
        >
          매일 아침 맞춤 공고 알림받기 &gt;
        </button>
      </div>
    </Link>
  );
}
