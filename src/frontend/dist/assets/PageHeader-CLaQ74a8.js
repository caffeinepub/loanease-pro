import { j as jsxRuntimeExports, C as ChevronRight } from "./index-Bagthejl.js";
function PageHeader({
  title,
  description,
  breadcrumbs,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "page-header", children: [
    breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-3", children: breadcrumbs.map((crumb, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer transition-colors",
          children: crumb.label
        }
      )
    ] }, crumb.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground tracking-tight", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm leading-relaxed", children: description })
      ] }),
      action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: action })
    ] })
  ] });
}
export {
  PageHeader as P
};
