'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/shadcn/navigation-menu';
import { useScrollDown } from '@/hooks/use-scroll-down';
import { cn } from '@/lib/utilities/cn';
import { NavItem } from '@/types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  const isScrollDown = useScrollDown();
  return (
    <motion.div
      variants={MENU_VARIANTS}
      animate={isScrollDown ? 'hidden' : 'visible'}
      transition={{ ease: 'easeInOut' }}
      className="relative"
    >
      <NavigationMenu className="rounded-3xl px-4 max-md:hidden md:bg-black-100">
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.label} className="bg-black-100">
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), 'bg-black-100')}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}

const MENU_VARIANTS: Variants = {
  hidden: {
    y: '-120%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};
