import type { backendInterface } from "../backend";
import {
  ApplicationStatus,
  IdentityType,
  PaymentStatus,
  VerificationStatus,
} from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText(
  "2vxsx-fae"
);
const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleProfile = {
  id: samplePrincipal,
  name: "Raj Kumar",
  email: "raj.kumar@example.com",
  phone: "+91 98765 43210",
  address: "42, MG Road, Bengaluru, Karnataka 560001",
  createdAt: now,
  updatedAt: now,
};

const sampleKyc = {
  customerId: samplePrincipal,
  identityType: IdentityType.aadhaar,
  identityNumber: "XXXX-XXXX-1234",
  status: VerificationStatus.verified,
  submittedAt: now,
  reviewedAt: now,
};

const sampleCibil = {
  requestId: "cibil-req-001",
  customerId: samplePrincipal,
  score: BigInt(742),
  isEligible: true,
  reportSummary:
    "Good credit history. No defaults recorded. Score qualifies for standard loan products.",
  checkedAt: now,
};

const sampleApp = {
  id: "app-001",
  customerId: samplePrincipal,
  status: ApplicationStatus.approved,
  amountRequested: BigInt(500000),
  approvedAmount: BigInt(450000),
  tenureMonths: BigInt(36),
  purpose: { __kind__: "personal" as const, personal: null },
  interestRate: 10.5,
  cibilRecordId: "cibil-req-001",
  adminNotes: "Approved based on strong credit score and income proof.",
  createdAt: now,
  updatedAt: now,
  submittedAt: now,
  approvedAt: now,
};

const sampleDoc = {
  id: "doc-001",
  customerId: samplePrincipal,
  applicationId: "app-001",
  docType: { __kind__: "identityProof" as const, identityProof: null },
  fileReference: "https://example.com/files/doc-001.pdf",
  status: VerificationStatus.verified,
  uploadedAt: now,
};

const sampleSummaries = [
  {
    id: "app-001",
    customerId: samplePrincipal,
    customerName: "Raj Kumar",
    status: ApplicationStatus.approved,
    amountRequested: BigInt(500000),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "app-002",
    customerId: samplePrincipal,
    customerName: "Priya Singh",
    status: ApplicationStatus.underReview,
    amountRequested: BigInt(300000),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "app-003",
    customerId: samplePrincipal,
    customerName: "Amit Sharma",
    status: ApplicationStatus.documentsPending,
    amountRequested: BigInt(200000),
    createdAt: now,
    updatedAt: now,
  },
];

export const mockBackend: backendInterface = {
  addAdmin: async () => ({ __kind__: "ok", ok: "Admin added" }),

  addDocument: async () => ({ __kind__: "ok", ok: sampleDoc }),

  adminApproveApplication: async () => ({ __kind__: "ok", ok: sampleApp }),

  adminGetApplicationDetails: async () => ({
    application: sampleApp,
    customer: sampleProfile,
    kyc: sampleKyc,
    cibil: sampleCibil,
    documents: [sampleDoc],
  }),

  adminListApplications: async () => sampleSummaries,

  adminRecordDisbursement: async () => ({
    __kind__: "ok",
    ok: {
      ...sampleApp,
      status: ApplicationStatus.disbursed,
      disbursement: {
        applicationId: "app-001",
        accountNumber: "12345678901234",
        ifscCode: "HDFC0001234",
        bankName: "HDFC Bank",
        referenceNumber: "NEFT20240408001",
        amount: BigInt(450000),
        disbursedAt: now,
      },
    },
  }),

  adminRejectApplication: async () => ({
    __kind__: "ok",
    ok: { ...sampleApp, status: ApplicationStatus.rejected },
  }),

  adminReviewDocument: async () => ({ __kind__: "ok", ok: sampleDoc }),

  adminReviewKyc: async () => ({ __kind__: "ok", ok: sampleKyc }),

  createCustomerProfile: async () => ({
    __kind__: "ok",
    ok: sampleProfile,
  }),

  createLoanApplication: async () => ({ __kind__: "ok", ok: sampleApp }),

  getMyApplication: async () => sampleApp,

  getMyCibilRecord: async () => sampleCibil,

  getMyDocuments: async () => [sampleDoc],

  getMyKycStatus: async () => sampleKyc,

  getMyProfile: async () => sampleProfile,

  listMyApplications: async () => [sampleApp],

  recordCibilCheck: async () => ({ __kind__: "ok", ok: sampleCibil }),

  recordPayment: async () => ({
    __kind__: "ok",
    ok: {
      ...sampleApp,
      processingFeePayment: {
        paymentIntentId: "pi_test_001",
        amount: BigInt(2500),
        currency: "INR",
        status: PaymentStatus.paid,
        createdAt: now,
        paidAt: now,
      },
    },
  }),

  submitKyc: async () => ({ __kind__: "ok", ok: sampleKyc }),

  submitLoanApplication: async () => ({
    __kind__: "ok",
    ok: { ...sampleApp, status: ApplicationStatus.submitted },
  }),

  updateCustomerProfile: async () => ({ __kind__: "ok", ok: sampleProfile }),
};
