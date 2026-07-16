import Link from "next/link";
import { Bookmark, Check, ChevronLeft, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getGrantDetail } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { GrantDetail } from "@/types/grant";

/* ---------- helpers ---------- */

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Yellow-highlight the matched keywords, like the original does. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map(escapeRe).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) =>
        words.includes(part) ? (
          <mark key={i} className="bg-[#fff44f] text-ink">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const HEADER_TONES = {
  brand: "bg-[#dddeff] text-brand",
  ok: "bg-[#e9fbee] text-ok",
  warn: "bg-[#fdf0e4] text-[#e08a2e]",
} as const;

function SectionCard({
  title,
  tone = "brand",
  suffix,
  children,
}: {
  title: string;
  tone?: keyof typeof HEADER_TONES;
  suffix?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-white">
      <header className={cn("flex items-baseline gap-2 px-7 py-5", HEADER_TONES[tone])}>
        <h2 className="text-lg font-bold">{title}</h2>
        {suffix}
      </header>
      <div className="px-7 py-2">{children}</div>
    </section>
  );
}

function Chip({ tone = "line", children }: { tone?: "line" | "brand" | "ok"; children: React.ReactNode }) {
  const tones = {
    line: "border border-line bg-white text-ink",
    brand: "bg-brand-tag text-brand-2",
    ok: "bg-[#e9fbee] text-ok",
  };
  return (
    <span className={cn("inline-flex rounded-[5px] px-2.5 py-1.5 text-xs font-bold", tones[tone])}>
      {children}
    </span>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6 border-b border-line py-5 last:border-0">
      <span className="w-[110px] shrink-0 text-[13px] text-ink-muted">{label}</span>
      <div className="min-w-0 flex-1 text-sm text-ink">{children}</div>
    </div>
  );
}

function ReqBox({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={cn("rounded-[5px] bg-ok-soft p-4", wide && "col-span-3")}>
      <p className="text-xs text-ink-light">{label}</p>
      <p className="mt-1.5 text-sm font-bold text-ok">{value}</p>
    </div>
  );
}

/* ---------- right rail ---------- */

function PromoCard() {
  const items = ["기관에 맞는 과제 추천/알림", "과제 지원서 작성 서포트", "공동연구기관 매칭"];
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#151580] to-[#3b3be0] p-8 text-white">
      <h3 className="text-[22px] font-bold leading-snug">
        지금 바로 과제 수주
        <br />
        성공률을 높여보세요!
      </h3>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2 text-sm font-bold">
            <Check className="size-4 rounded-full bg-white/20 p-0.5" />
            {t}
          </li>
        ))}
      </ul>
      <button className="mt-7 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3.5 text-base font-bold text-ink hover:brightness-95">
        과제 준비 시작하기 <ExternalLink className="size-4" />
      </button>
    </div>
  );
}

