import { describe, it, expect } from "vitest";
import { thisWeekBudget } from "./dates";

// These tests protect the "Weekly mini-budgets" acceptance criteria:
// partial weeks are handled sensibly AND the weekly amounts still add up
// to the monthly budget.
describe("thisWeekBudget (weekly mini-budgets)", () => {
  // Check 1: a full week gets its fair share of the month.
  it("gives a full week its fair share of the month", () => {
    // Wed 14 Jan 2026 sits in a full Mon–Sun week inside a 31-day month.
    const share = thisWeekBudget(3100, new Date(2026, 0, 14));
    expect(share).toBe(700); // 3100 ÷ 31 days × 7 days = 700
  });

  // Check 2: every week's share adds back up to the full monthly budget.
  it("splits a month into weeks that add up to the whole budget", () => {
    const monthly = 3100;
    // One date inside each Mon–Sun week that touches January 2026.
    const weekDates = [
      new Date(2026, 0, 1), // week of Dec 29 – Jan 4 (4 days in January)
      new Date(2026, 0, 5), // Jan 5 – 11
      new Date(2026, 0, 12), // Jan 12 – 18
      new Date(2026, 0, 19), // Jan 19 – 25
      new Date(2026, 0, 26), // Jan 26 – Feb 1 (6 days in January)
    ];
    const total = weekDates.reduce(
      (sum, d) => sum + thisWeekBudget(monthly, d),
      0,
    );
    expect(total).toBe(3100); // no money lost or invented
  });
});
