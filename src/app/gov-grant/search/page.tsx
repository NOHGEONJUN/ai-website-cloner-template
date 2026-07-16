"use client";

import { useMemo, useState } from "react";
import { Search, RotateCw, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GrantSearchCard } from "@/components/GrantSearchCard";
import { Pagination } from "@/components/Pagination";
import { cn } from "@/lib/utils";
import { ALL_GRANTS, SEARCH_SORTS } from "@/lib/mock-data";
import type { Grant } from "@/types/grant";

const PAGE_SIZE = 10;

const ORG_TYPES = ["대기업", "중견기업", "중소기업/스타트업", "대학 연구실", "공공/민간 연구기관", "의료기관"];
const ORG_NEEDLES: Record<string, string> = {
  대기업: "대기업",
  중견기업: "중견기업",
  "중소기업/스타트업": "중소기업",
  "대학 연구실": "대학 연구실",
  "공공/민간 연구기관": "연구기관",
  의료기관: "의료기관",
};
const REGIONS = ["전국", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "비수도권"];
const GRANT_TYPES = ["전체", "연구개발", "사업화"] as const;

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-7 rounded-[4px] border-[1.5px] px-2.5 text-xs whitespace-nowrap transition-colors",
        selected
          ? "border-brand-soft bg-brand-soft text-brand"
          : "border-line bg-white text-ink-light hover:border-gray-soft",
      )}
    >
      {label}
    </button>
  );
}

function FilterCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 bg-white p-6 max-md:p-4">
      <span className="text-sm font-bold text-ink">{label}</span>
      {children}
    </div>
  );
}

function NumberField({
  placeholder,
  suffix,
  value,
  onChange,
}: {
  placeholder: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-[33px] items-center overflow-hidden rounded-[5px] border-[1.5px] border-line bg-white">
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 px-2.5 text-sm outline-none [appearance:textfield] placeholder:text-ink-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="flex h-full shrink-0 items-center justify-center border-l border-line bg-panel px-2.5">
        <span className="text-xs text-gray-soft">{suffix}</span>
      </div>
    </div>
  );
}

/** "-/3년 이상" 형태의 mock 요건 문자열과 입력값을 대조한다. */
function matchesRevenueYears(revenue: string, myRevenue: string, myYears: string) {
  const [rev = "-", years = "-"] = revenue.split("/").map((s) => s.trim());
  if (myRevenue !== "" && rev !== "-") {
    const limit = parseFloat(rev);
    if (!Number.isNaN(limit) && rev.includes("이하") && parseFloat(myRevenue) > limit) return false;
  }
  if (myYears !== "" && years !== "-") {
    const limit = parseFloat(years);
    if (!Number.isNaN(limit)) {
      const y = parseFloat(myYears);
      if (years.includes("이내") || years.includes("이하")) {
        if (y > limit) return false;
      } else if (years.includes("이상") && y < limit) {
        return false;
      }
    }
  }
  return true;
}

const METRO = ["서울", "경기", "인천"];

