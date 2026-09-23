import { trpc } from "@/lib/trpc";
import { campaigns as demoCampaigns, type Campaign } from "./campaigns";

const fallbackImages: Record<string, string> = {
  medical: demoCampaigns[0].image,
  education: demoCampaigns[1].image,
  water: demoCampaigns[2].image,
  community: demoCampaigns[3].image,
  emergency: demoCampaigns[4].image,
};

export function mapBackendCampaign(row: {
  slug: string;
  title: string;
  story: string;
  category: string;
  beneficiaryName: string;
  relationship: string;
  goalAmountMinor: number;
  raisedAmountMinor: number;
  status: string;
  createdAt: Date;
}): Campaign {
  const goalAmount = Math.round(Number(row.goalAmountMinor) / 100);
  const raisedAmount = Math.round(Number(row.raisedAmountMinor) / 100);
  const progress = goalAmount > 0 ? raisedAmount / goalAmount : 0;

  return {
    id: row.slug,
    title: row.title,
    story: row.story,
    category: row.category,
    organizer: "AURA community organizer",
    location: "Nigeria",
    goalAmount,
    raisedAmount,
    donorCount: 0,
    daysLeft: 30,
    image: fallbackImages[row.category] ?? demoCampaigns[0].image,
    status: progress >= 1 ? "completed" : progress < 0.25 ? "urgent" : "active",
    trustLevel: row.status === "PUBLISHED" ? "verified" : "reviewing",
    beneficiary: row.beneficiaryName,
    relationship: row.relationship,
    createdAt: row.createdAt.toISOString().slice(0, 10),
    updates: [],
  };
}

export function useLiveCampaigns() {
  const query = trpc.campaigns.featured.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    campaigns: query.data?.length ? query.data.map(mapBackendCampaign) : demoCampaigns,
    isUsingDemoData: !query.data?.length,
  };
}
