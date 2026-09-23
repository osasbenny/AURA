import { Heart, Users, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { type Campaign, formatNaira, getProgressPercent } from '@/data/campaigns';
import { TrustBadge, StatusBadge } from './Badges';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { navigate } = useRouter();
  const progress = getProgressPercent(campaign);

  return (
    <div
      onClick={() => navigate(`/campaign/${campaign.id}`)}
      className="clay group cursor-pointer hover:-translate-y-1.5 transition-all duration-500 hover:shadow-clay-lg dark:hover:shadow-clay-dark-lg flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-clay">
        <img
          src={campaign.image}
          alt={campaign.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={campaign.status} />
        </div>
        <div className="absolute top-3 right-3">
          <TrustBadge level={campaign.trustLevel} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-clay-500 dark:text-clay-400 uppercase tracking-wide mb-2">
          {campaign.category}
        </span>
        <h3 className="text-lg font-bold text-clay-primary leading-snug mb-2 line-clamp-2 group-hover:text-clay-500 dark:group-hover:text-clay-300 transition-colors">
          {campaign.title}
        </h3>
        <p className="text-sm text-clay-secondary line-clamp-2 mb-4 flex-1">
          {campaign.story}
        </p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2.5 clay-inset-sm rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-clay-400 to-clay-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-bold text-clay-primary">{formatNaira(campaign.raisedAmount)}</span>
            <span className="text-clay-muted text-xs"> raised</span>
          </div>
          <span className="text-clay-muted text-xs">{progress}% of {formatNaira(campaign.goalAmount)}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-clay-200/50 dark:border-clay-800/50">
          <span className="flex items-center gap-1.5 text-xs text-clay-secondary">
            <Users className="w-3.5 h-3.5" />
            {campaign.donorCount} donors
          </span>
          <span className="flex items-center gap-1.5 text-xs text-clay-secondary">
            <Clock className="w-3.5 h-3.5" />
            {campaign.daysLeft} days left
          </span>
        </div>
      </div>
    </div>
  );
}
