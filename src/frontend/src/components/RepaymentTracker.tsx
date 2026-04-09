import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useRepaymentSchedule } from "../hooks/useQueries";
import type { ApplicationId, RepaymentEntry } from "../types";

// ─── Currency Helpers ─────────────────────────────────────────────────────────
function formatINR(amount: number): string {
  if (amount >= 10_000_000) {
    return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `₹${(amount / 100_000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatINRPrecise(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Summary Stat ─────────────────────────────────────────────────────────────
function SummaryStat({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`space-y-0.5 ${highlight ? "col-span-2 sm:col-span-1" : ""}`}
    >
      <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
        {label}
      </div>
      <div
        className={`font-mono font-bold ${highlight ? "text-2xl text-accent" : "text-base text-foreground"}`}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

// ─── Amortization Row ─────────────────────────────────────────────────────────
function AmortizationRow({
  entry,
  isPaid,
}: {
  entry: RepaymentEntry;
  isPaid: boolean;
}) {
  return (
    <tr
      className={`border-b border-border transition-colors ${
        isPaid ? "bg-emerald-50/50 text-muted-foreground" : "hover:bg-muted/30"
      }`}
    >
      <td className="px-3 py-2.5 text-center">
        <span className="flex items-center justify-center gap-1">
          {isPaid ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          ) : (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-border inline-block flex-shrink-0" />
          )}
          <span className="font-mono text-xs font-semibold">
            {entry.paymentNumber}
          </span>
        </span>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
        {formatDate(entry.dueDate)}
      </td>
      <td className="px-3 py-2.5 text-right font-mono text-xs font-semibold text-foreground">
        {formatINRPrecise(entry.emiAmount)}
      </td>
      <td className="px-3 py-2.5 text-right font-mono text-xs text-primary">
        {formatINRPrecise(entry.principalComponent)}
      </td>
      <td className="px-3 py-2.5 text-right font-mono text-xs text-muted-foreground">
        {formatINRPrecise(entry.interestComponent)}
      </td>
      <td className="px-3 py-2.5 text-right font-mono text-xs font-medium text-foreground">
        {formatINRPrecise(entry.remainingBalance)}
      </td>
    </tr>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function PaymentProgress({
  paid,
  total,
}: {
  paid: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((paid / total) * 100) : 0;
  return (
    <div className="space-y-2" data-ocid="repayment-progress">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">
          <span className="text-foreground font-bold font-mono">{paid}</span> of{" "}
          <span className="font-mono">{total}</span> payments completed
        </span>
        <Badge
          variant="outline"
          className="font-mono text-[10px] border-accent/40 text-accent"
        >
          {pct}%
        </Badge>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, oklch(0.45 0.08 267), oklch(0.65 0.12 215))",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function RepaymentTracker({
  applicationId,
}: {
  applicationId: ApplicationId;
}) {
  const {
    data: schedule,
    isLoading,
    error,
  } = useRepaymentSchedule(applicationId);

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="repayment-tracker-loading">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!schedule || error) {
    return null; // Not disbursed or data unavailable — silently hide
  }

  const totalPayments = Number(schedule.tenureMonths);
  const now = BigInt(Date.now()) * 1_000_000n;
  const paidCount = schedule.entries.filter((e) => e.dueDate < now).length;

  const totalInterest = schedule.entries.reduce(
    (sum, e) => sum + e.interestComponent,
    0,
  );
  const totalAmount = Number(schedule.totalLoanAmount) + totalInterest;

  return (
    <div className="space-y-5" data-ocid="repayment-tracker">
      {/* Section Heading */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground font-display tracking-tight">
            Repayment Tracker
          </h2>
          <p className="text-xs text-muted-foreground">
            Loan amortization schedule &amp; payment progress
          </p>
        </div>
        <Badge
          className="ml-auto bg-accent/15 text-accent border-accent/30 hover:bg-accent/20"
          variant="outline"
          data-ocid="repayment-status-badge"
        >
          Active
        </Badge>
      </div>

      {/* Summary Card */}
      <Card
        className="bg-card shadow-card border border-border"
        data-ocid="repayment-summary-card"
      >
        <CardContent className="p-5 space-y-5">
          {/* EMI highlight */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
              <CircleDollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                Monthly EMI
              </div>
              <div className="text-3xl font-bold font-mono text-accent">
                {formatINR(schedule.monthlyEmi)}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                per month for {totalPayments} months
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
            <SummaryStat
              label="Loan Amount"
              value={formatINR(Number(schedule.totalLoanAmount))}
            />
            <SummaryStat
              label="Interest Rate"
              value={`${schedule.annualInterestRate.toFixed(1)}%`}
              sub="per annum"
            />
            <SummaryStat
              label="Tenure"
              value={`${totalPayments} months`}
              sub={`${Math.round((totalPayments / 12) * 10) / 10} years`}
            />
            <SummaryStat
              label="Total Interest"
              value={formatINR(totalInterest)}
            />
            <SummaryStat label="Total Payable" value={formatINR(totalAmount)} />
            <SummaryStat
              label="Disbursed On"
              value={formatDate(schedule.startDate)}
            />
          </div>

          {/* Progress */}
          <div className="pt-1">
            <PaymentProgress paid={paidCount} total={totalPayments} />
          </div>
        </CardContent>
      </Card>

      {/* Amortization Table */}
      <Card
        className="bg-card shadow-card border border-border"
        data-ocid="amortization-table-card"
      >
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <CalendarDays className="w-4 h-4 text-primary" />
              Amortization Schedule
            </CardTitle>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-primary" /> Upcoming
              </span>
              <span className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-accent" /> Balance ↓
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]" data-ocid="amortization-scroll">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
                  <tr className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <th className="px-3 py-2.5 text-center w-16">#</th>
                    <th className="px-3 py-2.5 text-left">Due Date</th>
                    <th className="px-3 py-2.5 text-right">EMI</th>
                    <th className="px-3 py-2.5 text-right">Principal</th>
                    <th className="px-3 py-2.5 text-right">Interest</th>
                    <th className="px-3 py-2.5 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.entries.map((entry) => (
                    <AmortizationRow
                      key={entry.paymentNumber}
                      entry={entry}
                      isPaid={entry.dueDate < now}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
          <div className="border-t border-border px-5 py-3 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <span>
              {totalPayments} total installments ·{" "}
              <span className="font-mono font-medium text-foreground">
                {formatINRPrecise(schedule.monthlyEmi)}
              </span>{" "}
              each
            </span>
            <span className="font-mono font-semibold text-foreground">
              Total: {formatINR(totalAmount)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
