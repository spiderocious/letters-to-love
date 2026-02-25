import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Single client — auth session is used for both reader and admin.
// Admin writes are protected by RLS policies checking auth.uid().
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Alias used by admin features — same client, writes permitted via RLS when logged in
export const supabaseAdmin = supabase
