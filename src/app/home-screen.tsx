"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Transaction } from "./transaction-actions";
import { thisWeekBudget } from "@/lib/dates";
import BudgetCard from "./budget-card";
import TransactionsCard from "./transactions-card";
import AutoSignOut from "./auto-sign-out";
import Onboarding from "./onboarding";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => {
    if (budget !== null) {
      setShowWelcome(false);
      return;
    }
    let seen = false;
    try {
      seen = localStorage.getItem("pennypal.seenOnboarding") === "yes";
    } catch {
      seen = false;
    }
    setShowWelcome(!seen);
  }, [budget]);

  function finishOnboarding() {
    try {
      localStorage.setItem("pennypal.seenOnboarding", "yes");
    } catch {
      // Browser storage unavailable; onboarding just won't be remembered.
    }
    setShowWelcome(false);
  }

  if (showWelcome) {
    return <Onboarding onDone={finishOnboarding} />;
  }

  return (
    <Container maxWidth="sm">
      <AutoSignOut />
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="h6" color="text.secondary">
                Left to spend this week
              </Typography>
              <Tooltip
                enterTouchDelay={0}
                title="Resets every Monday. Each day gets an equal slice of your budget, so a shorter week gets less, and it all adds up."
              >
                <IconButton
                  size="small"
                  aria-label="How Left to spend is calculated"
                >
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
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
