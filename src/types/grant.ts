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
}
