import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  CreditCard,
  FileText,
  Hash,
  Hourglass,
  Info,
  Loader2,
  Pencil,
  Plus,
  Save,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { RepaymentTracker } from "../components/RepaymentTracker";
import { StatusBadge } from "../components/StatusBadge";
import {
  formatAmount,
  useApplications,
  useCibilRecord,
  useKycStatus,
  useMyDocuments,
  useProfile,
  useRecordPayment,
  useUpdateProfile,
} from "../hooks/useQueries";
import {
  ApplicationStatus,
  type DocumentRecord,
  type LoanApplication,
  PaymentStatus,
  VerificationStatus,
} from "../types";

const STATUS_STEPS = [
  { key: ApplicationStatus.draft, label: "Draft" },
  { key: ApplicationStatus.submitted, label: "Submitted" },
  { key: ApplicationStatus.kycPending, label: "KYC Review" },
  { key: ApplicationStatus.documentsPending, label: "Documents" },
  { key: ApplicationStatus.cibilPending, label: "CIBIL Check" },
  { key: ApplicationStatus.paymentPending, label: "Payment" },
  { key: ApplicationStatus.underReview, label: "Under Review" },
  { key: ApplicationStatus.approved, label: "Approved" },
  { key: ApplicationStatus.disbursed, label: "Disbursed" },
] as const;

