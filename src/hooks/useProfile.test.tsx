// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { readProfile, useProfile, writeProfile } from "@/hooks/useProfile";
import { EMPTY_PROFILE } from "@/lib/search";

describe("useProfile", () => {
  beforeEach(() => localStorage.clear());

  it("returns the empty profile by default", () => {
    const { result } = renderHook(() => useProfile());
    expect(result.current).toEqual(EMPTY_PROFILE);
  });

  it("updates every subscriber when writeProfile fires (modal → cards)", () => {
    const a = renderHook(() => useProfile());
    const b = renderHook(() => useProfile());

    act(() => writeProfile({ ...EMPTY_PROFILE, org: "중소기업/스타트업", revenue: "5" }));

    expect(a.result.current.org).toBe("중소기업/스타트업");
    expect(b.result.current.revenue).toBe("5");
  });

  it("readProfile tolerates corrupted storage", () => {
    localStorage.setItem("rndc-profile", "{{{");
    expect(readProfile()).toEqual(EMPTY_PROFILE);
  });
});
