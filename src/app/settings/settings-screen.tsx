"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SettingsScreen({ email }: { email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={3} sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component={Link} href="/" aria-label="Back to home">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight={700}>
            Settings
          </Typography>
        </Box>

        <Typography color="text.secondary">Signed in as {email}</Typography>

        <Divider />

        <Box>
          <Typography variant="h6">Your data</Typography>
          <Typography color="text.secondary">
            See everything stored about you and delete your account. We'll build
            this next.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6">Security and privacy</Typography>
          <Typography color="text.secondary">
            How your data is protected, in plain language. We'll build this next.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Button variant="outlined" color="error" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