/** Mobile sort — the live app swaps the segmented control for a 132px listbox. */
function MobileSortSelect({
  value,
  options,
  onChange,
}: {
  value: number;
  options: string[];
  onChange: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative hidden w-[132px] shrink-0 translate-y-[5px] max-md:block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[34px] w-full items-center justify-between gap-1 rounded-[8px] bg-white px-2.5 py-[5px] text-left text-sm text-ink outline outline-1 outline-line focus:outline-2 focus:outline-brand-tag"
      >
        <span className="truncate">{options[value]}</span>
        <ChevronDown className="size-4 text-ink-muted" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 left-0 z-20 mt-1.5 overflow-hidden rounded-[8px] border border-line bg-white shadow-md"
        >
          {options.map((o, i) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={i === value}
                onClick={() => {
                  onChange(i);
                  setOpen(false);
                }}
                className={cn(
                  "w-full px-2.5 py-2 text-left text-sm",
                  i === value ? "font-bold text-ink" : "text-ink-muted hover:bg-panel",
                )}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function GovGrantSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [committed, setCommitted] = useState("");
  const [orgs, setOrgs] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [revenue, setRevenue] = useState("");
  const [years, setYears] = useState("");
  const [lab, setLab] = useState<"예" | "아니오" | null>(null);
  const [grantType, setGrantType] = useState<(typeof GRANT_TYPES)[number]>("전체");
  const [ongoing, setOngoing] = useState(true);
  const [sort, setSort] = useState(0);
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleIn = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const resetFilters = () => {
    setOrgs([]);
    setRegions([]);
    setRevenue("");
    setYears("");
    setLab(null);
    setGrantType("전체");
    setPage(1);
  };

  const results = useMemo(() => {
    let list: Grant[] = ALL_GRANTS;
    if (committed.trim()) {
      const k = committed.trim();
      list = list.filter((g) =>
        [g.title, g.noticeName, g.ministry, g.agency, ...g.tags].some((s) => s.includes(k)),
      );
    }
    if (orgs.length) list = list.filter((g) => orgs.some((o) => g.orgTypes.includes(ORG_NEEDLES[o])));
    if (regions.length) {
      list = list.filter((g) => {
        if (g.regions === "전국" || regions.includes("전국")) return true;
        if (regions.includes("비수도권") && !METRO.some((m) => g.regions.includes(m))) return true;
        return regions.some((r) => g.regions.includes(r));
      });
    }
    if (revenue !== "" || years !== "") list = list.filter((g) => matchesRevenueYears(g.revenue, revenue, years));
    if (lab === "아니오") list = list.filter((g) => g.lab === "불필요");
    if (grantType !== "전체") list = list.filter((g) => g.supportType === grantType);
    if (ongoing) list = list.filter((g) => g.dday == null || g.dday >= 0);
    const sorted = [...list];
    if (sort === 0) sorted.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
    else sorted.sort((a, b) => (a.dday ?? Infinity) - (b.dday ?? Infinity));
    return sorted;
  }, [committed, orgs, regions, revenue, years, lab, grantType, ongoing, sort]);

  const pageCount = Math.ceil(results.length / PAGE_SIZE);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1136px] flex-col px-8 pb-6 max-md:px-4">
        {/* heading */}
        <div className="mt-10 flex flex-col gap-1.5 max-md:mt-7">
          <h2 className="text-[32px] leading-[1.4] font-medium tracking-[-0.02em] text-ink max-md:text-lg">
            원하는 정부 과제를 검색하고 필터를 적용해보세요
          </h2>
          <p className="font-medium text-ink-light max-md:text-[13px] max-md:break-keep">
            50개 부처 · 1,200개 수행기관 공고 사이트 기반 실시간 업데이트
          </p>
        </div>

        {/* search row */}
        <div className="mt-5 flex gap-3 max-md:flex-col">
          <textarea
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예) 과제명, 사업 분야 키워드, 기술/연구 세부 키워드 입력을 통해 필요한 과제를 찾아보세요."
            className="min-h-[176px] w-full resize-none rounded-[15px] px-5 py-4 outline-[1.5px] outline-line placeholder:text-gray-soft focus:outline-[4px] focus:outline-brand-tag max-md:min-h-[120px] max-md:rounded-[10px] max-md:p-4"
          />
          <button
            type="button"
            onClick={() => {
              setCommitted(keyword);
              setPage(1);
            }}
            className="flex w-28 shrink-0 flex-col items-center justify-center gap-1.5 rounded-[10px] bg-brand text-white transition-colors hover:bg-brand-3 max-md:h-12 max-md:w-full max-md:flex-row"
          >
            <Search className="size-5" />
            <span className="text-sm font-bold">검색하기</span>
          </button>
        </div>

        {/* filter panel */}
        <div className="mt-[35px] flex flex-col gap-4 max-md:mt-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-bold text-ink">요건 / 필터</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-[5px] border-[1.5px] border-line bg-panel px-2.5 py-[5px] text-sm font-bold text-ink-light transition-colors hover:text-ink-muted"
              >
                <RotateCw className="size-4" />
                초기화
              </button>
              <button
                type="button"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="hidden items-center gap-1 rounded-[5px] border-[1.5px] border-line bg-white px-2.5 py-[5px] text-sm font-bold text-ink-light transition-colors max-md:flex"
              >
                {mobileOpen ? "필터 접기" : "필터 펼치기"}
                <ChevronDown className={cn("size-3 transition-transform", mobileOpen && "rotate-180")} />
              </button>
            </div>
          </div>

          <div
            className={cn(
              "grid overflow-hidden rounded-[20px] border-[1.5px] border-line bg-line transition-all duration-200 ease-out md:grid-cols-3 md:gap-[1.5px] max-md:rounded-[16px]",
              !mobileOpen && "max-md:grid-rows-[0fr] max-md:-translate-y-1 max-md:border-0 max-md:opacity-0",
            )}
          >
            <div className="grid min-h-0 grid-cols-1 gap-[1.5px] overflow-hidden md:contents">
              <FilterCell label="기관 유형">
                <div className="flex flex-wrap gap-1.5">
                  {ORG_TYPES.map((o) => (
                    <Chip
                      key={o}
                      label={o}
                      selected={orgs.includes(o)}
                      onClick={() => {
                        setOrgs((v) => toggleIn(v, o));
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </FilterCell>
              <FilterCell label="내 매출액">
                <NumberField placeholder="매출액 입력" suffix="억원" value={revenue} onChange={(v) => { setRevenue(v); setPage(1); }} />
              </FilterCell>
              <FilterCell label="내 사업연수">
                <NumberField placeholder="사업 연수 입력" suffix="년" value={years} onChange={(v) => { setYears(v); setPage(1); }} />
              </FilterCell>
              <FilterCell label="기관 소재지">
                <div className="flex flex-wrap gap-1.5">
                  {REGIONS.map((r) => (
                    <Chip
                      key={r}
                      label={r}
                      selected={regions.includes(r)}
                      onClick={() => {
                        setRegions((v) => toggleIn(v, r));
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </FilterCell>
              <FilterCell label="부설연구소/연구전담부서 유무">
                <div className="flex flex-wrap gap-1.5">
                  {(["예", "아니오"] as const).map((v) => (
                    <Chip
                      key={v}
                      label={v}
                      selected={lab === v}
                      onClick={() => {
                        setLab((cur) => (cur === v ? null : v));
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </FilterCell>
              <FilterCell label="과제 유형">
                <div className="flex flex-wrap gap-1.5">
                  {GRANT_TYPES.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={grantType === t}
                      onClick={() => {
                        setGrantType(t);
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              </FilterCell>
            </div>
          </div>
        </div>

        {/* result bar */}
        <div className="mt-[35px] flex items-center justify-between gap-4 px-1 max-md:mt-6 max-md:flex-col max-md:items-stretch">
          <div className="flex items-center gap-[5px] font-bold text-ink-light">
            <span>총</span>
            <span className="text-brand">{results.length.toLocaleString()}</span>
            <span>건의 과제</span>
          </div>
          <div className="flex items-center gap-3 max-md:justify-between">
            <button
              type="button"
              onClick={() => {
                setOngoing((v) => !v);
                setPage(1);
              }}
              className={cn(
                "group flex items-center gap-[5px] rounded-[5px] px-3 py-[7px] text-sm font-bold whitespace-nowrap transition-colors",
                ongoing ? "text-brand hover:opacity-50" : "text-gray-soft hover:text-brand-3",
              )}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors",
                  ongoing ? "bg-brand" : "bg-gray-soft group-hover:bg-brand-3",
                )}
              />
              진행 중인 공고만 보기
            </button>
            <MobileSortSelect
              value={sort}
              options={SEARCH_SORTS}
              onChange={(i) => {
                setSort(i);
                setPage(1);
              }}
            />
            <div className="flex shrink-0 items-center gap-1 rounded-[5px] bg-panel px-[7px] py-1.5 max-md:hidden">
              {SEARCH_SORTS.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSort(i);
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-[4px] px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors",
                    i === sort ? "bg-white text-ink" : "text-gray-soft hover:text-ink-light",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* results */}
        <div className="mt-4 flex flex-col gap-6">
          {visible.map((g) => (
            <GrantSearchCard key={g.id} grant={g} />
          ))}
          {visible.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-20 text-center">
              <p className="font-bold text-ink">검색 결과가 없습니다</p>
              <p className="text-sm text-ink-light">검색어나 필터 조건을 조정해보세요.</p>
            </div>
          )}
        </div>

        <div className="mt-2">
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </AppShell>
  );
}
