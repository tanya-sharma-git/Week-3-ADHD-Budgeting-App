"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SignedInHome({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  const firstName = name ? name.split(" ")[0] : null;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={700} color="primary">
          Welcome{firstName ? `, ${firstName}` : ""}
        </Typography>
        <Typography color="text.secondary">
          You are signed in as {email}.
        </Typography>
        <Typography color="text.secondary">
          Next we will build your budget. For now, this confirms sign-in works.
        </Typography>
        <Box>
          <Button onClick={signOut} variant="outlined">
            Sign out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
