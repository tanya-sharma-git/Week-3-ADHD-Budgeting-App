"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Penny Pal's calm, ADHD-friendly theme: soft lavender, gentle rounding.
const theme = createTheme({
  palette: {
    primary: { main: "#5f4b8b" },
    secondary: { main: "#8d7bb8" },
    background: { default: "#f6f4fb" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
