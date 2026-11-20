---
name: design-systems
description: Principles for consistent, enterprise-ready software design systems. Use whenever designing, building, reviewing, or writing any user-facing software, feature, interface, or product copy — to check the work for consistency against design-system best practices.
---

# Design Systems — consistency at scale

A design system is a shared set of reusable parts and rules (components, and design tokens — named values for things like color, spacing, and type) so that everything looks and behaves consistently. Apply the guidance below when building or reviewing anything user-facing. Catch issues early; when unsure, follow the "Do" and avoid the "Don't".

**Do**
- Reuse existing components and design tokens (shared values for color, spacing, and type) instead of inventing new ones.
- Keep naming and terminology consistent — one word per action, everywhere.
- Follow the documented voice (constant personality) and adjust tone to the situation.
- Document any genuinely new pattern so the system stays a single source of truth.

**Avoid**
- Hard-coding values (e.g. a raw color) when a token for it already exists.
- Rebuilding a component that already exists.
- Using different labels for the same action in different places.

## Sources (authoritative)
- Material Design (m3.material.io), IBM Carbon, Shopify Polaris
