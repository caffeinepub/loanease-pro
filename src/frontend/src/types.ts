// Re-export all backend types for convenient use across the app
export type {
  CustomerProfile,
  CustomerProfileInput,
  LoanApplication,
  LoanApplicationInput,
  ApplicationDetails,
  ApplicationSummary,
  ApplicationFilter,
  KycRecord,
  KycSubmitInput,
  DocumentRecord,
  DocumentUploadInput,
  DocumentType,
  CibilRecord,
  DisbursementRecord,
  DisbursementInput,
  StripePayment,
  AdminApproveInput,
  AdminRejectInput,
  LoanPurpose,
  UserId,
  ApplicationId,
  Timestamp,
  Result,
  Result_1,
  Result_2,
  Result_3,
  Result_4,
  Result_5,
} from "./backend";

export {
  ApplicationStatus,
  IdentityType,
  PaymentStatus,
  VerificationStatus,
} from "./backend";

// UI-level helper types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export type LoanPurposeKind =
  | "personal"
  | "home"
  | "education"
  | "business"
  | "vehicle"
  | "medical"
  | "other";

// ─── Repayment Tracker Types ──────────────────────────────────────────────────
export interface RepaymentEntry {
  paymentNumber: number;
  dueDate: bigint;
  principalComponent: number;
  interestComponent: number;
  emiAmount: number;
  remainingBalance: number;
}

export interface RepaymentSchedule {
  applicationId: string;
  totalLoanAmount: bigint;
  monthlyEmi: number;
  annualInterestRate: number;
  tenureMonths: bigint;
  startDate: bigint;
  entries: RepaymentEntry[];
}

export type RepaymentResult =
  | { __kind__: "ok"; ok: RepaymentSchedule }
  | { __kind__: "notFound" }
  | { __kind__: "notDisbursed" }
  | { __kind__: "missingData"; missingData: string };
