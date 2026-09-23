import { useRouter } from '@/context/RouterContext';
import {
  Heart, Share2, MapPin, Clock, Users, ShieldCheck, ArrowLeft,
  CheckCircle2, MessageSquareText, TrendingUp,
} from 'lucide-react';
import { formatNaira, getProgressPercent } from '@/data/campaigns';
import { useLiveCampaigns } from '@/data/liveCampaigns';
import { ClayButton } from '@/components/ClayButton';
import { TrustBadge, StatusBadge } from '@/components/Badges';

export function CampaignDetailPage() {
  const { path, navigate } = useRouter();
  const id = path.replace('/campaign/', '');
  const { campaigns } = useLiveCampaigns();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-clay-primary mb-4">Campaign not found</h1>
        <ClayButton onClick={() => navigate('/campaigns')}>Back to Campaigns</ClayButton>
      </div>
    );
  }

  const progress = getProgressPercent(campaign);
  const remaining = campaign.goalAmount - campaign.raisedAmount;

  const recentDonors = [
    { name: 'Chidi O.', amount: 5000, time: '2h ago' },
    { name: 'Anonymous', amount: 20000, time: '5h ago' },
    { name: 'Fatima I.', amount: 10000, time: '8h ago' },
    { name: 'Anonymous', amount: 5000, time: '12h ago' },
    { name: 'Emeka N.', amount: 15000, time: '1d ago' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/campaigns')}
          className="inline-flex items-center gap-2 text-sm text-clay-secondary hover:text-clay-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="clay overflow-hidden">
              <div className="relative h-64 sm:h-96 overflow-hidden rounded-t-clay">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <StatusBadge status={campaign.status} />
                </div>
              </div>
            </div>

            {/* Title block */}
            <div className="clay p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <TrustBadge level={campaign.trustLevel} size="md" />
                <span className="text-xs font-semibold text-clay-500 uppercase tracking-wide">
                  {campaign.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-clay-primary leading-tight mb-4 text-balance">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-clay-secondary">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {campaign.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {campaign.daysLeft} days left
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {campaign.donorCount} donors
                </span>
              </div>
            </div>

            {/* Story */}
            <div className="clay p-6 sm:p-8">
              <h2 className="text-xl font-bold text-clay-primary mb-4">The Story</h2>
              <p className="text-clay-secondary leading-relaxed text-pretty">
                {campaign.story}
              </p>
            </div>

            {/* Organizer info */}
            <div className="clay p-6 sm:p-8">
              <h2 className="text-xl font-bold text-clay-primary mb-4">Organizer & Beneficiary</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="clay-inset-sm p-4">
                  <p className="text-xs text-clay-muted uppercase tracking-wide mb-1">Organizer</p>
                  <p className="font-bold text-clay-primary">{campaign.organizer}</p>
                </div>
                <div className="clay-inset-sm p-4">
                  <p className="text-xs text-clay-muted uppercase tracking-wide mb-1">Beneficiary</p>
                  <p className="font-bold text-clay-primary">{campaign.beneficiary}</p>
                </div>
                <div className="clay-inset-sm p-4">
                  <p className="text-xs text-clay-muted uppercase tracking-wide mb-1">Relationship</p>
                  <p className="font-bold text-clay-primary">{campaign.relationship}</p>
                </div>
                <div className="clay-inset-sm p-4">
                  <p className="text-xs text-clay-muted uppercase tracking-wide mb-1">Verification</p>
                  <p className="font-bold text-sage-600 dark:text-sage-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    AI Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Updates */}
            {campaign.updates.length > 0 && (
              <div className="clay p-6 sm:p-8">
                <h2 className="text-xl font-bold text-clay-primary mb-4">Campaign Updates</h2>
                <div className="space-y-4">
                  {campaign.updates.map((update, i) => (
                    <div key={update.id} className="clay-inset-sm p-4 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-sage-100 dark:bg-sage-900/40 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                        </div>
                        <div>
                          <p className="font-bold text-clay-primary text-sm">{update.title}</p>
                          <p className="text-xs text-clay-muted">{update.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-clay-secondary leading-relaxed pl-10">
                        {update.content}
                      </p>
                      {i < campaign.updates.length - 1 && (
                        <div className="absolute left-8 top-full w-0.5 h-4 bg-clay-200 dark:bg-clay-800" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent donors */}
            <div className="clay p-6 sm:p-8">
              <h2 className="text-xl font-bold text-clay-primary mb-4">Recent Donors</h2>
              <div className="space-y-2">
                {recentDonors.map((donor, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-clay-200/50 dark:border-clay-800/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-clay-300 to-clay-400 dark:from-clay-700 dark:to-clay-800 flex items-center justify-center text-white text-sm font-bold">
                        {donor.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-clay-primary">{donor.name}</p>
                        <p className="text-xs text-clay-muted">{donor.time}</p>
                      </div>
                    </div>
                    <p className="font-bold text-sage-600 dark:text-sage-400 text-sm">
                      {formatNaira(donor.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Donate panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Donation card */}
              <div className="clay-raised p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-2xl font-bold text-clay-primary font-display">
                      {formatNaira(campaign.raisedAmount)}
                    </span>
                    <span className="text-sm text-clay-muted">
                      of {formatNaira(campaign.goalAmount)}
                    </span>
                  </div>
                  <div className="h-3 clay-inset-sm rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-clay-400 to-clay-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-clay-secondary">
                    <span>{progress}% funded</span>
                    <span>{formatNaira(remaining)} to go</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[5000, 10000, 25000].map((amount) => (
                    <button
                      key={amount}
                      className="clay-sm py-3 text-sm font-bold text-clay-primary hover:text-clay-500 transition-colors"
                    >
                      ₦{amount / 1000}K
                    </button>
                  ))}
                </div>

                <ClayButton variant="primary" fullWidth size="lg" className="mb-3">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </ClayButton>
                <ClayButton fullWidth className="mb-3">
                  <MessageSquareText className="w-4 h-4" />
                  Donate via WhatsApp
                </ClayButton>
                <ClayButton fullWidth size="sm">
                  <Share2 className="w-4 h-4" />
                  Share Campaign
                </ClayButton>

                <div className="mt-4 pt-4 border-t border-clay-200/50 dark:border-clay-800/50">
                  <div className="flex items-center gap-2 text-xs text-clay-secondary">
                    <TrendingUp className="w-4 h-4 text-sage-500" />
                    <span>0% platform fee — every naira goes to the cause</span>
                  </div>
                </div>
              </div>

              {/* Trust card */}
              <div className="clay p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-clay-sm bg-sage-100 dark:bg-sage-900/40 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-sage-600 dark:text-sage-400" />
                  </div>
                  <div>
                    <p className="font-bold text-clay-primary text-sm">AI Verified Campaign</p>
                    <p className="text-xs text-clay-muted">Checked on {campaign.createdAt}</p>
                  </div>
                </div>
                <p className="text-xs text-clay-secondary leading-relaxed">
                  This campaign has been verified by AURA's AI system for identity, beneficiary, and cause authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
