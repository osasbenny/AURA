import type { ReactNode } from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface TrustBadgeProps {
  level: 'verified' | 'reviewing' | 'pending';
  size?: 'sm' | 'md';
}

export function TrustBadge({ level, size = 'sm' }: TrustBadgeProps) {
  const config = {
    verified: { icon: ShieldCheck, label: 'Verified', color: 'text-sage-600 dark:text-sage-400', bg: 'bg-sage-100 dark:bg-sage-900/40' },
    reviewing: { icon: Clock, label: 'Under Review', color: 'text-gold-600 dark:text-gold-400', bg: 'bg-gold-100 dark:bg-gold-900/40' },
    pending: { icon: Clock, label: 'Pending', color: 'text-clay-muted', bg: 'bg-clay-100 dark:bg-clay-900/40' },
  };
  const { icon: Icon, label, color, bg } = config[level];
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} font-semibold rounded-full ${bg} ${color}`}>
      <Icon className={iconSize} />
      {label}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'completed' | 'urgent';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    active: { label: 'Active', color: 'text-ocean-600 dark:text-ocean-400', bg: 'bg-ocean-100 dark:bg-ocean-900/40' },
    completed: { label: 'Completed', color: 'text-sage-600 dark:text-sage-400', bg: 'bg-sage-100 dark:bg-sage-900/40' },
    urgent: { label: 'Urgent', color: 'text-error-600 dark:text-error-400', bg: 'bg-error-100 dark:bg-error-900/40' },
  };
  const { label, color, bg } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${bg} ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}

interface FeatureCheckProps {
  children: ReactNode;
}

export function FeatureCheck({ children }: FeatureCheckProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-100 dark:bg-sage-900/50 flex items-center justify-center mt-0.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
      </span>
      <span className="text-clay-secondary text-sm leading-relaxed">{children}</span>
    </li>
  );
}
