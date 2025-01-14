export interface ICOProject {
  id?: number;
  "Project Name": string | null;
  "Price"?: number | null;
  "Sale Price"?: number | null;
  "ROI"?: number | null;
  "ATH ROI"?: number | null;
  "Platform"?: string | null;
  "ICO date"?: string | null;
  created_at?: string;
  description?: string | null;
  website_url?: string | null;
  whitepaper_url?: string | null;
  token_type?: string | null;
  token_price?: string | null;
  token_supply?: number | null;
  hard_cap?: string | null;
  distributed_percentage?: number | null;
  kyc_required?: boolean | null;
  restricted_countries?: string[] | null;
  social_links?: Record<string, any> | null;
  team_members?: Record<string, any> | null;
  roadmap?: Record<string, any> | null;
  token_metrics?: Record<string, any> | null;
  slug?: string | null;
  // UI specific fields
  symbol?: string;
  category?: string;
  type?: string;
  logo?: string;
  value?: string;
  isHighlighted?: boolean;
  isAd?: boolean;
  isNew?: boolean;
  platform?: string;
  timeLeft?: string;
  date?: string;
  participants?: number;
}