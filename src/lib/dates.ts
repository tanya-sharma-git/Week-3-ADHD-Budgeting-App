// Date helpers shared by the server and the screens. Weeks start Monday.

function fmt(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// Today as YYYY-MM-DD.
export function todayStr(now = new Date()): string {
  return fmt(now);
}

// The Monday-to-Sunday range containing `now`, as YYYY-MM-DD strings.
export function thisWeekRange(now = new Date()): {
  weekStart: string;
  weekEnd: string;
} {
  const daysSinceMonday = (now.getDay() + 6) % 7;
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysSinceMonday,
  );
  const end = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 6,
  );
  return { weekStart: fmt(start), weekEnd: fmt(end) };
}

// This week's share of a monthly budget, split by days so partial weeks are
// proportional and every week adds up to the monthly total.
export function thisWeekBudget(monthly: number, now = new Date()): number {
  const daysSinceMonday = (now.getDay() + 6) % 7;
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysSinceMonday,
  );
  const weekEnd = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + 6,
  );

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const overlapStart = weekStart > monthStart ? weekStart : monthStart;
  const overlapEnd = weekEnd < monthEnd ? weekEnd : monthEnd;
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysThisWeekInMonth =
    overlapEnd >= overlapStart
      ? Math.round((overlapEnd.getTime() - overlapStart.getTime()) / msPerDay) +
        1
      : 0;

  return Math.round((monthly * daysThisWeekInMonth) / daysInMonth);
}
