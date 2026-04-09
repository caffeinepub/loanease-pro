import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, h as useId, P as Primitive, i as composeEventHandlers, e as createContextScope, d as useComposedRefs, g as useControllableState, f as useCallbackRef, J as Presence, o as cn, u as useAuth, X as useAddAdmin, Y as useAdminApplications, O as ApplicationStatus, z as FileText, B as Button, y as LoadingSpinner, Z as formatStatus, E as formatAmount, L as Link, G as ue } from "./index-Bagthejl.js";
import { C as CircleCheck, B as Badge } from "./badge-B2xYzeRj.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DRB9AixX.js";
import { L as Label, I as Input } from "./label-CU2jm-Za.js";
import { c as createCollection } from "./index-DIB4Q5iY.js";
import { u as useDirection, a as ChevronUp, C as ChevronDown } from "./index-B4DCYYvh.js";
import { C as CircleAlert, E as EmptyState } from "./EmptyState-DTdab6pC.js";
import { P as PageHeader } from "./PageHeader-CLaQ74a8.js";
import { S as StatusBadge, B as Banknote, C as CircleX } from "./StatusBadge-M3WcfpZP.js";
import { C as Clock, A as ArrowRight } from "./clock-8-XNlN0m.js";
import { U as Users, S as ShieldCheck } from "./users-DxCs3Wpm.js";
import { T as TrendingUp } from "./trending-up-DuWL1ZNA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Submitted", value: ApplicationStatus.submitted },
  { label: "Under Review", value: ApplicationStatus.underReview },
  { label: "Approved", value: ApplicationStatus.approved },
  { label: "Disbursed", value: ApplicationStatus.disbursed },
  { label: "Rejected", value: ApplicationStatus.rejected }
];
function getStatusIcon(status) {
  switch (status) {
    case ApplicationStatus.approved:
    case ApplicationStatus.disbursed:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-accent" });
    case ApplicationStatus.rejected:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive" });
    case ApplicationStatus.underReview:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-amber-500" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-muted-foreground" });
  }
}
function AdminDashboard() {
  const [search, setSearch] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [adminUserId, setAdminUserId] = reactExports.useState("");
  const [showAdminSetup, setShowAdminSetup] = reactExports.useState(false);
  const { identity } = useAuth();
  const addAdmin = useAddAdmin();
  const filter = activeTab === "all" ? { __kind__: "all", all: null } : { __kind__: "byStatus", byStatus: activeTab };
  const {
    data: applications = [],
    isLoading,
    refetch,
    isFetching
  } = useAdminApplications(filter);
  const { data: allApps = [] } = useAdminApplications({
    __kind__: "all",
    all: null
  });
  const filtered = applications.filter(
    (app) => search === "" || app.id.toLowerCase().includes(search.toLowerCase()) || app.customerName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPending = allApps.filter(
    (a) => a.status === ApplicationStatus.underReview || a.status === ApplicationStatus.submitted
  ).length;
  const totalApproved = allApps.filter(
    (a) => a.status === ApplicationStatus.approved || a.status === ApplicationStatus.disbursed
  ).length;
  const totalDisbursed = allApps.filter(
    (a) => a.status === ApplicationStatus.disbursed
  ).length;
  const totalRejected = allApps.filter(
    (a) => a.status === ApplicationStatus.rejected
  ).length;
  const stats = [
    {
      label: "Total Applications",
      value: allApps.length,
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      trend: `${allApps.length} received`
    },
    {
      label: "Pending Review",
      value: totalPending,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "Awaiting decision"
    },
    {
      label: "Approved",
      value: totalApproved,
      icon: CircleCheck,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      trend: `${totalDisbursed} disbursed`
    },
    {
      label: "Total Customers",
      value: new Set(allApps.map((a) => a.customerId.toString())).size,
      icon: Users,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      trend: `${totalRejected} rejected`
    }
  ];
  const handleAddAdmin = async () => {
    if (!adminUserId.trim()) {
      ue.error("Enter a principal ID");
      return;
    }
    try {
      await addAdmin.mutateAsync(
        adminUserId
      );
      ue.success("Admin added successfully!");
      setAdminUserId("");
    } catch (err) {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };
  const tabCounts = {
    all: allApps.length,
    [ApplicationStatus.submitted]: allApps.filter(
      (a) => a.status === ApplicationStatus.submitted
    ).length,
    [ApplicationStatus.underReview]: allApps.filter(
      (a) => a.status === ApplicationStatus.underReview
    ).length,
    [ApplicationStatus.approved]: allApps.filter(
      (a) => a.status === ApplicationStatus.approved
    ).length,
    [ApplicationStatus.disbursed]: allApps.filter(
      (a) => a.status === ApplicationStatus.disbursed
    ).length,
    [ApplicationStatus.rejected]: allApps.filter(
      (a) => a.status === ApplicationStatus.rejected
    ).length,
    [ApplicationStatus.draft]: allApps.filter(
      (a) => a.status === ApplicationStatus.draft
    ).length,
    [ApplicationStatus.kycPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.kycPending
    ).length,
    [ApplicationStatus.documentsPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.documentsPending
    ).length,
    [ApplicationStatus.cibilPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.cibilPending
    ).length,
    [ApplicationStatus.paymentPending]: allApps.filter(
      (a) => a.status === ApplicationStatus.paymentPending
    ).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Loan Applications",
        description: "Review, approve, and manage all loan applications in one place",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => refetch(),
              disabled: isFetching,
              className: "gap-1.5 min-h-[44px] sm:min-h-0",
              "data-ocid": "admin-refresh-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: `w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`
                  }
                ),
                "Refresh"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setShowAdminSetup((v) => !v),
              className: "gap-1.5 border-dashed min-h-[44px] sm:min-h-0",
              "data-ocid": "admin-setup-toggle-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Admin Setup" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Admins" }),
                showAdminSetup ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      }
    ),
    showAdminSetup && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-card shadow-card border-l-4 border-l-primary mb-6",
        "data-ocid": "admin-setup-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary" }),
            " Add Admin Access"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "admin-user-id",
                    className: "text-xs text-muted-foreground",
                    children: "Your Internet Identity Principal ID"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "admin-user-id",
                    placeholder: "aaaaa-bbbbb-ccccc-ddddd-...",
                    value: adminUserId,
                    onChange: (e) => setAdminUserId(e.target.value),
                    className: "font-mono text-sm min-h-[44px]",
                    "data-ocid": "admin-user-id-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto", children: [
                identity && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setAdminUserId(identity.getPrincipal().toText()),
                    className: "text-xs whitespace-nowrap min-h-[44px] w-full sm:w-auto",
                    "data-ocid": "use-my-principal-btn",
                    children: "Use My Principal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: handleAddAdmin,
                    disabled: addAdmin.isPending,
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] w-full sm:w-auto",
                    "data-ocid": "add-admin-submit-btn",
                    children: addAdmin.isPending ? "Adding..." : "Add Admin"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
              "First-time setup: add your principal to gain admin access."
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: stats.map(({ label, value, icon: Icon, iconBg, iconColor, trend }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-card shadow-card hover:shadow-elevated transition-shadow",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${iconBg} flex items-center justify-center`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 sm:w-5 sm:h-5 ${iconColor}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-muted-foreground/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xl sm:text-2xl text-foreground font-mono tabular-nums mb-0.5", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground/60 mt-1", children: trend })
        ] })
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card shadow-card mb-0 rounded-b-none border-b-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:min-w-56 md:max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by customer or App ID...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 min-h-[44px] md:h-9 text-sm",
            "data-ocid": "admin-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          filtered.length,
          " application",
          filtered.length !== 1 ? "s" : "",
          " ",
          "shown"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card shadow-card rounded-t-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: activeTab,
          onValueChange: (v) => setActiveTab(v),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "h-auto bg-transparent p-0 gap-0 w-full justify-start overflow-x-auto", children: STATUS_TABS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value,
              className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3 text-xs font-medium gap-1.5 flex-shrink-0 whitespace-nowrap",
              "data-ocid": `admin-tab-${value}`,
              children: [
                label,
                tabCounts[value] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: activeTab === value ? "default" : "secondary",
                    className: "h-4 min-w-4 text-[10px] px-1 rounded-full",
                    children: tabCounts[value]
                  }
                )
              ]
            },
            value
          )) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { message: "Loading applications..." }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7" }),
          title: "No applications found",
          description: search ? `No results for "${search}". Try a different search term.` : activeTab === "all" ? "No applications have been submitted yet." : `No applications with status "${formatStatus(activeTab)}".`
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap", children: "App ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase whitespace-nowrap", children: "Submitted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors group",
                "data-ocid": "admin-application-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    getStatusIcon(app.status),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                      "#",
                      app.id.slice(-10)
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: app.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-mono truncate max-w-[140px]", children: [
                      app.customerId.toString().slice(0, 16),
                      "…"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-foreground tabular-nums", children: formatAmount(app.amountRequested) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: new Date(
                      Number(app.createdAt) / 1e6
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(
                      Number(app.createdAt) / 1e6
                    ).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit"
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/admin/applications/$id",
                      params: { id: app.id },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "h-8 gap-1.5 text-xs font-medium group-hover:border-primary/50 group-hover:text-primary transition-colors",
                          "data-ocid": "admin-view-application-btn",
                          children: [
                            "Review",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                          ]
                        }
                      )
                    }
                  ) })
                ]
              },
              app.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Showing ",
              filtered.length,
              " of ",
              applications.length,
              " ",
              "applications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-3.5 h-3.5" }),
              "Total requested:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground ml-1", children: formatAmount(
                filtered.reduce(
                  (sum, a) => sum + a.amountRequested,
                  0n
                )
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 p-4", children: filtered.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/applications/$id",
              params: { id: app.id },
              className: "block",
              "data-ocid": "admin-application-row",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border hover:border-primary/40 transition-colors active:scale-[0.99] cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm leading-tight truncate min-w-0", children: app.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    getStatusIcon(app.status),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                      "#",
                      app.id.slice(-10)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(
                    Number(app.createdAt) / 1e6
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground tabular-nums text-sm", children: formatAmount(app.amountRequested) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full min-h-[44px] gap-1.5 text-sm font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary transition-colors",
                    "data-ocid": "admin-view-application-btn",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "View Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ] })
                  }
                )
              ] }) })
            },
            app.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              filtered.length,
              " of ",
              applications.length,
              " applications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: formatAmount(
                filtered.reduce(
                  (sum, a) => sum + a.amountRequested,
                  0n
                )
              ) })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        status: ApplicationStatus.submitted,
        label: "New submissions awaiting review",
        color: "bg-secondary"
      },
      {
        status: ApplicationStatus.underReview,
        label: "In active review by admin",
        color: "bg-amber-50"
      },
      {
        status: ApplicationStatus.approved,
        label: "Approved, pending disbursement",
        color: "bg-accent/5"
      },
      {
        status: ApplicationStatus.disbursed,
        label: "Funds disbursed to customer",
        color: "bg-accent/10"
      }
    ].map(({ status, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(status),
        className: `${color} border border-border rounded-xl p-3 text-left hover:border-primary/40 transition-colors cursor-pointer min-h-[44px]`,
        "data-ocid": `admin-quick-filter-${status}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-snug", children: label })
        ]
      },
      status
    )) })
  ] });
}
export {
  AdminDashboard as default
};
