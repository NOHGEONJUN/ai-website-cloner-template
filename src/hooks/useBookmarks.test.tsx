// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useBookmarks } from "@/hooks/useBookmarks";

describe("useBookmarks", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty and persists toggles to localStorage", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.ids).toEqual([]);

    act(() => result.current.toggle("g-1"));
    expect(result.current.ids).toEqual(["g-1"]);
    expect(JSON.parse(localStorage.getItem("rndc-bookmarks")!)).toEqual(["g-1"]);

    act(() => result.current.toggle("g-1"));
    expect(result.current.ids).toEqual([]);
  });

  it("keeps two hook instances in sync (cards ↔ saved page)", () => {
    const a = renderHook(() => useBookmarks());
    const b = renderHook(() => useBookmarks());

    act(() => a.result.current.toggle("g-7"));
    expect(b.result.current.ids).toEqual(["g-7"]);
  });

  it("survives corrupted storage", () => {
    localStorage.setItem("rndc-bookmarks", "{not json");
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.ids).toEqual([]);
  });
});
