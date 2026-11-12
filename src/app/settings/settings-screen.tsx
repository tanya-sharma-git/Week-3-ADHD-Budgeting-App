"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteMyData } from "../data-actions";
import AutoSignOut, { AUTO_SIGNOUT_KEY } from "../auto-sign-out";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SettingsScreen({
  name,
  email,
  budgetAmount,
  entryCount,
}: {
  name: string | null;
  email: string;
  budgetAmount: number | null;
  entryCount: number;
}) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDeleted, setJustDeleted] = useState(false);
  const [autoSignOut, setAutoSignOut] = useState(false);

  useEffect(() => {
    try {
      setAutoSignOut(localStorage.getItem(AUTO_SIGNOUT_KEY) === "on");
    } catch {
      setAutoSignOut(false);
    }
  }, []);

  function toggleAutoSignOut(on: boolean) {
    setAutoSignOut(on);
    try {
      localStorage.setItem(AUTO_SIGNOUT_KEY, on ? "on" : "off");
    } catch {
      // Browser storage unavailable; the toggle just won't persist.
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    const result = await deleteMyData();
    setDeleting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setConfirmOpen(false);
    setJustDeleted(true);
    router.refresh();
  }

  return (
    <Container maxWidth="sm">
      <AutoSignOut />
      <Stack spacing={3} sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component={Link} href="/" aria-label="Back to home">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight={700}>
            Settings
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Your data
          </Typography>

          {justDeleted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your data was deleted.
            </Alert>
          )}

          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Here's everything stored about you:
          </Typography>
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            <Typography>Name: {name ?? "not set"}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>
              Monthly budget:{" "}
              {budgetAmount !== null
                ? `$${budgetAmount.toLocaleString()}`
                : "not set"}
            </Typography>
            <Typography>Entries logged: {entryCount}</Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmOpen(true)}
          >
            Delete my data
          </Button>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Security and privacy
          </Typography>
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            <Typography color="text.secondary">
              Your budget and entries are encrypted where they're stored.
            </Typography>
            <Typography color="text.secondary">
              Everything travels over a secure (HTTPS) connection.
            </Typography>
            <Typography color="text.secondary">
              You sign in with Google, so Penny Pal never sees or stores a
              password.
            </Typography>
            <Typography color="text.secondary">
              Penny Pal never asks for or stores your bank passwords.
            </Typography>
          </Stack>
          <FormControlLabel
            control={
              <Switch
                checked={autoSignOut}
                onChange={(e) => toggleAutoSignOut(e.target.checked)}
              />
            }
            label="Sign me out after 15 minutes of inactivity"
          />
        </Box>

        <Divider />

        <Box>
          <Button variant="outlined" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      </Stack>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete your data?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This removes your budget and all your entries. It can't be undone.
            Your login stays, so you can start fresh anytime.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete my data"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
