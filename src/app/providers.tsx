"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Penny Pal theme: cream page, mint and lilac accents, black outlines and text.
const INK = "#161616";

const theme = createTheme({
  palette: {
    primary: { main: INK },
    secondary: { main: "#6a5fd0" },
    background: { default: "#fbf8ee", paper: "#ffffff" },
    text: { primary: INK, secondary: "#444441" },
    divider: INK,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-hanken), system-ui, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10 },
        outlined: {
          borderColor: INK,
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5, borderColor: INK },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: INK, borderWidth: 1.5 },
      },
    },
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
