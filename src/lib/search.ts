import type { Grant } from "@/types/grant";

/** Filter-chip label → substring needle against Grant.orgTypes. */
export const ORG_NEEDLES: Record<string, string> = {
  대기업: "대기업",
  중견기업: "중견기업",
  "중소기업/스타트업": "중소기업",
  "대학 연구실": "대학 연구실",
  "공공/민간 연구기관": "연구기관",
  의료기관: "의료기관",
};

export const METRO = ["서울", "경기", "인천"];

/** "-/3년 이상" 형태의 mock 요건 문자열과 입력값(억원/년)을 대조한다. */
export function matchesRevenueYears(revenue: string, myRevenue: string, myYears: string): boolean {
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

export interface SearchCriteria {
  keyword?: string;
  orgs?: string[];
  regions?: string[];
  revenue?: string;
  years?: string;
  lab?: "예" | "아니오" | null;
  grantType?: "전체" | "연구개발" | "사업화";
  ongoing?: boolean;
}

export function filterGrants(grants: Grant[], c: SearchCriteria): Grant[] {
  let list = grants;
  const keyword = c.keyword?.trim();
  if (keyword) {
    list = list.filter((g) =>
      [g.title, g.noticeName, g.ministry, g.agency, ...g.tags].some((s) => s.includes(keyword)),
    );
  }
  if (c.orgs?.length) {
    list = list.filter((g) => c.orgs!.some((o) => g.orgTypes.includes(ORG_NEEDLES[o] ?? o)));
  }
  if (c.regions?.length) {
    const regions = c.regions;
    list = list.filter((g) => {
      if (g.regions === "전국" || regions.includes("전국")) return true;
      if (regions.includes("비수도권") && !METRO.some((m) => g.regions.includes(m))) return true;
      return regions.some((r) => g.regions.includes(r));
    });
  }
  if ((c.revenue ?? "") !== "" || (c.years ?? "") !== "") {
    list = list.filter((g) => matchesRevenueYears(g.revenue, c.revenue ?? "", c.years ?? ""));
  }
  if (c.lab === "아니오") list = list.filter((g) => g.lab === "불필요");
  if (c.grantType && c.grantType !== "전체") list = list.filter((g) => g.supportType === c.grantType);
  if (c.ongoing) list = list.filter((g) => g.dday == null || g.dday >= 0);
  return list;
}

const byRegistered = (a: Grant, b: Grant) => b.registeredAt.localeCompare(a.registeredAt);
const byDday = (a: Grant, b: Grant) => (a.dday ?? Infinity) - (b.dday ?? Infinity);

/** 과제 검색: 0 = 최신 게시 순, 1 = 마감 임박 순 */
export function sortSearchGrants(grants: Grant[], mode: number): Grant[] {
  const list = [...grants];
  list.sort(mode === 0 ? byRegistered : byDday);
  return list;
}

/** 맞춤 추천: 0 = 최신 등록 순, 1 = 추천 컨설팅 순, 2 = 마감 임박 순 */
export function sortRecommendGrants(grants: Grant[], mode: number): Grant[] {
  const list = [...grants];
  if (mode === 0) list.sort(byRegistered);
  else if (mode === 1) list.sort((a, b) => b.matchScore - a.matchScore || byRegistered(a, b));
  else list.sort(byDday);
  return list;
}

/** Bookmark id list toggle (pure — used by useBookmarks). */
export function toggleBookmarkIds(current: string[], id: string): string[] {
  return current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
}

/* ------------------------------------------------------------------ */
/* 나의 요건 profile → 요건 충족도 computation                          */
/* ------------------------------------------------------------------ */

export interface Profile {
  org: string | null;
  revenue: string;
  years: string;
  region: string | null;
  lab: "예" | "아니오" | null;
}

export const EMPTY_PROFILE: Profile = { org: null, revenue: "", years: "", region: null, lab: null };

export function hasProfile(p: Profile | null): p is Profile {
  return !!p && !!(p.org || p.revenue !== "" || p.years !== "" || p.region || p.lab);
}

type MatchInput = Pick<Grant, "orgTypes" | "regions" | "revenue" | "lab">;

export interface MatchResult {
  score: number;
  met: { org: boolean; region: boolean; revenue: boolean; lab: boolean };
}

/**
 * Recompute 요건 충족도 from the saved profile. Unfilled criteria count as met
 * (the live app only scores what it knows about the org).
 */
export function computeMatch(g: MatchInput, p: Profile): MatchResult {
  const org = p.org ? g.orgTypes.includes(ORG_NEEDLES[p.org] ?? p.org) : true;
  const region = p.region
    ? g.regions === "전국" || p.region === "전국" || g.regions.includes(p.region)
    : true;
  const revenue = matchesRevenueYears(g.revenue, p.revenue, p.years);
  const lab = p.lab === "아니오" ? g.lab === "불필요" : true;
  const met = { org, region, revenue, lab };
  return { score: Object.values(met).filter(Boolean).length, met };
}
