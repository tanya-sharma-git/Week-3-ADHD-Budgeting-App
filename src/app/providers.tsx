"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Penny Pal's calm, ADHD-friendly theme: soft green, gentle rounding.
const theme = createTheme({
  palette: {
    primary: { main: "#2e7d5b" },
    secondary: { main: "#5b8def" },
    background: { default: "#f7faf8" },
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
