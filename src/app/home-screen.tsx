"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Transaction } from "./transaction-actions";
import { thisWeekBudget } from "@/lib/dates";
import BudgetCard from "./budget-card";
import TransactionsCard from "./transactions-card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";

export default function HomeScreen({
  name,
  initialBudget,
  initialTransactions,
}: {
  name: string | null;
  initialBudget: number | null;
  initialTransactions: Transaction[];
}) {
  const firstName = name ? name.split(" ")[0] : null;

  const [budget, setBudget] = useState<number | null>(initialBudget);
  const [txs, setTxs] = useState<Transaction[]>(initialTransactions);

  const thisWeek = budget !== null ? thisWeekBudget(budget) : null;
  const spent = useMemo(
    () =>
      txs
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [txs],
  );
  const left = thisWeek !== null ? thisWeek - spent : null;

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight={700}
            color="primary"
          >
            {firstName ? `Hi, ${firstName}` : "Penny Pal"}
          </Typography>
          <IconButton component={Link} href="/settings" aria-label="Settings">
            <SettingsIcon />
          </IconButton>
        </Box>

        {thisWeek !== null && left !== null && (
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Left to spend this week
            </Typography>
            {left >= 0 ? (
              <>
                <Typography variant="h2" fontWeight={700} color="primary">
                  ${left.toLocaleString()}
                </Typography>
                <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                  You've spent ${spent.toLocaleString()} of your $
                  {thisWeek.toLocaleString()} this week.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h2" fontWeight={700}>
                  $0
                </Typography>
                <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                  You've spent ${spent.toLocaleString()}, that's $
                  {Math.abs(left).toLocaleString()} over your $
                  {thisWeek.toLocaleString()} this week. Next week resets to $
                  {thisWeek.toLocaleString()}.
                </Typography>
              </>
            )}
          </Stack>
        )}

        <BudgetCard budget={budget} onBudgetChange={setBudget} />

        <Divider />

        <TransactionsCard transactions={txs} onTransactionsChange={setTxs} />
      </Stack>
    </Container>
  );
}
