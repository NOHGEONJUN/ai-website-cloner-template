# GovGrant Search Page Specification (`/gov-grant/search`)

## Overview
- **Target files:** `src/app/gov-grant/search/page.tsx`, `src/components/SearchFilterPanel.tsx`
- **Screenshot:** `docs/design-references/search-desktop-full.png`
- **Source HTML dump:** `docs/research/search-page-html.json` (original Tailwind classes)
- **Interaction model:** click-driven (chips toggle, segmented sort, ongoing toggle, pagination); textarea + 검색하기 button submits keyword search. Filter panel collapse is MOBILE-ONLY (`필터 펼치기`, aria-expanded, grid-rows-[0fr]→[1fr] transition; desktop always expanded).
- Publicly accessible logged-out; requirement-match data is auth-only (shows `?/4` + red state).

## Page shell
- Content container: `w-full mx-auto px-4 md:max-w-[1224px] md:px-[32px]` → 1136px content
- Top bar (sticky top-0 z-10 bg-white border-b-[1.5px] border-gray5, inner py-[20px]):
  title link "정부 과제 추천" (22px/700, hover:text-blue1) · divider `w-[2px] h-[20px] bg-gray4` ·
  nav `gap-[40px]`, tabs typo-body-3 — inactive `text-gray4`(#D2D2D2), active `text-blue1`(#000AFF)

## Heading block (`mt-[40px]`, `flex flex-col gap-[6px]`)
- H: "원하는 정부 과제를 검색하고 필터를 적용해보세요" — 32px/500, lh 44.8px, ls -0.64px, #06191D
- Sub: "50개 부처 · 1,200개 수행기관 공고 사이트 기반 실시간 업데이트" — 16px/500, #A1A1A1

## Search row (`flex gap-[12px] max-md:flex-col`, `mt` from gap-[20px] wrapper)
- Textarea: `min-h-[176px] body-1(16/400/24) outline outline-[1.5px] outline-gray5 rounded-[15px] py-[16px] px-[20px] placeholder:text-gray4 resize-none focus:outline-blue6 focus:outline-[4px]`
  placeholder: "예) 과제명, 사업 분야 키워드, 기술/연구 세부 키워드 입력을 통해 필요한 과제를 찾아보세요."
- Button: `flex flex-col items-center justify-center gap-[6px] w-[112px] bg-blue1 rounded-[10px] text-white hover:bg-blue3(#6F75FF) transition-colors max-md:h-[48px] max-md:w-full max-md:flex-row`
  content: search SVG 20px + "검색하기" 14px/700

## Filter panel (`mt-[35px]` block, header + grid)
- Header row: "요건 / 필터" 16px/700 black1 · right: 초기화 button `gap-[4px] px-[10px] py-[5px] bg-gray6(#FAFAFA) border-[1.5px] border-gray5 rounded-[5px] 14px/700 text-gray3 hover:text-gray2` + reset SVG 16px; 필터 펼치기 (mobile only, `hidden max-md:flex`, chevron 12px)
- Grid: `md:grid-cols-3 gap-[1.5px] bg-gray5 border-[1.5px] border-gray5 rounded-[20px] overflow-hidden` (hairline dividers via bg showing through)
- Cell: `flex flex-col gap-[10px] p-[24px] bg-white`
- Section label: 14px/700 #06191D
- Chip: `px-[10px] h-[28px] rounded-[4px] 12px/500(typo-caption-1) border-[1.5px] whitespace-nowrap transition-colors`
  - default: `bg-white border-gray5 text-gray3 hover:border-gray4`
  - selected: `bg-blue5(#C7CAFF) border-blue5 text-blue1(#000AFF)`
- Number input: wrapper `flex items-center bg-white border-[1.5px] border-gray5 rounded-[5px] overflow-hidden h-[33px]`; input `flex-1 px-[10px] 14px/500 placeholder:text-gray3 appearance:textfield`; suffix `px-[10px] h-full bg-gray6 border-l border-gray5` text 12px/500 gray4 (억원 / 년)
- Sections (order): 기관 유형 [대기업|중견기업|중소기업/스타트업|대학 연구실|공공/민간 연구기관|의료기관] · 내 매출액 (입력: "매출액 입력") · 내 사업연수 ("사업 연수 입력") · 기관 소재지 [전국|서울|경기|인천|부산|대구|광주|대전|울산|강원|충북|충남|전북|전남|경북|경남|제주|비수도권] · 부설연구소/연구전담부서 유무 [예|아니오] · 과제 유형 [전체|연구개발|사업화]

## Result bar (`flex items-center justify-between px-[4px] mt-[35px] gap-[16px]`)
- Left: `flex items-center gap-[5px]` 16px/700 gray3: 총 <count text-blue1> 건의 과제 (logged-out default: 1,890)
- Ongoing toggle (default ON): button `gap-[5px] px-[12px] py-[7px] rounded-[5px] 14px/700 transition-colors` + dot `w-[6px] h-[6px] rounded-full`
  - ON: `text-blue1`, dot `bg-blue1`, hover:opacity-50
  - OFF: `text-gray4 hover:text-blue3`, dot `bg-gray4 group-hover:bg-blue3`
- Sort segmented control (desktop): `flex items-center gap-[4px] bg-gray6 rounded-[5px] px-[7px] py-[6px]`
  - option: `px-[16px] py-[8px] rounded-[4px] 14px/700`
  - active: `bg-white text-black1`; inactive: `text-gray4 hover:text-gray3`
  - options: 최신 게시 순 (default) · 마감 임박 순
  - (mobile uses a dropdown select instead — `hidden max-md:block`, h-[46px] rounded-[10px])

## Card list
- gap between cards: 24px-ish column flow (list wrapper gap not extracted; use existing recommend gap-6)
- Card spec → `grant-search-card.spec.md`
- Logged-out only: in-feed CTA banner after 3rd card (skip — clone is logged-in mock state)

## Pagination (`flex items-center justify-center gap-[10px]`)
- Page button: `w-[40px] h-[40px] rounded-full flex items-center justify-center` 16px
  - active: `text-blue1 bg-blue6(#E0E2FF) font-bold` + aria-current="page"
  - inactive: `text-gray4 hover:bg-gray-100`
- Chevron buttons: first «(double) / prev ‹ / next › / last » — 16px svg text-gray4; disabled: `text-gray3 cursor-not-allowed opacity-50`
- 10 numbered pages max visible

## Clone adaptations (documented deviations)
- Clone renders the **logged-in mock state** (user 김연구): TopBar keeps 나의 요건 수정하기 + avatar (from original logged-in research); no login buttons; no in-feed CTA banner.
- Match data: cards with known mock scores use the green requirement state; `matchScore: null` renders the extracted red `?/4` state. (Logged-in search rendering is auth-only — green-state styling mirrors the recommend page.)
- 총 N건 uses the filtered mock dataset count, not 1,890 (mock policy).
- Filters/search/sort actually operate on the mock dataset client-side.
