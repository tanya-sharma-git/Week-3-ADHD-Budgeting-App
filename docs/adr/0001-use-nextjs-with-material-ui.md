# ADR-0001: Use Next.js with Material UI

## Date and status
November 8, 2026. Accepted.

## Context
We are building Penny Pal, a three-tier web app (screens, logic, database) hosted
on Vercel with data in Supabase. The Week 4 residency assignment requires this
stack — Next.js with Material UI for the screens. This ADR records that decision
and why it is a sound fit.

## Options
This stack was required by the assignment, so we did not run a full comparison.
For reference:

- **Next.js + Material UI** (required / chosen): one project for both the screens
  and the server logic; pairs smoothly with Vercel; accessible, ready-made components.
- **Plain React** (main alternative, not chosen): builds screens only; would need a
  separate setup for server logic; more pieces to maintain.

## Decision
Use Next.js with Material UI, as required by the assignment. It is a sound fit:
Next.js handles two of our three tiers in one project and deploys smoothly to
Vercel, and Material UI's consistent, accessible components support Penny Pal's
calm, non-overwhelming experience for people with ADHD.

## Consequences
- Easier: one project for the screens and the server logic; smooth Vercel deploys;
  a consistent look, fast.
- Harder: we learn the browser-vs-server distinction; we maintain one theme file.
- Next: Material UI theme set up (lavender); build screens with Material UI components.
