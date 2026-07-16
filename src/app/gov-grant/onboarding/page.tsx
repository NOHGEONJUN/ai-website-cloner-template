"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BellRing, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Chip, NumberField } from "@/components/FilterControls";
import { readProfile, writeProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/search";

const ORG_TYPES = ["대기업", "중견기업", "중소기업/스타트업", "대학 연구실", "공공/민간 연구기관", "의료기관"];
const REGIONS = ["전국", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
const TOPICS = ["인공지능·SW", "바이오·의료", "소재·부품·장비", "에너지·환경", "반도체", "우주·항공", "해양·수산", "로봇·자동화", "콘텐츠·XR", "농식품"];

const STEPS = [
  { n: "01", title: "기관 정보 입력", desc: "기관 유형, 매출액, 업력, 부설연구소 유무 등 과제 추천에 필요한 기본 정보를 입력합니다." },
  { n: "02", title: "희망 과제 주제", desc: "관심 있는 기술·연구 분야를 선택하면 AI가 지원 요건에 딱 맞는 정부과제를 매칭합니다." },
  { n: "03", title: "신규 과제 알림", desc: "매일 아침 새로 올라온 과제 기반으로 추천을 업데이트하고 알림을 보내드립니다." },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-bold text-ink">{label}</span>
      {children}
    </div>
  );
}

/**
 * 과제 추천 정보 입력 funnel — ⚠ RECONSTRUCTION. The live funnel is login-only;
 * steps follow the live marketing copy (01 기관 정보 / 02 AI 추천 / 03 알림).
 * Saving feeds the same profile that drives 요건 충족도 across the app.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Profile>(readProfile);

  const finish = () => {
    writeProfile(p);
    router.push("/gov-grant/recommend");
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[720px] flex-col px-8 py-12 max-md:px-4 max-md:py-7">
        {/* step indicator */}
        <ol className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  i < step
                    ? "bg-ok text-white"
                    : i === step
                      ? "bg-brand text-white"
                      : "bg-panel text-ink-light",
                )}
              >
                {i < step ? <Check className="size-4" /> : s.n}
              </span>
              <span
                className={cn(
                  "text-sm font-bold whitespace-nowrap max-md:hidden",
                  i === step ? "text-ink" : "text-ink-light",
                )}
              >
                {s.title}
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line" />}
            </li>
          ))}
        </ol>

        {/* step card */}
        <div className="mt-8 rounded-[20px] border-[1.5px] border-line bg-white p-10 max-md:p-5">
          <p className="text-xs font-bold tracking-[2px] text-brand uppercase">STEP {STEPS[step].n}</p>
          <h1 className="mt-2 text-[26px] font-bold text-ink max-md:text-xl">{STEPS[step].title}</h1>
          <p className="mt-1.5 break-keep text-ink-muted max-md:text-sm">{STEPS[step].desc}</p>

          <div className="mt-8 flex flex-col gap-6">
            {step === 0 && (
              <>
                <Field label="기관 유형">
                  <div className="flex flex-wrap gap-1.5">
                    {ORG_TYPES.map((o) => (
                      <Chip
                        key={o}
                        label={o}
                        selected={p.org === o}
                        onClick={() => setP((v) => ({ ...v, org: v.org === o ? null : o }))}
                      />
                    ))}
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <Field label="내 매출액">
                    <NumberField placeholder="매출액 입력" suffix="억원" value={p.revenue} onChange={(revenue) => setP((v) => ({ ...v, revenue }))} />
                  </Field>
                  <Field label="내 사업연수">
                    <NumberField placeholder="사업 연수 입력" suffix="년" value={p.years} onChange={(years) => setP((v) => ({ ...v, years }))} />
                  </Field>
                </div>
                <Field label="기관 소재지">
                  <div className="flex flex-wrap gap-1.5">
                    {REGIONS.map((r) => (
                      <Chip
                        key={r}
                        label={r}
                        selected={p.region === r}
                        onClick={() => setP((v) => ({ ...v, region: v.region === r ? null : r }))}
                      />
                    ))}
                  </div>
                </Field>
                <Field label="부설연구소/연구전담부서 유무">
                  <div className="flex flex-wrap gap-1.5">
                    {(["예", "아니오"] as const).map((l) => (
                      <Chip
                        key={l}
                        label={l}
                        selected={p.lab === l}
                        onClick={() => setP((v) => ({ ...v, lab: v.lab === l ? null : l }))}
                      />
                    ))}
                  </div>
                </Field>
              </>
            )}

            {step === 1 && (
              <Field label="관심 분야 (복수 선택)">
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={p.topics?.includes(t) ?? false}
                      onClick={() =>
                        setP((v) => {
                          const cur = v.topics ?? [];
                          return {
                            ...v,
                            topics: cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
                          };
                        })
                      }
                    />
                  ))}
                </div>
              </Field>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => setP((v) => ({ ...v, alarm: !v.alarm }))}
                className={cn(
                  "flex items-center gap-4 rounded-[10px] border-[1.5px] p-5 text-left transition-colors",
                  p.alarm ? "border-brand-soft bg-brand-tag/40" : "border-line bg-white hover:border-gray-soft",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    p.alarm ? "bg-brand text-white" : "bg-panel text-ink-light",
                  )}
                >
                  <BellRing className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold text-ink">매일 아침 신규 과제 알림</span>
                  <span className="mt-0.5 block text-sm text-ink-muted">
                    주 2회, 새로 매칭된 추천 과제를 알림으로 보내드립니다.
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                    p.alarm ? "justify-end bg-brand" : "justify-start bg-line",
                  )}
                >
                  <span className="size-5 rounded-full bg-white" />
                </span>
              </button>
            )}
          </div>

          {/* nav */}
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => (step === 0 ? router.push("/gov-grant/recommend") : setStep(step - 1))}
              className="flex items-center gap-1.5 rounded-[5px] border-[1.5px] border-line bg-panel px-4 py-[11px] text-sm font-bold text-ink-muted hover:text-ink"
            >
              <ArrowLeft className="size-4" />
              {step === 0 ? "돌아가기" : "이전"}
            </button>
            <button
              type="button"
              onClick={() => (step === STEPS.length - 1 ? finish() : setStep(step + 1))}
              className="flex items-center gap-1.5 rounded-[5px] bg-brand px-5 py-[11px] text-sm font-bold text-white transition-colors hover:bg-brand-3"
            >
              {step === STEPS.length - 1 ? "과제 추천 받기" : "다음"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
