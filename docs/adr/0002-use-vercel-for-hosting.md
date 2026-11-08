# ADR-0002: Use Vercel for hosting

## Date and status
November 8, 2026. Accepted.

## Context
We need to put Penny Pal (a Next.js app) on the internet with a public web
address, while its data lives in Supabase. The Week 4 residency assignment
requires Vercel. This ADR records that decision and why it is a sound fit.

## Options
This host was required by the assignment, so we did not run a full comparison.
For reference:

- **Vercel** (required / chosen): made by the same company as Next.js, so it
  publishes automatically every time you push to GitHub; free tier; gives a
  public your-app.vercel.app address; runs the servers for you.
- **Netlify or other hosts** (not chosen): also host web apps, but less seamless
  with Next.js's newest features, and another tool to learn.

## Decision
Use Vercel, as required by the assignment. It is the natural home for a Next.js
app: push to GitHub and it publishes automatically, free, with a public address,
and no servers to manage.

## Consequences
- Easier: automatic publishing on each push; a free public link; no server upkeep.
- Harder: we keep secret keys in Vercel's environment settings, not in the code.
- Next: connect the GitHub repo to Vercel and add the Supabase keys there.
