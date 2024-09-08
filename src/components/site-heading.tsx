import { siteConfig } from '@/configuration/site';
import Link from 'next/link';
import SeoHeading from './seo-heading';

export function SiteHeading() {
  return (
    <SeoHeading className="text-lg font-black">
      <Link
        href="/"
        className="flex items-center justify-center rounded-e-3xl px-8 py-1.5 md:bg-black-100"
      >
        {siteConfig.name}
      </Link>
    </SeoHeading>
  );
}
