import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type DocumentType = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "bankStatement";
    bankStatement: null;
} | {
    __kind__: "incomeProof";
    incomeProof: null;
} | {
    __kind__: "identityProof";
    identityProof: null;
} | {
    __kind__: "photograph";
    photograph: null;
} | {
    __kind__: "addressProof";
    addressProof: null;
};
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: KycRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface DocumentRecord {
    id: string;
    status: VerificationStatus;
    applicationId?: ApplicationId;
    rejectionReason?: string;
    customerId: UserId;
    docType: DocumentType;
    uploadedAt: Timestamp;
    fileReference: string;
}
export interface DisbursementInput {
    referenceNumber: string;
    ifscCode: string;
    bankName: string;
    accountNumber: string;
}
export interface CustomerProfileInput {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export type ApplicationFilter = {
    __kind__: "all";
    all: null;
} | {
    __kind__: "byCustomer";
    byCustomer: UserId;
} | {
    __kind__: "byStatus";
    byStatus: ApplicationStatus;
};
export interface CibilRecord {
    requestId: string;
    isEligible: boolean;
    score: bigint;
    checkedAt: Timestamp;
    customerId: UserId;
    reportSummary: string;
}
export interface DocumentUploadInput {
    applicationId?: ApplicationId;
    docType: DocumentType;
    fileReference: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface ApplicationSummary {
    id: ApplicationId;
    customerName: string;
    status: ApplicationStatus;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    customerId: UserId;
    amountRequested: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: LoanApplication;
} | {
    __kind__: "err";
    err: string;
};
export type LoanPurpose = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "home";
    home: null;
} | {
    __kind__: "education";
    education: null;
} | {
    __kind__: "personal";
    personal: null;
} | {
    __kind__: "business";
    business: null;
} | {
    __kind__: "vehicle";
    vehicle: null;
} | {
    __kind__: "medical";
    medical: null;
};
export type Result_4 = {
    __kind__: "ok";
    ok: DocumentRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface KycRecord {
    status: VerificationStatus;
    identityType: IdentityType;
    rejectionReason?: string;
    submittedAt: Timestamp;
    reviewedAt?: Timestamp;
    identityNumber: string;
    customerId: UserId;
}
export interface AdminRejectInput {
    rejectionReason: string;
}
export interface LoanApplication {
    id: ApplicationId;
    status: ApplicationStatus;
    approvedAt?: Timestamp;
    createdAt: Timestamp;
    rejectionReason?: string;
    submittedAt?: Timestamp;
    processingFeePayment?: StripePayment;
    updatedAt: Timestamp;
    tenureMonths: bigint;
    interestRate?: number;
    cibilRecordId?: string;
    customerId: UserId;
    disbursement?: DisbursementRecord;
    adminNotes?: string;
    amountRequested: bigint;
    approvedAmount?: bigint;
    purpose: LoanPurpose;
}
export interface LoanApplicationInput {
    tenureMonths: bigint;
    amountRequested: bigint;
    purpose: LoanPurpose;
}
export interface KycSubmitInput {
    identityType: IdentityType;
    identityNumber: string;
}
export interface ApplicationDetails {
    kyc?: KycRecord;
    documents: Array<DocumentRecord>;
    application: LoanApplication;
    customer?: CustomerProfile;
    cibil?: CibilRecord;
}
export interface CustomerProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    email: string;
    updatedAt: Timestamp;
    address: string;
    phone: string;
}
export interface AdminApproveInput {
    interestRate: number;
    adminNotes?: string;
    approvedAmount: bigint;
}
export type UserId = Principal;
export type Result = {
    __kind__: "ok";
    ok: CustomerProfile;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: CibilRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface DisbursementRecord {
    referenceNumber: string;
    ifscCode: string;
    applicationId: ApplicationId;
    bankName: string;
    accountNumber: string;
    amount: bigint;
    disbursedAt: Timestamp;
}
export type ApplicationId = string;
export interface StripePayment {
    status: PaymentStatus;
    createdAt: Timestamp;
    currency: string;
    amount: bigint;
    paidAt?: Timestamp;
    paymentIntentId: string;
}
export enum ApplicationStatus {
    submitted = "submitted",
    kycPending = "kycPending",
    underReview = "underReview",
    documentsPending = "documentsPending",
    disbursed = "disbursed",
    cibilPending = "cibilPending",
    approved = "approved",
    rejected = "rejected",
    draft = "draft",
    paymentPending = "paymentPending"
}
export enum IdentityType {
    pan = "pan",
    aadhaar = "aadhaar",
    drivingLicense = "drivingLicense"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum VerificationStatus {
    verified = "verified",
    pending = "pending",
    rejected = "rejected"
}
export interface backendInterface {
    addAdmin(newAdmin: UserId): Promise<Result_5>;
    addDocument(input: DocumentUploadInput): Promise<Result_4>;
    adminApproveApplication(appId: ApplicationId, input: AdminApproveInput): Promise<Result_1>;
    adminGetApplicationDetails(appId: ApplicationId): Promise<ApplicationDetails | null>;
    adminListApplications(filterBy: ApplicationFilter): Promise<Array<ApplicationSummary>>;
    adminRecordDisbursement(appId: ApplicationId, input: DisbursementInput): Promise<Result_1>;
    adminRejectApplication(appId: ApplicationId, input: AdminRejectInput): Promise<Result_1>;
    adminReviewDocument(docId: string, approved: boolean, reason: string | null): Promise<Result_4>;
    adminReviewKyc(customerId: UserId, approved: boolean, reason: string | null): Promise<Result_2>;
    createCustomerProfile(input: CustomerProfileInput): Promise<Result>;
    createLoanApplication(input: LoanApplicationInput): Promise<Result_1>;
    getMyApplication(appId: ApplicationId): Promise<LoanApplication | null>;
    getMyCibilRecord(): Promise<CibilRecord | null>;
    getMyDocuments(applicationId: ApplicationId | null): Promise<Array<DocumentRecord>>;
    getMyKycStatus(): Promise<KycRecord | null>;
    getMyProfile(): Promise<CustomerProfile | null>;
    listMyApplications(): Promise<Array<LoanApplication>>;
    recordCibilCheck(customerId: UserId, score: bigint, reportSummary: string, requestId: string): Promise<Result_3>;
    recordPayment(appId: ApplicationId, payment: StripePayment): Promise<Result_1>;
    submitKyc(input: KycSubmitInput): Promise<Result_2>;
    submitLoanApplication(appId: ApplicationId): Promise<Result_1>;
    updateCustomerProfile(input: CustomerProfileInput): Promise<Result>;
}
