export interface Client {
  id: string;
  name: string;
  trade: string;
  location: string;
  verified: boolean;
  score: number;
  riskBand: "Low Risk" | "Moderate Risk" | "Elevated Risk" | "High Risk";
  totalInvoices: number;
  paidOnTime: number;
  latePayments: number;
  partialPayments: number;
  avgPaymentDelayDays: number;
  totalPaidCAD: number;
  outstandingCAD: number;
  lastPaymentDate: string;
  aiVerdict: string;
  recommendedTerms: string[];
  depositRecommendationPct: number;
  invoicesHistory: {
    id: string;
    amountCAD: number;
    delayDays: number;
    status: "Paid on time" | "Paid late" | "Pending" | "Overdue";
    date: string;
  }[];
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  projectName: string;
  amountCAD: number;
  issuedDate: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  milestone: string;
  remindersSent: {
    stage: string;
    date: string;
    channel: "SMS & Email" | "Email" | "SMS";
    status: "Delivered" | "Read" | "Scheduled";
  }[];
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  totalValueCAD: number;
  startDate: string;
  targetEndDate: string;
  status: "In Progress" | "Completed" | "Pending Approval";
  paidCAD: number;
  milestones: {
    title: string;
    percentage: number;
    amountCAD: number;
    status: "Completed" | "In Progress" | "Upcoming";
    dueDate: string;
    invoiceId?: string;
  }[];
}

