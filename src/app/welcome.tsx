"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";

export default function Welcome({ authError }: { authError: boolean }) {
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

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
        <Typography variant="h3" component="h1" fontWeight={700} color="primary">
          Penny Pal
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Budgeting that works with your ADHD brain, not against it.
        </Typography>

        {authError && (
          <Alert severity="info" sx={{ textAlign: "left" }}>
            No problem, that didn't go through. You can try again whenever
            you're ready.
          </Alert>
        )}

        <Box>
          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            variant="contained"
            size="large"
            startIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          No password to create or remember.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Google sign-in is the only way in for now. Don't have a Google
          account? You can{" "}
          <Link
            href="https://accounts.google.com/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            create one here
          </Link>
          . Email sign-in is coming soon.
        </Typography>
      </Box>
    </Container>
  );
}
