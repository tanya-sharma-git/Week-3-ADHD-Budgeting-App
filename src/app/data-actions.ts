"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Deletes all of the signed-in user's data (their entries and budget).
// Runs on the server under the user's session, so Row Level Security makes
// sure it only ever touches this user's own rows. The login itself stays.
export async function deleteMyData(): Promise<{ ok?: true; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You're not signed in." };

  const entries = await supabase
    .from("transactions")
    .delete()
    .eq("user_id", user.id);
  if (entries.error) return { error: entries.error.message };

  const budgets = await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id);
  if (budgets.error) return { error: budgets.error.message };

  revalidatePath("/");
  revalidatePath("/settings");
  return { ok: true };
}
