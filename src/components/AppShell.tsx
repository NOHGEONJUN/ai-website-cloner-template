import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const FOOTER_LINKS = [
  "프로젝트 공고",
  "서비스 소개",
  "자주 묻는 질문",
  "이용약관",
  "개인정보처리방침",
];

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

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
