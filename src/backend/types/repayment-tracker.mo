import Common "common";

module {
  public type ApplicationId = Common.ApplicationId;
  public type Timestamp = Common.Timestamp;

  // ── Repayment Schedule ────────────────────────────────────────────────────

  /// A single installment entry in the repayment schedule.
  public type RepaymentEntry = {
    paymentNumber : Nat;       // 1-indexed month number
    dueDate : Timestamp;       // nanoseconds since epoch
    principalComponent : Float;
    interestComponent : Float;
    emiAmount : Float;
    remainingBalance : Float;
  };

  /// Full repayment schedule for a disbursed loan.
  public type RepaymentSchedule = {
    applicationId : ApplicationId;
    totalLoanAmount : Nat;      // approved / disbursed principal (in smallest currency unit)
    monthlyEmi : Float;
    annualInterestRate : Float; // e.g. 12.5 for 12.5%
    tenureMonths : Nat;
    startDate : Timestamp;      // disbursement date
    entries : [RepaymentEntry];
  };

  /// Result type for repayment schedule queries.
  public type RepaymentResult = {
    #ok : RepaymentSchedule;
    #notFound;                  // application does not exist or caller is not the owner
    #notDisbursed;              // application exists but is not in #disbursed status
    #missingData : Text;        // approved amount, interest rate, or tenure is absent
  };
};
