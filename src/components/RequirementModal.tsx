"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Chip, NumberField } from "@/components/FilterControls";

const ORG_TYPES = ["대기업", "중견기업", "중소기업/스타트업", "대학 연구실", "공공/민간 연구기관", "의료기관"];
const REGIONS = ["전국", "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

const KEY = "rndc-profile";

interface Profile {
  org: string | null;
  revenue: string;
  years: string;
  region: string | null;
  lab: "예" | "아니오" | null;
}

const EMPTY: Profile = { org: null, revenue: "", years: "", region: null, lab: null };

function readProfile(): Profile {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return EMPTY;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-bold text-ink">{label}</span>
      {children}
    </div>
  );
}

/**
 * 나의 요건 수정하기 — ⚠ RECONSTRUCTION. The live form is login-only; this modal
 * reuses the search-filter controls and persists the mock profile to localStorage.
 */
export function RequirementModal({ onClose }: { onClose: () => void }) {
  // The modal is only ever mounted client-side (opened by click), so the lazy
  // initializer can read localStorage directly.
  const [p, setP] = useState<Profile>(readProfile);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(p));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="나의 요건 수정하기"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-[560px] flex-col overflow-y-auto rounded-[20px] bg-white p-8 max-md:p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-ink">나의 요건 수정하기</h2>
          <button type="button" aria-label="닫기" onClick={onClose}>
            <X className="size-5 text-ink-muted hover:text-ink" />
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-light">
          입력한 요건은 과제 추천과 요건 충족도 계산에 사용됩니다.
        </p>

        <div className="mt-6 flex flex-col gap-6">
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
              <NumberField
                placeholder="매출액 입력"
                suffix="억원"
                value={p.revenue}
                onChange={(revenue) => setP((v) => ({ ...v, revenue }))}
              />
            </Field>
            <Field label="내 사업연수">
              <NumberField
                placeholder="사업 연수 입력"
                suffix="년"
                value={p.years}
                onChange={(years) => setP((v) => ({ ...v, years }))}
              />
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
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[5px] border-[1.5px] border-line bg-panel px-4 py-[11px] text-sm font-bold text-ink-muted hover:text-ink"
          >
            취소
          </button>
          <button
            type="button"
            onClick={save}
            className="rounded-[5px] bg-brand px-4 py-[11px] text-sm font-bold text-white transition-colors hover:bg-brand-3"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
