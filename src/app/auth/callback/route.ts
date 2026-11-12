import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Google sends the user back here after they approve sign-in.
// We trade the one-time code for a real session, then send them home.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code, or something went wrong: back to the welcome screen with a flag.
  return NextResponse.redirect(`${origin}/?auth=error`);
}
