import { c as createLucideIcon, j as jsxRuntimeExports, o as cn, $ as useParams, a0 as useAdminApplicationDetails, a1 as useAdminApproveApplication, a2 as useAdminRejectApplication, a3 as useAdminRecordDisbursement, a4 as useAdminReviewKyc, a5 as useAdminReviewDocument, r as reactExports, y as LoadingSpinner, L as Link, B as Button, O as ApplicationStatus, z as FileText, E as formatAmount, S as Shield, W as VerificationStatus, G as ue } from "./index-Bagthejl.js";
import { C as CircleCheck, B as Badge } from "./badge-B2xYzeRj.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DRB9AixX.js";
import { L as Label, I as Input } from "./label-CU2jm-Za.js";
import { I as Info, H as Hash, C as CreditCard, T as TrendingDown, S as Separator, B as Building2 } from "./separator-DbUT77rz.js";
import { P as PageHeader } from "./PageHeader-CLaQ74a8.js";
import { S as StatusBadge, C as CircleX, B as Banknote } from "./StatusBadge-M3WcfpZP.js";
import { U as User } from "./user-Cxfx_g4z.js";
import { T as TrendingUp } from "./trending-up-DuWL1ZNA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function CibilScoreGauge({ score }) {
  const percent = Math.min(100, Math.max(0, (score - 300) / 600 * 100));
  const isGood = score >= 750;
  const isFair = score >= 650 && score < 750;
  const color = isGood ? "text-accent" : isFair ? "text-amber-500" : "text-destructive";
  const trackColor = isGood ? "from-accent/20 via-accent/60 to-accent" : isFair ? "from-amber-200 via-amber-400 to-amber-500" : "from-destructive/20 via-destructive/60 to-destructive";
  const label = isGood ? "Excellent" : isFair ? "Fair" : "Poor";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-2 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-14 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-t-full border-4 border-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `absolute bottom-0 left-0 right-0 rounded-t-full border-4 bg-gradient-to-r ${trackColor} transition-all duration-700`,
          style: {
            clipPath: `polygon(0 100%, ${percent}% 100%, ${percent}% 0%, 0 0%)`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 flex items-end justify-center pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-bold font-mono ${color}`, children: score }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs font-semibold ${color}`, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "out of 900" })
    ] })
  ] });
}
const STATUS_FLOW = [
  ApplicationStatus.submitted,
  ApplicationStatus.underReview,
  ApplicationStatus.approved,
  ApplicationStatus.disbursed
];
const STATUS_LABELS = {
  [ApplicationStatus.submitted]: "Submitted",
  [ApplicationStatus.underReview]: "Under Review",
  [ApplicationStatus.approved]: "Approved",
  [ApplicationStatus.disbursed]: "Disbursed"
};
function ApplicationTimeline({
  currentStatus
}) {
  const isRejected = currentStatus === ApplicationStatus.rejected;
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "hidden md:flex items-center gap-0",
        "data-ocid": "timeline-horizontal",
        children: [
          STATUS_FLOW.map((status, idx) => {
            const isPast = !isRejected && idx <= currentIdx;
            const isCurrent = !isRejected && idx === currentIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center flex-1 last:flex-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${isCurrent ? "border-primary bg-primary text-primary-foreground" : isPast ? "border-accent bg-accent text-accent-foreground" : "border-border bg-muted text-muted-foreground"}`,
                        children: isPast && !isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-2 h-2 rounded-full ${isCurrent ? "bg-primary-foreground" : "bg-muted-foreground/40"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-medium whitespace-nowrap ${isCurrent ? "text-primary" : isPast ? "text-accent" : "text-muted-foreground"}`,
                        children: STATUS_LABELS[status]
                      }
                    )
                  ] }),
                  idx < STATUS_FLOW.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `flex-1 h-0.5 mx-1 mb-4 rounded-full transition-colors ${isPast && !isCurrent ? "bg-accent" : "bg-border"}`
                    }
                  )
                ]
              },
              status
            );
          }),
          isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-3 flex items-center gap-1.5 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Rejected" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex md:hidden flex-col gap-2",
        "data-ocid": "timeline-vertical",
        children: [
          STATUS_FLOW.map((status, idx) => {
            const isPast = !isRejected && idx <= currentIdx;
            const isCurrent = !isRejected && idx === currentIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isCurrent ? "border-primary bg-primary text-primary-foreground" : isPast ? "border-accent bg-accent text-accent-foreground" : "border-border bg-muted text-muted-foreground"}`,
                  children: isPast && !isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-2 h-2 rounded-full ${isCurrent ? "bg-primary-foreground" : "bg-muted-foreground/40"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-medium ${isCurrent ? "text-primary" : isPast ? "text-accent" : "text-muted-foreground"}`,
                  children: STATUS_LABELS[status]
                }
              )
            ] }, status);
          }),
          isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Rejected" })
          ] })
        ]
      }
    )
  ] });
}
function DocumentReviewRow({
  doc,
  onReview,
  isPending
}) {
  var _a;
  const [notes, setNotes] = reactExports.useState(doc.rejectionReason ?? "");
  const [showNotes, setShowNotes] = reactExports.useState(false);
  const isVerified = doc.status === VerificationStatus.verified;
  const isRejected = doc.status === VerificationStatus.rejected;
  const isPendingStatus = doc.status === VerificationStatus.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-lg border transition-colors ${isVerified ? "bg-accent/5 border-accent/30" : isRejected ? "bg-destructive/5 border-destructive/20" : "bg-muted/30 border-border hover:bg-muted/50"}`,
      "data-ocid": "admin-document-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isVerified ? "bg-accent/15" : isRejected ? "bg-destructive/10" : "bg-primary/10"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileText,
                  {
                    className: `w-4 h-4 ${isVerified ? "text-accent" : isRejected ? "text-destructive" : "text-primary"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold capitalize text-foreground", children: (_a = doc.docType.__kind__) == null ? void 0 : _a.replace(/_/g, " ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono truncate max-w-[220px]", children: doc.fileReference })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: doc.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: `h-11 w-11 p-0 ${showNotes ? "text-primary bg-primary/10" : "text-muted-foreground"}`,
                onClick: () => setShowNotes((v) => !v),
                "aria-label": "Toggle admin notes",
                "data-ocid": "doc-notes-toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
              }
            ),
            isPendingStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-11 w-11 p-0 border-accent/50 text-accent hover:bg-accent/10",
                  onClick: () => onReview(doc.id, true, notes),
                  disabled: isPending,
                  "data-ocid": "doc-approve-btn",
                  "aria-label": "Approve document",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-11 w-11 p-0 border-destructive/50 text-destructive hover:bg-destructive/10",
                  onClick: () => onReview(doc.id, false, notes),
                  disabled: isPending,
                  "data-ocid": "doc-reject-btn",
                  "aria-label": "Reject document",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                }
              )
            ] }),
            !isPendingStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-11 px-2 text-xs text-muted-foreground hover:text-accent hover:bg-accent/10",
                  onClick: () => onReview(doc.id, true, notes),
                  disabled: isPending || isVerified,
                  "data-ocid": "doc-re-approve-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-11 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  onClick: () => onReview(doc.id, false, notes),
                  disabled: isPending || isRejected,
                  "data-ocid": "doc-re-reject-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] }),
        showNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 border-t border-border/60 pt-2.5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
            "Admin Notes",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60", children: "(visible to admin only; shown to customer only if rejected)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: isPendingStatus ? "Add notes before approving or rejecting..." : "Update notes and re-review to save...",
              className: "text-xs min-h-[64px] resize-none w-full",
              "data-ocid": "doc-admin-notes-input"
            }
          ),
          (isVerified || isRejected) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-11 text-xs gap-1 border-accent/50 text-accent hover:bg-accent/10 w-full sm:w-auto",
                onClick: () => onReview(doc.id, true, notes),
                disabled: isPending,
                "data-ocid": "doc-save-approve-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  " Save & Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-11 text-xs gap-1 border-destructive/50 text-destructive hover:bg-destructive/10 w-full sm:w-auto",
                onClick: () => onReview(doc.id, false, notes),
                disabled: isPending,
                "data-ocid": "doc-save-reject-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                  " Save & Reject"
                ]
              }
            )
          ] }),
          isRejected && doc.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-destructive/70 italic", children: [
            'Last saved notes: "',
            doc.rejectionReason,
            '"'
          ] })
        ] })
      ]
    }
  );
}
function AdminApplicationDetail() {
  const params = useParams({ strict: false });
  const id = params.id;
  const { data: details, isLoading } = useAdminApplicationDetails(id ?? null);
  const approve = useAdminApproveApplication();
  const reject = useAdminRejectApplication();
  const disburse = useAdminRecordDisbursement();
  const reviewKyc = useAdminReviewKyc();
  const reviewDoc = useAdminReviewDocument();
  const [approveForm, setApproveForm] = reactExports.useState({
    approvedAmount: "",
    interestRate: "9.5",
    adminNotes: ""
  });
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [disbursementForm, setDisbursementForm] = reactExports.useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    referenceNumber: ""
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", message: "Loading application details..." }) });
  }
  if (!details) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold text-foreground", children: "Application Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "This application may have been removed or doesn't exist." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 h-11", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Dashboard"
      ] }) })
    ] });
  }
  const { application, customer, kyc, documents, cibil } = details;
  const isApproved = application.status === ApplicationStatus.approved || application.status === ApplicationStatus.paymentPending || application.status === ApplicationStatus.disbursed;
  const isDisbursed = application.status === ApplicationStatus.disbursed;
  const isRejected = application.status === ApplicationStatus.rejected;
  const processingFeePaid = !!application.processingFeePayment;
  const canDisburse = isApproved && !isDisbursed && (application.status === ApplicationStatus.paymentPending || processingFeePaid);
  const handleApprove = async () => {
    if (!approveForm.approvedAmount) {
      ue.error("Enter approved amount");
      return;
    }
    try {
      await approve.mutateAsync({
        appId: application.id,
        input: {
          approvedAmount: BigInt(Number(approveForm.approvedAmount)),
          interestRate: Number(approveForm.interestRate),
          adminNotes: approveForm.adminNotes || void 0
        }
      });
      ue.success("Application approved successfully!");
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      ue.error("Enter rejection reason");
      return;
    }
    try {
      await reject.mutateAsync({
        appId: application.id,
        input: { rejectionReason: rejectReason }
      });
      ue.success("Application rejected");
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  const handleDisburse = async () => {
    if (!disbursementForm.bankName || !disbursementForm.accountNumber) {
      ue.error("Fill all disbursement details");
      return;
    }
    try {
      await disburse.mutateAsync({
        appId: application.id,
        input: disbursementForm
      });
      ue.success("Disbursement recorded successfully!");
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  const handleKycReview = async (approved) => {
    if (!customer) return;
    try {
      await reviewKyc.mutateAsync({
        customerId: customer.id,
        approved,
        reason: null
      });
      ue.success(approved ? "KYC approved" : "KYC rejected");
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  const handleDocReview = async (docId, approved, notes) => {
    try {
      await reviewDoc.mutateAsync({
        docId,
        approved,
        reason: notes.trim() || null
      });
      ue.success(
        approved ? "Document approved" : `Document rejected${notes.trim() ? " with notes" : ""}`
      );
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin-application-detail", className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-1 pt-2 pb-1 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "h-11 gap-2 text-sm font-medium",
        "data-ocid": "back-to-applications-mobile",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Applications"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Application #${application.id.slice(-10)}`,
        description: customer ? `Submitted by ${customer.name}` : "",
        breadcrumbs: [
          { label: "All Applications", href: "/admin" },
          { label: `#${application.id.slice(-10)}` }
        ],
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: application.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 h-11", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            " Dashboard"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4", children: "Application Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationTimeline, { currentStatus: application.status })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
            " Loan Request"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Amount Requested" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-mono text-foreground", children: formatAmount(application.amountRequested) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Tenure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-foreground", children: [
                Number(application.tenureMonths),
                " months"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Purpose" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground capitalize", children: application.purpose.__kind__ })
            ] }),
            application.approvedAmount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Approved Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold font-mono text-accent", children: formatAmount(application.approvedAmount) })
            ] }),
            application.interestRate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Interest Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-foreground", children: [
                application.interestRate,
                "% p.a."
              ] })
            ] }),
            application.adminNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Admin Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-3 text-sm text-foreground border border-border", children: application.adminNotes })
            ] }),
            isRejected && application.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Rejection Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm text-destructive", children: application.rejectionReason })
            ] })
          ] }) })
        ] }),
        customer && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
            " Customer Information"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold break-words", children: customer.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: customer.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold break-all", children: customer.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold break-words", children: customer.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Principal ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground break-all", children: [
                  customer.id.toString().slice(0, 30),
                  "…"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Member Since" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: new Date(
                  Number(customer.createdAt) / 1e6
                ).toLocaleDateString("en-IN") })
              ] })
            ] })
          ] }) })
        ] }),
        kyc && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2 justify-between flex-wrap gap-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
              " KYC Verification"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: kyc.status })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Identity Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold capitalize", children: kyc.identityType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Identity Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold font-mono break-all", children: kyc.identityNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: new Date(
                  Number(kyc.submittedAt) / 1e6
                ).toLocaleDateString("en-IN") })
              ] })
            ] }),
            kyc.status === VerificationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pt-2 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "h-11 bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 w-full sm:w-auto",
                  onClick: () => handleKycReview(true),
                  disabled: reviewKyc.isPending,
                  "data-ocid": "kyc-approve-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    " Approve KYC"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "h-11 gap-1.5 w-full sm:w-auto",
                  onClick: () => handleKycReview(false),
                  disabled: reviewKyc.isPending,
                  "data-ocid": "kyc-reject-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                    " Reject KYC"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
              " Documents",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto", children: documents.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: [
              "Tap the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3 inline-block mx-0.5 align-middle" }),
              " ",
              "icon on any document to add admin notes before approving or rejecting."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin-documents-list", children: documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DocumentReviewRow,
            {
              doc,
              onReview: handleDocReview,
              isPending: reviewDoc.isPending
            },
            doc.id
          )) }) })
        ] }),
        cibil && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
            " CIBIL Credit Report"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 items-center sm:items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CibilScoreGauge, { score: Number(cibil.score) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center gap-1.5 mt-1 text-xs font-semibold ${cibil.isEligible ? "text-accent" : "text-destructive"}`,
                  children: cibil.isEligible ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                    " Eligible for Loan"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5" }),
                    " Not Eligible"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Separator,
              {
                orientation: "vertical",
                className: "h-auto hidden sm:block self-stretch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold font-mono", children: Number(cibil.score) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Eligibility" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: cibil.isEligible ? "default" : "destructive",
                      className: "text-xs",
                      children: cibil.isEligible ? "Eligible" : "Ineligible"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Request ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground break-all", children: cibil.requestId })
                ] })
              ] }),
              cibil.reportSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground border border-border", children: cibil.reportSummary })
            ] })
          ] }) })
        ] }),
        application.processingFeePayment && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-4 h-4 text-primary" }),
            " Payment Status"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Processing Fee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: application.processingFeePayment.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Stripe Payment ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground break-all", children: application.processingFeePayment.paymentIntentId })
            ] }),
            application.processingFeePayment.amount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-0.5", children: "Amount Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: formatAmount(application.processingFeePayment.amount) })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-3", children: "Current Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: application.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Submitted",
            " ",
            new Date(
              Number(application.createdAt) / 1e6
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })
          ] }),
          application.updatedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Updated",
            " ",
            new Date(
              Number(application.updatedAt) / 1e6
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })
          ] })
        ] }) }),
        documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-3", children: "Document Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
            {
              label: "Verified",
              count: documents.filter(
                (d) => d.status === VerificationStatus.verified
              ).length,
              color: "text-accent"
            },
            {
              label: "Pending",
              count: documents.filter(
                (d) => d.status === VerificationStatus.pending
              ).length,
              color: "text-amber-600"
            },
            {
              label: "Rejected",
              count: documents.filter(
                (d) => d.status === VerificationStatus.rejected
              ).length,
              color: "text-destructive"
            }
          ].map(({ label, count, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold font-mono ${color}`, children: count })
              ]
            },
            label
          )) })
        ] }) }),
        !isApproved && !isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card border-l-4 border-l-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2 text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            " Approve Application"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "approved-amount", className: "text-xs", children: "Approved Amount (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "approved-amount",
                  type: "number",
                  value: approveForm.approvedAmount,
                  onChange: (e) => setApproveForm((f) => ({
                    ...f,
                    approvedAmount: e.target.value
                  })),
                  placeholder: application.amountRequested ? String(Number(application.amountRequested)) : "500000",
                  className: "font-mono text-sm h-11 w-full",
                  "data-ocid": "approve-amount-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "interest-rate", className: "text-xs", children: "Interest Rate (% p.a.) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "interest-rate",
                  type: "number",
                  step: "0.1",
                  value: approveForm.interestRate,
                  onChange: (e) => setApproveForm((f) => ({
                    ...f,
                    interestRate: e.target.value
                  })),
                  className: "font-mono text-sm h-11 w-full",
                  "data-ocid": "approve-rate-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-notes", className: "text-xs", children: "Admin Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "admin-notes",
                  value: approveForm.adminNotes,
                  onChange: (e) => setApproveForm((f) => ({
                    ...f,
                    adminNotes: e.target.value
                  })),
                  placeholder: "Optional notes for the customer...",
                  className: "text-sm min-h-[72px] resize-none w-full",
                  "data-ocid": "approve-notes-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-11",
                onClick: handleApprove,
                disabled: approve.isPending,
                "data-ocid": "approve-submit-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  approve.isPending ? "Approving..." : "Approve Loan"
                ]
              }
            )
          ] })
        ] }),
        isApproved && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card border-l-4 border-l-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-accent", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Amount:",
              " ",
              application.approvedAmount ? formatAmount(application.approvedAmount) : "—"
            ] })
          ] })
        ] }) }),
        !isApproved && !isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card border-l-4 border-l-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
            " Reject Application"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reject-reason", className: "text-xs", children: "Reason *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "reject-reason",
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  placeholder: "Explain why this application is being rejected...",
                  className: "text-sm min-h-[80px] resize-none w-full",
                  "data-ocid": "reject-reason-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                className: "w-full gap-1.5 h-11",
                onClick: handleReject,
                disabled: reject.isPending,
                "data-ocid": "reject-submit-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                  reject.isPending ? "Rejecting..." : "Reject Application"
                ]
              }
            )
          ] })
        ] }),
        isRejected && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card border-l-4 border-l-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-destructive", children: "Rejected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-clamp-2 break-words", children: application.rejectionReason ?? "No reason provided" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: `bg-card shadow-card border-l-4 border-l-primary ${!isApproved && "opacity-60 pointer-events-none"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 pt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary" }),
                  " Record Disbursement"
                ] }),
                !isApproved && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Available after approval" }),
                isApproved && !isDisbursed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex items-center gap-1.5 text-xs mt-1 ${processingFeePaid ? "text-accent" : "text-amber-600"}`,
                    "data-ocid": "processing-fee-status",
                    children: processingFeePaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                      "Processing fee: Paid ✓"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5" }),
                      "Processing fee: Not yet paid — waiting for customer"
                    ] })
                  }
                )
              ] }),
              isApproved && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: isDisbursed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-6 h-6 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-accent", children: "Funds Disbursed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Disbursement has been recorded" })
                ] })
              ] }) : !canDisburse ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-amber-600 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-amber-700", children: "Awaiting Processing Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-amber-600", children: "The customer must pay the ₹999 processing fee before disbursement can proceed." })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                [
                  "bankName",
                  "accountNumber",
                  "ifscCode",
                  "referenceNumber"
                ].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `disburse-${field}`,
                      className: "text-xs capitalize",
                      children: field === "bankName" ? "Bank Name" : field === "accountNumber" ? "Account Number" : field === "ifscCode" ? "IFSC Code" : "Reference Number"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `disburse-${field}`,
                      value: disbursementForm[field],
                      onChange: (e) => setDisbursementForm((f) => ({
                        ...f,
                        [field]: e.target.value
                      })),
                      className: "h-11 text-sm font-mono w-full",
                      "data-ocid": `disburse-${field}-input`
                    }
                  )
                ] }, field)),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 h-11",
                    onClick: handleDisburse,
                    disabled: disburse.isPending,
                    "data-ocid": "disburse-submit-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-4 h-4" }),
                      disburse.isPending ? "Recording..." : "Record Disbursement"
                    ]
                  }
                )
              ] }) })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  AdminApplicationDetail as default
};
