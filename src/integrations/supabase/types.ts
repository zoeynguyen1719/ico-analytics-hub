export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      basic_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ICO: {
        Row: {
          "ATH ROI": number | null
          created_at: string
          description: string | null
          distributed_percentage: number | null
          hard_cap: string | null
          "ICO date": string | null
          id: number
          kyc_required: boolean | null
          Platform: string | null
          Price: number | null
          "Project Name": string | null
          restricted_countries: string[] | null
          roadmap: Json | null
          ROI: number | null
          "Sale Price": number | null
          slug: string | null
          social_links: Json | null
          team_members: Json | null
          token_metrics: Json | null
          token_price: string | null
          token_supply: number | null
          token_type: string | null
          website_url: string | null
          whitepaper_url: string | null
        }
        Insert: {
          "ATH ROI"?: number | null
          created_at?: string
          description?: string | null
          distributed_percentage?: number | null
          hard_cap?: string
          "ICO date"?: string | null
          id?: number
          kyc_required?: boolean | null
          Platform?: string | null
          Price?: number | null
          "Project Name"?: string | null
          restricted_countries?: string[] | null
          roadmap?: Json | null
          ROI?: number | null
          "Sale Price"?: number | null
          slug?: string | null
          social_links?: Json | null
          team_members?: Json | null
          token_metrics?: Json | null
          token_price?: string | null
          token_supply?: number | null
          token_type?: string | null
          website_url?: string | null
          whitepaper_url?: string | null
        }
        Update: {
          "ATH ROI"?: number | null
          created_at?: string
          description?: string | null
          distributed_percentage?: number | null
          hard_cap?: string | null
          "ICO date"?: string | null
          id?: number
          kyc_required?: boolean | null
          Platform?: string | null
          Price?: number | null
          "Project Name"?: string | null
          restricted_countries?: string[] | null
          roadmap?: Json | null
          ROI?: number | null
          "Sale Price"?: number | null
          slug?: string | null
          social_links?: Json | null
          team_members?: Json | null
          token_metrics?: Json | null
          token_price?: string | null
          token_supply?: number | null
          token_type?: string | null
          website_url?: string | null
          whitepaper_url?: string | null
        }
        Relationships: []
      }
      research_reports: {
        Row: {
          category: string
          created_at: string
          description: string
          document_name: string
          document_url: string | null
          icon: string
          id: string
          pdf_url: string | null
          thumbnail_url: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          document_name: string
          document_url?: string | null
          icon: string
          id?: string
          pdf_url?: string | null
          thumbnail_url?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          document_name?: string
          document_url?: string | null
          icon?: string
          id?: string
          pdf_url?: string | null
          thumbnail_url?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          id: string
          status: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      website_visits: {
        Row: {
          created_at: string
          id: string
          is_authenticated: boolean | null
          page_visited: string
          user_id: string | null
          visit_duration: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_authenticated?: boolean | null
          page_visited: string
          user_id?: string | null
          visit_duration?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_authenticated?: boolean | null
          page_visited?: string
          user_id?: string | null
          visit_duration?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: "basic" | "premium" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface SubscriptionTier {
  name: string;
  price: string;
  priceId: string | null;
  features: string[];
  buttonText: string;
  highlighted: boolean;
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due';