export interface PaymentReceipt {
  id: string;
  invoiceId: string;
  clientName: string;
  amountCAD: number;
  date: string;
  method: "Interac e-Transfer" | "EFT / Direct Deposit" | "Commercial ACH" | "Corporate Credit";
  settlementStatus: "Settled" | "Processing";
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: "northstar-renovations",
    name: "Northstar Renovations",
    trade: "General Contracting & Commercial Fit-Outs",
    location: "Toronto, ON",
    verified: true,
    score: 92,
    riskBand: "Low Risk",
    totalInvoices: 24,
    paidOnTime: 22,
    latePayments: 2,
    partialPayments: 0,
    avgPaymentDelayDays: 1.8,
    totalPaidCAD: 48200,
    outstandingCAD: 6400,
    lastPaymentDate: "Sep 12, 2026",
    aiVerdict:
      "Payment behavior has remained consistent over the last 6 months. Minor delays (<2 days) are tied to routine bi-weekly Friday accounting batch runs rather than cash insolvency.",
    recommendedTerms: [
      "Milestone-based progress draws",
      "Request 20% upfront deposit on custom materials",
      "Standard Net 15 terms recommended",
    ],
    depositRecommendationPct: 20,
    invoicesHistory: [
      { id: "INV-1042", amountCAD: 4800, delayDays: 0, status: "Pending", date: "Sep 18, 2026" },
      { id: "INV-1035", amountCAD: 5800, delayDays: 0, status: "Paid on time", date: "Aug 28, 2026" },
      { id: "INV-1029", amountCAD: 8200, delayDays: 2, status: "Paid late", date: "Jul 15, 2026" },
      { id: "INV-1020", amountCAD: 12000, delayDays: 0, status: "Paid on time", date: "Jun 04, 2026" },
      { id: "INV-1014", amountCAD: 3400, delayDays: 1, status: "Paid late", date: "May 19, 2026" },
      { id: "INV-1008", amountCAD: 14000, delayDays: 0, status: "Paid on time", date: "Apr 02, 2026" },
    ],
  },
  {
    id: "apex-infrastructure",
    name: "Apex Infrastructure Partners",
    trade: "Tier 1 Commercial & Civil Development",
    location: "Vancouver, BC",
    verified: true,
    score: 96,
    riskBand: "Low Risk",
    totalInvoices: 38,
    paidOnTime: 37,
    latePayments: 1,
    partialPayments: 0,
    avgPaymentDelayDays: 0.9,
    totalPaidCAD: 94500,
    outstandingCAD: 12000,
    lastPaymentDate: "Sep 08, 2026",
    aiVerdict:
      "Premier institutional payer with automated EFT disbursements. Extremely low default risk across multiple sub-trade reviews.",
    recommendedTerms: [
      "Standard Net 30 terms accepted",
      "Milestone draws aligned to owner engineer sign-off",
      "Direct EFT setup recommended",
    ],
    depositRecommendationPct: 15,
    invoicesHistory: [
      { id: "INV-1039", amountCAD: 12000, delayDays: 0, status: "Paid on time", date: "Sep 08, 2026" },
      { id: "INV-1025", amountCAD: 28500, delayDays: 0, status: "Paid on time", date: "Jul 22, 2026" },
      { id: "INV-1011", amountCAD: 19000, delayDays: 2, status: "Paid late", date: "May 10, 2026" },
    ],
  },
  {
    id: "westmount-commercial",
    name: "Westmount Commercial Interiors",
    trade: "Hospitality & Retail General Contractor",
    location: "Montreal, QC",
    verified: true,
    score: 64,
    riskBand: "Moderate Risk",
    totalInvoices: 16,
    paidOnTime: 9,
    latePayments: 7,
    partialPayments: 2,
    avgPaymentDelayDays: 18.5,
    totalPaidCAD: 32400,
    outstandingCAD: 18400,
    lastPaymentDate: "Aug 14, 2026",
    aiVerdict:
      "Consistently delays payments between 2 to 3 weeks. Often waits for their ultimate property client to fund retainage before releasing subcontractor funds.",
    recommendedTerms: [
      "Require 35% upfront deposit before ordering materials",
      "Bi-weekly milestone payments with work stoppage clause",
      "Strict Net 7 payment deadlines",
    ],
    depositRecommendationPct: 35,
    invoicesHistory: [
      { id: "INV-1041", amountCAD: 3200, delayDays: 14, status: "Overdue", date: "Aug 30, 2026" },
      { id: "INV-1033", amountCAD: 7400, delayDays: 21, status: "Paid late", date: "Jul 05, 2026" },
      { id: "INV-1019", amountCAD: 9800, delayDays: 19, status: "Paid late", date: "May 29, 2026" },
    ],
  },
  {
    id: "laurentian-framing",
    name: "Laurentian Multi-Residential",
    trade: "Residential Development Group",
    location: "Calgary, AB",
    verified: false,
    score: 41,
    riskBand: "High Risk",
    totalInvoices: 9,
    paidOnTime: 3,
    latePayments: 6,
    partialPayments: 4,
    avgPaymentDelayDays: 34.2,
    totalPaidCAD: 19100,
    outstandingCAD: 22800,
    lastPaymentDate: "Jul 19, 2026",
    aiVerdict:
      "Severe payment latency detected. Multiple trade reports show unapproved holdbacks and check delays exceeding 30 days.",
    recommendedTerms: [
      "Require 50% upfront deposit",
      "Do not begin phase 2 until phase 1 invoice clears",
      "Personal or corporate guarantee recommended",
    ],
    depositRecommendationPct: 50,
    invoicesHistory: [
      { id: "INV-1040", amountCAD: 8900, delayDays: 32, status: "Overdue", date: "Aug 10, 2026" },
      { id: "INV-1022", amountCAD: 10200, delayDays: 41, status: "Paid late", date: "Jun 14, 2026" },
    ],
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "INV-1042",
    clientId: "northstar-renovations",
    clientName: "Northstar Renovations",
    projectName: "Commercial Interior Painting",
    amountCAD: 4800,
    issuedDate: "Sep 04, 2026",
    dueDate: "Sep 18, 2026",
    status: "Pending",
    milestone: "Materials & Preparation (30%)",
    remindersSent: [
      {
        stage: "3 days before due date",
        date: "Sep 15, 2026",
        channel: "SMS & Email",
        status: "Scheduled",
      },
      {
        stage: "Due date notification",
        date: "Sep 18, 2026",
        channel: "SMS & Email",
        status: "Scheduled",
      },
      {
        stage: "3 days overdue follow-up",
        date: "Sep 21, 2026",
        channel: "SMS & Email",
        status: "Scheduled",
      },
    ],
  },
  {
    id: "INV-1041",
    clientId: "westmount-commercial",
    clientName: "Westmount Commercial Interiors",
    projectName: "Downtown Office Framing & Drywall",
    amountCAD: 3200,
    issuedDate: "Aug 16, 2026",
    dueDate: "Aug 30, 2026",
    status: "Overdue",
    milestone: "Rough-in Stage Progress",
    remindersSent: [
      {
        stage: "3 days before due date",
        date: "Aug 27, 2026",
        channel: "SMS & Email",
        status: "Delivered",
      },
      {
        stage: "Due date notification",
        date: "Aug 30, 2026",
        channel: "SMS & Email",
        status: "Delivered",
      },
      {
        stage: "3 days overdue follow-up",
        date: "Sep 02, 2026",
        channel: "SMS & Email",
        status: "Read",
      },
    ],
  },
  {
    id: "INV-1039",
    clientId: "apex-infrastructure",
    clientName: "Apex Infrastructure Partners",
    projectName: "Civil Conduit Installation",
    amountCAD: 12000,
    issuedDate: "Aug 20, 2026",
    dueDate: "Sep 10, 2026",
    status: "Paid",
    milestone: "Phase 1 Completion",
    remindersSent: [
      {
        stage: "3 days before due date",
        date: "Sep 07, 2026",
        channel: "Email",
        status: "Delivered",
      },
    ],
  },
  {
    id: "INV-1038",
    clientId: "northstar-renovations",
    clientName: "Northstar Renovations",
    projectName: "Commercial Interior Painting",
    amountCAD: 2400,
    issuedDate: "Aug 20, 2026",
    dueDate: "Aug 27, 2026",
    status: "Paid",
    milestone: "Project Start Deposit (20%)",
    remindersSent: [
      {
        stage: "3 days before due date",
        date: "Aug 24, 2026",
        channel: "SMS & Email",
        status: "Delivered",
      },
    ],
  },
  {
    id: "INV-1037",
    clientId: "westmount-commercial",
    clientName: "Westmount Commercial Interiors",
    projectName: "Downtown Office Framing & Drywall",
    amountCAD: 5400,
    issuedDate: "Jul 28, 2026",
    dueDate: "Aug 11, 2026",
    status: "Paid",
    milestone: "Materials Deposit",
    remindersSent: [
      {
        stage: "3 days overdue follow-up",
        date: "Aug 14, 2026",
        channel: "SMS & Email",
        status: "Delivered",
      },
    ],
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Commercial Interior Painting",
    clientId: "northstar-renovations",
    clientName: "Northstar Renovations",
    totalValueCAD: 12000,
    startDate: "Aug 20, 2026",
    targetEndDate: "Oct 15, 2026",
    status: "In Progress",
    paidCAD: 2400,
    milestones: [
      {
        title: "Project Start",
        percentage: 20,
        amountCAD: 2400,
        status: "Completed",
        dueDate: "Aug 25, 2026",
        invoiceId: "INV-1038",
      },
      {
        title: "Materials & Preparation",
        percentage: 30,
        amountCAD: 3600,
        status: "In Progress",
        dueDate: "Sep 18, 2026",
        invoiceId: "INV-1042",
      },
      {
        title: "Midpoint Completion",
        percentage: 30,
        amountCAD: 3600,
        status: "Upcoming",
        dueDate: "Oct 02, 2026",
      },
      {
        title: "Final Completion",
        percentage: 20,
        amountCAD: 2400,
        status: "Upcoming",
        dueDate: "Oct 15, 2026",
      },
    ],
  },
  {
    id: "proj-2",
    title: "Downtown Office Framing & Drywall",
    clientId: "westmount-commercial",
    clientName: "Westmount Commercial Interiors",
    totalValueCAD: 24500,
    startDate: "Jul 15, 2026",
    targetEndDate: "Nov 01, 2026",
    status: "In Progress",
    paidCAD: 5400,
    milestones: [
      {
        title: "Initial Mobilization Deposit",
        percentage: 25,
        amountCAD: 6125,
        status: "Completed",
        dueDate: "Jul 20, 2026",
      },
      {
        title: "Rough-in Framing",
        percentage: 35,
        amountCAD: 8575,
        status: "In Progress",
        dueDate: "Aug 30, 2026",
        invoiceId: "INV-1041",
      },
      {
        title: "Boarding & Taping",
        percentage: 25,
        amountCAD: 6125,
        status: "Upcoming",
        dueDate: "Sep 30, 2026",
      },
      {
        title: "Substantial Completion",
        percentage: 15,
        amountCAD: 3675,
        status: "Upcoming",
        dueDate: "Oct 25, 2026",
      },
    ],
  },
  {
    id: "proj-3",
    title: "Civil Conduit Installation",
    clientId: "apex-infrastructure",
    clientName: "Apex Infrastructure Partners",
    totalValueCAD: 45000,
    startDate: "Jun 01, 2026",
    targetEndDate: "Dec 15, 2026",
    status: "In Progress",
    paidCAD: 24000,
    milestones: [
      {
        title: "Permits & Trenching",
        percentage: 30,
        amountCAD: 13500,
        status: "Completed",
        dueDate: "Jul 10, 2026",
      },
      {
        title: "Conduit Placement",
        percentage: 35,
        amountCAD: 15750,
        status: "Completed",
        dueDate: "Aug 20, 2026",
      },
      {
        title: "Wire Pull & Terminations",
        percentage: 25,
        amountCAD: 11250,
        status: "Upcoming",
        dueDate: "Oct 10, 2026",
      },
      {
        title: "Hydro Inspection & Sign-off",
        percentage: 10,
        amountCAD: 4500,
        status: "Upcoming",
        dueDate: "Nov 30, 2026",
      },
    ],
  },
];

