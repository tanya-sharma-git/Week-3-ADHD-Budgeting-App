---
name: security
description: Principles for protecting users and their data in enterprise-ready software. Use whenever designing, building, reviewing, or writing any user-facing software, feature, interface, or product copy — to check the work against security best practices.
---

# Security — protect users and their data

Security means protecting people and their information from harm, mistakes, and attackers. Apply the guidance below when building or reviewing anything user-facing. Catch issues early; when unsure, follow the "Do" and avoid the "Don't".

**Do**
- Apply least privilege (give each part the minimum access it needs) and defense in depth (multiple layers of protection) by default.
- Validate and sanitize all input from users or outside sources; never trust it. (Sanitize = clean input so it can't be used to attack the system.)
- Encrypt sensitive data; use proven, standard libraries rather than custom cryptography. (A library is a ready-made bundle of code others wrote and tested; cryptography is the math that scrambles data so only the right people can read it.)
- Keep secrets (passwords, keys) out of the code; keep dependencies patched. (A dependency is outside code your software relies on; patching means updating it to fix known flaws.)
- For AI features: guard against prompt injection (hidden instructions in content that try to hijack the AI) and limit how much the agent can act on its own.

**Avoid**
- Putting secrets in code or committing them to a repository (a repository, or "repo," is the shared storage where a project's code lives).
- Trusting user input, writing your own encryption, or exposing internal details in error messages.

## Sources (authoritative)
- OWASP (owasp.org), including the OWASP Top 10 for LLM Applications
