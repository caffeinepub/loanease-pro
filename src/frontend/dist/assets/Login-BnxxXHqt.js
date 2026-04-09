import { u as useAuth, j as jsxRuntimeExports, S as Shield, B as Button } from "./index-Bagthejl.js";
import { C as Card, a as CardContent } from "./card-DRB9AixX.js";
import { A as ArrowRight, C as Clock } from "./clock-8-XNlN0m.js";
import { L as Lock } from "./lock-1bWnOrxY.js";
function Login() {
  const { login, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-md bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Already Logged In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "You are already authenticated. Go to your dashboard to manage your loan applications." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-accent text-accent-foreground hover:bg-accent/90", children: [
        "Go to Dashboard ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
      ] }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center p-4 bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/images/logo-transparent.png",
            alt: "ZORRO Instant Personal Loan",
            className: "h-20 w-auto object-contain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-widest uppercase text-muted-foreground", children: "Instant Personal Loan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground text-center mb-2", children: "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center mb-8", children: "Sign in with Internet Identity to access your loan applications and account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 py-5 text-base",
          onClick: login,
          "data-ocid": "login-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 mr-2" }),
            "Login with Internet Identity"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: [
        { icon: Shield, text: "Bank-grade security and encryption" },
        { icon: Lock, text: "Private key stored only on your device" },
        { icon: Clock, text: "Quick 30-second login process" }
      ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 text-sm text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-accent flex-shrink-0" }),
            text
          ]
        },
        text
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "New to ZORRO? Logging in will create your account automatically." })
  ] }) });
}
export {
  Login as default
};
