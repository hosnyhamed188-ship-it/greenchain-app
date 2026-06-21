import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oeojlmldcqzbacdbgpio.supabase.co"
const supabaseKey = "sb_publishable_g5pgbjRZqfu6U4hP1E82Pg_BD9SLBTv"

export const supabase = createClient(supabaseUrl, supabaseKey)