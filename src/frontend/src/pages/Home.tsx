import EmiCalculator from "@/components/EmiCalculator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Car,
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  Home,
  Lock,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";

const loanProducts = [
  {
    icon: Home,
    title: "Home Loan",
    desc: "Low rates, long tenure up to 30 years",
    rate: "8.5%",
    amount: "Up to ₹5 Crore",
    tag: "Most Popular",
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    desc: "For MSMEs and growing enterprises",
    rate: "12%",
    amount: "Up to ₹50 Lakh",
    tag: null,
  },
  {
    icon: TrendingUp,
    title: "Personal Loan",
    desc: "Quick approval, minimal documentation",
    rate: "10.5%",
    amount: "Up to ₹25 Lakh",
    tag: "Fast Approval",
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    desc: "New and used vehicle financing",
    rate: "9%",
    amount: "Up to ₹20 Lakh",
    tag: null,
  },
  {
    icon: GraduationCap,
    title: "Education Loan",
    desc: "Invest in your future education",
    rate: "9.5%",
    amount: "Up to ₹40 Lakh",
    tag: null,
  },
  {
    icon: Heart,
    title: "Medical Loan",
    desc: "Emergency medical expense coverage",
    rate: "11%",
    amount: "Up to ₹10 Lakh",
    tag: null,
  },
];

const features = [
  {
    icon: Clock,
    title: "24-Hour Approval",
    desc: "Get in-principle approval within 24 hours. No delays, no hassle.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    desc: "Best-in-market interest rates starting from 8.5% p.a.",
  },
  {
    icon: Lock,
    title: "Secure Documents",
    desc: "Bank-grade AES-256 encryption for all your sensitive data.",
  },
];

const steps = [
  {
    num: "01",
    title: "Register & KYC",
    desc: "Create your account and complete Aadhaar/PAN verification in minutes.",
  },
  {
    num: "02",
    title: "Apply Online",
    desc: "Fill out the loan application form and upload your documents securely.",
  },
  {
    num: "03",
    title: "CIBIL Check",
    desc: "We instantly verify your credit score for the best loan offer.",
  },
  {
    num: "04",
    title: "Get Approved",
    desc: "Receive your loan sanction letter and review the final terms.",
  },
  {
    num: "05",
    title: "Funds Disbursed",
    desc: "Money transferred directly to your bank account within 48 hours.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    text: "ZORRO Instant Personal Loan made my home loan process seamless. Approved in just 2 days with complete transparency!",
    rating: 5,
    role: "Home Buyer",
  },
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    text: "Transparent process, great interest rates. Highly recommend for business loans. The team was incredibly professional.",
    rating: 5,
    role: "Business Owner",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad",
    text: "The online application was smooth and intuitive. Customer support was excellent throughout the entire process.",
    rating: 5,
    role: "Personal Loan Customer",
  },
];

const trustStats = [
  { value: "50,000+", label: "Happy Customers", icon: Users },
  { value: "₹2,500 Cr+", label: "Loans Disbursed", icon: TrendingUp },
  { value: "24 Hrs", label: "Avg. Approval Time", icon: Clock },
  { value: "98%", label: "Customer Satisfaction", icon: Award },
];

