# GrantSearchCard Specification (search result card)

## Overview
- **Target file:** `src/components/GrantSearchCard.tsx`
- **Source:** live extraction `/gov-grant/search` — full original class list in `docs/research/search-page-html.json` ("card" key)
- **Interaction model:** whole card is a link (`md:hover:opacity-50 transition-opacity duration-200`); inner 관심 공고 등록 button and 알림받기 button are click targets (stopPropagation)

## Root
`<a href="/gov-grant/<id>" class="group w-full bg-white border-[1.5px] border-gray5 rounded-[35px] p-[43px] flex flex-col gap-[22px] md:hover:opacity-50 transition-opacity duration-200 max-md:rounded-[20px] max-md:p-5 max-md:gap-[18px]">`

## Header block — `flex flex-col gap-[6px] pb-[24px] border-b border-gray5`
- Badge row `flex items-center justify-between gap-[12px]`:
  - left `flex items-center gap-[3px]`:
    - NEW: `px-[8px] py-[4px] bg-green1(#11C918) rounded-[2px] 12px/700 white`
    - D-day: `px-[8px] py-[4px] rounded-[2px] bg-red1(#FF6868)` + `12px/700 white whitespace-nowrap` (e.g. D-6)
  - right (w-[160px] justify-end): 관심 공고 등록 button `h-[36px] px-[12px] gap-[5px] rounded-[5px] bg-gray6 text-black1 border-[1.5px] border-gray5 14px/700` + bookmark SVG 16px
- Title: `16px/700 text-black1 break-keep`
- Notice line: `flex items-center gap-[6px] 12px/500 text-gray3` — 공고명 | <truncate>

## Body — `flex gap-[30px] items-stretch max-md:flex-col`
- Info panel: `bg-gray6 rounded-[5px] p-[25px] flex flex-col justify-between gap-[12px] shrink-0 w-[437px] max-md:w-full`
  - Row: `flex items-start justify-between gap-[12px]`; label `w-[95px] shrink-0 12px/500 text-gray3`; value `flex-1 14px/700 text-gray1(#424242)`
  - 지원금 value chip: `px-[6px] py-[2px] bg-blue6(#E0E2FF) text-blue1 14px/700`
  - Rows: 신청 기간 / 지원금 / 부처 / 전문기관명 / 공고등록일
- Right column `flex-1 min-w-0` → `flex flex-col h-full gap-[12px]`:
  - Gauge row `flex items-center gap-[16px] pl-[3px]`:
    - label `12px/700 whitespace-nowrap` — unknown: `text-red1` "요건 충족도 ?/4"; known (clone green state): `text-black1` "요건 충족도 N/4"
    - track `md:flex-1 w-full md:h-[16px] rounded-full relative overflow-hidden border-[1.5px]`
      - unknown: `bg-red1/10 border-red1/30` + leading dot `md:w-[10px] md:h-[10px] bg-red1 rounded-full md:mt-[1.5px] md:ml-[3px]`
      - known (reconstruction, mirrors recommend-page green): `bg-green1/10 border-green1/30` + fill bar `h-full bg-green1 rounded-full` width N/4·100%
  - Req box grid `grid grid-cols-2 gap-[12px] max-md:grid-cols-1`:
    - box `rounded-[5px] p-[20px] flex flex-col gap-[4px]`
    - unknown/unmet: `bg-red6(=red1/10)`; label `12px/700 text-red3(=red1/50)`; value `14px/700 text-red1`
    - met (green): `bg-ok-soft(rgba(215,255,217,0.3))`; label `12px text-gray3`; value `14px/700` value tone: ok(#11C918) for 기관 유형, black for others (matches existing recommend GrantCard)
    - order: 지원 가능 기관 유형 / 지원 가능 소재지 / 지원 가능 매출액·사업연수 / 부설 연구소 필요 유무
  - Mobile: 요건 보기 pill toggles the box grid (`hidden max-md:inline-flex h-[28px] px-[10px] rounded-full bg-gray6 12px/700 text-gray2`; grid collapses via grid-rows-[0fr] opacity-0)

## Footer row — `flex items-center justify-between gap-[7px] py-[6px] pr-[4px]`
- Tags `flex flex-wrap gap-[6px]`: chip `p-[6px] bg-blue6 rounded-[2px] 12px/700 text-blue2(#323AFF)`
- Right: "매일 아침 맞춤 공고 알림받기 >" — `14px/700 text-blue1 underline underline-offset-2`

## States & Behaviors
- Card hover (desktop): opacity 50%, transition 200ms
- 관심 공고 등록: toggles bookmark (clone: persists to localStorage; saved state = filled icon + "관심 공고 저장됨" — reconstruction, login-only on live)
