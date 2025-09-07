import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("[v0] Supabase environment variables not found. Using mock data.")
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// 데이터베이스 타입 정의
export interface Briefing {
  id: string
  date: string
  content: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  briefing_id: string
  category_id: string
  title: string
  url: string
  media_outlet: string
  journalist_name?: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  article_count: number
}

export interface BriefingStats {
  briefing_id: string
  total_articles: number
  categories: Category[]
}
