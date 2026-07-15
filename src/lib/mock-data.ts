import {
  CreditCard,
  Megaphone,
  MessageSquare,
  FileSearch,
  FileText,
  Search,
  Bookmark,
  Building2,
  Eye,
  Users,
} from "lucide-react";
import type { NavSection, Grant, GrantDetail } from "@/types/grant";

/** Mock account identity — the live account's real name/team are NOT copied. */
export const USER = { name: "김연구", initial: "김" };
export const TEAM = { name: "김연구의 팀", plan: "Free" };

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "파트너 매칭",
    links: [
      { label: "프로젝트 공고", icon: Megaphone, href: "#", external: true },
      { label: "파트너 매칭 문의", icon: MessageSquare, href: "#", external: true },
    ],
  },
  {
    title: "정부과제 수주",
    links: [
      { label: "정부과제 추천", icon: FileSearch, href: "#", active: true },
      { label: "정부과제 검색", icon: FileText, href: "#" },
      { label: "과제 수주 문의", icon: MessageSquare, href: "#", external: true },
    ],
  },
  {
    title: "연구실",
    links: [
      { label: "연구실 검색", icon: Search, href: "#" },
      { label: "저장한 연구실", icon: Bookmark, href: "#" },
    ],
  },
  {
    title: "기업",
    links: [
      { label: "AI 기반 기업 서칭", icon: Building2, href: "#" },
      { label: "열람 기업", icon: Eye, href: "#" },
      { label: "팀-플랜 관리", icon: Users, href: "#" },
    ],
  },
];

export const PLAN_LINK = { label: "서비스 플랜", icon: CreditCard, href: "#" };

export const TOTAL_COUNT = 40;
export const SORTS = ["최신 등록 순", "추천 컨설팅 순", "마감 임박 순"];

/** Mock grant listings — representative, not the account's real recommendations. */
export const NEW_ALERT_GRANT: Grant = {
  id: "g-new",
  isNew: true,
  deadlineNote: "별도 공지 시까지",
  title: "2026년 그린바이오 소재 첨단분석시스템 활성화 지원사업(장비 활용)",
  noticeName: "2026년 그린바이오 소재 첨단분석시스템 활성화 지원사업(장비 활용) 수혜기업 모집 공고",
  period: "- ~ -",
  amount: "5,000만 원",
  ministry: "경상북도",
  agency: "포항테크노파크",
  registeredAt: "2026-07-13",
  matchScore: 4,
  matchTotal: 4,
  orgTypes: "대기업, 중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관, 의료기관",
  regions: "전국",
  revenue: "-/-",
  lab: "불필요",
  tags: ["바이오소재·의료소재", "바이오파운드리 장비활용", "항체·유전자 기반 바이오소재 분석"],
};

