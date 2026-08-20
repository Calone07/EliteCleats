# ELITE CLEATS — Development Guide

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Calone07/EliteCleats.git
cd elite-cleats

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Note:** This project requires the `--webpack` flag for `next dev` on certain Windows platforms where Turbopack native binaries are unavailable. The `dev` script in `package.json` includes this flag by default.

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (webpack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
├── globals.css          # Design tokens and global styles
├── layout.tsx           # Root layout (Navbar + Footer shell)
├── page.tsx             # Homepage section assembly
└── favicon.ico

components/
├── layout/
│   ├── Navbar.tsx       # Sticky transparent navbar
│   └── Footer.tsx       # Four-column footer
├── home/
│   ├── Hero.tsx         # Fullscreen hero section
│   ├── FeaturedBrands.tsx
│   ├── FeaturedBoots.tsx
│   ├── WhyChooseUs.tsx
│   ├── Collections.tsx
│   └── Newsletter.tsx
├── product/
│   ├── ProductCard.tsx  # Reusable boot card
│   └── ProductGrid.tsx  # Responsive grid wrapper
└── ui/
    ├── Button.tsx       # Primary, outline, ghost variants
    ├── Container.tsx    # Max-width wrapper
    └── SectionTitle.tsx # Section heading component

constants/
├── boots.ts             # 8 boot products
├── brands.ts            # 5 brand entries
├── collections.ts       # 3 collections
└── navigation.ts        # Nav link definitions

types/
└── index.ts             # Boot, Brand, Collection, NavLink interfaces

docs/
├── 00-Project-Overview.md
├── 01-Product-Requirements-Document.md
├── 02-Design-System.md
└── README-Development.md
```

---

## Component Conventions

- **PascalCase** for component files and functions
- One component per file
- "use client" directive only when interactivity (state, effects, event handlers) is required
- Server components by default where possible
- Props typed with TypeScript interfaces (not inline types)

### Adding a New Homepage Section

1. Create the component file in `components/home/`
2. If it needs data, add to `constants/` and `types/`
3. Import and render in `app/page.tsx` in the desired position

---

## Data Layer

All content data lives in `constants/` as typed arrays. This acts as a static API layer that can be swapped for real API calls in future phases without changing component logic.

Current data files:
- `constants/boots.ts` — `Boot[]` (8 entries)
- `constants/brands.ts` — `Brand[]` (5 entries)
- `constants/collections.ts` — `Collection[]` (3 entries)
- `constants/navigation.ts` — `NavLink[]` (5 entries)

---

## Styling

- All styles use Tailwind utility classes
- Custom design tokens are defined in `app/globals.css` via `@theme`
- No CSS modules or styled-components
- No inline styles

---

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Commit changes
git add -A
git commit -m "description of changes"

# Merge back to main
git checkout main
git merge feature/my-feature
```

**Commit message format:** Concise, present tense, prefixed by section when relevant (e.g., "Add scroll animations to Hero section").

---

## Deployment

This project is ready for deployment on Vercel.

```bash
npm run build
npx vercel --prod
```

**Platform note:** If the build fails with a Turbopack error, ensure the build command uses `--webpack`:
```json
{
  "scripts": {
    "build": "next build --webpack"
  }
}
```

---

## Future Integration Points

The codebase is structured for seamless backend integration:

| Current | Future |
|---|---|
| Static constants | Database or API |
| Placeholder gradients | Real product images via Next/Image |
| Decorative buttons | Connected handlers (add to cart, search, wishlist) |
| Client-side favorite state | Persisted wishlist |
| Newsletter form (prevented) | API endpoint subscription |
