import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/use-auth";
import {
  formatAmount,
  formatStatus,
  useAddAdmin,
  useAdminApplications,
} from "../hooks/useQueries";
import { ApplicationStatus } from "../types";
import type { ApplicationFilter } from "../types";

type StatusTab = "all" | ApplicationStatus;

const STATUS_TABS: { label: string; value: StatusTab }[] = [
  { label: "All", value: "all" },
  { label: "Submitted", value: ApplicationStatus.submitted },
  { label: "Under Review", value: ApplicationStatus.underReview },
  { label: "Approved", value: ApplicationStatus.approved },
  { label: "Disbursed", value: ApplicationStatus.disbursed },
  { label: "Rejected", value: ApplicationStatus.rejected },
];

function getStatusIcon(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.approved:
    case ApplicationStatus.disbursed:
      return <CheckCircle2 className="w-3.5 h-3.5 text-accent" />;
    case ApplicationStatus.rejected:
      return <XCircle className="w-3.5 h-3.5 text-destructive" />;
    case ApplicationStatus.underReview:
      return <Clock className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <FileText className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [adminUserId, setAdminUserId] = useState("");
  const [showAdminSetup, setShowAdminSetup] = useState(false);

  const { identity } = useAuth();
  const addAdmin = useAddAdmin();

  const filter: ApplicationFilter =
    activeTab === "all"
      ? { __kind__: "all", all: null }
      : { __kind__: "byStatus", byStatus: activeTab };

  const {
    data: applications = [],
    isLoading,
    refetch,
    isFetching,
  } = useAdminApplications(filter);
  const { data: allApps = [] } = useAdminApplications({
    __kind__: "all",
    all: null,
  });

  const filtered = applications.filter(
    (app) =>
      search === "" ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.customerName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPending = allApps.filter(
    (a) =>
      a.status === ApplicationStatus.underReview ||
      a.status === ApplicationStatus.submitted,
  ).length;
  const totalApproved = allApps.filter(
    (a) =>
      a.status === ApplicationStatus.approved ||
      a.status === ApplicationStatus.disbursed,
  ).length;
  const totalDisbursed = allApps.filter(
    (a) => a.status === ApplicationStatus.disbursed,
  ).length;
  const totalRejected = allApps.filter(
    (a) => a.status === ApplicationStatus.rejected,
  ).length;

  const stats = [
    {
      label: "Total Applications",
      value: allApps.length,
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      trend: `${allApps.length} received`,
    },
    {
      label: "Pending Review",
      value: totalPending,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "Awaiting decision",
    },
    {
      label: "Approved",
      value: totalApproved,
      icon: CheckCircle2,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      trend: `${totalDisbursed} disbursed`,
    },
    {
      label: "Total Customers",
      value: new Set(allApps.map((a) => a.customerId.toString())).size,
      icon: Users,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      trend: `${totalRejected} rejected`,
    },
  ];

  const handleAddAdmin = async () => {
    if (!adminUserId.trim()) {
      toast.error("Enter a principal ID");
      return;
    }
    try {
      await addAdmin.mutateAsync(
        adminUserId as unknown as Parameters<typeof addAdmin.mutateAsync>[0],
      );
      toast.success("Admin added successfully!");
      setAdminUserId("");
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const tabCounts: Record<StatusTab, number> = {
    all: allApps.length,
    [ApplicationStatus.submitted]: allApps.filter(
      (a) => a.status === ApplicationStatus.submitted,
    ).length,
    [ApplicationStatus.underReview]: allApps.filter(
      (a) => a.status === ApplicationStatus.underReview,
    ).length,
    [ApplicationStatus.approved]: allApps.filter(
      (a) => a.status === ApplicationStatus.approved,
    ).length,
    [ApplicationStatus.disbursed]: allApps.filter(
      (a) => a.status === ApplicationStatus.disbursed,
    ).length,
    [ApplicationStatus.rejected]: allApps.filter(
      (a) => a.status === ApplicationStatus.rejected,
    ).length,
    [ApplicationStatus.draft]: allApps.filter(
      (a) => a.status === ApplicationStatus.draft,
    ).length,
    [ApplicationStatus.kycPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.kycPending,
    ).length,
    [ApplicationStatus.documentsPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.documentsPending,
    ).length,
    [ApplicationStatus.cibilPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.cibilPending,
    ).length,
    [ApplicationStatus.paymentPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.paymentPending,
    ).length,
  };

  return (
    <div data-ocid="admin-dashboard">
      <PageHeader
        title="Loan Applications"
        description="Review, approve, and manage all loan applications in one place"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="gap-1.5 min-h-[44px] sm:min-h-0"
              data-ocid="admin-refresh-btn"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdminSetup((v) => !v)}
              className="gap-1.5 border-dashed min-h-[44px] sm:min-h-0"
              data-ocid="admin-setup-toggle-btn"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Admin Setup</span>
              <span className="sm:hidden">Admins</span>
              {showAdminSetup ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        }
      />

      {/* Admin Setup Panel — accordion on mobile */}
      {showAdminSetup && (
        <Card
          className="bg-card shadow-card border-l-4 border-l-primary mb-6"
          data-ocid="admin-setup-panel"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-primary" /> Add Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 space-y-1.5">
                <Label
                  htmlFor="admin-user-id"
                  className="text-xs text-muted-foreground"
                >
                  Your Internet Identity Principal ID
                </Label>
                <Input
                  id="admin-user-id"
                  placeholder="aaaaa-bbbbb-ccccc-ddddd-..."
                  value={adminUserId}
                  onChange={(e) => setAdminUserId(e.target.value)}
                  className="font-mono text-sm min-h-[44px]"
                  data-ocid="admin-user-id-input"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto">
                {identity && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAdminUserId(identity.getPrincipal().toText())
                    }
                    className="text-xs whitespace-nowrap min-h-[44px] w-full sm:w-auto"
                    data-ocid="use-my-principal-btn"
                  >
                    Use My Principal
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleAddAdmin}
                  disabled={addAdmin.isPending}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] w-full sm:w-auto"
                  data-ocid="add-admin-submit-btn"
                >
                  {addAdmin.isPending ? "Adding..." : "Add Admin"}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              First-time setup: add your principal to gain admin access.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid — 2 cols on sm/md, 4 cols on lg+ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor, trend }) => (
          <Card
            key={label}
            className="bg-card shadow-card hover:shadow-elevated transition-shadow"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${iconBg} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40" />
              </div>
              <div className="font-bold text-xl sm:text-2xl text-foreground font-mono tabular-nums mb-0.5">
                {value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {label}
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1">
                {trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter + Search Bar — stacked on sm, horizontal on md+ */}
      <Card className="bg-card shadow-card mb-0 rounded-b-none border-b-0">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1 md:min-w-56 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or App ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 min-h-[44px] md:h-9 text-sm"
                data-ocid="admin-search-input"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>
                {filtered.length} application{filtered.length !== 1 ? "s" : ""}{" "}
                shown
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs — scrollable horizontal on sm */}
      <Card className="bg-card shadow-card rounded-t-none">
        <div className="border-b border-border px-4 pt-1">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as StatusTab)}
          >
            <TabsList className="h-auto bg-transparent p-0 gap-0 w-full justify-start overflow-x-auto">
              {STATUS_TABS.map(({ label, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-xs font-medium gap-1.5 flex-shrink-0 whitespace-nowrap"
                  data-ocid={`admin-tab-${value}`}
                >
                  {label}
                  {tabCounts[value] > 0 && (
                    <Badge
                      variant={activeTab === value ? "default" : "secondary"}
                      className="h-4 min-w-4 text-[10px] px-1 rounded-full"
                    >
                      {tabCounts[value]}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-14">
              <LoadingSpinner message="Loading applications..." />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-7 h-7" />}
              title="No applications found"
              description={
                search
                  ? `No results for "${search}". Try a different search term.`
                  : activeTab === "all"
                    ? "No applications have been submitted yet."
                    : `No applications with status "${formatStatus(activeTab as ApplicationStatus)}".`
              }
            />
          ) : (
            <>
              {/* Desktop Table — md+ only */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        App ID
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        Customer
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        Amount
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        Submitted
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-muted/20 transition-colors group"
                        data-ocid="admin-application-row"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(app.status)}
                            <span className="font-mono text-xs text-muted-foreground">
                              #{app.id.slice(-10)}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-foreground text-sm">
                            {app.customerName}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono truncate max-w-[140px]">
                            {app.customerId.toString().slice(0, 16)}…
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="font-mono font-bold text-foreground tabular-nums">
                            {formatAmount(app.amountRequested)}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="text-sm text-foreground">
                            {new Date(
                              Number(app.createdAt) / 1_000_000,
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(
                              Number(app.createdAt) / 1_000_000,
                            ).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link
                            to="/admin/applications/$id"
                            params={{ id: app.id }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1.5 text-xs font-medium group-hover:border-primary/50 group-hover:text-primary transition-colors"
                              data-ocid="admin-view-application-btn"
                            >
                              Review
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer */}
                <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Showing {filtered.length} of {applications.length}{" "}
                    applications
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Banknote className="w-3.5 h-3.5" />
                    Total requested:{" "}
                    <span className="font-mono font-semibold text-foreground ml-1">
                      {formatAmount(
                        filtered.reduce(
                          (sum, a) => sum + a.amountRequested,
                          0n,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Cards — sm only (<768px) */}
              <div className="md:hidden">
                <div className="flex flex-col gap-4 p-4">
                  {filtered.map((app) => (
                    <Link
                      key={app.id}
                      to="/admin/applications/$id"
                      params={{ id: app.id }}
                      className="block"
                      data-ocid="admin-application-row"
                    >
                      <Card className="bg-card border border-border hover:border-primary/40 transition-colors active:scale-[0.99] cursor-pointer">
                        <CardContent className="p-4 space-y-2.5">
                          {/* Row 1: Customer name + status */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-foreground text-sm leading-tight truncate min-w-0">
                              {app.customerName}
                            </span>
                            <StatusBadge status={app.status} />
                          </div>

                          {/* Row 2: App ID + date */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              {getStatusIcon(app.status)}
                              <span className="font-mono">
                                #{app.id.slice(-10)}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                Number(app.createdAt) / 1_000_000,
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Row 3: Loan amount */}
                          <div className="flex items-center gap-1.5">
                            <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="font-mono font-bold text-foreground tabular-nums text-sm">
                              {formatAmount(app.amountRequested)}
                            </span>
                          </div>

                          {/* Row 4: View Details CTA */}
                          <Button
                            variant="outline"
                            className="w-full min-h-[44px] gap-1.5 text-sm font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary transition-colors"
                            data-ocid="admin-view-application-btn"
                            asChild
                          >
                            <span>
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Mobile footer summary */}
                <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {filtered.length} of {applications.length} applications
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Banknote className="w-3.5 h-3.5" />
                    <span className="font-mono font-semibold text-foreground">
                      {formatAmount(
                        filtered.reduce(
                          (sum, a) => sum + a.amountRequested,
                          0n,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            status: ApplicationStatus.submitted,
            label: "New submissions awaiting review",
            color: "bg-secondary",
          },
          {
            status: ApplicationStatus.underReview,
            label: "In active review by admin",
            color: "bg-amber-50",
          },
          {
            status: ApplicationStatus.approved,
            label: "Approved, pending disbursement",
            color: "bg-accent/5",
          },
          {
            status: ApplicationStatus.disbursed,
            label: "Funds disbursed to customer",
            color: "bg-accent/10",
          },
        ].map(({ status, label, color }) => (
          <button
            key={status}
            type="button"
            onClick={() => setActiveTab(status)}
            className={`${color} border border-border rounded-xl p-3 text-left hover:border-primary/40 transition-colors cursor-pointer min-h-[44px]`}
            data-ocid={`admin-quick-filter-${status}`}
          >
            <div className="mb-1.5">
              <StatusBadge status={status} />
            </div>
            <div className="text-xs text-muted-foreground leading-snug">
              {label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
