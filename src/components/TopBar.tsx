"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pencil, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "@/components/Sidebar";
import { RequirementModal } from "@/components/RequirementModal";
import { USER } from "@/lib/mock-data";

const TABS = [
  { label: "맞춤 추천", href: "/gov-grant/recommend", dot: true },
  { label: "과제 검색", href: "/gov-grant/search" },
  { label: "관심 공고", href: "/gov-grant/saved" },
];

/** Full-screen mobile nav — the live hamburger opens the sidebar as an overlay. */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white md:hidden">
      <div className="flex items-center justify-between px-5 py-5">
        <Image src="/logo/rndcircle-lockup.svg" alt="RnDcircle" width={103} height={24} />
        <button type="button" aria-label="메뉴 닫기" onClick={onClose}>
          <X className="size-6 text-ink" />
        </button>
      </div>
      <SidebarContent onNavigate={onClose} />
    </div>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 border-b-[1.5px] border-line bg-white">
      <div className="flex h-[80px] items-center gap-6 px-8 max-md:h-auto max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:px-4 max-md:py-3.5">
        <div className="flex items-center justify-between md:contents">
          <Link
            href="/gov-grant/recommend"
            className="typo-headline text-ink transition-colors hover:text-brand"
          >
            정부 과제 추천
          </Link>
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
            className="text-ink md:hidden"
          >
            <Menu className="size-7" />
          </button>
        </div>
        <span className="h-5 w-[2px] bg-gray-soft max-md:hidden" />

        <nav className="flex items-center gap-10 max-md:gap-6">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "typo-body-3 relative shrink-0 transition-colors max-md:pb-0.5 max-md:text-sm",
                pathname === t.href ? "text-brand" : "text-gray-soft hover:text-ink-light",
              )}
            >
              {t.label}
              {t.dot && (
                <span className="absolute -top-1 -right-1.5 size-[7px] rounded-full bg-red-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 max-md:hidden">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-1.5 rounded-[5px] bg-brand-soft px-4 py-[11px] text-sm font-bold text-brand hover:brightness-95"
          >
            <Pencil className="size-3.5" />
            나의 요건 수정하기
          </button>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-tag text-xs font-bold text-brand-2">
              {USER.initial}
            </span>
            <span className="text-sm font-bold text-ink">{USER.name}</span>
            <ChevronDown className="size-3.5 text-ink-light" />
          </div>
        </div>
      </div>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {profileOpen && <RequirementModal onClose={() => setProfileOpen(false)} />}
    </header>
  );
}
