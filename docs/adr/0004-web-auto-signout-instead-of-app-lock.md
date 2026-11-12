# ADR-0004: Use auto sign-out instead of a phone-style app lock

## Date and status
November 12, 2026. Accepted.

## Context
The "Light security" ticket was written for a phone: an app lock with Face ID or
a PIN. Penny Pal is a web app, where there is no native Face ID or PIN, and a PIN
kept in the browser is easy to bypass, so it would give a false sense of safety.
The real protection already comes from Google sign-in, Row Level Security (each
person sees only their own data), HTTPS in transit, and encryption at rest in
Supabase.

## Options
- **Face ID / PIN app lock** (from the ticket): native to phones, not available
  the same way on the web.
- **A PIN kept in the browser** (not chosen): looks secure but can be bypassed; a
  false sense of safety.
- **Auto sign-out after inactivity** (chosen): an optional setting that signs the
  user out after about 15 minutes idle, so an unattended, logged-in browser is
  not left open.
- **WebAuthn / passkeys** (not chosen): real biometric on the web, but heavy and
  inconsistent for an MVP.

## Decision
Adapt the phone "app lock" to the web as an optional **auto sign-out after
inactivity**. The genuine data protection is Google sign-in plus Row Level
Security plus HTTPS plus encryption at rest; auto sign-out adds honest protection
for an unattended session. On the web, "unlock" simply means signing back in.

## Consequences
- Easier: simple and honest, nothing fake.
- Harder: we run a small timer that watches for activity while signed in.
- The ticket's app-lock criteria are met in a web-appropriate way, and a browser
  PIN (security theater) was deliberately avoided.
