"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, RotateCw, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GrantSearchCard } from "@/components/GrantSearchCard";
import { Pagination } from "@/components/Pagination";
import { Chip, NumberField } from "@/components/FilterControls";
import { cn } from "@/lib/utils";
import { ALL_GRANTS, SEARCH_SORTS } from "@/lib/mock-data";
import { filterGrants, sortSearchGrants } from "@/lib/search";

const PAGE_SIZE = 10;

const ORG_TYPES = ["대기업", "중견기업", "중소기업/스타트업", "대학 연구실", "공공/민간 연구기관", "의료기관"];
const REGIONS = ["전국", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "비수도권"];
const GRANT_TYPES = ["전체", "연구개발", "사업화"] as const;

function FilterCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 bg-white p-6 max-md:p-4">
      <span className="text-sm font-bold text-ink">{label}</span>
      {children}
    </div>
  );
}

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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden w-[132px] shrink-0 translate-y-[5px] max-md:block">
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

  const results = useMemo(
    () =>
      sortSearchGrants(
        filterGrants(ALL_GRANTS, {
          keyword: committed,
          orgs,
          regions,
          revenue,
          years,
          lab,
          grantType,
          ongoing,
        }),
        sort,
      ),
    [committed, orgs, regions, revenue, years, lab, grantType, ongoing, sort],
  );

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
