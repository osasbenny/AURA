import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface ClayInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function ClayInput({ label, hint, className = '', ...props }: ClayInputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-clay-secondary">{label}</label>}
      <input className={`clay-input ${className}`} {...props} />
      {hint && <p className="text-xs text-clay-muted">{hint}</p>}
    </div>
  );
}

interface ClayTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function ClayTextarea({ label, hint, className = '', ...props }: ClayTextareaProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-clay-secondary">{label}</label>}
      <textarea className={`clay-input resize-none ${className}`} {...props} />
      {hint && <p className="text-xs text-clay-muted">{hint}</p>}
    </div>
  );
}

interface ClaySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export function ClaySelect({ label, className = '', children, ...props }: ClaySelectProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-clay-secondary">{label}</label>}
      <select className={`clay-input appearance-none cursor-pointer ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}
