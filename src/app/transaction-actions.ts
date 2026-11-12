"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string | null;
  occurred_on: string;
};

type TxInput = {
  amount: number;
  type: "income" | "expense";
  category: string | null;
  occurred_on: string;
};

const COLUMNS = "id, amount, type, category, occurred_on";

function validate(input: TxInput): string | null {
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    return "Enter an amount to save.";
  }
  if (input.type !== "income" && input.type !== "expense") {
    return "Choose income or expense.";
  }
  return null;
}

export async function addTransaction(
  input: TxInput,
): Promise<{ ok?: true; transaction?: Transaction; error?: string }> {
  const problem = validate(input);
  if (problem) return { error: problem };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You're not signed in." };

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      amount: input.amount,
      type: input.type,
      category: input.category,
      occurred_on: input.occurred_on,
    })
    .select(COLUMNS)
    .single();

  if (error) return { error: error.message };
  revalidatePath("/");
  return { ok: true, transaction: { ...data, amount: Number(data.amount) } };
}

export async function updateTransaction(
  id: string,
  input: TxInput,
): Promise<{ ok?: true; transaction?: Transaction; error?: string }> {
  const problem = validate(input);
  if (problem) return { error: problem };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .update({
      amount: input.amount,
      type: input.type,
      category: input.category,
      occurred_on: input.occurred_on,
    })
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) return { error: error.message };
  revalidatePath("/");
  return { ok: true, transaction: { ...data, amount: Number(data.amount) } };
}

export async function deleteTransaction(
  id: string,
): Promise<{ ok?: true; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { ok: true };
}
