# RnDcircle `app.rndcircle.io/gov-grant/recommend` — Clone Research

> **2026-07-16 update:** second extraction pass (logged-out, headless) covered
> `/gov-grant/search`, the global footer, pagination, and the full gray/blue/red palette.
> See `docs/research/components/*.spec.md` and `docs/research/search-page-html.json`.
> Confirmed URLs: 맞춤 추천 `/gov-grant/recommend` · 과제 검색 `/gov-grant/search` (public) ·
> 관심 공고 `/gov-grant/saved` (login-only → clone is a reconstruction).
> Verified palette: black1 #06191D · gray1 #424242 · gray2 #666666 · gray3 #A1A1A1 ·
> gray4 #D2D2D2 · gray5 #ECECEC · gray6 #FAFAFA · blue1 #000AFF · blue2 #323AFF ·
> blue3 #6F75FF (hover) · blue5 #C7CAFF · blue6 #E0E2FF · green1 #11C918 · red1 #FF6868
> (red3 = red1/50, red6 = red1/10). Base tracking ≈ -0.025em (e.g. -0.4px @16px).

Target: the authenticated **정부 과제 추천** (AI government-grant recommendation) page.
Scope: **reference clone, non-deploy**. All real account/PII values replaced with **mock data**.
Original stack: Next.js + Tailwind (custom tokens like `gray5`, `blue5`) + SpoqaHanSansNeo.

## Global Design Tokens (extracted from live site)

- **Font:** `SpoqaHanSansNeo, sans-serif` — base 16px
- **Text:** primary `#06191D` (near-black, blue-green tint)
- **Brand blue:** `#000AFF` (button/label text), `#323AFF` (tag text),
  `#C7CAFF` (primary button bg), `#E0E2FF` (tag bg)
- **Green:** `#11C918` (NEW badge, match gauge), requirement box `rgba(215,255,217,0.3)`
- **Surfaces:** page white, panel/sidebar `#FAFAFA`, border/divider `#ECECEC` (their `gray5`)
- **Radius:** cards **35px**, nav 8px, buttons/panels 5px, badges/tags 2px

## Layout

- **Sidebar** — fixed left, width **240px**, bg `#FAFAFA`
  - Logo lockup + collapse icon
  - `서비스 플랜`
  - Section `파트너 매칭` → 프로젝트 공고 ↗, 파트너 매칭 문의 ↗
  - Section `정부과제 수주` → **정부과제 추천 (active: bg #ECECEC, radius 8, padding 10/12)**,
    정부과제 검색, 과제 수주 문의 ↗
  - Section `연구실` → 연구실 검색, 저장한 연구실
  - Section `기업` → [Free] {팀명} ⌄, AI 기반 기업 서칭, 열람 기업, 팀-플랜 관리
  - Bottom: avatar + {사용자명} ⌄
- **Top bar** — "정부 과제 추천" + tabs [맞춤 추천(active) / 과제 검색 / 관심 공고];
  right: `나의 요건 수정하기` button (bg #C7CAFF, text #000AFF, radius 5, 11/16 pad, 14px/700) + avatar
- **Hero** — bg image `/images/gov-grant/gov-banner-img.png`, radius 20px, border blue5, h 267
  - "AI 기반 과제 추천 서비스" / "우리 기관에 딱 맞는 과제를 / 매일 아침 추천받고 알림으로 확인해보세요!"
  - White button "과제 추천 정보 수정하기" (white bg, #000AFF text, radius 5, 14/25 pad)
- **New-alert row** — pill "● 새 알림 추천" + "AI가 새로 매칭한 과제입니다"
- **Result bar** — "총 40건의 과제가 추천되었습니다" + sort (최신 등록 순 / 추천 컨설팅 순 / 마감 임박 순)
- **Grant cards** (`<a>`): white, border **1.5px #ECECEC**, radius **35px**, padding **43px**, w 1136
  - Header: [NEW] green badge + 마감 문구, right `관심 공고 등록` button (bg #FAFAFA, border #ECECEC, radius 5)
  - Title (bold ~17px) + "공고명 | …" subline (muted)
  - Left info panel: bg `#FAFAFA`, radius 5, padding 25 — 신청 기간 / 지원금 / 부처 / 전문기관명 / 공고등록일
  - Right: "요건 충족도 4/4" + full green gauge; 2×2 grid of green boxes
    (bg `rgba(215,255,217,0.3)`, radius 5, padding 20): 지원 가능 기관 유형 / 지원 가능 소재지 /
    지원 가능 매출액·사업연수 / 부설 연구소 필요 유무
  - Footer: tag chips (bg #E0E2FF, text #323AFF, radius 2, padding 6, 12px/700)
- **Pagination** then **footer** (프로젝트 공고 / 서비스 소개 / 자주 묻는 질문 / 이용약관 / 개인정보처리방침 + company block)

## Assets downloaded (public/)

- `logo/rndcircle-lockup.svg`, `logo/rndcircle-wordmark.svg`, `logo/rndcircle-mark.svg`
- `images/gov-grant/gov-banner-img.png` (hero background)

## Mock-data policy

The live page shows the account holder's real name and team. Those are **not** copied.
Mock identity used throughout: user **김연구**, team **김연구의 팀**, plan **Free**.
Grant listings are mock/representative, not the account's real recommendation set.
Company footer text (사업자등록번호 etc.) is not reproduced.
