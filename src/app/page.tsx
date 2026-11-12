import { createClient } from "@/lib/supabase/server";
import Welcome from "./welcome";
import SignedInHome from "./signed-in-home";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  const { auth } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Welcome authError={auth === "error"} />;
  }

  const name = (user.user_metadata?.full_name as string | undefined) ?? null;
  return <SignedInHome email={user.email ?? ""} name={name} />;
}
