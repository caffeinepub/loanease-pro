import Types "../types/loan-kyc";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  // ── Constants ─────────────────────────────────────────────────────────────
  public let PROCESSING_FEE_AMOUNT : Nat = 99900; // ₹999 in paise

  // ── Helpers ───────────────────────────────────────────────────────────────

  public func generateAppId(counter : Nat) : Types.ApplicationId {
    "APP-" # Time.now().toText() # "-" # counter.toText()
  };

  public func isAdmin(admins : List.List<Types.UserId>, caller : Types.UserId) : Bool {
    admins.any(func(a) { Principal.equal(a, caller) })
  };

  // ── Customer ──────────────────────────────────────────────────────────────

  public func createProfile(
    profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
    caller : Types.UserId,
    input : Types.CustomerProfileInput,
  ) : Types.Result<Types.CustomerProfile> {
    if (profiles.containsKey(caller)) {
      return #err("Profile already exists. Use update instead.");
    };
    let now = Time.now();
    let profile : Types.CustomerProfile = {
      id = caller;
      name = input.name;
      email = input.email;
      phone = input.phone;
      address = input.address;
      createdAt = now;
      updatedAt = now;
    };
    profiles.add(caller, profile);
    #ok(profile)
  };

  public func updateProfile(
    profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
    caller : Types.UserId,
    input : Types.CustomerProfileInput,
  ) : Types.Result<Types.CustomerProfile> {
    switch (profiles.get(caller)) {
      case null { #err("Profile not found. Create one first.") };
      case (?existing) {
        let updated : Types.CustomerProfile = {
          existing with
          name = input.name;
          email = input.email;
          phone = input.phone;
          address = input.address;
          updatedAt = Time.now();
        };
        profiles.add(caller, updated);
        #ok(updated)
      };
    }
  };

  public func getProfile(
    profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
    caller : Types.UserId,
  ) : ?Types.CustomerProfile {
    profiles.get(caller)
  };

  // ── KYC ───────────────────────────────────────────────────────────────────

  public func submitKyc(
    kycRecords : Map.Map<Types.UserId, Types.KycRecord>,
    caller : Types.UserId,
    input : Types.KycSubmitInput,
  ) : Types.Result<Types.KycRecord> {
    let now = Time.now();
    let record : Types.KycRecord = {
      customerId = caller;
      identityType = input.identityType;
      identityNumber = input.identityNumber;
      status = #pending;
      submittedAt = now;
      reviewedAt = null;
      rejectionReason = null;
    };
    kycRecords.add(caller, record);
    #ok(record)
  };

  public func getKycStatus(
    kycRecords : Map.Map<Types.UserId, Types.KycRecord>,
    caller : Types.UserId,
  ) : ?Types.KycRecord {
    kycRecords.get(caller)
  };

  public func reviewKyc(
    kycRecords : Map.Map<Types.UserId, Types.KycRecord>,
    customerId : Types.UserId,
    approved : Bool,
    reason : ?Text,
  ) : Types.Result<Types.KycRecord> {
    switch (kycRecords.get(customerId)) {
      case null { #err("KYC record not found for customer.") };
      case (?existing) {
        let newStatus : Types.VerificationStatus = if (approved) #verified else #rejected;
        let updated : Types.KycRecord = {
          existing with
          status = newStatus;
          reviewedAt = ?Time.now();
          rejectionReason = if (approved) null else reason;
        };
        kycRecords.add(customerId, updated);
        #ok(updated)
      };
    }
  };

  // ── Documents ─────────────────────────────────────────────────────────────

  public func addDocument(
    documents : List.List<Types.DocumentRecord>,
    nextDocId : Nat,
    caller : Types.UserId,
    input : Types.DocumentUploadInput,
  ) : Types.Result<Types.DocumentRecord> {
    let record : Types.DocumentRecord = {
      id = nextDocId.toText();
      customerId = caller;
      applicationId = input.applicationId;
      docType = input.docType;
      fileReference = input.fileReference;
      uploadedAt = Time.now();
      status = #pending;
      rejectionReason = null;
    };
    documents.add(record);
    #ok(record)
  };

  public func getDocuments(
    documents : List.List<Types.DocumentRecord>,
    caller : Types.UserId,
    applicationId : ?Types.ApplicationId,
  ) : [Types.DocumentRecord] {
    let filtered = documents.filter(func(d) {
      if (not Principal.equal(d.customerId, caller)) return false;
      switch (applicationId) {
        case null { true };
        case (?appId) {
          switch (d.applicationId) {
            case null { false };
            case (?dAppId) { dAppId == appId };
          }
        };
      }
    });
    filtered.toArray()
  };

  public func reviewDocument(
    documents : List.List<Types.DocumentRecord>,
    docId : Text,
    approved : Bool,
    reason : ?Text,
  ) : Types.Result<Types.DocumentRecord> {
    var found : ?Types.DocumentRecord = null;
    documents.mapInPlace(func(d) {
      if (d.id == docId) {
        let newStatus : Types.VerificationStatus = if (approved) #verified else #rejected;
        let updated : Types.DocumentRecord = {
          d with
          status = newStatus;
          rejectionReason = if (approved) null else reason;
        };
        found := ?updated;
        updated
      } else {
        d
      }
    });
    switch (found) {
      case null { #err("Document not found with id: " # docId) };
      case (?doc) { #ok(doc) };
    }
  };

  // ── CIBIL ─────────────────────────────────────────────────────────────────

  public func recordCibilCheck(
    cibilRecords : Map.Map<Types.UserId, Types.CibilRecord>,
    customerId : Types.UserId,
    score : Nat,
    reportSummary : Text,
    requestId : Text,
    eligibilityThreshold : Nat,
  ) : Types.Result<Types.CibilRecord> {
    let record : Types.CibilRecord = {
      customerId;
      score;
      reportSummary;
      isEligible = score >= eligibilityThreshold;
      checkedAt = Time.now();
      requestId;
    };
    cibilRecords.add(customerId, record);
    #ok(record)
  };

  public func getCibilRecord(
    cibilRecords : Map.Map<Types.UserId, Types.CibilRecord>,
    customerId : Types.UserId,
  ) : ?Types.CibilRecord {
    cibilRecords.get(customerId)
  };

  // ── Loan Application ──────────────────────────────────────────────────────

  public func createApplication(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    counter : Nat,
    caller : Types.UserId,
    input : Types.LoanApplicationInput,
  ) : Types.Result<Types.LoanApplication> {
    let appId = generateAppId(counter);
    let now = Time.now();
    let app : Types.LoanApplication = {
      id = appId;
      customerId = caller;
      amountRequested = input.amountRequested;
      approvedAmount = null;
      tenureMonths = input.tenureMonths;
      purpose = input.purpose;
      status = #draft;
      processingFeePayment = null;
      cibilRecordId = null;
      interestRate = null;
      rejectionReason = null;
      adminNotes = null;
      createdAt = now;
      updatedAt = now;
      submittedAt = null;
      approvedAt = null;
      disbursement = null;
    };
    applications.add(appId, app);
    #ok(app)
  };

  public func getApplication(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    caller : Types.UserId,
  ) : ?Types.LoanApplication {
    switch (applications.get(appId)) {
      case null { null };
      case (?app) {
        if (Principal.equal(app.customerId, caller)) ?app else null
      };
    }
  };

  public func listApplicationsByCustomer(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    caller : Types.UserId,
  ) : [Types.LoanApplication] {
    applications.values()
      .filter(func(app) { Principal.equal(app.customerId, caller) })
      .toArray()
  };

  public func advanceApplicationStatus(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    newStatus : Types.ApplicationStatus,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        let updated : Types.LoanApplication = {
          app with
          status = newStatus;
          updatedAt = Time.now();
        };
        applications.add(appId, updated);
        #ok(updated)
      };
    }
  };

  public func recordProcessingFeePayment(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    payment : Types.StripePayment,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        switch (app.status) {
          case (#approved) {};
          case _ {
            return #err("Payment can only be made after loan approval.");
          };
        };
        if (payment.amount != PROCESSING_FEE_AMOUNT) {
          return #err("Processing fee must be exactly ₹999 (99900 paise).");
        };
        let updated : Types.LoanApplication = {
          app with
          processingFeePayment = ?payment;
          status = #paymentPending;
          updatedAt = Time.now();
        };
        applications.add(appId, updated);
        #ok(updated)
      };
    }
  };

  public func submitApplication(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    caller : Types.UserId,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        if (not Principal.equal(app.customerId, caller)) {
          return #err("Unauthorized: not your application.");
        };
        let now = Time.now();
        let updated : Types.LoanApplication = {
          app with
          status = #submitted;
          submittedAt = ?now;
          updatedAt = now;
        };
        applications.add(appId, updated);
        #ok(updated)
      };
    }
  };

  // ── Admin ─────────────────────────────────────────────────────────────────

  public func listApplications(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
    filterBy : Types.ApplicationFilter,
  ) : [Types.ApplicationSummary] {
    let allApps = applications.values();
    let filtered = switch (filterBy) {
      case (#all) { allApps };
      case (#byStatus(status)) {
        allApps.filter(func(app) {
          switch (app.status, status) {
            case (#draft, #draft) true;
            case (#kycPending, #kycPending) true;
            case (#documentsPending, #documentsPending) true;
            case (#cibilPending, #cibilPending) true;
            case (#paymentPending, #paymentPending) true;
            case (#submitted, #submitted) true;
            case (#underReview, #underReview) true;
            case (#approved, #approved) true;
            case (#rejected, #rejected) true;
            case (#disbursed, #disbursed) true;
            case _ false;
          }
        })
      };
      case (#byCustomer(customerId)) {
        allApps.filter(func(app) { Principal.equal(app.customerId, customerId) })
      };
    };
    filtered.map<Types.LoanApplication, Types.ApplicationSummary>(func(app) {
      let customerName = switch (profiles.get(app.customerId)) {
        case null { "Unknown" };
        case (?p) { p.name };
      };
      {
        id = app.id;
        customerId = app.customerId;
        customerName;
        amountRequested = app.amountRequested;
        status = app.status;
        createdAt = app.createdAt;
        updatedAt = app.updatedAt;
      }
    }).toArray()
  };

  public func getApplicationDetails(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    profiles : Map.Map<Types.UserId, Types.CustomerProfile>,
    kycRecords : Map.Map<Types.UserId, Types.KycRecord>,
    documents : List.List<Types.DocumentRecord>,
    cibilRecords : Map.Map<Types.UserId, Types.CibilRecord>,
    appId : Types.ApplicationId,
  ) : ?Types.ApplicationDetails {
    switch (applications.get(appId)) {
      case null { null };
      case (?app) {
        let customer = profiles.get(app.customerId);
        let kyc = kycRecords.get(app.customerId);
        let cibil = cibilRecords.get(app.customerId);
        let appDocs = documents.filter(func(d) {
          switch (d.applicationId) {
            case null { false };
            case (?dAppId) { dAppId == appId };
          }
        }).toArray();
        ?{
          application = app;
          customer;
          kyc;
          documents = appDocs;
          cibil;
        }
      };
    }
  };

  public func approveApplication(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    input : Types.AdminApproveInput,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        let now = Time.now();
        let updated : Types.LoanApplication = {
          app with
          status = #approved;
          approvedAmount = ?input.approvedAmount;
          interestRate = ?input.interestRate;
          adminNotes = input.adminNotes;
          rejectionReason = null;
          approvedAt = ?now;
          updatedAt = now;
        };
        applications.add(appId, updated);
        #ok(updated)
      };
    }
  };

  public func rejectApplication(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    input : Types.AdminRejectInput,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        let updated : Types.LoanApplication = {
          app with
          status = #rejected;
          rejectionReason = ?input.rejectionReason;
          updatedAt = Time.now();
        };
        applications.add(appId, updated);
        #ok(updated)
      };
    }
  };

  public func recordDisbursement(
    applications : Map.Map<Types.ApplicationId, Types.LoanApplication>,
    appId : Types.ApplicationId,
    input : Types.DisbursementInput,
  ) : Types.Result<Types.LoanApplication> {
    switch (applications.get(appId)) {
      case null { #err("Application not found.") };
      case (?app) {
        switch (app.approvedAmount) {
          case null { #err("Application has no approved amount. Approve it first.") };
          case (?amount) {
            // Validate processing fee has been paid
            switch (app.processingFeePayment) {
              case null {
                return #err("Processing fee must be paid before disbursement.");
              };
              case (?feePayment) {
                switch (feePayment.status) {
                  case (#paid) {};
                  case _ {
                    return #err("Processing fee must be paid before disbursement.");
                  };
                };
              };
            };
            let now = Time.now();
            let disbursement : Types.DisbursementRecord = {
              applicationId = appId;
              amount;
              accountNumber = input.accountNumber;
              bankName = input.bankName;
              ifscCode = input.ifscCode;
              disbursedAt = now;
              referenceNumber = input.referenceNumber;
            };
            let updated : Types.LoanApplication = {
              app with
              status = #disbursed;
              disbursement = ?disbursement;
              updatedAt = now;
            };
            applications.add(appId, updated);
            #ok(updated)
          };
        }
      };
    }
  };
};
