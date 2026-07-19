# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Perfect pass: URL-synced list state (refresh/deep-link/back-forward safe), persistent sidebar collapse, live-extracted detail 404, profile-driven 요건 충족도 across every card and the detail page
- 3-step onboarding funnel (`/gov-grant/onboarding`, reconstruction) and `/auth/signin` clone
- Pixel-diff tooling (`scripts/pixel-diff.mjs`); content column and vertical rhythm now match the live page within 1px (search-page diff 4.43% → 3.15%, remainder is intentional mock-state differences)
- Self-hosted SpoqaHanSansNeo via `next/font/local`; extracted `typo-*` utility scale
- Modal focus trap, listbox arrow-key navigation, 35 unit/hook tests (jsdom + Testing Library)
- Detail page fidelity pass against the live public detail page: exact chip palette (지원유형 blue7, 사업규모 purple, 지원금 olive, pill keyword chips), 22px lavender section bands, 43px header card, urgency-aware D-day badge, navy 3-stop promo rail (sticky, hidden on mobile), light-gradient AI CTA link card
- Sidebar collapse to the live app's 68px icon rail (and back)
- 나의 요건 수정하기 modal (reconstruction) persisting the mock profile to localStorage; 알림받기 buttons toggle a subscribed state; detail-page bookmark button now shares the global bookmark store
- vitest with 24 unit tests over the extracted search/sort/bookmark logic (`src/lib/search.ts`); `npm run check` now runs tests

### Fixed
- Mobile sort listbox closes on outside tap/click
- Detail breadcrumb and CTA now link to `/gov-grant/recommend` instead of the old root route
- 과제 검색 page (`/gov-grant/search`) cloned from the live site: search textarea, 요건/필터 panel (기관 유형·매출액·사업연수·소재지·부설연구소·과제 유형), ongoing-only toggle, segmented sort, D-day cards with red unknown-match state — all operating on the mock dataset
- 관심 공고 page (`/gov-grant/saved`, layout reconstructed — live page is login-only) with localStorage-backed bookmark toggling on every grant card
- Extracted global footer (link row + mock company block) on all pages
- Working sort + circular pagination on the recommend list; mock pool expanded to 40 grants
- Component spec files and search-page HTML/CSS extraction artifacts under `docs/research/`

### Changed
- Recommend list moved to `/gov-grant/recommend` to match the original URL structure (`/` redirects)
- TopBar tabs are real links with route-based active state; gray/blue/red design tokens corrected to live computed values
- Raised the project Node.js baseline to 24 across local development, CI, Docker, and contributor-facing documentation

## [0.3.1] - 2026-03-29

### Fixed
- `sync-agent-rules.sh` failing to resolve `@file` imports on Windows due to CRLF line endings — platform instruction files now correctly inline the Inspection Guide content

## [0.3.0] - 2026-03-29

### Added
- Multi-URL support for `/clone-website` — clone multiple sites in a single command with parallel processing and isolated output
- CI quality gates via GitHub Actions — automated lint, typecheck, and build on every push and PR
- `npm run typecheck` and `npm run check` scripts for local quality validation
- `.gitattributes` for cross-platform line ending normalization
- `.nvmrc` to pin Node.js 20 for contributor consistency

### Changed
- Streamlined PR template — removed redundant checklist items and screenshots section
- Improved project description and README — clearer use cases, limitations, and modern wording
- Refined documentation and agent rules across all platforms for clarity and consistency
- Fixed CRLF handling in `sync-skills.mjs` for reliable Windows operation

### Removed
- Outdated use case from README documentation

## [0.2.0] - 2026-03-28

### Added
- Multi-platform AI agent support: Claude Code, Codex CLI, OpenCode, GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline/Roo Code, Continue, Amazon Q, Augment Code, Aider
- Platform-specific instruction files and `/clone-website` skill for each supported agent
- `scripts/sync-agent-rules.sh` to regenerate platform instruction files from AGENTS.md
- `scripts/sync-skills.mjs` to regenerate `/clone-website` skill across all platforms
- GEMINI.md for Gemini CLI configuration
- Supported Platforms table in README
- "Updating for Other Platforms" documentation section in README

### Changed
- README now describes the project as multi-agent (Claude Code recommended, not required)
- AGENTS.md updated with sync script reminders

## [0.1.1] - 2026-03-28

### Added
- Bug report and feature request issue templates
- Pull request template with checklist
- CHANGELOG.md following Keep a Changelog format
- Package.json metadata (description, repository, homepage, keywords, engines)

### Fixed
- LICENSE copyright holder now attributed to JCodesMore

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold for website reverse-engineering with Claude Code
- `/clone-website` skill for full-site cloning pipeline
- `/build-from-spec` and `/customize` skills
- Parallel builder agents with git worktree isolation
- Chrome MCP integration for design token extraction
- Comprehensive inspection guide and project structure documentation
- Next.js 16 + shadcn/ui + Tailwind CSS v4 base scaffold
- MIT license
- README with badges, demo section, quick start, and star history

[Unreleased]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/JCodesMore/ai-website-cloner-template/releases/tag/v0.1.0
