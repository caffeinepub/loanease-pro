import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, o as cn } from "./index-Bagthejl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-8",
        className
      ),
      "data-ocid": "empty-state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed mb-6", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            className: "bg-accent text-accent-foreground hover:bg-accent/90",
            "data-ocid": "empty-state-cta",
            children: action.label
          }
        )
      ]
    }
  );
}
export {
  CircleAlert as C,
  EmptyState as E
};
