"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, PanelLeftClose, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS, PLAN_LINK, TEAM, USER } from "@/lib/mock-data";
import type { NavSection } from "@/types/grant";

function Section({
  section,
  topSlot,
  onNavigate,
}: {
  section: NavSection;
  topSlot?: React.ReactNode;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-bold text-ink"
      >
        {section.title}
        {open ? (
          <ChevronUp className="size-3.5 text-ink-light" />
        ) : (
          <ChevronDown className="size-3.5 text-ink-light" />
        )}
      </button>

      {open && topSlot}

      {open &&
        section.links.map((l) => {
          const Icon = l.icon;
          const active = l.href !== "#" && pathname.startsWith(l.href);
          return (
            <Link
              key={l.label}
              href={l.href}
              onClick={onNavigate}
              className={cn(
                "mx-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active ? "bg-line font-bold text-ink" : "text-ink/80 hover:bg-line/60",
              )}
            >
              <Icon className="size-4 shrink-0 text-ink/70" strokeWidth={1.7} />
              <span className="flex-1">{l.label}</span>
              {l.external && <ArrowUpRight className="size-3 text-ink-light" />}
            </Link>
          );
        })}
    </div>
  );
}

/** Nav body shared by the desktop rail and the mobile full-screen menu. */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const PlanIcon = PLAN_LINK.icon;
  return (
    <>
      {/* plan link */}
      <Link
        href={PLAN_LINK.href}
        onClick={onNavigate}
        className="mx-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink/80 hover:bg-line/60"
      >
        <PlanIcon className="size-4 text-ink/70" strokeWidth={1.7} />
        {PLAN_LINK.label}
      </Link>

      {/* sections */}
      <nav className="mt-3 flex flex-col gap-3 pb-4">
        {NAV_SECTIONS.map((s, i) => (
          <div key={s.title}>
            <Section
              section={s}
              onNavigate={onNavigate}
              /* team/plan row sits under the 기업 header, like the original */
              topSlot={
                s.title === "기업" ? (
                  <div className="mx-1 mb-1 flex items-center gap-2 rounded-lg px-3 py-2">
                    <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {TEAM.plan}
                    </span>
                    <span className="flex-1 truncate text-sm font-bold text-ink">{TEAM.name}</span>
                    <ChevronDown className="size-3.5 text-ink-light" />
                  </div>
                ) : undefined
              }
            />
            {i < NAV_SECTIONS.length - 1 && <div className="mx-4 mt-3 h-px bg-line" />}
          </div>
        ))}
      </nav>

      {/* user */}
      <div className="mt-auto flex items-center gap-2 border-t border-line px-4 py-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-tag text-xs font-bold text-brand-2">
          {USER.initial}
        </span>
        <span className="flex-1 truncate text-sm font-bold text-ink">{USER.name}</span>
        <ChevronDown className="size-3.5 text-ink-light" />
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-dvh w-[240px] shrink-0 flex-col overflow-y-auto border-r border-line bg-panel max-md:hidden">
      {/* logo */}
      <div className="flex items-center justify-between px-5 py-5">
        <Image
          src="/logo/rndcircle-lockup.svg"
          alt="RnDcircle"
          width={103}
          height={24}
          priority
        />
        <button type="button" aria-label="사이드바 접기">
          <PanelLeftClose className="size-4 text-ink-muted hover:text-ink" />
        </button>
      </div>
      <SidebarContent />
    </aside>
  );
}
