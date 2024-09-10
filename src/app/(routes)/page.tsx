import heroBg from '@/assets/herobg.png';
import { Contact } from '@/components/portfolio/contact';
import { SanityContent } from '@/components/sanity-content';
import { client } from '@/sanity/lib/client';
import { pageQuery } from '@/sanity/lib/queries';
import { PageQueryResult } from '@/sanity/sanity.types';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata = {
  title: {
    absolute: 'Abdurezak Farah',
  },
} satisfies Metadata;

// Ensure this is statically generated
export const dynamic = 'force-static';

export const revalidate = 1440;

export default async function Home() {
  const pageData = await client.fetch<PageQueryResult>(pageQuery, { slug: 'home' });

  if (!pageData) {
    throw Error('Error: Home page data is null.');
  }
  return (
    <main>
      <div className="absolute inset-0 h-screen">
        <Image
          alt="Hero background image"
          loading="eager"
          priority={true}
          fill
          sizes="100vw"
          className="pointer-events-none z-0 object-cover"
          src={heroBg}
          aria-hidden
        />
      </div>
      <SanityContent content={pageData.content} />
      <Contact />
    </main>
  );
}
