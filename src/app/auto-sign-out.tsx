"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const AUTO_SIGNOUT_KEY = "pennypal.autoSignOut";
const IDLE_MINUTES = 15;

// When the user has turned on auto sign-out, this watches for activity and
// signs them out after IDLE_MINUTES of none. It renders nothing.
export default function AutoSignOut() {
  const router = useRouter();

  useEffect(() => {
    let enabled = false;
    try {
      enabled = localStorage.getItem(AUTO_SIGNOUT_KEY) === "on";
    } catch {
      enabled = false;
    }
    if (!enabled) return;

    let timer: ReturnType<typeof setTimeout>;

    async function signOut() {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
    }

    function reset() {
      clearTimeout(timer);
      timer = setTimeout(signOut, IDLE_MINUTES * 60 * 1000);
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) =>
      window.addEventListener(e, reset, { passive: true }),
    );
    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [router]);

  return null;
}
