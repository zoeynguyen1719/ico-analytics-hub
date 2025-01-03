export interface SubscriptionTierData {
  name: string;
  price: string;
  priceId: string | null;
  features: string[];
  buttonText: string;
  highlighted: boolean;
}