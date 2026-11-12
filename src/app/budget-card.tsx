"use client";

import { useState } from "react";
import { saveBudget } from "./budget-actions";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

export default function BudgetCard({
  budget,
  onBudgetChange,
}: {
  budget: number | null;
  onBudgetChange: (amount: number) => void;
}) {
  const [editing, setEditing] = useState(budget === null);
  const [amount, setAmount] = useState(budget !== null ? String(budget) : "");
  const [showHelp, setShowHelp] = useState(false);
  const [income, setIncome] = useState("");
  const [suggestion, setSuggestion] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleSuggest() {
    const inc = Number(income);
    if (!Number.isFinite(inc) || inc <= 0) {
      setError("Enter your monthly take-home pay as a number.");
      return;
    }
    const suggested = Math.round(inc * 0.8);
    setSuggestion(suggested);
    setAmount(String(suggested));
    setError(null);
  }

  async function handleSave() {
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) {
      setError("Enter a number to save.");
      return;
    }
    setSaving(true);
    const result = await saveBudget(num);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onBudgetChange(num);
    setEditing(false);
    setShowHelp(false);
    setError(null);
  }

  if (budget !== null && !editing) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography color="text.secondary">
          Monthly budget: ${budget.toLocaleString()}
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            setEditing(true);
            setAmount(String(budget));
          }}
        >
          Edit
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary" sx={{ textAlign: "center" }}>
        Set your monthly budget: the amount you plan to spend each month.
      </Typography>

      {error && <Alert severity="info">{error}</Alert>}

      <TextField
        label="Monthly budget ($)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />

      <Button
        variant="text"
        onClick={() => setShowHelp((s) => !s)}
        sx={{ alignSelf: "flex-start" }}
      >
        {showHelp ? "Hide help" : "Help me set it"}
      </Button>

      {showHelp && (
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: "action.hover" }}>
          <Stack spacing={2}>
            <TextField
              label="Monthly take-home pay ($)"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSuggest}>
              Suggest an amount
            </Button>
            {suggestion !== null && (
              <Box>
                <Typography>
                  A starting point: ${suggestion.toLocaleString()} a month.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on the 50/30/20 rule (Elizabeth Warren, All Your Worth).
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  It's a suggestion, not a limit. Change it however you like.
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        {budget !== null && (
          <Button
            variant="text"
            onClick={() => {
              setEditing(false);
              setError(null);
            }}
          >
            Cancel
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
