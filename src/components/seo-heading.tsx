'use client';

import { cn } from '@/lib/utilities/cn';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

type SeoHeadingProps = HTMLAttributes<HTMLElement>;

export default function SeoHeading({ className, ...props }: SeoHeadingProps) {
  const pathname = usePathname();
  const El = pathname === '/' ? 'h1' : 'span';
  return <El {...props} className={cn('inline-block', className)} />;
}
