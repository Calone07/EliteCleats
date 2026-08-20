# ELITE CLEATS — Design System

**Version:** 0.1.0

---

## 1. Colors

All color tokens are defined in `app/globals.css` via Tailwind's `@theme` directive.

| Token | Value | Usage |
|---|---|---|
| `primary-bg` | `#0A0A0A` | Page background |
| `secondary-bg` | `#111111` | Alternate section backgrounds |
| `card-bg` | `#171717` | Card and surface backgrounds |
| `primary-text` | `#FFFFFF` | Primary body and heading text |
| `secondary-text` | `#B3B3B3` | Muted text, captions, labels |
| `accent` | `#D4AF37` | CTAs, highlights, active states, decorative elements |
| `border` | `rgba(255, 255, 255, 0.08)` | Borders, dividers, card outlines |
| `success` | `#22C55E` | Success states (future use) |
| `error` | `#EF4444` | Error states (future use) |

### Usage Guidelines

- Use `primary-bg` as the default page background.
- Use `accent` sparingly for emphasis — CTAs, badges, decorative lines.
- Borders use `border-border` utility class from Tailwind.
- Avoid adding additional colors beyond this palette.

---

## 2. Typography

**Font Family:** Inter (loaded via `next/font/google`)

| Level | Size | Weight | Letter Spacing | Usage |
|---|---|---|---|---|
| h1 | `text-5xl` – `text-8xl` | Bold (700) | `tracking-tight` | Hero headline |
| h2 | `text-3xl` – `text-5xl` | Bold (700) | `tracking-tight` | Section titles |
| h3 | `text-lg` – `text-2xl` | Semibold (600) | Normal | Card titles |
| Body | `text-sm` – `text-base` | Normal (400) | Normal | Paragraph text |
| Small | `text-xs` | Medium (500) | `tracking-wider` | Labels, badges, footer headings |
| Accent label | `text-sm` | Medium (500) | `tracking-[0.25em]` | Pre-heading labels (uppercase) |

### Line Height
- Headlines: `leading-[1.05]` (tight)
- Body: `leading-relaxed` (comfortable)

---

## 3. Spacing

Uses Tailwind's default spacing scale. Common values:

| Value | Rem | Usage |
|---|---|---|
| `p-4` / `p-6` | 1rem / 1.5rem | Card padding |
| `gap-4` / `gap-6` | 1rem / 1.5rem | Grid and flex gaps |
| `py-20` / `py-28` | 5rem / 7rem | Section vertical padding |
| `mt-10` | 2.5rem | Space between headline and CTAs |
| `space-y-6` | 1.5rem | Vertical spacing between stacked elements |

---

## 4. Components

### 4.1 Button

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | `"primary" \| "outline" \| "ghost"` | `"primary"` | — |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | — |

**Variants:**
- **primary:** `bg-accent text-primary-bg hover:bg-accent/90`
- **outline:** `border border-primary-text/20 text-primary-text hover:bg-white/5`
- **ghost:** `text-secondary-text hover:text-primary-text`

**Sizes:**
- **sm:** `px-4 py-2 text-sm`
- **md:** `px-6 py-3 text-base`
- **lg:** `px-8 py-4 text-lg`

### 4.2 Container

Wraps content at `max-w-7xl` with responsive horizontal padding:
- Mobile: `px-4`
- Tablet: `sm:px-6`
- Desktop: `lg:px-8`

### 4.3 SectionTitle

Props: `title` (string), `subtitle?` (string), `className?` (string), `light?` (boolean)

Renders an h2 + optional p in a consistent section heading layout.

### 4.4 ProductCard

"use client" component. Props: `boot: Boot`, `index: number`. Includes:
- Gradient placeholder (varies by index)
- Badge overlay (conditional)
- Favorite toggle (local state)
- Brand, name, rating, price
- Quick View button (decorative)

---

## 5. Interactive Patterns

### Hover Effects
- Cards: `scale-[1.02]`, `border-accent/30`, `shadow-lg shadow-accent/5`
- Links: `text-accent` color transition
- Icon buttons: background darkens, scale

### Animation Guidelines (Phase 1)
- Use Framer Motion for entrance animations only
- Hero: fade-in-up with staggered delays
- Keep durations between 0.5s–0.8s
- Phase 2 will add scroll-triggered reveal animations

---

## 6. Border & Radius

- Default card radius: `rounded-xl` (12px)
- Button radius: `rounded-lg` (8px)
- Badge radius: `rounded-full`
- Default border: `border border-border`

---

## 7. Shadows

- Default card shadow: none (flat design)
- Hover card shadow: `shadow-lg shadow-accent/5`
- Navbar on scroll: `shadow-lg shadow-black/10`
