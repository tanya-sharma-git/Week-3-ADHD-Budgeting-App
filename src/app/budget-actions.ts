"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// The first day of the current month, as YYYY-MM-01.
function firstOfThisMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

// Saves (or updates) the signed-in user's budget for this month.
// Runs on the server, under the user's session, so Row Level Security applies.
export async function saveBudget(
  amount: number,
): Promise<{ ok?: true; error?: string }> {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter a number to save." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You're not signed in." };

  const month = firstOfThisMonth();

  const { data: existing } = await supabase
    .from("budgets")
    .select("id")
    .eq("user_id", user.id)
    .eq("month", month)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("budgets")
      .update({ amount })
      .eq("id", existing.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("budgets")
      .insert({ user_id: user.id, amount, month });
    if (error) return { error: error.message };
  }

  revalidatePath("/");
  return { ok: true };
}
