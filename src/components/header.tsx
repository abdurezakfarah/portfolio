import { mainNav } from '@/configuration/portfolio';
import { Menubar } from './menubar';
import { Navbar } from './navbar';
import { SiteHeading } from './site-heading';

export function Header() {
  return (
    <header className="container sticky top-0 z-50 flex h-14 items-center justify-between px-0 max-md:bg-background">
      <SiteHeading />
      <Navbar items={mainNav} />
      <Menubar items={mainNav} />
    </header>
  );
}
