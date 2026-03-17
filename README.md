# Corki Landing Page

Marketing website for [Corki](https://github.com/lewcart/Corki) — the AI wine assistant.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** Framer Motion
- **Typography:** Playfair Display + DM Sans
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx         # Fonts, metadata, theme
    page.tsx           # Composes all sections
    globals.css        # Design tokens, base styles
  components/
    layout/
      nav.tsx          # Sticky nav with mobile drawer
      footer.tsx       # 4-column footer
    sections/
      hero.tsx         # Hero with Orb + CTA
      social-proof.tsx # Marquee proof bar
      feature-scan.tsx # Scan feature spotlight
      feature-ask.tsx  # AI Chat feature spotlight
      feature-cellar.tsx # Cellar feature spotlight
      how-it-works.tsx # 3-step flow
      use-cases.tsx    # Persona cards
      pricing.tsx      # Free/Pro pricing
      testimonial.tsx  # Pull quote
      faq.tsx          # Accordion FAQ
      final-cta.tsx    # Bottom CTA
    ui/
      orb.tsx          # Animated breathing orb
      phone-mockup.tsx # iPhone frame component
      feature-badge.tsx # Section label pills
      chat-demo.tsx    # Chat conversation mockup
      pricing-card.tsx # Pricing tier card
```

## Design System

- **Primary:** Burgundy `#7B3346`
- **Accent:** Amber `#C27B2E`
- **Dark base:** `#120D0A`
- **Cream:** `#F9F6F4`
- **Headings:** Playfair Display
- **Body:** DM Sans
