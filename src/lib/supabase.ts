import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      phone_submissions: {
        Row: {
          id: string
          phone_number: string
          created_at: string
        }
        Insert: {
          id?: string
          phone_number: string
          created_at?: string
        }
        Update: {
          id?: string
          phone_number?: string
          created_at?: string
        }
      }
    }
  }
}