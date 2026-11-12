import { createClient } from "@/lib/supabase/server";
import { thisWeekRange } from "@/lib/dates";
import Welcome from "./welcome";
import HomeScreen from "./home-screen";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  const { auth } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Welcome authError={auth === "error"} />;
  }

  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { data: budget } = await supabase
    .from("budgets")
    .select("amount")
    .eq("user_id", user.id)
    .eq("month", firstOfMonth)
    .maybeSingle();

  const { weekStart, weekEnd } = thisWeekRange(now);
  const { data: txs } = await supabase
    .from("transactions")
    .select("id, amount, type, category, occurred_on")
    .eq("user_id", user.id)
    .gte("occurred_on", weekStart)
    .lte("occurred_on", weekEnd)
    .order("occurred_on", { ascending: false })
    .order("created_at", { ascending: false });

  const name = (user.user_metadata?.full_name as string | undefined) ?? null;

  return (
    <HomeScreen
      name={name}
      initialBudget={budget ? Number(budget.amount) : null}
      initialTransactions={(txs ?? []).map((t) => ({
        ...t,
        amount: Number(t.amount),
      }))}
    />
  );
}
