# ADR-0005: Add a CI pipeline with automated tests and a skills gate-check

## Date and status
November 20, 2026. Accepted.

## Context
Penny Pal is built and live. As we keep changing it, a code change can quietly
break something that worked before (a regression). The Week 5 residency
assignment asks us to add a CI pipeline, automatic checks that run on every
push, so breakages are caught before they reach users. We also want to protect
the 3 Week 1 skills from being deleted or broken.

## Options
- **Manual testing only** (not chosen): nothing catches a regression until a
  person notices, maybe after it is already live.
- **A CI pipeline on GitHub Actions** (chosen): build, lint, automated tests,
  and a skills gate-check run on every push; a failing check flags the push.
- **The same plus branch protection** (not chosen): branch protection is a paid
  feature, and the assignment says it is not needed on the free plan.

## Decision
Add a CI pipeline at `.github/workflows/ci.yml` that runs on every push: build,
lint, test (Vitest), and a skills gate-check. The automated tests come from our
MVP acceptance criteria (first one: the weekly mini-budget split). The
gate-check confirms the 3 Week 1 skills (accessibility, design-systems,
security) are present and valid.

## Consequences
- Easier: regressions get caught automatically on every push; a broken skill
  fails the pipeline; proven to pass on good code and fail on a deliberate break.
- Harder: we maintain the tests as the app grows; the Vitest tool needed a
  "legacy-peer-deps" setting, recorded in a root `.npmrc` so Vercel and GitHub
  install the same way; two lint rules were adjusted (apostrophes kept, a React
  note set to a warning).
- Next: add a few more tests from other acceptance criteria; write and run 2
  manual test case scenarios.
