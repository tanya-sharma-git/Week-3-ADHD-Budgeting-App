# Penny Pal MVP #1: Acceptance Criteria (the build contract)

These are copied from Tanya's Week 2 backlog tickets, which are the source of truth.
Before building any feature, read its criteria here, quote them back to Tanya, and
confirm. After building, grade the result against each criterion, in front of Tanya.

Links go to the live tickets in Notion.

---

## Sign-up / login  (Epic 3)
Ticket: https://app.notion.com/p/40f71f8c85e08149a170d182da14ced6

**User story:** As someone with ADHD who hates remembering passwords, I want Google
sign-in with no password, so that getting in is one quick step.

**In scope:** Google sign-in only. **Out of scope (MVP):** email and other methods
(email is a post-launch fast-follow).

**Acceptance criteria:**
- GIVEN I'm on the welcome screen, WHEN I tap "Continue with Google", THEN I'm signed in within two taps.
- GIVEN I'm signing up for the first time, WHEN I create my account, THEN I'm never asked to create a password.
- GIVEN I cancel the Google sign-in prompt, WHEN I return to the welcome screen, THEN I see a calm message AND I can try again.
- GIVEN I don't have a Google account, WHEN I reach the welcome screen, THEN I see a plain, non-judgmental message that Google sign-in is the only option for now, AND I'm pointed to how to create a Google account, AND email sign-in is noted as coming soon.

---

## Simple onboarding & friendly tone  (Epic 3)
Ticket: https://app.notion.com/p/40f71f8c85e081eea66bc30582ed3459

**User story:** As someone with ADHD who bounces off complicated apps, I want a simple,
friendly welcome to my first budget, so that I don't give up before I start.

**Acceptance criteria:**
- GIVEN I just signed up, WHEN onboarding runs, THEN it's a few friendly steps ending at setting my first budget.
- GIVEN I land on any empty screen, WHEN I see it, THEN the wording is encouraging, not scolding.
- GIVEN I skip or quit onboarding partway, WHEN I return, THEN I can pick up at setting my budget without starting over.

---

## Set your budget  (Epic 1)
Ticket: https://app.notion.com/p/40f71f8c85e0815bb336d8e77cc215fd

**User story:** As someone with ADHD who finds open-ended budgeting overwhelming, I want
to set a monthly budget with light guidance, so that I'm not starting from a blank page.

**Acceptance criteria:**
- GIVEN I'm on the budget setup screen, WHEN I enter a monthly amount and tap Save, THEN the amount is saved AND I see it split into weekly amounts on the home screen.
- GIVEN I'm unsure what amount to pick, WHEN I tap "Help me set it", THEN the app suggests a starting amount AND I can adjust it before saving.
- GIVEN I already have a monthly budget, WHEN I change the amount and save, THEN the weekly amounts update to match.
- GIVEN I'm on the budget setup screen, WHEN I try to save with no amount or a non-number, THEN saving is blocked AND I see a calm, plain-language prompt to enter a number, with no scolding.

---

## Weekly mini-budgets  (Epic 1)
Ticket: https://app.notion.com/p/40f71f8c85e08170a1b8f60c27d89856

**User story:** As someone with ADHD who struggles to plan across a whole month, I want
my budget split into weekly amounts, so that I can focus on one week at a time.

**Acceptance criteria:**
- GIVEN I've set a monthly budget, WHEN I open the home screen, THEN this week's amount is shown front and centre.
- GIVEN the month doesn't divide into equal weeks, WHEN the split is calculated, THEN partial weeks are handled sensibly AND the weekly amounts still add up to my monthly budget.
- GIVEN I change my monthly budget, WHEN I save the change, THEN the weekly amounts recalculate.

---

## Quick manual add  (Epic 2)
Ticket: https://app.notion.com/p/40f71f8c85e081ad8daafa93dd27a54c

**User story:** As someone with ADHD who abandons tedious apps, I want to log money I
spend or receive in a couple of taps, so that tracking doesn't take more focus than I have.

**Acceptance criteria:**
- GIVEN I'm on the home screen, WHEN I add an expense (amount and category), THEN it's saved in three taps or fewer AND my totals update.
- GIVEN I'm on the home screen, WHEN I add income (amount), THEN it's saved the same quick way AND my totals update.
- GIVEN I made a mistake on an entry, WHEN I edit or delete it, THEN the totals correct.
- GIVEN I don't choose a category, WHEN I save the entry, THEN it still saves AND it's filed as "Uncategorized".

---

## Default categories  (Epic 2)
Ticket: https://app.notion.com/p/40f71f8c85e08147a8d6fe0a9c7b1eaa

**User story:** As someone with ADHD who gets stuck on setup, I want ready-made
categories, so that I can start without a setup rabbit hole.

**Acceptance criteria:**
- GIVEN I'm logging an expense, WHEN I pick a category, THEN I can choose from a set of sensible default categories.
- GIVEN I don't want to choose a category, WHEN I skip it, THEN the expense saves as "Uncategorized".

---

## Left to spend view  (Epic 1, flagship)
Ticket: https://app.notion.com/p/40f71f8c85e0810da015c354367d9456

**User story:** As someone with ADHD prone to impulse spending, I want to see "Left to
spend" this week at a glance, so that I can decide in the moment without losing track.

**Acceptance criteria:**
- GIVEN I've logged some spending this week, WHEN I open the app, THEN I see "Left to spend" = this week's budget minus this week's spending.
- GIVEN I've spent more than this week's budget, WHEN I open the app, THEN it shows I'm over calmly, with no shaming, AND it shows what next week looks like.
- GIVEN a new week starts, WHEN Monday arrives, THEN "Left to spend" resets to the new week's budget.

---

## See and delete my data  (Epic 3)
Ticket: https://app.notion.com/p/40f71f8c85e081c08e43dfc2e6641fda

**User story:** As someone with ADHD who needs to trust the app with money, I want to see
and delete all my data, so that I stay in control.

**MVP scope:** deletes all the user's data (budget, entries, profile) but keeps the login record. Full account deletion is a fast-follow (needs the Supabase service_role key, deferred).

**Acceptance criteria:**
- GIVEN I'm signed in, WHEN I open "My data", THEN I see everything stored about me in plain words.
- GIVEN I choose to delete my data, WHEN I confirm, THEN all my data is removed.
- GIVEN I start deleting my data, WHEN I cancel at the confirmation step, THEN nothing is deleted AND my data is unchanged.

---

## Light security  (Epic 3)
Ticket: https://app.notion.com/p/40f71f8c85e081bbba83ce2195a3635a

**User story:** As someone with ADHD who needs to trust the app with money, I want my data
kept secure and private with light, optional protection, so that I feel safe using it.

**Build note:** This ticket is written for a phone (Face ID / PIN app lock). Penny Pal is
a web app, so the app lock needs a web-friendly adaptation (for example an optional app
password or an auto-logout after inactivity). Record that choice as a new ADR before
building. Encryption at rest is provided by Supabase; HTTPS is provided by Vercel.

**Acceptance criteria (adapt the "app lock" ones to the web):**
- GIVEN app lock is on, WHEN I open the app, THEN it asks to unlock before showing anything.
- GIVEN the primary unlock fails or isn't available, WHEN I'm prompted, THEN I can use a fallback.
- GIVEN app lock is off, WHEN I open the app, THEN it opens straight to my budget.
- GIVEN I'm using the app, WHEN my data is stored or sent, THEN it's encrypted at rest AND sent over HTTPS.
- GIVEN I want to understand my privacy, WHEN I read the privacy note, THEN it's in plain language AND it confirms the app never stores my bank passwords.