export const GRANTS: Grant[] = [
  {
    id: "g-1",
    isNew: false,
    deadlineNote: "2026-07-08 ~ 2026-07-22",
    title: "바이오 플러스식 내구성 향상 유해 반응성 정가에 제조 기술 개발",
    noticeName: "2026년도 중소기업 기술혁신개발사업(수출지향형) 신규지원 대상과제 공고",
    period: "2026-07-08 ~ 2026-07-22",
    amount: "10억 원",
    ministry: "중소벤처기업부",
    agency: "중소기업기술정보진흥원",
    registeredAt: "2026-06-22",
    matchScore: 4,
    matchTotal: 4,
    orgTypes: "대기업, 중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관, 의료기관",
    regions: "전국",
    revenue: "-/1년 이내",
    lab: "불필요",
    tags: ["소재·부품·장비", "바이오공정", "유해 반응성 정가"],
  },
  {
    id: "g-2",
    isNew: false,
    deadlineNote: "~ 2026-07-22",
    title: "나노 인공지능 기반 생체 반응 증강 가능성 3D 프린팅 소재 맞춤 및 공정 중점 기술 개발",
    noticeName: "2026년 소재부품 미래 기술개발 사업 신규지원 대상과제 공고",
    period: "- ~ 2026-07-23",
    amount: "-",
    ministry: "과학기술정보통신부",
    agency: "국가과학기술연구회",
    registeredAt: "2026-07-13",
    matchScore: 3,
    matchTotal: 4,
    orgTypes: "중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관",
    regions: "전국",
    revenue: "-/-",
    lab: "필요",
    tags: ["나노 기술", "3D 프린팅", "인공지능 소재"],
  },
  {
    id: "g-3",
    isNew: false,
    deadlineNote: "~ 2026-07-30",
    title: "마이크로파 대역 Ku·W 대역 전자파 산란 측정 자성체 합성의 분무 건조 기반 제조 공정 기술 개발",
    noticeName: "2026년 소재 기술개발사업 신규과제 선정계획 공고",
    period: "- ~ 2026-07-30",
    amount: "-",
    ministry: "과학기술정보통신부",
    agency: "한국연구재단",
    registeredAt: "2026-07-10",
    matchScore: 4,
    matchTotal: 4,
    orgTypes: "대기업, 중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관",
    regions: "전국",
    revenue: "-/-",
    lab: "불필요",
    tags: ["자성체 소재", "전자파 차폐", "분무 건조 공정"],
  },
  {
    id: "g-4",
    isNew: false,
    deadlineNote: "~ 2026-07-30",
    title: "극한 흡착 폐수의 분산율 위한 초경량 고강도 그래핀·아라미드 복합직물 및 대면적 공정 기술 개발",
    noticeName: "2026년 탄소소재 융복합 기술개발 사업 신규지원 공고",
    period: "- ~ 2026-07-30",
    amount: "-",
    ministry: "과학기술정보통신부",
    agency: "한국연구재단",
    registeredAt: "2026-07-10",
    matchScore: 4,
    matchTotal: 4,
    orgTypes: "대기업, 중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관",
    regions: "전국",
    revenue: "-/-",
    lab: "불필요",
    tags: ["고분자 소재", "그래핀 복합재", "초경량 고강도"],
  },
  {
    id: "g-5",
    isNew: false,
    deadlineNote: "2026-07-08 ~ 2026-07-22",
    title: "국산기 고함유 EBA 기반 컴팬디파 복합 소재 기술개발 및 케이블 시제품 실증연구",
    noticeName: "2026년도 중소기업 기술혁신개발사업 신규지원 대상과제 공고",
    period: "2026-07-08 ~ 2026-07-22",
    amount: "10억 원",
    ministry: "중소벤처기업부",
    agency: "중소기업기술정보진흥원",
    registeredAt: "2026-06-22",
    matchScore: 4,
    matchTotal: 4,
    orgTypes: "중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관",
    regions: "전국",
    revenue: "-/-",
    lab: "불필요",
    tags: ["고분자 소재", "EBA 복합재", "케이블 실증"],
  },
  {
    id: "g-6",
    isNew: false,
    deadlineNote: "~ 2026-07-30",
    title: "탄소 유지 회밀활의 분자 변환과 응용에 관한 연구",
    noticeName: "2026년 기초연구사업 신규과제 선정계획 공고",
    period: "- ~ 2026-07-23",
    amount: "-",
    ministry: "과학기술정보통신부",
    agency: "한국연구재단",
    registeredAt: "2026-07-13",
    matchScore: 3,
    matchTotal: 4,
    orgTypes: "대학 연구실, 국공립/민간 연구기관",
    regions: "전국",
    revenue: "-/-",
    lab: "필요",
    tags: ["기초연구", "분자 변환", "탄소 소재"],
  },
];

/* ------------------------------------------------------------------ */
/* Grant detail (mock)                                                 */
/* ------------------------------------------------------------------ */

