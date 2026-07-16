# GovGrant Saved Page Specification (`/gov-grant/saved` — 관심 공고 tab)

## Overview
- **Target file:** `src/app/gov-grant/saved/page.tsx`
- **Interaction model:** click-driven (unbookmark, pagination)
- **⚠ RECONSTRUCTION:** the live page is login-only (renders empty shell logged-out; verified 2026-07-16).
  URL confirmed via the detail-404 state's "저장한 공고로 돌아가기" link → `/gov-grant/saved`.
  Layout reconstructed from the recommend/search list patterns and shared design system; NOT extracted.

## Layout (reconstruction)
- Same shell as other tabs: TopBar (관심 공고 active) → content 1136px → Footer
- Result bar (recommend-page style): "총 N건의 과제가 저장되었습니다" 14px, count bold — mirrors 총 N건 pattern
- Card list: recommend-style `GrantCard` (green requirement state), gap-6
- Pagination: shared circular pagination (40px, blue6 active) when > page size
- Empty state (reconstruction): centered block — 📋 emoji-scale icon, "저장한 공고가 없습니다" bold,
  "과제 검색에서 관심 있는 공고를 저장해보세요." muted, link button → `/gov-grant/search`
  (language mirrors live 404 page: "저장한 공고로 돌아가기")

## Data
- Bookmarks persisted in `localStorage["rndc-bookmarks"]` (array of grant ids), synced via `useSyncExternalStore` hook (`src/hooks/useBookmarks.ts`) so card buttons and the saved page stay consistent across tabs/pages.
