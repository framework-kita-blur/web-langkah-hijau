import type { HTMLAttributes, ReactNode } from 'react';

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={['card', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
