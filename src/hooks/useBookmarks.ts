"use client";

import { useCallback, useEffect, useState } from "react";
import { toggleBookmarkIds } from "@/lib/search";

const KEY = "rndc-bookmarks";
const EVENT = "rndc-bookmarks-change";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Bookmarked grant ids, persisted to localStorage and kept in sync across
 * every mounted card/page via a custom window event (+ storage event for
 * other tabs). Initial render is always [] so SSR markup matches.
 */
export function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = toggleBookmarkIds(read(), id);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { ids, toggle };
}
