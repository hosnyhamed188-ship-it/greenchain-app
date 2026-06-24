import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://oeojlmldcqzbacdbgpio.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_g5pgbjRZqfu6U4hP1E82Pg_BD9SLBTv"

console.log('Supabase Config:', {
  url: supabaseUrl ? 'loaded' : 'missing',
  key: supabaseKey ? 'loaded' : 'missing'
})

export const supabase = createClient(supabaseUrl, supabaseKey)