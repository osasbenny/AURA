import type { ReactNode } from 'react';

interface ClayCardProps {
  children: ReactNode;
  className?: string;
  raised?: boolean;
  inset?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

export function ClayCard({
  children,
  className = '',
  raised = false,
  inset = false,
  onClick,
  hoverable = false,
}: ClayCardProps) {
  const baseClass = raised ? 'clay-raised' : inset ? 'clay-inset' : 'clay';
  return (
    <div
      onClick={onClick}
      className={`${baseClass} ${hoverable ? 'hover:-translate-y-1 hover:shadow-clay-lg dark:hover:shadow-clay-dark-lg cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
