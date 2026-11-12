"use client";

import { useState } from "react";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  type Transaction,
} from "./transaction-actions";
import { DEFAULT_CATEGORIES, UNCATEGORIZED } from "@/lib/categories";
import { todayStr } from "@/lib/dates";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TransactionsCard({
  transactions,
  onTransactionsChange,
}: {
  transactions: Transaction[];
  onTransactionsChange: (next: Transaction[]) => void;
}) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<string>(UNCATEGORIZED);
  const [date, setDate] = useState(todayStr());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function resetForm() {
    setAmount("");
    setType("expense");
    setCategory(UNCATEGORIZED);
    setDate(todayStr());
    setEditingId(null);
    setError(null);
  }

  async function handleSave() {
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) {
      setError("Enter an amount to save.");
      return;
    }
    setSaving(true);
    const payload = {
      amount: num,
      type,
      category:
        type === "expense" && category !== UNCATEGORIZED ? category : null,
      occurred_on: date,
    };
    const result = editingId
      ? await updateTransaction(editingId, payload)
      : await addTransaction(payload);
    setSaving(false);
    if (result.error || !result.transaction) {
      setError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    const saved = result.transaction;
    if (editingId) {
      onTransactionsChange(
        transactions.map((t) => (t.id === editingId ? saved : t)),
      );
    } else {
      onTransactionsChange([saved, ...transactions]);
    }
    resetForm();
  }

  function startEdit(t: Transaction) {
    setEditingId(t.id);
    setAmount(String(t.amount));
    setType(t.type);
    setCategory(t.category ?? UNCATEGORIZED);
    setDate(t.occurred_on);
    setError(null);
  }

  async function handleDelete(id: string) {
    const previous = transactions;
    onTransactionsChange(transactions.filter((t) => t.id !== id));
    if (editingId === id) resetForm();
    const result = await deleteTransaction(id);
    if (result.error) {
      onTransactionsChange(previous);
      setError(result.error);
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">This week's spending</Typography>

      <Box sx={{ p: 2, borderRadius: 2, bgcolor: "action.hover" }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">
            {editingId ? "Edit entry" : "Add an entry"}
          </Typography>

          {error && <Alert severity="info">{error}</Alert>}

          <ToggleButtonGroup
            exclusive
            size="small"
            value={type}
            onChange={(_, v) => {
              if (v === "income" || v === "expense") setType(v);
            }}
            fullWidth
          >
            <ToggleButton value="expense">Expense</ToggleButton>
            <ToggleButton value="income">Income</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />

          {type === "expense" && (
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              {[UNCATEGORIZED, ...DEFAULT_CATEGORIES].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update" : "Save"}
            </Button>
            {editingId && (
              <Button variant="text" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {transactions.length === 0 ? (
        <Typography color="text.secondary">
          Add your first entry to start tracking your spending.
        </Typography>
      ) : (
        <Stack spacing={1}>
          {transactions.map((t) => (
            <Box
              key={t.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                py: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box>
                <Typography>
                  {t.type === "income" ? "+" : "-"}$
                  {Number(t.amount).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.type === "income"
                    ? "Income"
                    : (t.category ?? UNCATEGORIZED)}{" "}
                  · {t.occurred_on}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="text" onClick={() => startEdit(t)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
