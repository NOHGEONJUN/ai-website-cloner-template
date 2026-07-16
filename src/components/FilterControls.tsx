"use client";

import { cn } from "@/lib/utils";

/** Filter chip — default(white/gray3) vs selected(blue5/blue1), extracted from /gov-grant/search. */
export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-7 rounded-[4px] border-[1.5px] px-2.5 text-xs whitespace-nowrap transition-colors",
        selected
          ? "border-brand-soft bg-brand-soft text-brand"
          : "border-line bg-white text-ink-light hover:border-gray-soft",
      )}
    >
      {label}
    </button>
  );
}

/** Number input with unit suffix (억원/년), extracted from the search filter panel. */
export function NumberField({
  placeholder,
  suffix,
  value,
  onChange,
}: {
  placeholder: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-[33px] items-center overflow-hidden rounded-[5px] border-[1.5px] border-line bg-white">
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 px-2.5 text-sm outline-none [appearance:textfield] placeholder:text-ink-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="flex h-full shrink-0 items-center justify-center border-l border-line bg-panel px-2.5">
        <span className="text-xs text-gray-soft">{suffix}</span>
      </div>
    </div>
  );
}
