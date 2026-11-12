import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsScreen from "./settings-screen";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <SettingsScreen email={user.email ?? ""} />;
}
