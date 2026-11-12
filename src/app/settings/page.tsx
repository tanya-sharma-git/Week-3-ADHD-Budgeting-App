import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsScreen from "./settings-screen";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { data: budget } = await supabase
    .from("budgets")
    .select("amount")
    .eq("user_id", user.id)
    .eq("month", firstOfMonth)
    .maybeSingle();

  const { count } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const name = (user.user_metadata?.full_name as string | undefined) ?? null;

  return (
    <SettingsScreen
      name={name}
      email={user.email ?? ""}
      budgetAmount={budget ? Number(budget.amount) : null}
      entryCount={count ?? 0}
    />
  );
}
