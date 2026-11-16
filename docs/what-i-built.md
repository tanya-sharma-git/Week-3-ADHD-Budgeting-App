# What I built and what I decided

A plain-language summary of Penny Pal and the key decisions behind it, for the Week 4
submission. The authoritative details live in the ADRs (`docs/adr`), the database
design (`docs/database-design.md`), and the code.

## What Penny Pal is

An ADHD-friendly budgeting web app built around one number: "left to spend this week."
A person sets a monthly budget, and the app shows a fair weekly slice of it minus what
they've spent, so the main screen stays calm and clear instead of overwhelming.

## How it's built: three tiers

- **Tier 1, screens:** Next.js (App Router) with Material UI components. The home
  screen, the "left to spend" card, the add-entry form, and settings.
- **Tier 2, server logic:** Next.js Server Actions (`budget-actions.ts`,
  `transaction-actions.ts`, `data-actions.ts`) that run under the signed-in user, do
  the calculations (such as the weekly split), and read and write the database.
- **Tier 3, database:** Supabase (hosted Postgres). Three tables, `profiles`,
  `budgets`, and `transactions`, linked by `user_id`, created with the migration
  `supabase/migrations/0001_initial_schema.sql`.

## Features (MVP #1, Epics 1-3)

Set a monthly budget; weekly mini-budgets (day-proportional split); the flagship
"left to spend this week" view; quick manual add for income and expenses with edit and
delete; smart default categories; Google sign-up and login; light security (optional
auto sign-out after inactivity); simple onboarding; and see-and-delete-my-data.

## Key decisions (ADRs)

- **ADR-0001:** Use Next.js with Material UI for the screens and server logic.
- **ADR-0002:** Use Vercel for hosting, since it deploys a Next.js app straight from
  GitHub.
- **ADR-0003:** Use Supabase for the database and sign-in, including Row Level Security.
- **ADR-0004:** Replace the phone-style "app lock" with an optional web auto sign-out,
  because a browser PIN would be a false sense of safety.

## Security and privacy

Google sign-in (no stored passwords); Row Level Security on every table so each person
sees only their own rows (verified by testing with two accounts); secret keys kept in
`.env.local` out of the public repo and stored in Vercel instead; HTTPS throughout.

## Deployment

Code is on GitHub and hosted on Vercel (free Hobby plan) at
https://week-3-adhd-budgeting-app-drab.vercel.app. Each push to `main` auto-publishes a
new version. Tested live, on a phone, and across two accounts.

## Design

A cream page, a mint "left to spend" card, a lilac "THIS WEEK" pill, black outlines and
text, and the Hanken Grotesk font, chosen for a calm look with accessible contrast
(dark text on light fills). User-facing copy follows `docs/content-guidelines.md`.
