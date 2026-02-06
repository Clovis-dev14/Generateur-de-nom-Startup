export interface GeneratedName {
  id: string;
  name: string;
  baseline: string;
  category: string;
  logo: string;
  domains: Record<string, boolean | null>;
  socials: Record<string, boolean>;
  timestamp: number;
}

export type Category = 'tech' | 'finance' | 'green' | 'food' | 'health' | 'creative';
