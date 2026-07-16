import { describe, expect, it } from "vitest";
import type { Grant } from "@/types/grant";
import {
  filterGrants,
  matchesRevenueYears,
  sortRecommendGrants,
  sortSearchGrants,
  toggleBookmarkIds,
} from "@/lib/search";

const base: Grant = {
  id: "t-1",
  isNew: false,
  deadlineNote: "~ 2026-07-30",
  title: "수소 연료전지 스택 내구성 향상",
  noticeName: "2026년도 소재부품기술개발사업 공고",
  period: "- ~ 2026-07-30",
  amount: "-",
  ministry: "산업통상자원부",
  agency: "한국산업기술기획평가원",
  registeredAt: "2026-07-10",
  matchScore: 4,
  matchTotal: 4,
  orgTypes: "대기업, 중견기업, 중소기업",
  regions: "전국",
  revenue: "-/-",
  lab: "불필요",
  tags: ["수소·연료전지"],
  dday: 14,
  supportType: "연구개발",
};

const grant = (over: Partial<Grant>): Grant => ({ ...base, ...over });

describe("matchesRevenueYears", () => {
  it("passes everything when the grant has no constraint", () => {
    expect(matchesRevenueYears("-/-", "100", "20")).toBe(true);
  });
  it("enforces 매출액 이하 limits", () => {
    expect(matchesRevenueYears("5억원 이하/3년 이하", "5", "")).toBe(true);
    expect(matchesRevenueYears("5억원 이하/3년 이하", "6", "")).toBe(false);
  });
  it("enforces 사업연수 이내/이하 limits", () => {
    expect(matchesRevenueYears("-/1년 이내", "", "1")).toBe(true);
    expect(matchesRevenueYears("-/1년 이내", "", "2")).toBe(false);
  });
  it("enforces 사업연수 이상 limits", () => {
    expect(matchesRevenueYears("-/3년 이상", "", "3")).toBe(true);
    expect(matchesRevenueYears("-/3년 이상", "", "2")).toBe(false);
  });
  it("passes when inputs are empty", () => {
    expect(matchesRevenueYears("5억원 이하/3년 이상", "", "")).toBe(true);
  });
});

describe("filterGrants", () => {
  const pool = [
    grant({ id: "a", title: "폐배터리 재활용 공정", regions: "울산", orgTypes: "중소기업", lab: "필요", supportType: "연구개발", dday: 3, registeredAt: "2026-07-15" }),
    grant({ id: "b", title: "위성 영상 작황 분석", regions: "전국", orgTypes: "대기업, 의료기관", lab: "불필요", supportType: "사업화", dday: null, registeredAt: "2026-07-01" }),
    grant({ id: "c", title: "온디바이스 AI 컴파일러", regions: "서울", orgTypes: "대학 연구실, 국공립/민간 연구기관", lab: "불필요", supportType: "연구개발", dday: -2, registeredAt: "2026-07-10" }),
  ];

  it("matches keyword against title/notice/tags/ministry/agency", () => {
    expect(filterGrants(pool, { keyword: "배터리" }).map((g) => g.id)).toEqual(["a"]);
    expect(filterGrants(pool, { keyword: "산업통상자원부" })).toHaveLength(3);
  });
  it("maps org chip labels to orgTypes needles", () => {
    expect(filterGrants(pool, { orgs: ["중소기업/스타트업"] }).map((g) => g.id)).toEqual(["a"]);
    expect(filterGrants(pool, { orgs: ["공공/민간 연구기관"] }).map((g) => g.id)).toEqual(["c"]);
  });
  it("region: 전국 grants always pass, 비수도권 excludes metro-only grants", () => {
    expect(filterGrants(pool, { regions: ["울산"] }).map((g) => g.id)).toEqual(["a", "b"]);
    expect(filterGrants(pool, { regions: ["비수도권"] }).map((g) => g.id)).toEqual(["a", "b"]);
  });
  it("lab 아니오 keeps only 불필요 grants; 예 keeps all", () => {
    expect(filterGrants(pool, { lab: "아니오" }).map((g) => g.id)).toEqual(["b", "c"]);
    expect(filterGrants(pool, { lab: "예" })).toHaveLength(3);
  });
  it("grantType filters by supportType, 전체 passes all", () => {
    expect(filterGrants(pool, { grantType: "사업화" }).map((g) => g.id)).toEqual(["b"]);
    expect(filterGrants(pool, { grantType: "전체" })).toHaveLength(3);
  });
  it("ongoing keeps null-dday and future deadlines, drops expired", () => {
    expect(filterGrants(pool, { ongoing: true }).map((g) => g.id)).toEqual(["a", "b"]);
  });
});

describe("sorting", () => {
  const pool = [
    grant({ id: "old", registeredAt: "2026-06-01", dday: 2, matchScore: 2 }),
    grant({ id: "new", registeredAt: "2026-07-15", dday: null, matchScore: 3 }),
    grant({ id: "mid", registeredAt: "2026-07-01", dday: 30, matchScore: 4 }),
  ];

  it("search sort 0 = 최신 게시 순 (registeredAt desc)", () => {
    expect(sortSearchGrants(pool, 0).map((g) => g.id)).toEqual(["new", "mid", "old"]);
  });
  it("search sort 1 = 마감 임박 순 (dday asc, null last)", () => {
    expect(sortSearchGrants(pool, 1).map((g) => g.id)).toEqual(["old", "mid", "new"]);
  });
  it("recommend sort 1 = 추천 컨설팅 순 (matchScore desc, then recency)", () => {
    expect(sortRecommendGrants(pool, 1).map((g) => g.id)).toEqual(["mid", "new", "old"]);
  });
  it("does not mutate the input array", () => {
    const before = pool.map((g) => g.id);
    sortSearchGrants(pool, 1);
    expect(pool.map((g) => g.id)).toEqual(before);
  });
});

describe("toggleBookmarkIds", () => {
  it("adds a missing id and removes an existing one", () => {
    expect(toggleBookmarkIds([], "g-1")).toEqual(["g-1"]);
    expect(toggleBookmarkIds(["g-1", "g-2"], "g-1")).toEqual(["g-2"]);
  });
});
