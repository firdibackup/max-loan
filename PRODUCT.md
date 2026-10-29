# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with a server runtime for the public Supabase catalog proxy, shadcn/ui, Motion (Framer Motion).

## Users

Indonesian homeowners with an active KPR (mortgage), often paying 6%+ interest, who want to understand their loan before deciding anything. (Inferred from the reference design copy.)

## Product Purpose

Maxi is a "Personal KPR Financial Assistant": it summarizes a mortgage (cicilan, sisa pokok, tenor, bunga, nilai properti, estimasi ekuitas), explains loan condition via rule-based KPR Health, tracks payments, and educates on options (tetap, takeover, refinancing, top-up).

## Positioning

Clarity over prediction: rule-based indicators ("Bukan AI, bukan credit score"), missing data flagged instead of guessed, calculations are estimates, never official bank offers.

## Capabilities and Constraints

- Live: Pantau KPR, KPR Health, payment notes (pencatatan manual), articles.
- Public calculator: KPR Baru, Take Over, Refinancing + Top-up at `/kalkulator-kpr`, without login. Conventional bank products come from the existing official Supabase catalog; calculations and comparisons run in-browser. Refinancing covers an active mortgage with additional cash. Sharia calculations are deferred.
- Coming soon: pengingat otomatis. Calculator continuation URL is configurable; the versioned query handoff opens `/from-calculator` in the application and prefills the relevant mortgage draft after login.
- All figures on the landing page are illustrative and must be labeled as such.

## Brand Commitments

- Name: Maxi. Hashtag: #MaximalkanKPRKamu. Copy in Bahasa Indonesia, informal "kamu".
- Logos: `public/remax-logo.svg`, `public/remax-logo-white.svg` (source: `re-max-2025.svg`).
- The approved reference design `Maxi · Variation ! Home in Focus-export.html` is the visual authority.
- Display face: Neue Haas Grotesk Display (TRIAL file from the reference; must be replaced by a licensed file before launch).

## Evidence on Hand

- Hero photo, journal photo, facade CTA photo, 27 partner-bank logos (all from the reference export).
- FAQ answers are dummy placeholders (user-approved); no real data-security statement exists yet.
- No testimonials, user counts, or savings figures exist; do not fabricate them.
