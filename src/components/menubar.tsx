'use client';
import { siteConfig } from '@/configuration/site';
import { NavItem } from '@/types';
import { useState } from 'react';
import { BiLogoGithub } from 'react-icons/bi';
import { MdClose, MdMenu, MdOutlineMail } from 'react-icons/md';
import { MobileMenu } from './portfolio/mobile-menu';
import { Button } from './shadcn/button';
import { SocialLink } from './social-link';

type MenubarProps = {
  items: NavItem[];
};

export function Menubar({ items }: MenubarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="flex items-center justify-center gap-4 rounded-s-3xl px-4 md:bg-black-100">
      <SocialLink
        label="Github"
        href={siteConfig.github}
        Icon={BiLogoGithub}
        buttonProps={{ variant: 'ghost' }}
      />
      <SocialLink
        label="Email"
        href={siteConfig.email}
        Icon={MdOutlineMail}
        buttonProps={{ variant: 'ghost' }}
      />
      <Button
        aria-label="Menu"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <MdClose className="size-[1.2rem]" />
        ) : (
          <MdMenu className="size-[1.2rem]" />
        )}
      </Button>
      {isMobileMenuOpen && (
        <MobileMenu items={items} handleClose={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}
