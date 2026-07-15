import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { GrantCard } from "@/components/GrantCard";
import { GRANTS, NEW_ALERT_GRANT, SORTS, TOTAL_COUNT } from "@/lib/mock-data";

const FOOTER_LINKS = [
  "프로젝트 공고",
  "서비스 소개",
  "자주 묻는 질문",
  "이용약관",
  "개인정보처리방침",
];

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 py-6 text-sm">
      <button className="flex size-8 items-center justify-center rounded text-ink-light hover:bg-panel">
        <ChevronLeft className="size-4" />
      </button>
      {[1, 2, 3, 4, 5].map((p) => (
        <button
          key={p}
          className={
            p === 1
              ? "flex size-8 items-center justify-center rounded bg-brand-tag font-bold text-brand"
              : "flex size-8 items-center justify-center rounded text-ink-muted hover:bg-panel"
          }
        >
          {p}
        </button>
      ))}
      <button className="flex size-8 items-center justify-center rounded text-ink-light hover:bg-panel">
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-panel px-8 py-10">
      <div className="mx-auto w-full max-w-[1136px]">
        <div className="flex flex-wrap gap-6 border-b border-line pb-6">
          {FOOTER_LINKS.map((l) => (
            <a key={l} href="#" className="text-[13px] text-ink-muted hover:text-ink">
              {l}
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Image src="/logo/rndcircle-wordmark.svg" alt="RnDcircle" width={96} height={17} />
          {/* Reference clone: the real company registration block is intentionally
              not reproduced — placeholder text only. */}
          <p className="text-xs leading-relaxed text-ink-light">
            (주)회사명 · 대표 홍길동
            <br />
            서울특별시 ○○구 ○○로 000, 0층
            <br />
            대표 전화 000-0000-0000 · 이메일 hello@example.com
            <br />
            사업자등록번호 000-00-00000
          </p>
          <p className="text-xs text-ink-light">
            © 2026 RnDcircle clone — reference only, not affiliated with RnDcircle.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function GovGrantRecommendPage() {
  return (
    <div className="flex min-h-dvh bg-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-6 px-8 py-6">
            <Hero />

            {/* new alert */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">
                <span className="size-1.5 rounded-full bg-white" />새 알림 추천
              </span>
              <span className="text-[13px] text-ink-light">AI가 새로 매칭한 과제입니다</span>
            </div>

            <GrantCard grant={NEW_ALERT_GRANT} />

            {/* result bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-muted">
                총 <span className="font-bold text-ink">{TOTAL_COUNT}</span>건의 과제가 추천되었습니다
              </p>
              <div className="flex items-center gap-4">
                {SORTS.map((s, i) => (
                  <button
                    key={s}
                    className={
                      i === 1
                        ? "text-[13px] font-bold text-ink"
                        : "text-[13px] text-ink-light hover:text-ink-muted"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* grant list */}
            <div className="flex flex-col gap-6">
              {GRANTS.map((g) => (
                <GrantCard key={g.id} grant={g} />
              ))}
            </div>

            <Pagination />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