export default function HomePage() {
  const { isAuthenticated, login } = useAuth();

  const handleApply = () => {
    if (!isAuthenticated) login();
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        className="relative bg-primary text-primary-foreground overflow-hidden"
        data-ocid="hero-section"
      >
        {/* Decorative background geometry */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-[360px] h-[360px] rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-accent/5 blur-2xl" />
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left — Copy */}
            <div>
              <Badge className="mb-5 bg-accent/20 text-primary-foreground border border-accent/40 hover:bg-accent/30 font-medium tracking-wide">
                🏆 Trusted by 50,000+ Indians · NBFC Registered · RBI Regulated
              </Badge>

              {/* Logo mark in hero */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/assets/images/logo-transparent.png"
                  alt="ZORRO Instant Personal Loan"
                  className="h-14 w-auto drop-shadow-md"
                  data-ocid="hero-logo"
                />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5">
                Fast, Transparent{" "}
                <span className="text-accent relative inline-block">
                  Loan Solutions
                  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-accent/40 rounded-full" />
                </span>
              </h1>
              <p className="text-primary-foreground/75 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                Your trusted financial partner for Personal, Home, Business, and
                Education loans. Quick approvals. Zero hidden charges. Money in
                your account within 48 hours.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {isAuthenticated ? (
                  <Link to="/apply">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-semibold px-6"
                      data-ocid="hero-apply-btn"
                    >
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-semibold px-6"
                    onClick={login}
                    data-ocid="hero-apply-btn"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold px-6"
                    data-ocid="hero-track-btn"
                  >
                    Track Application
                  </Button>
                </Link>
              </div>

              {/* Mini trust row */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: ShieldCheck, label: "RBI Regulated" },
                  { icon: Lock, label: "256-bit Encryption" },
                  { icon: CheckCircle2, label: "No Hidden Fees" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-sm text-primary-foreground/65"
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quick Trust Panel */}
            <div className="hidden md:flex flex-col gap-5">
              {/* Feature highlights */}
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-primary-foreground/8 rounded-xl px-5 py-4 border border-primary-foreground/15"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary-foreground mb-0.5">
                      {title}
                    </div>
                    <div className="text-xs text-primary-foreground/65 leading-relaxed">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
              {/* Quick anchor CTA */}
              <a href="#emi-calculator">
                <Button
                  variant="outline"
                  className="w-full border-accent/50 text-accent bg-transparent hover:bg-accent/10 font-semibold mt-1"
                  data-ocid="hero-emi-anchor-btn"
                >
                  Calculate Your EMI <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMI Calculator ── */}
      <EmiCalculator />

      {/* ── Trust Stats ── */}
      <section className="bg-accent/5 border-y border-accent/20 py-10 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl font-display font-bold text-foreground font-mono">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="features-section"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border-primary/20">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Banking Made Simple
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We combine cutting-edge technology with human expertise to give
              you the best lending experience in India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="bg-card border border-border shadow-card hover:shadow-elevated transition-shadow group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loan Products ── */}
      <section
        className="bg-muted/40 py-16 px-4 border-y border-border"
        data-ocid="loan-products-section"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/10 text-accent border-accent/20">
              Our Products
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Loans for Every Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From your dream home to your child's education — we have a loan
              tailored for every milestone in life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loanProducts.map(
              ({ icon: Icon, title, desc, rate, amount, tag }) => (
                <Card
                  key={title}
                  className="bg-card shadow-card hover:shadow-elevated transition-shadow group relative overflow-hidden"
                  data-ocid={`loan-product-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {tag && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                        {tag}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                    <div className="flex items-center justify-between text-xs font-mono bg-secondary rounded-lg px-3 py-2">
                      <span className="text-muted-foreground">
                        Rate:{" "}
                        <span className="text-foreground font-semibold">
                          {rate} p.a.
                        </span>
                      </span>
                      <span className="text-muted-foreground">{amount}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      {isAuthenticated ? (
                        <Link to="/apply">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full group-hover:border-accent group-hover:text-accent transition-colors"
                            data-ocid="loan-product-explore-btn"
                          >
                            Apply Now <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:border-accent group-hover:text-accent transition-colors"
                          onClick={handleApply}
                          data-ocid="loan-product-explore-btn"
                        >
                          Apply Now <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="how-it-works-section"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border-primary/20">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              From application to disbursal — a fully digital, paperless journey
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(10%+1.5rem)] right-[calc(10%+1.5rem)] h-px bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  className="flex flex-col items-center text-center relative"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-mono mb-4 relative z-10 border-2 ${
                      i === 0
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-primary border-primary/40"
                    }`}
                  >
                    {num}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5 text-sm">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            {isAuthenticated ? (
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  data-ocid="hiw-apply-btn"
                >
                  Start Your Application <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={login}
                data-ocid="hiw-apply-btn"
              >
                Start Your Application <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="bg-muted/40 py-16 px-4 border-y border-border"
        data-ocid="testimonials-section"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/10 text-accent border-accent/20">
              Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Trusted by Thousands of Indians
            </h2>
            <p className="text-muted-foreground">
              Real experiences from our valued customers across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, location, text, rating, role }) => (
              <Card
                key={name}
                className="bg-card shadow-card border border-border hover:shadow-elevated transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].slice(0, rating).map((n) => (
                      <Star
                        key={n}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">
                    "{text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {role} · {location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative bg-primary text-primary-foreground py-16 px-4 overflow-hidden"
        data-ocid="cta-section"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl" />
        </div>
        <div className="relative container max-w-4xl mx-auto text-center">
          {/* Logo in CTA */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/images/logo-transparent.png"
              alt="ZORRO Instant Personal Loan"
              className="h-16 w-auto opacity-90 drop-shadow-md"
              data-ocid="cta-logo"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Achieve Your Financial Goals?
          </h2>
          <p className="text-primary-foreground/75 mb-8 text-lg max-w-2xl mx-auto">
            Join 50,000+ satisfied customers. Apply today and get in-principle
            approval within 24 hours. Zero paperwork. 100% online.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {isAuthenticated ? (
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-semibold px-8"
                  data-ocid="cta-apply-btn"
                >
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-semibold px-8"
                onClick={login}
                data-ocid="cta-apply-btn"
              >
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold px-8"
                data-ocid="cta-check-btn"
              >
                Check Eligibility
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" /> NBFC Registered
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" /> RBI Regulated
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-accent" /> ISO 27001 Certified
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
