import { describe, expect, it } from "vitest";
import { ALL_GRANTS, BASE_DATE, ddayOf, getGrantDetail, NEW_ALERT_GRANT, TOTAL_COUNT } from "@/lib/mock-data";

describe("ddayOf", () => {
  it("computes days from the fixed reference date", () => {
    expect(ddayOf(BASE_DATE)).toBe(0);
    expect(ddayOf("2026-07-22")).toBe(6);
  });
  it("returns null for missing or invalid deadlines", () => {
    expect(ddayOf(null)).toBeNull();
    expect(ddayOf("별도 공지")).toBeNull();
  });
});

describe("ALL_GRANTS", () => {
  it("matches the displayed total of 40", () => {
    expect(ALL_GRANTS).toHaveLength(40);
    expect(TOTAL_COUNT).toBe(40);
  });
  it("has unique ids (pagination/bookmark keys depend on it)", () => {
    const ids = new Set(ALL_GRANTS.map((g) => g.id));
    expect(ids.size).toBe(ALL_GRANTS.length);
  });
  it("every grant has 4-point match totals and non-empty tags", () => {
    for (const g of ALL_GRANTS) {
      expect(g.matchTotal).toBe(4);
      expect(g.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("getGrantDetail", () => {
  it("returns the flagship detail for its own id", () => {
    expect(getGrantDetail(NEW_ALERT_GRANT.id).id).toBe(NEW_ALERT_GRANT.id);
  });
  it("derives a detail view for any pool grant", () => {
    const g = ALL_GRANTS[10];
    const d = getGrantDetail(g.id);
    expect(d.id).toBe(g.id);
    expect(d.title).toBe(g.title);
    expect(d.coreKeywords).toEqual(g.tags);
  });
  it("falls back to the flagship detail for unknown ids", () => {
    expect(getGrantDetail("nonexistent").id).toBe(NEW_ALERT_GRANT.id);
  });
});
