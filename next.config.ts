import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard rendering. The experimental cacheComponents / partialPrefetching
  // options were removed because our pages depend on who is signed in, which is
  // dynamic per request. We can revisit these optimizations after launch.
};

export default nextConfig;
