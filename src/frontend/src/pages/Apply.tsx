import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Shield,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  formatAmount,
  useAddDocument,
  useCreateLoanApplication,
  useCreateProfile,
  useProfile,
  useSubmitKyc,
  useSubmitLoanApplication,
  useUpdateProfile,
} from "../hooks/useQueries";
import { type ApplicationId, IdentityType, type LoanPurpose } from "../types";

// ─── Step Config ──────────────────────────────────────────────────────────────
type StepId = "profile" | "kyc" | "documents" | "loan" | "confirm";

const STEPS: { id: StepId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "kyc", label: "KYC", icon: Shield },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "loan", label: "Loan Details", icon: Calculator },
  { id: "confirm", label: "Confirm", icon: BadgeCheck },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const PURPOSE_OPTIONS: { value: string; label: string }[] = [
  { value: "personal", label: "Personal Loan" },
  { value: "home", label: "Home Loan" },
  { value: "education", label: "Education Loan" },
  { value: "business", label: "Business Loan" },
  { value: "vehicle", label: "Vehicle Loan" },
  { value: "medical", label: "Medical Loan" },
];

const TENURE_OPTIONS = [6, 12, 24, 36, 60, 84, 120];

const PURPOSE_MAP: Record<string, LoanPurpose> = {
  personal: { __kind__: "personal", personal: null },
  home: { __kind__: "home", home: null },
  education: { __kind__: "education", education: null },
  business: { __kind__: "business", business: null },
  vehicle: { __kind__: "vehicle", vehicle: null },
  medical: { __kind__: "medical", medical: null },
};

