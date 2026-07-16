"use client";

import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import { computeMatch, hasProfile } from "@/lib/search";

function ReqBox({
  label,
  value,
  wide,
  unmet,
}: {
  label: string;
  value: string;
  wide?: boolean;
  unmet: boolean;
}) {
  return (
    <div className={cn("rounded-[5px] p-4", unmet ? "bg-warn/10" : "bg-ok-soft", wide && "col-span-3")}>
      <p className={cn("text-xs", unmet ? "font-bold text-warn/50" : "text-ink-light")}>{label}</p>
      <p className={cn("mt-1.5 text-sm font-bold", unmet ? "text-warn" : "text-ok")}>{value}</p>
    </div>
  );
}

/** 요건 충족도 section — recomputes from the saved 나의 요건 profile when present. */
export function DetailMatch({
  orgTypes,
  regions,
  revenue,
  lab,
  fallbackScore,
  total,
}: {
  orgTypes: string;
  regions: string;
  revenue: string;
  lab: string;
  fallbackScore: number;
  total: number;
}) {
  const profile = useProfile();
  const match = hasProfile(profile)
    ? computeMatch({ orgTypes, regions, revenue, lab }, profile)
    : null;
  const score = match ? match.score : fallbackScore;
  const met = match?.met ?? { org: true, region: true, revenue: true, lab: true };
  const pct = Math.round((score / total) * 100);
  const allMet = score === total;

  return (
    <section className="overflow-hidden rounded-[20px] border border-line bg-white max-md:rounded-2xl">
      <header
        className={cn(
          "flex items-baseline gap-3 border-b border-line px-7 py-5",
          allMet ? "bg-[#e9fbee] text-ok" : "bg-warn/10 text-warn",
        )}
      >
        <h2 className="text-[22px] font-bold max-md:text-base">요건 충족도</h2>
        <span className="text-sm font-bold">
          {score}/{total}
        </span>
      </header>
      <div className="px-7 py-2">
        <div className="py-5">
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className={cn("h-full rounded-full", allMet ? "bg-ok" : "bg-warn")}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            <ReqBox label="지원 가능 기관 유형" value={orgTypes} wide unmet={!met.org} />
            <ReqBox label="지원 가능 소재지" value={regions} unmet={!met.region} />
            <ReqBox label="지원 가능 매출액 / 사업연수" value={revenue} unmet={!met.revenue} />
            <ReqBox label="부설 연구소 필요 유무" value={lab} unmet={!met.lab} />
          </div>
        </div>
      </div>
    </section>
  );
}
