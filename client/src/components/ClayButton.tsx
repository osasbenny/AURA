import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'default' | 'primary' | 'sage' | 'ocean';
type Size = 'sm' | 'md' | 'lg';

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  default: 'clay-btn',
  primary: 'clay-btn clay-btn-primary',
  sage: 'clay-btn clay-btn-sage',
  ocean: 'clay-btn clay-btn-ocean',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function ClayButton({
  variant = 'default',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ClayButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
