import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Keep natural apostrophes in copy (e.g. "can't"). This rule is
      // over-cautious about apostrophes in React, so we turn it off.
      "react/no-unescaped-entities": "off",
      // A React performance suggestion seen on 2 screens. Keep it visible
      // as a warning (it still shows in the log) but it does not block
      // the pipeline.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
