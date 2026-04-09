import Types "../types/loan-kyc";
import LoanKycLib "../lib/loan-kyc";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

mixin (
  profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
  kycRecords : Map.Map<Types.UserId, Types.KycRecord>,
  documents : List.List<Types.DocumentRecord>,
  cibilRecords : Map.Map<Types.UserId, Types.CibilRecord>,
  applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
  admins : List.List<Types.UserId>,
) {

  // ── Customer Profile ──────────────────────────────────────────────────────

  public shared ({ caller }) func createCustomerProfile(
    input : Types.CustomerProfileInput
  ) : async Types.Result<Types.CustomerProfile> {
    LoanKycLib.createProfile(profiles, caller, input)
  };

  public shared ({ caller }) func updateCustomerProfile(
    input : Types.CustomerProfileInput
  ) : async Types.Result<Types.CustomerProfile> {
    LoanKycLib.updateProfile(profiles, caller, input)
  };

  public shared query ({ caller }) func getMyProfile() : async ?Types.CustomerProfile {
    LoanKycLib.getProfile(profiles, caller)
  };

  // ── KYC ───────────────────────────────────────────────────────────────────

  public shared ({ caller }) func submitKyc(
    input : Types.KycSubmitInput
  ) : async Types.Result<Types.KycRecord> {
    LoanKycLib.submitKyc(kycRecords, caller, input)
  };

  public shared query ({ caller }) func getMyKycStatus() : async ?Types.KycRecord {
    LoanKycLib.getKycStatus(kycRecords, caller)
  };

  // ── Documents ─────────────────────────────────────────────────────────────

  public shared ({ caller }) func addDocument(
    input : Types.DocumentUploadInput
  ) : async Types.Result<Types.DocumentRecord> {
    let docId = documents.size();
    LoanKycLib.addDocument(documents, docId, caller, input)
  };

  public shared query ({ caller }) func getMyDocuments(
    applicationId : ?Types.ApplicationId
  ) : async [Types.DocumentRecord] {
    LoanKycLib.getDocuments(documents, caller, applicationId)
  };

  // ── CIBIL ─────────────────────────────────────────────────────────────────

  public shared ({ caller }) func recordCibilCheck(
    customerId : Types.UserId,
    score : Nat,
    reportSummary : Text,
    requestId : Text,
  ) : async Types.Result<Types.CibilRecord> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.recordCibilCheck(cibilRecords, customerId, score, reportSummary, requestId, 650)
  };

  public shared query ({ caller }) func getMyCibilRecord() : async ?Types.CibilRecord {
    LoanKycLib.getCibilRecord(cibilRecords, caller)
  };

  // ── Loan Application ──────────────────────────────────────────────────────

  public shared ({ caller }) func createLoanApplication(
    input : Types.LoanApplicationInput
  ) : async Types.Result<Types.LoanApplication> {
    let nextId = applications.size();
    LoanKycLib.createApplication(applications, nextId, caller, input)
  };

  public shared query ({ caller }) func getMyApplication(
    appId : Types.ApplicationId
  ) : async ?Types.LoanApplication {
    LoanKycLib.getApplication(applications, appId, caller)
  };

  public shared query ({ caller }) func listMyApplications() : async [Types.LoanApplication] {
    LoanKycLib.listApplicationsByCustomer(applications, caller)
  };

  public shared ({ caller }) func submitLoanApplication(
    appId : Types.ApplicationId
  ) : async Types.Result<Types.LoanApplication> {
    LoanKycLib.submitApplication(applications, appId, caller)
  };

  public shared ({ caller }) func recordPayment(
    appId : Types.ApplicationId,
    payment : Types.StripePayment,
  ) : async Types.Result<Types.LoanApplication> {
    // Only the application owner can record a payment
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        if (not Principal.equal(app.customerId, caller)) {
          return #err("Unauthorized: not your application.");
        };
        if (payment.amount != LoanKycLib.PROCESSING_FEE_AMOUNT) {
          return #err("Processing fee must be exactly ₹999 (99900 paise).");
        };
        LoanKycLib.recordProcessingFeePayment(applications, appId, payment)
      };
    }
  };

  // ── Admin ─────────────────────────────────────────────────────────────────

  public shared query ({ caller }) func adminListApplications(
    filterBy : Types.ApplicationFilter
  ) : async [Types.ApplicationSummary] {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.listApplications(applications, profiles, filterBy)
  };

  public shared query ({ caller }) func adminGetApplicationDetails(
    appId : Types.ApplicationId
  ) : async ?Types.ApplicationDetails {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.getApplicationDetails(applications, profiles, kycRecords, documents, cibilRecords, appId)
  };

  public shared ({ caller }) func adminApproveApplication(
    appId : Types.ApplicationId,
    input : Types.AdminApproveInput,
  ) : async Types.Result<Types.LoanApplication> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.approveApplication(applications, appId, input)
  };

  public shared ({ caller }) func adminRejectApplication(
    appId : Types.ApplicationId,
    input : Types.AdminRejectInput,
  ) : async Types.Result<Types.LoanApplication> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.rejectApplication(applications, appId, input)
  };

  public shared ({ caller }) func adminReviewKyc(
    customerId : Types.UserId,
    approved : Bool,
    reason : ?Text,
  ) : async Types.Result<Types.KycRecord> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.reviewKyc(kycRecords, customerId, approved, reason)
  };

  public shared ({ caller }) func adminReviewDocument(
    docId : Text,
    approved : Bool,
    reason : ?Text,
  ) : async Types.Result<Types.DocumentRecord> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.reviewDocument(documents, docId, approved, reason)
  };

  public shared ({ caller }) func adminRecordDisbursement(
    appId : Types.ApplicationId,
    input : Types.DisbursementInput,
  ) : async Types.Result<Types.LoanApplication> {
    if (not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    LoanKycLib.recordDisbursement(applications, appId, input)
  };

  public shared ({ caller }) func addAdmin(
    newAdmin : Types.UserId
  ) : async Types.Result<Text> {
    // Bootstrap: allow adding first admin when list is empty, or existing admin adds another
    if (not admins.isEmpty() and not LoanKycLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only.");
    };
    if (LoanKycLib.isAdmin(admins, newAdmin)) {
      return #err("Principal is already an admin.");
    };
    admins.add(newAdmin);
    #ok("Admin added successfully.")
  };
};
