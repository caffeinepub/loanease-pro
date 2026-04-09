import LoanKycTypes "../types/loan-kyc";
import RepaymentTypes "../types/repayment-tracker";
import RepaymentLib "../lib/repayment-tracker";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  applications : Map.Map<LoanKycTypes.ApplicationId, LoanKycTypes.LoanApplication>,
) {

  // ── Repayment Tracker ─────────────────────────────────────────────────────

  /// Returns the full amortisation schedule for an approved and disbursed loan.
  /// Only the loan owner may query their own schedule.
  public shared query ({ caller }) func getRepaymentSchedule(
    applicationId : LoanKycTypes.ApplicationId
  ) : async RepaymentTypes.RepaymentResult {
    Runtime.trap("not implemented");
  };
};
