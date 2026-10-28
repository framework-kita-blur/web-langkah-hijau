import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
};

export function Button({ variant = 'primary', loading = false, disabled, children, className, ...rest }: Props) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? 'Memuat…' : children}
    </button>
  );
}
