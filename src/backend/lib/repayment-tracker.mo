import LoanKycTypes "../types/loan-kyc";
import RepaymentTypes "../types/repayment-tracker";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

module {
  /// Compute and return a full amortisation schedule for a disbursed loan application.
  ///
  /// EMI formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  /// where P = principal, r = monthly rate (annualRate / 12 / 100), n = tenure months.
  ///
  /// Returns:
  ///   #ok(schedule)           – successfully computed schedule
  ///   #notFound               – application missing or caller is not the owner
  ///   #notDisbursed           – application exists but not in #disbursed status
  ///   #missingData(reason)    – approved amount / interest rate / disbursement date absent
  public func getRepaymentSchedule(
    applications : Map.Map<LoanKycTypes.ApplicationId, LoanKycTypes.LoanApplication>,
    appId : LoanKycTypes.ApplicationId,
    caller : LoanKycTypes.UserId,
  ) : RepaymentTypes.RepaymentResult {
    Runtime.trap("not implemented");
  };
};
