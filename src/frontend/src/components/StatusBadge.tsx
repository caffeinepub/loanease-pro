import { Badge } from "@/components/ui/badge";
import { formatStatus } from "../hooks/useQueries";
import { ApplicationStatus, PaymentStatus, VerificationStatus } from "../types";

interface StatusBadgeProps {
  status: ApplicationStatus | VerificationStatus | PaymentStatus;
  className?: string;
}

function getStatusVariant(
  status: ApplicationStatus | VerificationStatus | PaymentStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case ApplicationStatus.approved:
    case ApplicationStatus.disbursed:
    case VerificationStatus.verified:
    case PaymentStatus.paid:
      return "default";
    case ApplicationStatus.rejected:
    case VerificationStatus.rejected:
    case PaymentStatus.failed:
      return "destructive";
    case ApplicationStatus.draft:
    case ApplicationStatus.paymentPending:
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusLabel(
  status: ApplicationStatus | VerificationStatus | PaymentStatus,
): string {
  if (Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
    return formatStatus(status as ApplicationStatus);
  }
  switch (status) {
    case VerificationStatus.verified:
      return "Verified";
    case VerificationStatus.pending:
      return "Pending";
    case VerificationStatus.rejected:
      return "Rejected";
    case PaymentStatus.paid:
      return "Paid";
    case PaymentStatus.pending:
      return "Pending";
    case PaymentStatus.refunded:
      return "Refunded";
    case PaymentStatus.failed:
      return "Failed";
    default:
      return String(status);
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant={getStatusVariant(status)}
      className={className}
      data-ocid="status-badge"
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
