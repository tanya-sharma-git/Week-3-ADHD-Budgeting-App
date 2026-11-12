// Penny Pal's default spending categories (kept short on purpose: ADHD
// research favors a handful of broad categories over long lists, so logging
// stays fast). Custom categories are a later feature (Epic 4).
export const DEFAULT_CATEGORIES = [
  "Food & groceries",
  "Eating out",
  "Transport",
  "Bills & utilities",
  "Shopping",
  "Fun",
  "Health",
] as const;

// Shown when no category is chosen.
export const UNCATEGORIZED = "Uncategorized";
