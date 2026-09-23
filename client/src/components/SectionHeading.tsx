import { type ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, center = false, children, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12 ${className}`}>
      {eyebrow && (
        <span className="clay-badge mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clay-primary leading-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-clay-secondary leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
