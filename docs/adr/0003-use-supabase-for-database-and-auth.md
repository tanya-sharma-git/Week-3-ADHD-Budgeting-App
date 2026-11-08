# ADR-0003: Use Supabase for the database and sign-in

## Date and status
November 8, 2026. Accepted.

## Context
Penny Pal must store each person's budgets and transactions, let people sign up
and log in, and ensure each person sees only their own data. The Week 4 residency
assignment requires Supabase. This ADR records that decision and why it is a
sound fit.

## Options
This tool was required by the assignment, so we did not run a full comparison.
For reference:

- **Supabase** (required / chosen): a hosted database plus built-in sign-up and
  login and Row Level Security (per-person privacy); free tier; no server to run.
- **Building our own backend** (not chosen): full control, but far more work,
  more security risk, and servers to maintain, which is not realistic for a solo
  build.

## Decision
Use Supabase, as required by the assignment. It gives us the database, user
accounts, and per-user privacy rules out of the box on a free tier, covering the
"memory" layer of our app without running servers. It directly supports Penny
Pal's trust and safety goal: each person's financial data stays private to them.

## Consequences
- Easier: database, login, and privacy rules in one place; free; no upkeep.
- Harder: we must switch on Row Level Security for every table and test it, and
  keep Supabase keys out of GitHub.
- Next: design the database tables, create them in Supabase, and turn on Row
  Level Security.
