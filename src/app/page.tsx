import { createClient } from "@/lib/supabase/server";
import Welcome from "./welcome";
import BudgetScreen from "./budget-screen";

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

  // Load this month's budget for the signed-in user (if any).
  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { data: budget } = await supabase
    .from("budgets")
    .select("amount")
    .eq("user_id", user.id)
    .eq("month", firstOfMonth)
    .maybeSingle();

  const name = (user.user_metadata?.full_name as string | undefined) ?? null;

  return (
    <BudgetScreen
      initialBudget={budget ? Number(budget.amount) : null}
      name={name}
    />
  );
}
