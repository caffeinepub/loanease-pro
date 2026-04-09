# Design Brief

## Direction

LoanEase Pro — Professional loan provider website with institutional trust, clarity, and sophisticated refinement.

## Tone

Refined corporate/financial aesthetic. Trust is built through clean typography, intentional hierarchy, structured layouts, and subtle elevation — never casual or playful.

## Differentiation

A loan provider that feels like a trusted bank: confident use of negative space, sophisticated sans-serif typography, navy authority balanced with teal highlights, and intentional surface treatments on every zone.

## Color Palette

| Token           | OKLCH          | Role                              |
| --------------- | -------------- | --------------------------------- |
| primary         | 0.45 0.08 267  | Navy blue — trust, stability      |
| accent          | 0.65 0.12 215  | Teal — CTAs, approvals, highlights |
| secondary       | 0.95 0.01 267  | Light slate — subtle backgrounds  |
| background      | 0.98 0.01 267  | Off-white with slate undertone    |
| card            | 0.99 0.01 0    | Pure white for elevated content   |
| muted           | 0.92 0.01 267  | Lighter slate for secondary areas |
| destructive     | 0.55 0.22 25   | Red — errors, rejections          |
| success         | 0.65 0.15 155  | Green — approvals, completion     |

## Typography

- Display: Inter 700/800 — hero headers, section titles, data emphasis
- Body: Inter 400/500 — copy, labels, form text, UI labels
- Mono: JetBrains Mono 400 — loan amounts, reference numbers, codes

## Elevation & Depth

Minimal shadow hierarchy: card-level shadows for subtle elevation, elevated shadows for modals and floating elements. Depth through layering backgrounds (white cards on light-slate sections), not expensive drop shadows.

## Structural Zones

| Zone    | Background           | Border                | Notes                                    |
| ------- | -------------------- | --------------------- | ---------------------------------------- |
| Header  | primary (navy)       | border-b subtle       | White text, logo alignment, nav centered |
| Content | background (off-wht) | —                     | Alternate bg-secondary for sections      |
| Cards   | card (pure white)    | border subtle/shadow  | Consistent shadow-card, rounded-md       |
| Footer  | secondary (lt-slate) | border-t subtle       | Muted text, link in teal accent          |

## Spacing & Rhythm

Grid-based spacing: 16px base unit. Sections separated by 32px (2x), content groups by 24px (1.5x), elements by 16px. Breathing room prioritized over density — generous padding inside cards (24px), around forms (20px margins), between sections (32-48px).

## Component Patterns

- Buttons: Solid primary navy on white, teal accent for CTAs, outlined secondary, 8px padding (sm), 12px (md), rounded-md
- Cards: bg-card, shadow-card, border-border, rounded-md, 24px padding
- Forms: Input bg-input, border-border, placeholder muted-foreground, 8px rounded-sm, label above input (sm text, medium weight)
- Badges: Inline, accent teal on transparent bg with teal border or solid muted for neutral states

## Motion

- Entrance: Fade-in 0.3s on page load for major sections, staggered 50ms between cards
- Hover: Button opacity shift 0.8→1.0 on hover, shadow-card→shadow-elevated for card hover, 0.2s smooth
- Focus: Ring focus-ring (teal), 2px, offset 2px on form elements

## Constraints

- No animated backgrounds or gradients — clean, professional surfaces only
- Text never below 14px body, 16px body labels, 24px headers minimum
- Cards and sections never merge without clear visual boundary (border, shadow, or background shift)
- Forms always left-aligned labels above inputs, 1.5 line height minimum
- Buttons never more than 3 variants per screen (primary, secondary, outline)

## Signature Detail

Consistent use of pure navy primary in all CTAs and headers paired with teal accent for approval/success states creates institutional trustworthiness while maintaining modern energy — the hallmark of LoanEase Pro's professional positioning.
