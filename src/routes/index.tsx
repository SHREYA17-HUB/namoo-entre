import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/namo/site';
import { pageMeta } from '@/data/catalogue';
export const Route = createFileRoute('/')({head:()=>pageMeta('Premium Printing, Packaging & Branding','Make your brand impossible to ignore with NAMO Enterprises. Explore custom printing, packaging, signage and corporate gifting in Bangalore.'),component:HomePage});
