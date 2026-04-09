import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type ApplicationId = Common.ApplicationId;

  // ── Customer ──────────────────────────────────────────────────────────────
  public type CustomerProfile = {
    id : UserId;
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // ── KYC ───────────────────────────────────────────────────────────────────
  public type IdentityType = {
    #aadhaar;
    #pan;
    #drivingLicense;
  };

  public type VerificationStatus = {
    #pending;
    #verified;
    #rejected;
  };

  public type KycRecord = {
    customerId : UserId;
    identityType : IdentityType;
    identityNumber : Text;
    status : VerificationStatus;
    submittedAt : Timestamp;
    reviewedAt : ?Timestamp;
    rejectionReason : ?Text;
  };

  // ── Documents ─────────────────────────────────────────────────────────────
  public type DocumentType = {
    #identityProof;
    #addressProof;
    #incomeProof;
    #bankStatement;
    #photograph;
    #other : Text;
  };

  public type DocumentRecord = {
    id : Text;
    customerId : UserId;
    applicationId : ?ApplicationId;
    docType : DocumentType;
    fileReference : Text;
    uploadedAt : Timestamp;
    status : VerificationStatus;
    rejectionReason : ?Text;
  };

  // ── CIBIL / Credit Check ──────────────────────────────────────────────────
  public type CibilRecord = {
    customerId : UserId;
    score : Nat;
    reportSummary : Text;
    isEligible : Bool;
    checkedAt : Timestamp;
    requestId : Text;
  };

  // ── Loan Application ──────────────────────────────────────────────────────
  public type ApplicationStatus = {
    #draft;
    #kycPending;
    #documentsPending;
    #cibilPending;
    #paymentPending;
    #submitted;
    #underReview;
    #approved;
    #rejected;
    #disbursed;
  };

  public type LoanPurpose = {
    #personal;
    #business;
    #education;
    #home;
    #vehicle;
    #medical;
    #other : Text;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type StripePayment = {
    paymentIntentId : Text;
    amount : Nat;
    currency : Text;
    status : PaymentStatus;
    createdAt : Timestamp;
    paidAt : ?Timestamp;
  };

  public type DisbursementRecord = {
    applicationId : ApplicationId;
    amount : Nat;
    accountNumber : Text;
    bankName : Text;
    ifscCode : Text;
    disbursedAt : Timestamp;
    referenceNumber : Text;
  };

  public type LoanApplication = {
    id : ApplicationId;
    customerId : UserId;
    amountRequested : Nat;
    approvedAmount : ?Nat;
    tenureMonths : Nat;
    purpose : LoanPurpose;
    status : ApplicationStatus;
    processingFeePayment : ?StripePayment;
    cibilRecordId : ?Text;
    interestRate : ?Float;
    rejectionReason : ?Text;
    adminNotes : ?Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
    submittedAt : ?Timestamp;
    approvedAt : ?Timestamp;
    disbursement : ?DisbursementRecord;
  };

  // ── Request / Response DTOs ───────────────────────────────────────────────
  public type CustomerProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public type KycSubmitInput = {
    identityType : IdentityType;
    identityNumber : Text;
  };

  public type DocumentUploadInput = {
    applicationId : ?ApplicationId;
    docType : DocumentType;
    fileReference : Text;
  };

  public type LoanApplicationInput = {
    amountRequested : Nat;
    tenureMonths : Nat;
    purpose : LoanPurpose;
  };

  public type AdminApproveInput = {
    approvedAmount : Nat;
    interestRate : Float;
    adminNotes : ?Text;
  };

  public type AdminRejectInput = {
    rejectionReason : Text;
  };

  public type DisbursementInput = {
    accountNumber : Text;
    bankName : Text;
    ifscCode : Text;
    referenceNumber : Text;
  };

  public type ApplicationFilter = {
    #all;
    #byStatus : ApplicationStatus;
    #byCustomer : UserId;
  };

  public type ApplicationSummary = {
    id : ApplicationId;
    customerId : UserId;
    customerName : Text;
    amountRequested : Nat;
    status : ApplicationStatus;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type ApplicationDetails = {
    application : LoanApplication;
    customer : ?CustomerProfile;
    kyc : ?KycRecord;
    documents : [DocumentRecord];
    cibil : ?CibilRecord;
  };

  public type Result<T> = {
    #ok : T;
    #err : Text;
  };
};
