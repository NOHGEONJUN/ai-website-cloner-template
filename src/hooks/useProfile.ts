"use client";

import { useEffect, useState } from "react";
import { EMPTY_PROFILE, type Profile } from "@/lib/search";

const KEY = "rndc-profile";
const EVENT = "rndc-profile-change";

export function readProfile(): Profile {
  try {
    return { ...EMPTY_PROFILE, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return EMPTY_PROFILE;
  }
}

export function writeProfile(p: Profile) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event(EVENT));
}

/**
 * The saved 나의 요건 profile, kept in sync across components (same pattern
 * as useBookmarks). Initial render is EMPTY so SSR markup matches.
 */
export function useProfile(): Profile {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);

  useEffect(() => {
    const sync = () => setProfile(readProfile());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return profile;
}
