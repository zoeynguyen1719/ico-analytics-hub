export interface ICOProject {
  id?: number;
  "Project Name": string | null;
  "Price"?: number;
  "Sale Price"?: number;
  "ROI"?: number;
  "ATH ROI"?: number;
  "Platform"?: string;
  "ICO date"?: string;
  created_at?: string;
  description?: string;
  website_url?: string;
  whitepaper_url?: string;
  token_type?: string;
  token_price?: string;
  token_supply?: number;
  hard_cap?: string;
  distributed_percentage?: number;
  kyc_required?: boolean;
  restricted_countries?: string[];
  social_links?: Record<string, any>;
  team_members?: Record<string, any>;
  roadmap?: Record<string, any>;
  token_metrics?: Record<string, any>;
  slug?: string;
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