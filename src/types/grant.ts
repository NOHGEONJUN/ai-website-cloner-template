import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
  active?: boolean;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface DetailSection {
  n: number;
  title: string;
  blocks: string[];
}

export interface LabeledRow {
  label: string;
  value: string;
}

export interface GrantDetail {
  id: string;
  dday: string;
  supportType: string;
  noticeName: string;
  title: string;
  ministry: string;
  agency: string;
  /** words highlighted yellow across the page, like the original's match keywords */
  keywords: string[];
  coreKeywords: string[];
  scale: string;
  amount: string;
  orgTypes: string[];
  registeredAt: string;
  deadline: string;
  periodNote: string;
  summary: string;
  matchScore: number;
  matchTotal: number;
  reqOrgTypes: string;
  reqRegions: string;
  reqRevenue: string;
  reqLab: string;
  requirements: LabeledRow[];
  restrictions: string[];
  overview: DetailSection[];
}

export interface Grant {
  id: string;
  isNew: boolean;
  deadlineNote: string;
  title: string;
  noticeName: string;
  period: string;
  amount: string;
  ministry: string;
  agency: string;
  registeredAt: string;
  matchScore: number;
  matchTotal: number;
  orgTypes: string;
  regions: string;
  revenue: string;
  lab: string;
  tags: string[];
  /** days until deadline relative to the clone's reference date; null = 별도 공지/상시 */
  dday?: number | null;
  /** 과제 유형 filter on the search page */
  supportType?: "연구개발" | "사업화";
  /** search page: requirement match not computable (live shows red "?/4" state) */
  matchUnknown?: boolean;
}
