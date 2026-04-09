import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Hash,
  Info,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  TrendingDown,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import {
  formatAmount,
  useAdminApplicationDetails,
  useAdminApproveApplication,
  useAdminRecordDisbursement,
  useAdminRejectApplication,
  useAdminReviewDocument,
  useAdminReviewKyc,
} from "../hooks/useQueries";
import type { DocumentRecord } from "../types";
import { ApplicationStatus, VerificationStatus } from "../types";

// ── CIBIL Score Gauge ─────────────────────────────────────────────────────────
function CibilScoreGauge({ score }: { score: number }) {
  const percent = Math.min(100, Math.max(0, ((score - 300) / 600) * 100));
  const isGood = score >= 750;
  const isFair = score >= 650 && score < 750;
  const color = isGood
    ? "text-accent"
    : isFair
      ? "text-amber-500"
      : "text-destructive";
  const trackColor = isGood
    ? "from-accent/20 via-accent/60 to-accent"
    : isFair
      ? "from-amber-200 via-amber-400 to-amber-500"
      : "from-destructive/20 via-destructive/60 to-destructive";
  const label = isGood ? "Excellent" : isFair ? "Fair" : "Poor";

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <div className="relative w-28 h-14 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-4 border-muted" />
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-t-full border-4 bg-gradient-to-r ${trackColor} transition-all duration-700`}
          style={{
            clipPath: `polygon(0 100%, ${percent}% 100%, ${percent}% 0%, 0 0%)`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-1">
          <span className={`text-2xl font-bold font-mono ${color}`}>
            {score}
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className={`text-xs font-semibold ${color}`}>{label}</div>
        <div className="text-[10px] text-muted-foreground">out of 900</div>
      </div>
    </div>
  );
}

// ── Timeline ─────────────────────────────────────────────────────────────────
const STATUS_FLOW = [
  ApplicationStatus.submitted,
  ApplicationStatus.underReview,
  ApplicationStatus.approved,
  ApplicationStatus.disbursed,
];

const STATUS_LABELS: Record<string, string> = {
  [ApplicationStatus.submitted]: "Submitted",
  [ApplicationStatus.underReview]: "Under Review",
  [ApplicationStatus.approved]: "Approved",
  [ApplicationStatus.disbursed]: "Disbursed",
};

function ApplicationTimeline({
  currentStatus,
}: { currentStatus: ApplicationStatus }) {
  const isRejected = currentStatus === ApplicationStatus.rejected;
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);

  return (
    <>
      {/* Horizontal layout — md+ */}
      <div
        className="hidden md:flex items-center gap-0"
        data-ocid="timeline-horizontal"
      >
        {STATUS_FLOW.map((status, idx) => {
          const isPast = !isRejected && idx <= currentIdx;
          const isCurrent = !isRejected && idx === currentIdx;
          return (
            <div
              key={status}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : isPast
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isPast && !isCurrent ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${isCurrent ? "bg-primary-foreground" : "bg-muted-foreground/40"}`}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap ${isCurrent ? "text-primary" : isPast ? "text-accent" : "text-muted-foreground"}`}
                >
                  {STATUS_LABELS[status]}
                </span>
              </div>
              {idx < STATUS_FLOW.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mb-4 rounded-full transition-colors ${isPast && !isCurrent ? "bg-accent" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
        {isRejected && (
          <div className="ml-3 flex items-center gap-1.5 text-destructive">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-semibold">Rejected</span>
          </div>
        )}
      </div>

      {/* Vertical layout — sm */}
      <div
        className="flex md:hidden flex-col gap-2"
        data-ocid="timeline-vertical"
      >
        {STATUS_FLOW.map((status, idx) => {
          const isPast = !isRejected && idx <= currentIdx;
          const isCurrent = !isRejected && idx === currentIdx;
          return (
            <div key={status} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : isPast
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-muted text-muted-foreground"
                }`}
              >
                {isPast && !isCurrent ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full ${isCurrent ? "bg-primary-foreground" : "bg-muted-foreground/40"}`}
                  />
                )}
              </div>
              <span
                className={`text-sm font-medium ${isCurrent ? "text-primary" : isPast ? "text-accent" : "text-muted-foreground"}`}
              >
                {STATUS_LABELS[status]}
              </span>
            </div>
          );
        })}
        {isRejected && (
          <div className="flex items-center gap-3 text-destructive">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">Rejected</span>
          </div>
        )}
      </div>
    </>
  );
}

// ── Document Review Row ───────────────────────────────────────────────────────
function DocumentReviewRow({
  doc,
  onReview,
  isPending,
}: {
  doc: DocumentRecord;
  onReview: (docId: string, approved: boolean, notes: string) => void;
  isPending: boolean;
}) {
  const [notes, setNotes] = useState(doc.rejectionReason ?? "");
  const [showNotes, setShowNotes] = useState(false);

  const isVerified = doc.status === VerificationStatus.verified;
  const isRejected = doc.status === VerificationStatus.rejected;
  const isPendingStatus = doc.status === VerificationStatus.pending;

  return (
    <div
      className={`rounded-lg border transition-colors ${
        isVerified
          ? "bg-accent/5 border-accent/30"
          : isRejected
            ? "bg-destructive/5 border-destructive/20"
            : "bg-muted/30 border-border hover:bg-muted/50"
      }`}
      data-ocid="admin-document-row"
    >
      {/* Document header row — stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 gap-3">
        {/* Doc info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isVerified
                ? "bg-accent/15"
                : isRejected
                  ? "bg-destructive/10"
                  : "bg-primary/10"
            }`}
          >
            <FileText
              className={`w-4 h-4 ${isVerified ? "text-accent" : isRejected ? "text-destructive" : "text-primary"}`}
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold capitalize text-foreground">
              {doc.docType.__kind__?.replace(/_/g, " ")}
            </div>
            <div className="text-xs text-muted-foreground font-mono truncate max-w-[220px]">
              {doc.fileReference}
            </div>
          </div>
        </div>

        {/* Actions row — full width on mobile */}
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <StatusBadge status={doc.status} />

          {/* Notes toggle */}
          <Button
            size="sm"
            variant="ghost"
            className={`h-11 w-11 p-0 ${showNotes ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
            onClick={() => setShowNotes((v) => !v)}
            aria-label="Toggle admin notes"
            data-ocid="doc-notes-toggle"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>

          {isPendingStatus && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-11 w-11 p-0 border-accent/50 text-accent hover:bg-accent/10"
                onClick={() => onReview(doc.id, true, notes)}
                disabled={isPending}
                data-ocid="doc-approve-btn"
                aria-label="Approve document"
              >
                <CheckCircle2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-11 w-11 p-0 border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => onReview(doc.id, false, notes)}
                disabled={isPending}
                data-ocid="doc-reject-btn"
                aria-label="Reject document"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Re-review already reviewed docs */}
          {!isPendingStatus && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-11 px-2 text-xs text-muted-foreground hover:text-accent hover:bg-accent/10"
                onClick={() => onReview(doc.id, true, notes)}
                disabled={isPending || isVerified}
                data-ocid="doc-re-approve-btn"
              >
                <CheckCircle2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-11 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onReview(doc.id, false, notes)}
                disabled={isPending || isRejected}
                data-ocid="doc-re-reject-btn"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Notes Panel — full width below doc info */}
      {showNotes && (
        <div className="px-3 pb-3 border-t border-border/60 pt-2.5 space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
            <MessageSquare className="w-3 h-3" />
            Admin Notes
            <span className="text-[10px] text-muted-foreground/60">
              (visible to admin only; shown to customer only if rejected)
            </span>
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              isPendingStatus
                ? "Add notes before approving or rejecting..."
                : "Update notes and re-review to save..."
            }
            className="text-xs min-h-[64px] resize-none w-full"
            data-ocid="doc-admin-notes-input"
          />
          {(isVerified || isRejected) && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-11 text-xs gap-1 border-accent/50 text-accent hover:bg-accent/10 w-full sm:w-auto"
                onClick={() => onReview(doc.id, true, notes)}
                disabled={isPending}
                data-ocid="doc-save-approve-btn"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Save & Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-11 text-xs gap-1 border-destructive/50 text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                onClick={() => onReview(doc.id, false, notes)}
                disabled={isPending}
                data-ocid="doc-save-reject-btn"
              >
                <XCircle className="w-3.5 h-3.5" /> Save & Reject
              </Button>
            </div>
          )}
          {isRejected && doc.rejectionReason && (
            <p className="text-[10px] text-destructive/70 italic">
              Last saved notes: "{doc.rejectionReason}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminApplicationDetail() {
  const params = useParams({ strict: false });
  const id = params.id as string | undefined;
  const { data: details, isLoading } = useAdminApplicationDetails(id ?? null);

  const approve = useAdminApproveApplication();
  const reject = useAdminRejectApplication();
  const disburse = useAdminRecordDisbursement();
  const reviewKyc = useAdminReviewKyc();
  const reviewDoc = useAdminReviewDocument();

  const [approveForm, setApproveForm] = useState({
    approvedAmount: "",
    interestRate: "9.5",
    adminNotes: "",
  });
  const [rejectReason, setRejectReason] = useState("");
  const [disbursementForm, setDisbursementForm] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    referenceNumber: "",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" message="Loading application details..." />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 px-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground/40" />
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            Application Not Found
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            This application may have been removed or doesn't exist.
          </div>
        </div>
        <Link to="/admin">
          <Button variant="outline" className="gap-2 h-11">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const { application, customer, kyc, documents, cibil } = details;
  const isApproved =
    application.status === ApplicationStatus.approved ||
    application.status === ApplicationStatus.paymentPending ||
    application.status === ApplicationStatus.disbursed;
  const isDisbursed = application.status === ApplicationStatus.disbursed;
  const isRejected = application.status === ApplicationStatus.rejected;
  const processingFeePaid = !!application.processingFeePayment;
  const canDisburse =
    isApproved &&
    !isDisbursed &&
    (application.status === ApplicationStatus.paymentPending ||
      processingFeePaid);

  const handleApprove = async () => {
    if (!approveForm.approvedAmount) {
      toast.error("Enter approved amount");
      return;
    }
    try {
      await approve.mutateAsync({
        appId: application.id,
        input: {
          approvedAmount: BigInt(Number(approveForm.approvedAmount)),
          interestRate: Number(approveForm.interestRate),
          adminNotes: approveForm.adminNotes || undefined,
        },
      });
      toast.success("Application approved successfully!");
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Enter rejection reason");
      return;
    }
    try {
      await reject.mutateAsync({
        appId: application.id,
        input: { rejectionReason: rejectReason },
      });
      toast.success("Application rejected");
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const handleDisburse = async () => {
    if (!disbursementForm.bankName || !disbursementForm.accountNumber) {
      toast.error("Fill all disbursement details");
      return;
    }
    try {
      await disburse.mutateAsync({
        appId: application.id,
        input: disbursementForm,
      });
      toast.success("Disbursement recorded successfully!");
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const handleKycReview = async (approved: boolean) => {
    if (!customer) return;
    try {
      await reviewKyc.mutateAsync({
        customerId: customer.id,
        approved,
        reason: null,
      });
      toast.success(approved ? "KYC approved" : "KYC rejected");
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const handleDocReview = async (
    docId: string,
    approved: boolean,
    notes: string,
  ) => {
    try {
      await reviewDoc.mutateAsync({
        docId,
        approved,
        reason: notes.trim() || null,
      });
      toast.success(
        approved
          ? "Document approved"
          : `Document rejected${notes.trim() ? " with notes" : ""}`,
      );
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  return (
    <div data-ocid="admin-application-detail" className="overflow-x-hidden">
      {/* Mobile back button — prominently visible */}
      <div className="flex items-center gap-2 px-1 pt-2 pb-1 sm:hidden">
        <Link to="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="h-11 gap-2 text-sm font-medium"
            data-ocid="back-to-applications-mobile"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </Button>
        </Link>
      </div>

      <PageHeader
        title={`Application #${application.id.slice(-10)}`}
        description={customer ? `Submitted by ${customer.name}` : ""}
        breadcrumbs={[
          { label: "All Applications", href: "/admin" },
          { label: `#${application.id.slice(-10)}` },
        ]}
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={application.status} />
            <Link to="/admin" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-1.5 h-11">
                <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
              </Button>
            </Link>
          </div>
        }
      />

      {/* Application Timeline */}
      <Card className="bg-card shadow-card mb-5">
        <CardContent className="p-5 pt-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Application Progress
          </div>
          <ApplicationTimeline currentStatus={application.status} />
        </CardContent>
      </Card>

      {/* Main layout — single column on sm, 3-col on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── MAIN COLUMN ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Loan Request Summary */}
          <Card className="bg-card shadow-card">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Loan Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Amount Requested
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {formatAmount(application.amountRequested)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Tenure
                  </div>
                  <div className="font-semibold text-foreground">
                    {Number(application.tenureMonths)} months
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">
                    Purpose
                  </div>
                  <div className="font-semibold text-foreground capitalize">
                    {application.purpose.__kind__}
                  </div>
                </div>
                {application.approvedAmount && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Approved Amount
                    </div>
                    <div className="text-lg font-bold font-mono text-accent">
                      {formatAmount(application.approvedAmount)}
                    </div>
                  </div>
                )}
                {application.interestRate && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Interest Rate
                    </div>
                    <div className="font-semibold text-foreground">
                      {application.interestRate}% p.a.
                    </div>
                  </div>
                )}
                {application.adminNotes && (
                  <div className="col-span-full">
                    <div className="text-xs text-muted-foreground mb-1">
                      Admin Notes
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3 text-sm text-foreground border border-border">
                      {application.adminNotes}
                    </div>
                  </div>
                )}
                {isRejected && application.rejectionReason && (
                  <div className="col-span-full">
                    <div className="text-xs text-muted-foreground mb-1">
                      Rejection Reason
                    </div>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
                      {application.rejectionReason}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          {customer && (
            <Card className="bg-card shadow-card">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <User className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        Full Name
                      </div>
                      <div className="font-semibold break-words">
                        {customer.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="font-semibold">{customer.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="font-semibold break-all">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        Address
                      </div>
                      <div className="font-semibold break-words">
                        {customer.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Hash className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        Principal ID
                      </div>
                      <div className="font-mono text-xs text-muted-foreground break-all">
                        {customer.id.toString().slice(0, 30)}…
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        Member Since
                      </div>
                      <div className="font-semibold">
                        {new Date(
                          Number(customer.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* KYC Details */}
          {kyc && (
            <Card className="bg-card shadow-card">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2 justify-between flex-wrap gap-y-2">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" /> KYC Verification
                  </span>
                  <StatusBadge status={kyc.status} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Identity Type
                    </div>
                    <div className="font-semibold capitalize">
                      {kyc.identityType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Identity Number
                    </div>
                    <div className="font-semibold font-mono break-all">
                      {kyc.identityNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Submitted
                    </div>
                    <div className="font-semibold">
                      {new Date(
                        Number(kyc.submittedAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                </div>
                {kyc.status === VerificationStatus.pending && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
                    <Button
                      className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 w-full sm:w-auto"
                      onClick={() => handleKycReview(true)}
                      disabled={reviewKyc.isPending}
                      data-ocid="kyc-approve-btn"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve KYC
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-11 gap-1.5 w-full sm:w-auto"
                      onClick={() => handleKycReview(false)}
                      disabled={reviewKyc.isPending}
                      data-ocid="kyc-reject-btn"
                    >
                      <XCircle className="w-4 h-4" /> Reject KYC
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Documents — enhanced with per-document notes */}
          {documents.length > 0 && (
            <Card className="bg-card shadow-card">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Documents
                  <Badge variant="secondary" className="ml-auto">
                    {documents.length}
                  </Badge>
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Tap the{" "}
                  <MessageSquare className="w-3 h-3 inline-block mx-0.5 align-middle" />{" "}
                  icon on any document to add admin notes before approving or
                  rejecting.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2" data-ocid="admin-documents-list">
                  {documents.map((doc) => (
                    <DocumentReviewRow
                      key={doc.id}
                      doc={doc}
                      onReview={handleDocReview}
                      isPending={reviewDoc.isPending}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CIBIL Credit Report */}
          {cibil && (
            <Card className="bg-card shadow-card">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" /> CIBIL Credit
                  Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mobile: stacked — score centered, then details below */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <CibilScoreGauge score={Number(cibil.score)} />
                    <div
                      className={`flex items-center gap-1.5 mt-1 text-xs font-semibold ${cibil.isEligible ? "text-accent" : "text-destructive"}`}
                    >
                      {cibil.isEligible ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5" /> Eligible for
                          Loan
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3.5 h-3.5" /> Not Eligible
                        </>
                      )}
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-auto hidden sm:block self-stretch"
                  />
                  <div className="flex-1 space-y-3 w-full">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Score
                        </div>
                        <div className="text-2xl font-bold font-mono">
                          {Number(cibil.score)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Eligibility
                        </div>
                        <Badge
                          variant={cibil.isEligible ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {cibil.isEligible ? "Eligible" : "Ineligible"}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Request ID
                        </div>
                        <div className="font-mono text-xs text-muted-foreground break-all">
                          {cibil.requestId}
                        </div>
                      </div>
                    </div>
                    {cibil.reportSummary && (
                      <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground border border-border">
                        {cibil.reportSummary}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Status */}
          {application.processingFeePayment && (
            <Card className="bg-card shadow-card">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-primary" /> Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Processing Fee
                    </div>
                    <StatusBadge
                      status={application.processingFeePayment.status}
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Stripe Payment ID
                    </div>
                    <div className="font-mono text-xs text-foreground break-all">
                      {application.processingFeePayment.paymentIntentId}
                    </div>
                  </div>
                  {application.processingFeePayment.amount && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">
                        Amount Paid
                      </div>
                      <div className="font-semibold">
                        {formatAmount(application.processingFeePayment.amount)}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── RIGHT COLUMN — Decision Panel ─────────────────────────── */}
        <div className="space-y-4">
          {/* Status summary */}
          <Card className="bg-card shadow-card">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-3">
                Current Status
              </div>
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={application.status} />
              </div>
              <div className="text-xs text-muted-foreground">
                Submitted{" "}
                {new Date(
                  Number(application.createdAt) / 1_000_000,
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {application.updatedAt && (
                <div className="text-xs text-muted-foreground">
                  Updated{" "}
                  {new Date(
                    Number(application.updatedAt) / 1_000_000,
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Summary (quick overview) */}
          {documents.length > 0 && (
            <Card className="bg-card shadow-card">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-3">
                  Document Status
                </div>
                <div className="space-y-1.5">
                  {[
                    {
                      label: "Verified",
                      count: documents.filter(
                        (d) => d.status === VerificationStatus.verified,
                      ).length,
                      color: "text-accent",
                    },
                    {
                      label: "Pending",
                      count: documents.filter(
                        (d) => d.status === VerificationStatus.pending,
                      ).length,
                      color: "text-amber-600",
                    },
                    {
                      label: "Rejected",
                      count: documents.filter(
                        (d) => d.status === VerificationStatus.rejected,
                      ).length,
                      color: "text-destructive",
                    },
                  ].map(({ label, count, color }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className={`font-bold font-mono ${color}`}>
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Approve Panel */}
          {!isApproved && !isRejected && (
            <Card className="bg-card shadow-card border-l-4 border-l-accent">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-4 h-4" /> Approve Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="approved-amount" className="text-xs">
                    Approved Amount (₹) *
                  </Label>
                  <Input
                    id="approved-amount"
                    type="number"
                    value={approveForm.approvedAmount}
                    onChange={(e) =>
                      setApproveForm((f) => ({
                        ...f,
                        approvedAmount: e.target.value,
                      }))
                    }
                    placeholder={
                      application.amountRequested
                        ? String(Number(application.amountRequested))
                        : "500000"
                    }
                    className="font-mono text-sm h-11 w-full"
                    data-ocid="approve-amount-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="interest-rate" className="text-xs">
                    Interest Rate (% p.a.) *
                  </Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    value={approveForm.interestRate}
                    onChange={(e) =>
                      setApproveForm((f) => ({
                        ...f,
                        interestRate: e.target.value,
                      }))
                    }
                    className="font-mono text-sm h-11 w-full"
                    data-ocid="approve-rate-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="admin-notes" className="text-xs">
                    Admin Notes
                  </Label>
                  <Textarea
                    id="admin-notes"
                    value={approveForm.adminNotes}
                    onChange={(e) =>
                      setApproveForm((f) => ({
                        ...f,
                        adminNotes: e.target.value,
                      }))
                    }
                    placeholder="Optional notes for the customer..."
                    className="text-sm min-h-[72px] resize-none w-full"
                    data-ocid="approve-notes-input"
                  />
                </div>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-11"
                  onClick={handleApprove}
                  disabled={approve.isPending}
                  data-ocid="approve-submit-btn"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {approve.isPending ? "Approving..." : "Approve Loan"}
                </Button>
              </CardContent>
            </Card>
          )}

          {isApproved && (
            <Card className="bg-card shadow-card border-l-4 border-l-accent">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-accent">
                    Approved
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Amount:{" "}
                    {application.approvedAmount
                      ? formatAmount(application.approvedAmount)
                      : "—"}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reject Panel */}
          {!isApproved && !isRejected && (
            <Card className="bg-card shadow-card border-l-4 border-l-destructive">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                  <XCircle className="w-4 h-4" /> Reject Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="reject-reason" className="text-xs">
                    Reason *
                  </Label>
                  <Textarea
                    id="reject-reason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Explain why this application is being rejected..."
                    className="text-sm min-h-[80px] resize-none w-full"
                    data-ocid="reject-reason-input"
                  />
                </div>
                <Button
                  variant="destructive"
                  className="w-full gap-1.5 h-11"
                  onClick={handleReject}
                  disabled={reject.isPending}
                  data-ocid="reject-submit-btn"
                >
                  <XCircle className="w-4 h-4" />
                  {reject.isPending ? "Rejecting..." : "Reject Application"}
                </Button>
              </CardContent>
            </Card>
          )}

          {isRejected && (
            <Card className="bg-card shadow-card border-l-4 border-l-destructive">
              <CardContent className="p-4 flex items-center gap-3">
                <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-destructive">
                    Rejected
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 break-words">
                    {application.rejectionReason ?? "No reason provided"}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Disbursement Panel */}
          <Card
            className={`bg-card shadow-card border-l-4 border-l-primary ${!isApproved && "opacity-60 pointer-events-none"}`}
          >
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" /> Record
                Disbursement
              </CardTitle>
              {!isApproved && (
                <div className="text-xs text-muted-foreground">
                  Available after approval
                </div>
              )}
              {/* Processing fee status note */}
              {isApproved && !isDisbursed && (
                <div
                  className={`flex items-center gap-1.5 text-xs mt-1 ${processingFeePaid ? "text-accent" : "text-amber-600"}`}
                  data-ocid="processing-fee-status"
                >
                  {processingFeePaid ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Processing fee: Paid ✓
                    </>
                  ) : (
                    <>
                      <Info className="w-3.5 h-3.5" />
                      Processing fee: Not yet paid — waiting for customer
                    </>
                  )}
                </div>
              )}
            </CardHeader>
            {isApproved && (
              <CardContent className="space-y-3">
                {isDisbursed ? (
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <Banknote className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-accent">
                        Funds Disbursed
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Disbursement has been recorded
                      </div>
                    </div>
                  </div>
                ) : !canDisburse ? (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-amber-700">
                        Awaiting Processing Fee
                      </div>
                      <div className="text-xs text-amber-600">
                        The customer must pay the ₹999 processing fee before
                        disbursement can proceed.
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {(
                      [
                        "bankName",
                        "accountNumber",
                        "ifscCode",
                        "referenceNumber",
                      ] as const
                    ).map((field) => (
                      <div key={field} className="space-y-1.5">
                        <Label
                          htmlFor={`disburse-${field}`}
                          className="text-xs capitalize"
                        >
                          {field === "bankName"
                            ? "Bank Name"
                            : field === "accountNumber"
                              ? "Account Number"
                              : field === "ifscCode"
                                ? "IFSC Code"
                                : "Reference Number"}
                        </Label>
                        <Input
                          id={`disburse-${field}`}
                          value={disbursementForm[field]}
                          onChange={(e) =>
                            setDisbursementForm((f) => ({
                              ...f,
                              [field]: e.target.value,
                            }))
                          }
                          className="h-11 text-sm font-mono w-full"
                          data-ocid={`disburse-${field}-input`}
                        />
                      </div>
                    ))}
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 h-11"
                      onClick={handleDisburse}
                      disabled={disburse.isPending}
                      data-ocid="disburse-submit-btn"
                    >
                      <Banknote className="w-4 h-4" />
                      {disburse.isPending
                        ? "Recording..."
                        : "Record Disbursement"}
                    </Button>
                  </>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