const GREEN_BIO_DETAIL: GrantDetail = {
  id: "g-new",
  dday: "D-153",
  supportType: "연구개발",
  noticeName:
    "2026년 그린바이오 소재 첨단분석시스템 활성화 지원사업(장비 활용) 수혜기업 모집 공고",
  title: "2026년 그린바이오 소재 첨단분석시스템 활성화 지원사업(장비 활용)",
  ministry: "경상북도",
  agency: "포항테크노파크",
  keywords: ["바이오", "소재"],
  coreKeywords: ["바이오소재·의료소재", "바이오파운드리 장비활용", "항체·유전자 기반 바이오소재 분석"],
  scale: "1억 원",
  amount: "5,000만 원",
  orgTypes: ["대기업", "중견기업", "중소기업", "대학 연구실", "국공립/민간 연구기관", "의료기관"],
  registeredAt: "2026-07-13",
  deadline: "2026-12-15",
  periodNote: "미정 ~ 2026-12-15",
  summary:
    "포항테크노파크가 추진하는 본 사업은 바이오파운드리 기반 첨단분석시스템과 품질분석장비 사용료를 지원해 그린바이오 소재와 바이오의약품 개발을 촉진하는 프로그램이다. 국내 바이오 기업, 대학, 연구기관 등이 참여할 수 있으며 기업당 최대 5천만원까지 지원된다. 2026년 11월 말까지 장비 활용 신청이 가능하며, 합성생물학·동물용의약품·기능성 바이오 소재 개발 기관에 적합하다.",
  matchScore: 4,
  matchTotal: 4,
  reqOrgTypes: "대기업, 중견기업, 중소기업, 대학 연구실, 국공립/민간 연구기관, 의료기관",
  reqRegions: "전국",
  reqRevenue: "-/-",
  reqLab: "불필요",
  requirements: [
    { label: "기업부설연구소 요건", value: "불필요" },
    { label: "컨소시엄 여부", value: "불필요" },
    {
      label: "과제 수행 이력 요건",
      value:
        "동일 과제를 타 기관(지자체 포함)에서 지원받고 있거나 지원받은 경우 신청 제한, 정부 지원사업 참여 제한 중인 기관·대표자는 신청 불가",
    },
  ],
  restrictions: [
    "[중복 지원 제한] 동일 과제를 타 기관 또는 지자체에서 지원받고 있거나 지원받은 경우 신청이 제한된다.",
    "[참여 제한] 신청기관 또는 대표자가 정부 지원사업 및 포항테크노파크 지원사업에 참여 제한 중인 경우 신청이 제한된다.",
  ],
  overview: [
    {
      n: 1,
      title: "사업 개요 및 배경",
      blocks: [
        "본 사업은 경상북도와 포항시, 포항테크노파크가 공동 추진하는 그린바이오 연구개발 인프라 지원사업으로, 바이오파운드리 기반 첨단분석 환경을 활용해 바이오산업 경쟁력을 높이기 위해 마련됐다. 최근 바이오의약품, 동물용의약품, 유전자 기반 기능성 소재 분야에서 고도화된 분석·평가 수요가 증가함에 따라 그린백신실증지원센터 내 첨단분석지원실을 중심으로 장비 활용 지원을 확대한다. 대학, 연구소, 기업이 직접 장비를 활용해 연구 효율과 산업화 가능성을 높일 수 있도록 지원하는 것이 특징이다.",
      ],
    },
    {
      n: 2,
      title: "과제 목표",
      blocks: [
        "이 과제는 바이오파운드리 기반 첨단분석시스템과 품질분석장비 활용을 통해 국내 바이오 분야 연구개발 역량을 강화하는 것을 목표로 한다. 지원기관은 후보유전자 발굴, 항체 탐색, 미생물군집 분석, 유전자 증폭 및 생체분자 상호작용 분석 등 다양한 실험을 수행할 수 있으며, 장비 활용 교육 이후 직접 장비를 사용하게 된다. 이를 통해 동물용의약품과 바이오의약품, 기능성 바이오 소재 개발 속도를 높이고 제품 상용화 가능성을 확보하는 것이 핵심이다.",
      ],
    },
    {
      n: 3,
      title: "과제 내용",
      blocks: [
        "본 과제는 그린백신실증지원센터 내 구축된 첨단분석지원실의 바이오파운드리 및 품질분석장비 활용 비용을 지원하는 프로그램이다. 장비 활용을 희망하는 기업·대학·연구기관이 직접 장비를 사용하고 사용료 일부를 지원받는 방식으로 운영된다.",
        "1. 지원 대상",
        "- 바이오의약품, 동물용의약품, 합성생물학, 기능성 바이오 소재 개발 기관",
        "- 국내 대학 연구실, 연구기관, 중소·중견·대기업 등",
        "- 바이오파운드리 장비 활용이 필요한 연구개발 조직",
        "2. 지원 내용",
        "- 기업당 최대 5천만원 장비 사용료 지원",
        "- 장비 활용 교육 및 분석 컨설팅 제공",
      ],
    },
  ],
};

/** Build a detail view for any mock grant id (falls back to the flagship one). */
export function getGrantDetail(id: string): GrantDetail {
  if (id === GREEN_BIO_DETAIL.id) return GREEN_BIO_DETAIL;
  const g = GRANTS.find((x) => x.id === id);
  if (!g) return GREEN_BIO_DETAIL;
  return {
    ...GREEN_BIO_DETAIL,
    id: g.id,
    dday: g.deadlineNote.startsWith("~") ? "D-14" : "D-7",
    noticeName: g.noticeName,
    title: g.title,
    ministry: g.ministry,
    agency: g.agency,
    keywords: g.tags[0] ? [g.tags[0].split("·")[0]] : [],
    coreKeywords: g.tags,
    amount: g.amount,
    registeredAt: g.registeredAt,
    periodNote: g.period,
    matchScore: g.matchScore,
    matchTotal: g.matchTotal,
    reqOrgTypes: g.orgTypes,
    reqRegions: g.regions,
    reqRevenue: g.revenue,
    reqLab: g.lab,
    summary: `${g.agency}가 추진하는 본 사업은 ${g.tags.join(", ")} 분야의 연구개발을 지원하는 프로그램이다. ${g.orgTypes} 등이 참여할 수 있으며, 신청 기간은 ${g.period}이다.`,
  };
}
