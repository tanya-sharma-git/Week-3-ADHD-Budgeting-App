import { createClient } from "@supabase/supabase-js";

// The app's connection to the Supabase database.
// The URL and key are read from .env.local (kept private, never committed).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
