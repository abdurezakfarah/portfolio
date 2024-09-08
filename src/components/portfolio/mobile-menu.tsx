'use client';
import { usePreventScroll } from '@/hooks/use-prevent-scroll';
import { cn } from '@/lib/utilities/cn';
import { NavItem } from '@/types';
import Link from 'next/link';

type MobileMenuProps = {
  items: NavItem[];
  handleClose: () => void;
};

export function MobileMenu({ items, handleClose }: MobileMenuProps) {
  usePreventScroll();

  return (
    <div
      onClick={handleClose}
      className="container absolute inset-0 top-14 z-40 h-[calc(100vh-2.5rem)] bg-black/50 animate-in slide-in-from-top-1"
    >
      <div className="-mx-8 w-[calc(100%+4rem)] bg-background p-8 shadow-lg">
        <nav className="grid grid-flow-row auto-rows-max space-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'rounded-md p-2 text-lg font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
