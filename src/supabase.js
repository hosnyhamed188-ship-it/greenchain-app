import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

if (!isSupabaseConfigured) {
  console.warn('Supabase is not fully configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env or Vercel env settings.')
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://example.supabase.co', 'unsafe-anon-key')

export { isSupabaseConfigured }