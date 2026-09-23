type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <img
      src={compact ? '/aura-icon.svg' : '/aura-logo.svg'}
      alt="AURA"
      className={className}
    />
  );
}