function getStepIndex(status: ApplicationStatus): number {
  if (status === ApplicationStatus.rejected) return -1;
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

function getPurposeLabel(purpose: LoanApplication["purpose"]): string {
  const labels: Record<string, string> = {
    personal: "Personal",
    home: "Home",
    education: "Education",
    business: "Business",
    vehicle: "Vehicle",
    medical: "Medical",
    other: "Other",
  };
  return labels[purpose.__kind__] ?? purpose.__kind__;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Processing Fee Payment Card ─────────────────────────────────────────────
function ProcessingFeeCard({ app }: { app: LoanApplication }) {
  const recordPayment = useRecordPayment();
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const isPaymentPending = app.status === ApplicationStatus.paymentPending;

  // Already paid — show confirmation badge only
  if (isPaymentPending) {
    return (
      <div
        className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 flex items-center gap-4"
        data-ocid="fee-paid-banner"
      >
        <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-accent" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-accent">
            Processing Fee Paid ✓
          </div>
          <div className="text-xs text-muted-foreground">
            ₹999 received · Awaiting disbursement by our team
          </div>
        </div>
      </div>
    );
  }

  // Show paid success state
  if (paid) {
    return (
      <div
        className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 flex items-center gap-4"
        data-ocid="fee-payment-success"
      >
        <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-accent" />
        </div>
        <div>
          <div className="text-sm font-semibold text-accent">
            Payment Successful!
          </div>
          <div className="text-xs text-muted-foreground">
            ₹999 paid · Your loan will be disbursed shortly
          </div>
        </div>
      </div>
    );
  }

  async function handlePay() {
    if (
      !cardForm.number ||
      !cardForm.expiry ||
      !cardForm.cvv ||
      !cardForm.name
    ) {
      toast.error("Please fill in all card details");
      return;
    }
    setPaying(true);
    try {
      // Simulate Stripe processing delay
      await new Promise((res) => setTimeout(res, 1800));
      await recordPayment.mutateAsync({
        appId: app.id,
        payment: {
          paymentIntentId: `pi_${Date.now()}`,
          amount: 99900n,
          status: PaymentStatus.paid,
          currency: "INR",
          createdAt: BigInt(Date.now()) * 1_000_000n,
          paidAt: BigInt(Date.now()) * 1_000_000n,
        },
      });
      setPaid(true);
      toast.success("Payment successful! Your loan will be disbursed shortly.");
    } catch (err) {
      toast.error(
        `Payment failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setPaying(false);
    }
  }

  return (
    <div
      className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-accent/5 to-background shadow-elevated overflow-hidden"
      data-ocid="processing-fee-card"
    >
      {/* Header strip */}
      <div className="bg-accent/15 border-b border-accent/20 px-5 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-foreground">
            🎉 Your Loan is Approved!
          </div>
          <div className="text-xs text-muted-foreground">
            Pay the processing fee to receive your funds
          </div>
        </div>
        <Badge className="bg-accent text-accent-foreground text-xs flex-shrink-0">
          Action Required
        </Badge>
      </div>

      <div className="p-5 space-y-4">
        {/* Loan summary */}
        <div className="grid grid-cols-2 gap-3">
          {app.approvedAmount && (
            <div className="bg-card rounded-xl p-3 border border-border">
              <div className="text-xs text-muted-foreground mb-0.5">
                Approved Amount
              </div>
              <div className="text-base font-bold font-mono text-accent">
                {formatAmount(app.approvedAmount)}
              </div>
            </div>
          )}
          {app.interestRate && (
            <div className="bg-card rounded-xl p-3 border border-border">
              <div className="text-xs text-muted-foreground mb-0.5">
                Interest Rate
              </div>
              <div className="text-base font-bold font-mono text-foreground">
                {app.interestRate.toFixed(1)}% p.a.
              </div>
            </div>
          )}
        </div>

        {/* Fee due */}
        <div className="bg-accent/10 border border-accent/25 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">
              Processing Fee Due
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">
              ₹999
            </div>
            <div className="text-xs text-muted-foreground">
              One-time, non-refundable
            </div>
          </div>
          <Banknote className="w-8 h-8 text-accent/50" />
        </div>

        {/* Card form */}
        <div className="space-y-3 border border-border rounded-xl p-4 bg-card">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              Card Payment
            </span>
            <Badge variant="outline" className="text-xs ml-auto">
              Secured by Stripe
            </Badge>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fee-card-number" className="text-xs">
              Card Number
            </Label>
            <Input
              id="fee-card-number"
              placeholder="1234 5678 9012 3456"
              className="font-mono h-11"
              value={cardForm.number}
              onChange={(e) =>
                setCardForm((f) => ({ ...f, number: e.target.value }))
              }
              data-ocid="fee-card-number-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fee-card-expiry" className="text-xs">
                Expiry
              </Label>
              <Input
                id="fee-card-expiry"
                placeholder="MM / YY"
                className="font-mono h-11"
                value={cardForm.expiry}
                onChange={(e) =>
                  setCardForm((f) => ({ ...f, expiry: e.target.value }))
                }
                data-ocid="fee-card-expiry-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fee-card-cvv" className="text-xs">
                CVV
              </Label>
              <Input
                id="fee-card-cvv"
                placeholder="•••"
                type="password"
                className="font-mono h-11"
                value={cardForm.cvv}
                onChange={(e) =>
                  setCardForm((f) => ({ ...f, cvv: e.target.value }))
                }
                data-ocid="fee-card-cvv-input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fee-card-name" className="text-xs">
              Name on Card
            </Label>
            <Input
              id="fee-card-name"
              placeholder="Rajesh Kumar"
              className="h-11"
              value={cardForm.name}
              onChange={(e) =>
                setCardForm((f) => ({ ...f, name: e.target.value }))
              }
              data-ocid="fee-card-name-input"
            />
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-2.5">
            <Shield className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
            256-bit SSL encrypted. We never store your card details.
          </div>
        </div>

        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold gap-2 shadow-elevated"
          onClick={handlePay}
          disabled={paying}
          data-ocid="pay-processing-fee-btn"
        >
          {paying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" /> Pay ₹999 & Get Your Loan
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Document Status Badge (customer-facing) ────────────────────────────────
function DocVerificationBadge({ doc }: { doc: DocumentRecord }) {
  if (doc.status === VerificationStatus.verified) {
    return (
      <div
        className="flex items-start gap-2 p-2 rounded-lg bg-accent/8 border border-accent/25"
        data-ocid="doc-status-verified"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <div className="text-xs font-medium text-accent capitalize">
            {doc.docType.__kind__?.replace(/_/g, " ")}
          </div>
          <div className="text-[10px] text-accent/70">Verified</div>
        </div>
      </div>
    );
  }

  if (doc.status === VerificationStatus.rejected) {
    return (
      <div
        className="flex items-start gap-2 p-2 rounded-lg bg-destructive/5 border border-destructive/20"
        data-ocid="doc-status-rejected"
      >
        <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <div className="text-xs font-medium text-destructive capitalize">
            {doc.docType.__kind__?.replace(/_/g, " ")}
          </div>
          <div className="text-[10px] text-destructive/70">Rejected</div>
          {doc.rejectionReason && (
            <p className="text-[10px] text-destructive/80 mt-0.5 leading-relaxed">
              {doc.rejectionReason}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-2 p-2 rounded-lg bg-muted/40 border border-border"
      data-ocid="doc-status-pending"
    >
      <Hourglass className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-xs font-medium text-foreground capitalize">
          {doc.docType.__kind__?.replace(/_/g, " ")}
        </div>
        <div className="text-[10px] text-muted-foreground">Under review</div>
      </div>
    </div>
  );
}

// ─── Documents Panel (customer-facing) ─────────────────────────────────────
function ApplicationDocuments({ applicationId }: { applicationId: string }) {
  const { data: docs = [], isLoading } = useMyDocuments(applicationId);

  if (isLoading) {
    return (
      <div className="space-y-1.5 mt-3 pt-3 border-t border-border">
        <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
          <FileText className="w-3 h-3" /> Documents
        </div>
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
    );
  }

  if (docs.length === 0) return null;

  const hasRejected = docs.some(
    (d) => d.status === VerificationStatus.rejected,
  );

  return (
    <div
      className="mt-3 pt-3 border-t border-border"
      data-ocid="application-documents-section"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <FileText className="w-3 h-3" /> Documents
        </span>
        <div className="flex items-center gap-1.5">
          {hasRejected && (
            <Badge variant="destructive" className="text-[9px] h-4 px-1.5 py-0">
              Action required
            </Badge>
          )}
          <span className="text-[10px] text-muted-foreground">
            {docs.length} uploaded
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {docs.map((doc) => (
          <DocVerificationBadge key={doc.id} doc={doc} />
        ))}
      </div>
      {hasRejected && (
        <p className="text-[10px] text-destructive/80 mt-2 leading-relaxed">
          One or more documents were rejected. Please re-upload the highlighted
          documents.
        </p>
      )}
    </div>
  );
}

// ─── CIBIL Score Card ───────────────────────────────────────────────────────
function CibilScoreCard() {
  const { data: cibil, isLoading } = useCibilRecord();

  if (isLoading) return <Skeleton className="h-36 rounded-xl" />;

  if (!cibil) {
    return (
      <Card className="bg-card shadow-card" data-ocid="cibil-score-card">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">
              CIBIL Score
            </div>
            <div className="text-sm font-medium text-foreground">
              Not yet fetched
            </div>
            <div className="text-xs text-muted-foreground">
              Checked after application review
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const score = Number(cibil.score);
  const color =
    score >= 750
      ? "text-emerald-600"
      : score >= 650
        ? "text-amber-600"
        : "text-destructive";
  const bgColor =
    score >= 750 ? "bg-emerald-50" : score >= 650 ? "bg-amber-50" : "bg-red-50";
  const label = score >= 750 ? "Excellent" : score >= 650 ? "Fair" : "Poor";
  const Icon = score >= 750 ? BadgeCheck : score >= 650 ? Info : AlertCircle;

  return (
    <Card className="bg-card shadow-card" data-ocid="cibil-score-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            CIBIL Credit Score
          </div>
          <Badge variant="outline" className={`text-xs ${color}`}>
            {label}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center`}
          >
            <Icon className={`w-7 h-7 ${color}`} />
          </div>
          <div>
            <div className={`text-3xl font-bold font-mono ${color}`}>
              {score}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {cibil.isEligible ? "Eligible for loan" : "Not eligible"}
              {cibil.checkedAt ? ` · ${formatDate(cibil.checkedAt)}` : ""}
            </div>
          </div>
        </div>
        {cibil.reportSummary && (
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3">
            {cibil.reportSummary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Status Timeline ─────────────────────────────────────────────────────────
function StatusTimeline({ status }: { status: ApplicationStatus }) {
  const isRejected = status === ApplicationStatus.rejected;
  const currentIndex = getStepIndex(status);

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 text-destructive text-sm py-2">
        <XCircle className="w-4 h-4 flex-shrink-0" />
        <span>Application rejected</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 flex-wrap py-2"
      data-ocid="status-timeline"
    >
      {STATUS_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                done
                  ? "bg-accent/20 text-accent"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done && <CheckCircle2 className="w-3 h-3" />}
              {step.label}
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div
                className={`w-3 h-px ${done ? "bg-accent/60" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Application Card ─────────────────────────────────────────────────────────
function ApplicationCard({ app }: { app: LoanApplication }) {
  const [expanded, setExpanded] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  return (
    <Card
      className="bg-card shadow-card border border-border hover:shadow-elevated transition-smooth"
      data-ocid="application-card"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-semibold text-foreground font-mono">
                #{app.id.slice(-10).toUpperCase()}
              </span>
              <StatusBadge status={app.status} />
            </div>
            <div className="text-xs text-muted-foreground">
              {getPurposeLabel(app.purpose)} Loan · {formatDate(app.createdAt)}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-base font-bold text-foreground font-mono">
              {formatAmount(app.amountRequested)}
            </div>
            <div className="text-xs text-muted-foreground">
              {Number(app.tenureMonths)} months
            </div>
          </div>
        </div>

        {/* Approved amount highlight */}
        {app.approvedAmount && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-3 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-xs text-emerald-700 font-medium">
                Approved Amount:{" "}
              </span>
              <span className="text-sm font-bold text-emerald-700 font-mono">
                {formatAmount(app.approvedAmount)}
              </span>
              {app.interestRate && (
                <span className="text-xs text-emerald-600 ml-2">
                  @ {app.interestRate.toFixed(1)}% p.a.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Rejection reason */}
        {app.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3 flex items-start gap-2">
            <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive leading-relaxed">
              {app.rejectionReason}
            </p>
          </div>
        )}

        {/* Disbursement info */}
        {app.disbursement && (
          <div className="bg-muted/50 rounded-lg px-3 py-2 mb-3 text-xs text-muted-foreground grid grid-cols-2 gap-1">
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3" /> {app.disbursement.bankName}
            </div>
            <div className="flex items-center gap-1">
              <Hash className="w-3 h-3" /> {app.disbursement.referenceNumber}
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-3 h-3" />{" "}
              {formatAmount(app.disbursement.amount)}
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />{" "}
              {formatDate(app.disbursement.disbursedAt)}
            </div>
          </div>
        )}

        {/* Actions row */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setExpanded((v) => !v)}
            data-ocid="toggle-timeline-btn"
          >
            {expanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
            {expanded ? "Hide timeline" : "View progress timeline"}
          </button>

          <span className="text-border text-xs">·</span>

          <button
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowDocs((v) => !v)}
            data-ocid="toggle-docs-btn"
          >
            <FileText className="w-3 h-3" />
            {showDocs ? "Hide documents" : "View documents"}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border overflow-x-auto">
            <StatusTimeline status={app.status} />
          </div>
        )}

        {showDocs && <ApplicationDocuments applicationId={app.id} />}
      </CardContent>
    </Card>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function ProfileSection() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function startEdit() {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      });
    }
    setEditing(true);
  }

  async function saveProfile() {
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(
        `Failed to update: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  if (isLoading) return <Skeleton className="h-48 rounded-xl" />;

  return (
    <Card className="bg-card shadow-card" data-ocid="profile-section">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Profile Information
          </CardTitle>
          {!editing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={startEdit}
              data-ocid="edit-profile-btn"
            >
              <Pencil className="w-3 h-3 mr-1" /> Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {editing ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Full Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  data-ocid="profile-edit-name"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  data-ocid="profile-edit-phone"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                data-ocid="profile-edit-email"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                data-ocid="profile-edit-address"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={saveProfile}
                disabled={updateProfile.isPending}
                data-ocid="profile-save-btn"
              >
                <Save className="w-3 h-3 mr-1.5" />
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </>
        ) : profile ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Phone", value: profile.phone },
              { label: "Email", value: profile.email, span: true },
              { label: "Address", value: profile.address, span: true },
            ].map(({ label, value, span }) => (
              <div key={label} className={span ? "col-span-2" : ""}>
                <div className="text-xs text-muted-foreground mb-0.5">
                  {label}
                </div>
                <div className="text-foreground font-medium truncate">
                  {value || "—"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No profile yet. Complete your application to set up your profile.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: applications = [], isLoading: appsLoading } = useApplications();
  const { data: kyc } = useKycStatus();

  const totalApps = applications.length;
  const activeApps = applications.filter(
    (a) =>
      ![ApplicationStatus.rejected, ApplicationStatus.disbursed].includes(
        a.status,
      ),
  ).length;
  const approvedApps = applications.filter(
    (a) =>
      a.status === ApplicationStatus.approved ||
      a.status === ApplicationStatus.disbursed,
  ).length;

  // Find the most recent disbursed loan for the repayment tracker
  const disbursedLoan =
    applications.find((a) => a.status === ApplicationStatus.disbursed) ?? null;

  // Find approved loans that still need processing fee payment
  const pendingFeeApps = applications.filter(
    (a) => a.status === ApplicationStatus.approved && !a.processingFeePayment,
  );

  // Also include paymentPending (fee paid, awaiting disbursement)
  const feePaidApps = applications.filter(
    (a) => a.status === ApplicationStatus.paymentPending,
  );

  const kycLabel = kyc
    ? kyc.status === "verified"
      ? "Verified"
      : kyc.status === "pending"
        ? "Pending"
        : "Rejected"
    : "Not Started";

  const stats = [
    {
      label: "Total Applications",
      value: String(totalApps),
      icon: ClipboardList,
      ocid: "stat-total",
    },
    {
      label: "Active",
      value: String(activeApps),
      icon: Hourglass,
      ocid: "stat-active",
    },
    {
      label: "Approved",
      value: String(approvedApps),
      icon: BadgeCheck,
      ocid: "stat-approved",
    },
    { label: "KYC", value: kycLabel, icon: User, ocid: "stat-kyc" },
  ];

  const firstName = profile?.name?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="bg-background min-h-screen">
      {/* Welcome Banner */}
      <div
        className="bg-primary text-primary-foreground"
        data-ocid="welcome-banner"
      >
        <div className="container max-w-5xl mx-auto px-4 py-8">
          {profileLoading ? (
            <Skeleton className="h-8 w-48 bg-primary-foreground/20" />
          ) : (
            <>
              <div className="text-sm text-primary-foreground/70 mb-1">
                {greeting},
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
                {firstName} 👋
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Manage your loan applications and track your credit journey.
              </p>
            </>
          )}
          <div className="mt-5">
            <Link to="/apply">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elevated"
                data-ocid="dashboard-new-application-btn"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, ocid }) => (
            <Card key={label} className="bg-card shadow-card" data-ocid={ocid}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground truncate">
                    {label}
                  </div>
                  <div className="text-base font-bold text-foreground font-mono">
                    {value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Processing Fee Prompts (approved loans, fee not paid yet) ────── */}
        {(pendingFeeApps.length > 0 || feePaidApps.length > 0) && (
          <div className="mb-8 space-y-4" data-ocid="payment-prompts-section">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-accent" />
              <span>Action Required — Processing Fee</span>
            </h2>
            {pendingFeeApps.map((app) => (
              <ProcessingFeeCard key={app.id} app={app} />
            ))}
            {feePaidApps.map((app) => (
              <ProcessingFeeCard key={app.id} app={app} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List + Repayment Tracker */}
          <div className="lg:col-span-2 space-y-8">
            {/* Applications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> My Applications
                </h2>
                {applications.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {applications.length} total
                  </span>
                )}
              </div>

              {appsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                  ))}
                </div>
              ) : applications.length === 0 ? (
                <Card className="bg-card shadow-card">
                  <CardContent className="p-0">
                    <EmptyState
                      icon={<FileText className="w-6 h-6" />}
                      title="No applications yet"
                      description="Start your loan journey. Apply now and get a decision within 48 hours."
                      action={{
                        label: "Apply for a Loan",
                        onClick: () => window.location.assign("/apply"),
                      }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3" data-ocid="applications-list">
                  {applications.map((app) => (
                    <ApplicationCard key={app.id} app={app} />
                  ))}
                </div>
              )}
            </div>

            {/* Repayment Tracker — only when a disbursed loan exists */}
            {disbursedLoan && (
              <div className="border-t border-border pt-6">
                <RepaymentTracker applicationId={disbursedLoan.id} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Credit Score
              </h2>
              <CibilScoreCard />
            </div>

            <Separator />

            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Account
              </h2>
              <ProfileSection />
            </div>

            {/* Quick Actions */}
            <Card className="bg-muted/40 shadow-card">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Quick Actions
                </div>
                <Link to="/apply">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    data-ocid="quick-apply-btn"
                  >
                    <Plus className="w-3.5 h-3.5 mr-2" /> Apply for a Loan
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  data-ocid="quick-docs-btn"
                  onClick={() => toast.info("Documents section coming soon")}
                >
                  <FileText className="w-3.5 h-3.5 mr-2" /> Upload Documents
                </Button>
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    data-ocid="quick-support-btn"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2" /> Learn About Our
                    Loans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