export const MOCK_PAYMENTS: PaymentReceipt[] = [
  {
    id: "PAY-9041",
    invoiceId: "INV-1039",
    clientName: "Apex Infrastructure Partners",
    amountCAD: 12000,
    date: "Sep 08, 2026",
    method: "Commercial ACH",
    settlementStatus: "Settled",
  },
  {
    id: "PAY-9038",
    invoiceId: "INV-1038",
    clientName: "Northstar Renovations",
    amountCAD: 2400,
    date: "Aug 27, 2026",
    method: "Interac e-Transfer",
    settlementStatus: "Settled",
  },
  {
    id: "PAY-9037",
    invoiceId: "INV-1035",
    clientName: "Northstar Renovations",
    amountCAD: 5800,
    date: "Aug 28, 2026",
    method: "EFT / Direct Deposit",
    settlementStatus: "Settled",
  },
  {
    id: "PAY-9032",
    invoiceId: "INV-1037",
    clientName: "Westmount Commercial Interiors",
    amountCAD: 5400,
    date: "Aug 14, 2026",
    method: "EFT / Direct Deposit",
    settlementStatus: "Settled",
  },
];

export const DASHBOARD_STATS = {
  contractorName: "Alex",
  companyName: "Apex Contracting Services",
  location: "Toronto, ON",
  expectedThisMonthCAD: 24800,
  outstandingCAD: 8400,
  overdueCAD: 2100,
  collectionRatePct: 93,
  invoicesAnalyzedAllTime: 41820,
  totalPlatformVolumeProtectedCAD: 14200000,
  averageDelaySavedDays: 19.2,
};
