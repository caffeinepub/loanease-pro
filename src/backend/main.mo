import Types "types/loan-kyc";
import LoanKycApi "mixins/loan-kyc-api";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  // ── State ──────────────────────────────────────────────────────────────────
  let profiles = Map.empty<Types.UserId, Types.CustomerProfile>();
  let kycRecords = Map.empty<Types.UserId, Types.KycRecord>();
  let documents = List.empty<Types.DocumentRecord>();
  let cibilRecords = Map.empty<Types.UserId, Types.CibilRecord>();
  let applications = Map.empty<Types.ApplicationId, Types.LoanApplication>();
  let admins = List.empty<Types.UserId>();

  // ── Mixins ─────────────────────────────────────────────────────────────────
  include LoanKycApi(profiles, kycRecords, documents, cibilRecords, applications, admins);
};
