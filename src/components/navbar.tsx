import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/shadcn/navigation-menu';
import { cn } from '@/lib/utilities/cn';
import { NavItem } from '@/types';
import Link from 'next/link';

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  return (
    <div className="relative">
      <NavigationMenu className="rounded-3xl px-4 max-md:hidden md:bg-black-100">
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem
              key={item.label}
              className="rounded-3xl bg-black-100 md:hover:bg-[#291b47]"
            >
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'rounded-3xl bg-black-100 hover:text-white md:hover:bg-[#291b47]',
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