function AiCta() {
  const stats = [
    { n: "4,500+", l: "공고" },
    { n: "500+", l: "부처·기관" },
    { n: "매일 아침 추천", l: "추천 주기" },
  ];
  return (
    <section className="rounded-2xl bg-gradient-to-br from-[#eef0ff] to-[#f7f8ff] p-8">
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-bold text-brand-2">
        <Sparkles className="size-3.5" /> AI 기반 공고 추천
      </span>
      <h3 className="mt-4 text-[22px] font-bold text-ink">딱 맞는 과제, AI가 찾아드려요</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        우리 기관에 딱 맞는 과제를
        <br />
        매일 아침 추천받고 알림으로 확인해보세요!
      </p>
      <div className="mt-5 flex flex-wrap gap-8">
        {stats.map((s) => (
          <div key={s.l}>
            <p className="text-lg font-bold text-brand">{s.n}</p>
            <p className="text-xs text-ink-light">{s.l}</p>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white hover:brightness-110"
      >
        과제 추천 서비스 이용 <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}

/* ---------- page ---------- */

export default async function GrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const d: GrantDetail = getGrantDetail(id);
  const pct = Math.round((d.matchScore / d.matchTotal) * 100);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1136px] px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-0.5 text-sm text-brand underline underline-offset-2"
        >
          <ChevronLeft className="size-4" /> 목록으로 돌아가기
        </Link>

        {/* header card */}
        <div className="mt-4 rounded-2xl border border-line bg-white p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[5px] bg-[#4b4f56] px-2.5 py-1.5 text-xs font-bold text-white">
              {d.dday}
            </span>
            <Chip tone="brand">{d.supportType}</Chip>
            <span className="text-[13px] text-ink-muted">
              <Highlight text={d.noticeName} words={d.keywords} />
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-[28px] font-bold leading-snug text-ink">
                <Highlight text={d.title} words={d.keywords} />
              </h1>
              <p className="mt-3 text-[13px] text-ink-muted">
                부처 <span className="mx-1 text-line">|</span> {d.ministry}
                <span className="mx-2">·</span> 전문기관 <span className="mx-1 text-line">|</span>{" "}
                {d.agency}
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 self-end rounded-[5px] border border-line bg-panel px-3 py-2.5 text-sm font-bold text-ink hover:bg-line/60">
              <Bookmark className="size-4" />
              관심 공고 등록
            </button>
          </div>
        </div>

        {/* body */}
        <div className="mt-5 flex items-start gap-6 max-lg:flex-col">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* 주요 정보 */}
            <SectionCard title="주요 정보">
              <InfoRow label="지원 유형">
                <Chip>{d.supportType}</Chip>
              </InfoRow>
              <InfoRow label="핵심 키워드">
                <div className="flex flex-wrap gap-2">
                  {d.coreKeywords.map((k) => (
                    <Chip key={k}>{k}</Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="사업 규모">
                <Chip tone="brand">{d.scale}</Chip>
              </InfoRow>
              <InfoRow label="지원금">
                <Chip tone="ok">{d.amount}</Chip>
              </InfoRow>
              <InfoRow label="지원 가능 기관">
                <div className="flex flex-wrap gap-2">
                  {d.orgTypes.map((o) => (
                    <Chip key={o}>{o}</Chip>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="공고 등록일">
                <span className="text-base">{d.registeredAt}</span>
              </InfoRow>
              <InfoRow label="공고 마감일">
                <span className="text-base">{d.deadline}</span>
              </InfoRow>
              <InfoRow label="신청 기간">
                <span className="mr-2 rounded-[5px] bg-[#4b4f56] px-2 py-1 text-xs font-bold text-white">
                  {d.dday}
                </span>
                <span className="text-base">{d.periodNote}</span>
              </InfoRow>
            </SectionCard>

            {/* 과제 요약 */}
            <SectionCard title="과제 요약">
              <p className="py-5 text-sm leading-7 text-ink">
                <Highlight text={d.summary} words={d.keywords} />
              </p>
            </SectionCard>

            {/* 요건 충족도 */}
            <SectionCard
              title="요건 충족도"
              tone="ok"
              suffix={
                <span className="text-sm font-bold text-ok">
                  {d.matchScore}/{d.matchTotal}
                </span>
              }
            >
              <div className="py-5">
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                  <ReqBox label="지원 가능 기관 유형" value={d.reqOrgTypes} wide />
                  <ReqBox label="지원 가능 소재지" value={d.reqRegions} />
                  <ReqBox label="지원 가능 매출액 / 사업연수" value={d.reqRevenue} />
                  <ReqBox label="부설 연구소 필요 유무" value={d.reqLab} />
                </div>
              </div>
            </SectionCard>

            {/* 지원 요건 */}
            <SectionCard title="지원 요건" tone="warn">
              {d.requirements.map((r) => (
                <InfoRow key={r.label} label={r.label}>
                  <span className="leading-7">{r.value}</span>
                </InfoRow>
              ))}
              <ul className="list-disc space-y-2 py-5 pl-5 text-sm leading-7 text-ink">
                {d.restrictions.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </SectionCard>

            {/* 과제 개요 */}
            <SectionCard title="과제 개요">
              {d.overview.map((s) => (
                <div key={s.n} className="border-b border-line py-6 last:border-0">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded bg-brand-tag text-[11px] font-bold text-brand">
                      {s.n}
                    </span>
                    <h3 className="text-sm font-bold text-brand">{s.title}</h3>
                  </div>
                  {s.blocks.map((b, i) => (
                    <p
                      key={i}
                      className={cn(
                        "text-sm leading-7 text-ink",
                        b.startsWith("-") && "pl-2",
                        /^\d\./.test(b) && "mt-4 font-bold",
                      )}
                    >
                      <Highlight text={b} words={d.keywords} />
                    </p>
                  ))}
                </div>
              ))}
            </SectionCard>

            <AiCta />

            <div className="flex justify-end">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm text-brand underline underline-offset-2"
              >
                공고 원문 바로가기 <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          {/* right rail */}
          <aside className="sticky top-6 w-[370px] shrink-0 max-lg:static max-lg:w-full">
            <PromoCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
