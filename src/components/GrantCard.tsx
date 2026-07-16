import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Grant } from "@/types/grant";

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-sm text-ink-light">{label}</dt>
      <dd className="text-sm font-bold text-ink">{children}</dd>
    </>
  );
}

function ReqBox({
  label,
  value,
  tone = "ink",
}: {
  label: string;
  value: string;
  tone?: "ink" | "ok";
}) {
  return (
    <div className="rounded-[5px] bg-ok-soft p-5">
      <p className="text-xs text-ink-light">{label}</p>
      <p
        className={cn(
          "mt-2 text-sm font-bold leading-snug",
          tone === "ok" ? "text-ok" : "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function GrantCard({ grant }: { grant: Grant }) {
  const pct = Math.round((grant.matchScore / grant.matchTotal) * 100);
  return (
    <Link
      href={`/gov-grant/${grant.id}`}
      className="group block w-full rounded-[35px] border-[1.5px] border-line bg-white p-[43px] transition-shadow hover:shadow-md"
    >
      {/* header */}
      <div className="flex flex-col gap-1.5 border-b border-line pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {grant.isNew && (
              <span className="rounded-[2px] bg-ok px-2 py-1 text-xs font-bold text-white">
                NEW
              </span>
            )}
            <span className="text-sm text-ink-light">{grant.deadlineNote}</span>
          </div>
          <BookmarkButton grantId={grant.id} />
        </div>
        <h3 className="text-[17px] font-bold leading-snug text-ink group-hover:text-brand">
          {grant.title}
        </h3>
        <p className="text-[13px] text-ink-light">
          공고명 <span className="mx-1 text-line">|</span>
          {grant.noticeName}
        </p>
      </div>

      {/* body */}
      <div className="mt-6 flex items-stretch gap-[30px] max-md:flex-col max-md:gap-3.5">
        {/* left info panel */}
        <dl className="grid w-[437px] shrink-0 grid-cols-[96px_1fr] content-start gap-x-4 gap-y-5 rounded-[5px] bg-panel p-[25px] max-md:w-full">
          <InfoRow label="신청 기간">{grant.period}</InfoRow>
          <InfoRow label="지원금">
            <span className="rounded-[2px] bg-brand-tag px-1.5 py-0.5 text-brand-2">
              {grant.amount}
            </span>
          </InfoRow>
          <InfoRow label="부처">{grant.ministry}</InfoRow>
          <InfoRow label="전문기관명">{grant.agency}</InfoRow>
          <InfoRow label="공고등록일">{grant.registeredAt}</InfoRow>
        </dl>

        {/* right requirements */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-[13px] font-bold text-ink">
              요건 충족도 {grant.matchScore}/{grant.matchTotal}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3 max-sm:grid-cols-1">
            <ReqBox label="지원 가능 기관 유형" value={grant.orgTypes} tone="ok" />
            <ReqBox label="지원 가능 소재지" value={grant.regions} />
            <ReqBox label="지원 가능 매출액 / 사업연수" value={grant.revenue} />
            <ReqBox label="부설 연구소 필요 유무" value={grant.lab} />
          </div>
        </div>
      </div>

      {/* tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {grant.tags.map((t) => (
          <span
            key={t}
            className="rounded-[2px] bg-brand-tag p-1.5 text-xs font-bold text-brand-2"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
