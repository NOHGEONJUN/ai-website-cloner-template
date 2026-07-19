import Image from "next/image";

const LINKS = ["프로젝트 공고", "서비스 문의", "자주 묻는 질문", "이용약관", "개인정보처리방침"];

/* Reference clone: the real company registration block (대표/주소/사업자등록번호…)
   is intentionally NOT reproduced — mock values keep the layout only. */
const INFO = [
  "대표 김연구",
  "서울특별시 어딘가구 목업로 123, 4층",
  "대표 전화 02-000-0000",
  "이메일 mock@example.com",
  "사업자등록번호 000-00-00000",
  "호스팅제공자 로컬호스트",
];

export function Footer() {
  return (
    <footer className="mx-auto mt-[150px] mb-[45px] w-full max-w-[1136px]">
      <div className="flex items-center gap-10 border-b border-line pt-0.5 pb-6 max-md:flex-wrap max-md:gap-x-6 max-md:gap-y-2">
        {LINKS.map((l) => (
          <a key={l} href="#" className="typo-sub-body-3 whitespace-nowrap text-ink-muted hover:text-ink">
            {l}
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-5 pt-[34px]">
        <div className="flex items-center gap-5">
          <div className="pb-[3px]">
            <Image src="/logo/rndcircle-wordmark.svg" alt="RnDcircle" width={115} height={20} />
          </div>
          <p className="typo-sub-body-3 whitespace-nowrap text-ink">주식회사 김연구컴퍼니</p>
        </div>
        <div className="typo-caption-1 flex flex-col gap-2 text-ink-light">
          <div className="flex w-[78%] flex-wrap gap-x-[30px] max-md:flex-col">
            {INFO.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p>© 2026 RnDcircle clone — reference only, not affiliated with RnDcircle.</p>
        </div>
      </div>
    </footer>
  );
}
