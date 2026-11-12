"use client";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Onboarding({ onDone }: { onDone: () => void }) {
  return (
    <Container maxWidth="sm">
      <Stack
        spacing={3}
        sx={{
          minHeight: "80dvh",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={700} color="primary">
          Welcome to Penny Pal
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Budgeting apps can be a lot. Penny Pal is one number: what's left to
          spend this week. Set your monthly budget to get yours, and change it
          anytime.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="large" onClick={onDone}>
            Set my budget
          </Button>
          <Button variant="text" onClick={onDone}>
            Skip for now
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
