import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, IndianRupee } from "lucide-react";
import { useCallback, useState } from "react";
import { useAuth } from "../hooks/use-auth";

// ── helpers ────────────────────────────────────────────────────────────────

function calcEmi(
  principal: number,
  months: number,
  annualRate: number,
): number {
  if (principal <= 0 || months <= 0 || annualRate <= 0) return 0;
  const r = annualRate / 100 / 12;
  return Math.round(
    (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1),
  );
}

function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function toINRLabel(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

// ── sub-components ─────────────────────────────────────────────────────────

interface SliderRowProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  suffix?: string;
}

function SliderRow({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  suffix,
}: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          {label}
        </label>
        <span className="text-sm font-mono font-bold text-foreground bg-muted/60 px-2.5 py-0.5 rounded-md">
          {format(value)}
          {suffix}
        </span>
      </div>
      <div
        className="relative h-5 flex items-center"
        data-ocid={`${id}-slider-wrap`}
      >
        {/* track */}
        <div className="absolute inset-x-0 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-1.5 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-card
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-card
            [&::-moz-range-thumb]:cursor-pointer"
          data-ocid={id}
          aria-label={label}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground/60 font-mono select-none">
        <span>
          {format(min)}
          {suffix}
        </span>
        <span>
          {format(max)}
          {suffix}
        </span>
      </div>
    </div>
  );
}

// ── Donut chart ────────────────────────────────────────────────────────────

interface DonutProps {
  principal: number;
  interest: number;
}

function DonutChart({ principal, interest }: DonutProps) {
  const total = principal + interest;
  if (total === 0) return null;

  const r = 42;
  const circumference = 2 * Math.PI * r;
  const principalPct = principal / total;
  const principalDash = principalPct * circumference;
  const interestDash = circumference - principalDash;

  return (
    <div
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        role="presentation"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="rotate-[-90deg]"
      >
        {/* Base track */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="12"
        />
        {/* Interest slice (drawn first, under principal) */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="oklch(var(--accent))"
          strokeWidth="12"
          strokeDasharray={`${interestDash} ${principalDash}`}
          strokeDashoffset={-principalDash}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        {/* Principal slice */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="12"
          strokeDasharray={`${principalDash} ${interestDash}`}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center rotate-0">
        <IndianRupee
          className="w-5 h-5 text-muted-foreground"
          aria-label="Rupee"
        />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function EmiCalculator() {
  const { isAuthenticated, login } = useAuth();

  const [loanAmount, setLoanAmount] = useState(1_000_000);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(10.5);

  const emi = calcEmi(loanAmount, tenure, interestRate);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  const principalPct =
    loanAmount > 0 ? Math.round((loanAmount / totalPayable) * 100) : 0;
  const interestPct = 100 - principalPct;

  const handleApply = useCallback(() => {
    if (!isAuthenticated) login();
  }, [isAuthenticated, login]);

  return (
    <section
      id="emi-calculator"
      className="bg-gradient-to-b from-muted/30 to-background py-16 px-4 border-b border-border"
      data-ocid="emi-calculator-section"
    >
      <div className="container max-w-7xl mx-auto">
        {/* ── Section heading ── */}
        <div className="text-center mb-12">
          <Badge className="mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/10 text-accent border-accent/20">
            <Calculator className="w-3 h-3 mr-1" />
            EMI Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Calculate Your EMI
          </h2>
          {/* gold accent underline */}
          <div className="flex justify-center mb-4">
            <span className="block h-1 w-16 rounded-full bg-accent" />
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Adjust the sliders to instantly see your monthly repayment, total
            interest, and full payment breakdown — before you apply.
          </p>
        </div>

        {/* ── Calculator card ── */}
        <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-elevated border border-border/60 overflow-hidden">
          <div className="grid md:grid-cols-[1fr_auto_1fr] divide-y md:divide-y-0 md:divide-x divide-border">
            {/* LEFT: Sliders */}
            <div className="p-6 md:p-8 space-y-7">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Loan Parameters
              </h3>

              <SliderRow
                id="emi-amount"
                label="Loan Amount"
                value={loanAmount}
                min={50_000}
                max={5_000_000}
                step={25_000}
                onChange={setLoanAmount}
                format={toINRLabel}
              />
              <SliderRow
                id="emi-tenure"
                label="Tenure"
                value={tenure}
                min={6}
                max={120}
                step={1}
                onChange={setTenure}
                format={(v) => `${v}`}
                suffix=" mo"
              />
              <SliderRow
                id="emi-rate"
                label="Interest Rate (p.a.)"
                value={interestRate}
                min={8}
                max={36}
                step={0.1}
                onChange={setInterestRate}
                format={(v) => v.toFixed(1)}
                suffix="%"
              />

              <p className="text-[11px] text-muted-foreground/60 pt-2">
                * Indicative values only. Actual EMI subject to CIBIL score
                &amp; loan type.
              </p>
            </div>

            {/* DIVIDER (mobile: hidden, desktop: vertical line) */}
            <div className="hidden md:block w-px" />

            {/* RIGHT: Results */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Your Repayment Summary
              </h3>

              {/* Monthly EMI — hero figure */}
              <div
                className="bg-primary rounded-xl px-6 py-5 text-center"
                data-ocid="emi-result-panel"
              >
                <div className="text-xs font-medium text-primary-foreground/70 mb-1 uppercase tracking-widest">
                  Monthly EMI
                </div>
                <div
                  className="text-4xl md:text-5xl font-display font-bold text-primary-foreground font-mono tracking-tight"
                  data-ocid="emi-monthly-value"
                >
                  {formatINR(emi)}
                </div>
                <div className="text-xs text-primary-foreground/60 mt-1">
                  for {tenure} months
                </div>
              </div>

              {/* Breakdown rows */}
              <div className="space-y-3 flex-1">
                {[
                  {
                    label: "Principal Amount",
                    value: formatINR(loanAmount),
                    color: "bg-primary",
                    ocid: "emi-principal-value",
                  },
                  {
                    label: "Total Interest Payable",
                    value: formatINR(totalInterest),
                    color: "bg-accent",
                    ocid: "emi-interest-value",
                  },
                  {
                    label: "Total Amount Payable",
                    value: formatINR(totalPayable),
                    color: "bg-muted",
                    ocid: "emi-total-value",
                    highlight: true,
                  },
                ].map(({ label, value, color, ocid, highlight }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 ${highlight ? "bg-muted/60 border border-border" : "bg-background"}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${color}`}
                      />
                      <span className="text-xs text-muted-foreground truncate">
                        {label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-mono font-semibold shrink-0 ${highlight ? "text-foreground" : "text-foreground/80"}`}
                      data-ocid={ocid}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visual donut + legend */}
              <div className="flex items-center gap-5 bg-secondary/40 rounded-xl px-5 py-4">
                <DonutChart principal={loanAmount} interest={totalInterest} />
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      Principal
                    </span>
                    <span className="ml-auto text-xs font-mono font-bold text-foreground">
                      {principalPct}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      Interest
                    </span>
                    <span className="ml-auto text-xs font-mono font-bold text-foreground">
                      {interestPct}%
                    </span>
                  </div>
                  {/* Horizontal proportion bar */}
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${principalPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              {isAuthenticated ? (
                <Link to="/apply" className="block">
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md"
                    size="lg"
                    data-ocid="emi-apply-btn"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md"
                  size="lg"
                  onClick={handleApply}
                  data-ocid="emi-apply-btn"
                >
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
