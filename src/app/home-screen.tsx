"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Transaction } from "./transaction-actions";
import BudgetCard from "./budget-card";
import TransactionsCard from "./transactions-card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function HomeScreen({
  name,
  initialBudget,
  initialTransactions,
}: {
  name: string | null;
  initialBudget: number | null;
  initialTransactions: Transaction[];
}) {
  const router = useRouter();
  const firstName = name ? name.split(" ")[0] : null;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} sx={{ py: 6 }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight={700}
          color="primary"
          sx={{ textAlign: "center" }}
        >
          {firstName ? `Hi, ${firstName}` : "Penny Pal"}
        </Typography>

        <BudgetCard initialBudget={initialBudget} />

        <Divider />

        <TransactionsCard initialTransactions={initialTransactions} />

        <Box sx={{ textAlign: "center" }}>
          <Button variant="text" color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
