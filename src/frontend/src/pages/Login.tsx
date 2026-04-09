import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Lock, Shield } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

export default function Login() {
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card shadow-elevated">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Already Logged In
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              You are already authenticated. Go to your dashboard to manage your
              loan applications.
            </p>
            <a href="/dashboard">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-secondary/50">
      <div className="w-full max-w-md">
        <Card className="bg-card shadow-elevated">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <img
                src="/assets/images/logo-transparent.png"
                alt="ZORRO Instant Personal Loan"
                className="h-20 w-auto object-contain"
              />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Instant Personal Loan
              </span>
            </div>

            <h1 className="text-2xl font-display font-bold text-foreground text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm text-center mb-8">
              Sign in with Internet Identity to access your loan applications
              and account.
            </p>

            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-5 text-base"
              onClick={login}
              data-ocid="login-btn"
            >
              <Lock className="w-4 h-4 mr-2" />
              Login with Internet Identity
            </Button>

            <div className="mt-6 space-y-3">
              {[
                { icon: Shield, text: "Bank-grade security and encryption" },
                { icon: Lock, text: "Private key stored only on your device" },
                { icon: Clock, text: "Quick 30-second login process" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          New to ZORRO? Logging in will create your account automatically.
        </p>
      </div>
    </div>
  );
}
