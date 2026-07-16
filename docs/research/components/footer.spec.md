# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Source:** live extraction (logged-out, identical chrome on all gov-grant pages)
- **Interaction model:** static (link hovers only)

## DOM Structure
`<footer>` → link row (border-b) → company block (logo row + info rows)

## Computed Styles (exact, from getComputedStyle / live class list)

### Container `<footer>`
- `w-full max-w-[1160px] mx-auto mt-[150px] mb-[45px] max-md:px-[21px]` (computed width 1136px inside 1224px/px-32 shell)

### Link row
- `flex items-center gap-[40px] border-b border-gray5(#ECECEC) pt-[2px] pb-[24px]`
- Links: 14px/700, lineHeight 20.3px, letterSpacing -0.42px, color #666666 (gray2), whitespace-nowrap
- Order: 프로젝트 공고 · 서비스 문의 · 자주 묻는 질문 · 이용약관 · 개인정보처리방침

### Company block
- Wrapper: `flex flex-col gap-[20px] pt-[34px]`
- Logo row: `flex items-center gap-[20px]` — wordmark SVG 115×20 (`pb-[3px]` wrapper) + company name 14px/700 color #06191D (black1)
- Info block: `flex flex-col gap-[8px]`, 12px/500, lineHeight 16.8px, letterSpacing -0.36px, color #A1A1A1 (gray3)
  - Row: `flex flex-wrap gap-x-[30px] gap-y-0 w-[78%] max-md:flex-col` — spans: 대표 / 주소 / 대표 전화 / 이메일 / 사업자등록번호 / 호스팅제공자
  - `<p>` © line below

## Text Content
Original: 주식회사 디써클 / 대표 장재우,이윤구 / 서울 강남구 역삼로 169 … / 458-87-03380 / © 2026 RnDcircle. All Rights Reserved.
**Mock policy applies** — real company/PII values are NOT copied. Use mock values:
회사명 "주식회사 김연구컴퍼니", 대표 김연구, 서울특별시 어딘가구 목업로 123, 4층,
대표 전화 02-000-0000, 이메일 mock@example.com, 사업자등록번호 000-00-00000,
호스팅제공자 로컬호스트, © 2026 RnDcircle Clone (reference build).
Wordmark: reuse `public/logo/rndcircle-wordmark.svg` at 115×20.

## Responsive
- Mobile: footer gets `px-[21px]`, info row stacks to column (`max-md:flex-col`)