function calcEmi(
  principal: number,
  tenureMonths: number,
  annualRate = 10.5,
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({
  current,
  steps,
}: { current: StepId; steps: typeof STEPS }) {
  const currentIndex = steps.findIndex((s) => s.id === current);
  return (
    <div
      className="flex items-center justify-between mb-8"
      data-ocid="step-progress"
    >
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                      ? "bg-primary text-primary-foreground shadow-elevated"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 mb-5 sm:mb-0 ${i < currentIndex ? "bg-accent" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Form Section Wrapper ─────────────────────────────────────────────────────
function FormRow({
  children,
  cols = 2,
}: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div
      className={`grid gap-4 ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
    >
      {children}
    </div>
  );
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
    </div>
  );
}

// ─── Document Upload Row ──────────────────────────────────────────────────────
function DocumentUploadRow({
  label,
  docTypeKey,
  applicationId,
  onUploaded,
}: {
  label: string;
  docTypeKey: string;
  applicationId: ApplicationId | null;
  onUploaded: (key: string) => void;
}) {
  const addDoc = useAddDocument();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const docTypeMap: Record<
    string,
    { __kind__: string; [key: string]: null | string }
  > = {
    identity: { __kind__: "identityProof", identityProof: null },
    address: { __kind__: "addressProof", addressProof: null },
    income: { __kind__: "incomeProof", incomeProof: null },
    bank: { __kind__: "bankStatement", bankStatement: null },
  };

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await addDoc.mutateAsync({
        applicationId: applicationId ?? undefined,
        docType: docTypeMap[docTypeKey] as { __kind__: string } as Parameters<
          typeof addDoc.mutateAsync
        >[0]["docType"],
        fileReference: file.name,
      });
      setUploaded(true);
      onUploaded(docTypeKey);
      toast.success(`${label} uploaded successfully`);
    } catch (err) {
      toast.error(
        `Upload failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-smooth ${
        uploaded
          ? "border-accent/50 bg-accent/5"
          : "border-border bg-card hover:bg-muted/30"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            uploaded ? "bg-accent/20" : "bg-muted"
          }`}
        >
          {uploaded ? (
            <CheckCircle2 className="w-4 h-4 text-accent" />
          ) : (
            <Upload className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {label}
          </div>
          <div className="text-xs text-muted-foreground">
            PDF, JPG, PNG (max 5MB)
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-3">
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={handleFile}
          data-ocid={`doc-upload-${docTypeKey}`}
        />
        <Button
          variant={uploaded ? "outline" : "secondary"}
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : uploaded ? (
            "Replace"
          ) : (
            "Upload"
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── EMI Calculator display ───────────────────────────────────────────────────
function EmiDisplay({ amount, tenure }: { amount: number; tenure: number }) {
  const emi = calcEmi(amount, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;

  if (amount <= 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-2">
      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        EMI Calculation
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-bold text-foreground font-mono">
            {formatAmount(BigInt(Math.round(emi)))}
          </div>
          <div className="text-xs text-muted-foreground">Monthly EMI</div>
        </div>
        <div>
          <div className="text-base font-semibold text-foreground font-mono">
            {formatAmount(BigInt(Math.round(totalInterest)))}
          </div>
          <div className="text-xs text-muted-foreground">Total Interest</div>
        </div>
        <div>
          <div className="text-base font-semibold text-foreground font-mono">
            {formatAmount(BigInt(Math.round(totalPayable)))}
          </div>
          <div className="text-xs text-muted-foreground">Total Payable</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Apply Component ─────────────────────────────────────────────────────
export default function Apply() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const submitKyc = useSubmitKyc();
  const createLoan = useCreateLoanApplication();
  const submitLoan = useSubmitLoanApplication();

  const [currentStep, setCurrentStep] = useState<StepId>("profile");
  const [applicationId, setApplicationId] = useState<ApplicationId | null>(
    null,
  );

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
  });
  const [kycForm, setKycForm] = useState({
    identityType: IdentityType.aadhaar,
    identityNumber: "",
  });
  const [uploadedDocs, setUploadedDocs] = useState<Set<string>>(new Set());
  const [loanForm, setLoanForm] = useState({
    purpose: "personal",
    amount: 500000,
    tenure: 60,
  });

  if (profileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading your profile..." />
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  // ─── Step Handlers ──────────────────────────────────────────────────────────
  async function handleProfileSave() {
    if (
      !profileForm.name.trim() ||
      !profileForm.email.trim() ||
      !profileForm.phone.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      if (profile) {
        await updateProfile.mutateAsync(profileForm);
      } else {
        await createProfile.mutateAsync(profileForm);
      }
      toast.success("Profile saved!");
      setCurrentStep("kyc");
    } catch (err) {
      toast.error(
        `Failed to save profile: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  async function handleKycSubmit() {
    if (!kycForm.identityNumber.trim()) {
      toast.error("Please enter your identity number");
      return;
    }
    try {
      await submitKyc.mutateAsync(kycForm);
      toast.success("KYC submitted for verification!");
      setCurrentStep("documents");
    } catch (err) {
      toast.error(
        `KYC failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  function handleDocsNext() {
    if (uploadedDocs.size < 1) {
      toast.error("Please upload at least one document");
      return;
    }
    setCurrentStep("loan");
  }

  async function handleLoanNext() {
    if (loanForm.amount < 10000) {
      toast.error("Minimum loan amount is ₹10,000");
      return;
    }
    try {
      const result = await createLoan.mutateAsync({
        purpose: PURPOSE_MAP[loanForm.purpose] ?? PURPOSE_MAP.personal,
        amountRequested: BigInt(loanForm.amount),
        tenureMonths: BigInt(loanForm.tenure),
      });
      if (result) {
        setApplicationId(result.id);
        // Submit the loan application immediately (payment will happen on dashboard after approval)
        await submitLoan.mutateAsync(result.id);
      }
      toast.success("Application submitted successfully!");
      setCurrentStep("confirm");
    } catch (err) {
      toast.error(
        `Failed to submit application: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  const profileSaving = createProfile.isPending || updateProfile.isPending;

  return (
    <div className="bg-background min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-1">
            <button
              type="button"
              className="hover:text-foreground cursor-pointer"
              onClick={() => navigate({ to: "/" })}
            >
              Home
            </button>
            {" / "}
            <span className="text-foreground">Apply</span>
          </div>
          <h1 className="text-xl font-bold font-display text-foreground">
            Loan Application
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Complete all steps to submit your loan application
          </p>
        </div>

        <StepIndicator current={currentStep} steps={STEPS} />

        {/* ── Step 1: Profile ─────────────────────────────────────────────── */}
        {currentStep === "profile" && (
          <Card className="bg-card shadow-card" data-ocid="profile-step">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Personal Information
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Enter your details as per your KYC documents
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormRow>
                <FieldGroup label="Full Name *" htmlFor="name">
                  <Input
                    id="name"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Rajesh Kumar"
                    data-ocid="profile-name-input"
                  />
                </FieldGroup>
                <FieldGroup label="Phone Number *" htmlFor="phone">
                  <Input
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    data-ocid="profile-phone-input"
                  />
                </FieldGroup>
              </FormRow>
              <FieldGroup label="Email Address *" htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="rajesh@example.com"
                  data-ocid="profile-email-input"
                />
              </FieldGroup>
              <FieldGroup label="Residential Address *" htmlFor="address">
                <Input
                  id="address"
                  value={profileForm.address}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="123, MG Road, Mumbai 400001"
                  data-ocid="profile-address-input"
                />
              </FieldGroup>
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleProfileSave}
                disabled={profileSaving}
                data-ocid="profile-submit-btn"
              >
                {profileSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Save & Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Step 2: KYC ─────────────────────────────────────────────────── */}
        {currentStep === "kyc" && (
          <Card className="bg-card shadow-card" data-ocid="kyc-step">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> KYC Verification
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                We verify your identity as per RBI guidelines
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup label="Identity Document Type" htmlFor="id-type">
                <Select
                  value={kycForm.identityType}
                  onValueChange={(v) =>
                    setKycForm((k) => ({
                      ...k,
                      identityType: v as IdentityType,
                    }))
                  }
                >
                  <SelectTrigger id="id-type" data-ocid="kyc-id-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={IdentityType.aadhaar}>
                      Aadhaar Card
                    </SelectItem>
                    <SelectItem value={IdentityType.pan}>PAN Card</SelectItem>
                    <SelectItem value={IdentityType.drivingLicense}>
                      Driving License
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
              <FieldGroup label="Identity Number" htmlFor="id-number">
                <Input
                  id="id-number"
                  value={kycForm.identityNumber}
                  onChange={(e) =>
                    setKycForm((k) => ({
                      ...k,
                      identityNumber: e.target.value,
                    }))
                  }
                  placeholder={
                    kycForm.identityType === IdentityType.aadhaar
                      ? "XXXX XXXX XXXX"
                      : kycForm.identityType === IdentityType.pan
                        ? "ABCDE1234F"
                        : "DL-XXXX-XXXXXXXX"
                  }
                  className="font-mono tracking-wide"
                  data-ocid="kyc-id-number-input"
                />
              </FieldGroup>
              <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground flex items-start gap-2">
                <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent" />
                Your identity information is securely encrypted and processed in
                compliance with data protection laws.
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("profile")}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleKycSubmit}
                  disabled={submitKyc.isPending}
                  data-ocid="kyc-submit-btn"
                >
                  {submitKyc.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Verifying...
                    </>
                  ) : (
                    <>
                      Submit KYC <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Step 3: Documents ────────────────────────────────────────────── */}
        {currentStep === "documents" && (
          <Card className="bg-card shadow-card" data-ocid="documents-step">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Document Upload
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Upload clear copies of the required documents
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  key: "identity",
                  label: "Identity Proof (Aadhaar / PAN / Passport)",
                },
                {
                  key: "address",
                  label: "Address Proof (Utility Bill / Rent Agreement)",
                },
                { key: "income", label: "Income Proof (Salary Slip / ITR)" },
                { key: "bank", label: "Bank Statement (Last 6 Months)" },
              ].map((doc) => (
                <DocumentUploadRow
                  key={doc.key}
                  label={doc.label}
                  docTypeKey={doc.key}
                  applicationId={applicationId}
                  onUploaded={(key) =>
                    setUploadedDocs((prev) => new Set([...prev, key]))
                  }
                />
              ))}
              <div className="text-xs text-muted-foreground pt-1">
                {uploadedDocs.size}/4 documents uploaded
                {uploadedDocs.size > 0 && (
                  <span className="text-accent ml-1">
                    · {uploadedDocs.size} uploaded
                  </span>
                )}
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("kyc")}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleDocsNext}
                  data-ocid="docs-next-btn"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Step 4: Loan Details ─────────────────────────────────────────── */}
        {currentStep === "loan" && (
          <Card className="bg-card shadow-card" data-ocid="loan-step">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" /> Loan Details
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Choose your desired loan amount, tenure, and purpose
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup label="Loan Purpose" htmlFor="purpose">
                <Select
                  value={loanForm.purpose}
                  onValueChange={(v) =>
                    setLoanForm((l) => ({ ...l, purpose: v }))
                  }
                >
                  <SelectTrigger id="purpose" data-ocid="loan-purpose-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Loan Amount</Label>
                  <span className="text-base font-bold font-mono text-foreground">
                    {formatAmount(BigInt(loanForm.amount))}
                  </span>
                </div>
                <Slider
                  min={10000}
                  max={5000000}
                  step={10000}
                  value={[loanForm.amount]}
                  onValueChange={([v]) =>
                    setLoanForm((l) => ({ ...l, amount: v }))
                  }
                  className="accent-accent"
                  data-ocid="loan-amount-slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹10,000</span>
                  <span>₹50,00,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Or enter:
                  </span>
                  <Input
                    type="number"
                    className="font-mono w-40"
                    min={10000}
                    max={5000000}
                    value={loanForm.amount}
                    onChange={(e) =>
                      setLoanForm((l) => ({
                        ...l,
                        amount: Number(e.target.value),
                      }))
                    }
                    data-ocid="loan-amount-input"
                  />
                </div>
              </div>

              <FieldGroup label="Loan Tenure" htmlFor="tenure">
                <Select
                  value={String(loanForm.tenure)}
                  onValueChange={(v) =>
                    setLoanForm((l) => ({ ...l, tenure: Number(v) }))
                  }
                >
                  <SelectTrigger id="tenure" data-ocid="loan-tenure-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TENURE_OPTIONS.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m} months ({(m / 12).toFixed(m % 12 === 0 ? 0 : 1)} yr)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <EmiDisplay amount={loanForm.amount} tenure={loanForm.tenure} />

              <div className="flex gap-3 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("documents")}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleLoanNext}
                  disabled={createLoan.isPending || submitLoan.isPending}
                  data-ocid="loan-next-btn"
                >
                  {createLoan.isPending || submitLoan.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application{" "}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Step 5: Confirmation ─────────────────────────────────────────── */}
        {currentStep === "confirm" && (
          <Card className="bg-card shadow-card" data-ocid="confirm-step">
            <CardContent className="py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2 font-display">
                Application Submitted!
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
                Your loan application has been received. Our team will review it
                within 2–3 business days. Once approved, you'll be prompted to
                pay the ₹999 processing fee on your dashboard.
              </p>
              {applicationId && (
                <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left max-w-xs mx-auto">
                  <div className="text-xs text-muted-foreground mb-1">
                    Application Reference
                  </div>
                  <div className="font-mono font-bold text-foreground text-sm break-all">
                    {applicationId.slice(-16).toUpperCase()}
                  </div>
                </div>
              )}
              <div className="space-y-2 text-xs text-muted-foreground max-w-sm mx-auto mb-6 text-left bg-muted/30 rounded-xl p-4">
                <div className="font-semibold text-foreground mb-2 text-sm">
                  What happens next?
                </div>
                {[
                  "KYC documents will be verified within 24 hours",
                  "CIBIL credit check will be initiated",
                  "Our loan officer will review your application",
                  "You'll be notified of the decision",
                  "Upon approval, pay the ₹999 processing fee on your dashboard",
                  "Funds disbursed within 2 business days after payment",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="go-to-dashboard-btn"
              >
                Go to My Dashboard <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step counter */}
        <div className="text-center mt-4 text-xs text-muted-foreground">
          Step {currentIndex + 1} of {STEPS.length} ·{" "}
          {STEPS[currentIndex]?.label}
        </div>

        {/* Processing fee notice */}
        {currentStep !== "confirm" && (
          <div className="mt-4 text-center">
            <Badge variant="outline" className="text-xs text-muted-foreground">
              ₹999 processing fee applies after loan approval
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
