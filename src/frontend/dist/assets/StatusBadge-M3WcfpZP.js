import { c as createLucideIcon, j as jsxRuntimeExports, O as ApplicationStatus, Z as formatStatus, U as PaymentStatus, W as VerificationStatus } from "./index-Bagthejl.js";
import { B as Badge } from "./badge-B2xYzeRj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function getStatusVariant(status) {
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
function getStatusLabel(status) {
  if (Object.values(ApplicationStatus).includes(status)) {
    return formatStatus(status);
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
function StatusBadge({ status, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: getStatusVariant(status),
      className,
      "data-ocid": "status-badge",
      children: getStatusLabel(status)
    }
  );
}
export {
  Banknote as B,
  CircleX as C,
  StatusBadge as S
};
