import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AdminApproveInput,
  AdminRejectInput,
  ApplicationFilter,
  ApplicationId,
  CustomerProfileInput,
  DisbursementInput,
  DocumentUploadInput,
  KycSubmitInput,
  LoanApplicationInput,
  RepaymentSchedule,
  StripePayment,
  UserId,
} from "../types";
import { ApplicationStatus } from "../types";
import { useBackend } from "./use-backend";

export function useProfile() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApplications() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApplication(appId: ApplicationId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["application", appId],
    queryFn: async () => {
      if (!actor || !appId) return null;
      return actor.getMyApplication(appId);
    },
    enabled: !!actor && !isFetching && !!appId,
  });
}

export function useKycStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["kyc-status"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyKycStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyDocuments(applicationId: ApplicationId | null = null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["documents", applicationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyDocuments(applicationId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCibilRecord() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["cibil-record"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyCibilRecord();
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin hooks
export function useAdminApplications(
  filter: ApplicationFilter = { __kind__: "all", all: null },
) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin-applications", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListApplications(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminApplicationDetails(appId: ApplicationId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin-application-details", appId],
    queryFn: async () => {
      if (!actor || !appId) return null;
      return actor.adminGetApplicationDetails(appId);
    },
    enabled: !!actor && !isFetching && !!appId,
  });
}

// Admin status detection: try to list applications; if it succeeds, user is admin
export function useIsAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        await actor.adminListApplications({ __kind__: "all", all: null });
        return true;
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Mutations
export function useCreateProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CustomerProfileInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCustomerProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useUpdateProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CustomerProfileInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateCustomerProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useCreateLoanApplication() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LoanApplicationInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createLoanApplication(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}

export function useSubmitLoanApplication() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appId: ApplicationId) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.submitLoanApplication(appId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}

export function useSubmitKyc() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: KycSubmitInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.submitKyc(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["kyc-status"] }),
  });
}

export function useAddDocument() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DocumentUploadInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.addDocument(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });
}

export function useRecordPayment() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      payment,
    }: { appId: ApplicationId; payment: StripePayment }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.recordPayment(appId, payment);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}

// Admin mutations
export function useAdminApproveApplication() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      input,
    }: { appId: ApplicationId; input: AdminApproveInput }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.adminApproveApplication(appId, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-application-details", appId],
      });
    },
  });
}

export function useAdminRejectApplication() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      input,
    }: { appId: ApplicationId; input: AdminRejectInput }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.adminRejectApplication(appId, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-application-details", appId],
      });
    },
  });
}

export function useAdminRecordDisbursement() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      input,
    }: { appId: ApplicationId; input: DisbursementInput }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.adminRecordDisbursement(appId, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-application-details", appId],
      });
    },
  });
}

export function useAdminReviewKyc() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerId,
      approved,
      reason,
    }: {
      customerId: UserId;
      approved: boolean;
      reason: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.adminReviewKyc(customerId, approved, reason);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] }),
  });
}

export function useAdminReviewDocument() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      docId,
      approved,
      reason,
    }: {
      docId: string;
      approved: boolean;
      reason: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.adminReviewDocument(docId, approved, reason);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] }),
  });
}

export function useAddAdmin() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: async (userId: UserId) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.addAdmin(userId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });
}

export function useRepaymentSchedule(applicationId: ApplicationId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<RepaymentSchedule | null>({
    queryKey: ["repayment-schedule", applicationId],
    queryFn: async () => {
      if (!actor || !applicationId) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getRepaymentSchedule(applicationId);
        if (!result || result.__kind__ !== "ok") return null;
        return result.ok as RepaymentSchedule;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!applicationId,
    staleTime: 5 * 60 * 1000, // 5 minutes — schedule rarely changes
  });
}

// Helper to format amounts
export function formatAmount(amount: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function formatStatus(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    [ApplicationStatus.draft]: "Draft",
    [ApplicationStatus.submitted]: "Submitted",
    [ApplicationStatus.kycPending]: "KYC Pending",
    [ApplicationStatus.documentsPending]: "Documents Pending",
    [ApplicationStatus.cibilPending]: "CIBIL Pending",
    [ApplicationStatus.underReview]: "Under Review",
    [ApplicationStatus.paymentPending]: "Payment Pending",
    [ApplicationStatus.approved]: "Approved",
    [ApplicationStatus.disbursed]: "Disbursed",
    [ApplicationStatus.rejected]: "Rejected",
  };
  return labels[status] ?? status;
}
