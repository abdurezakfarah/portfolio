import { siteConfig } from '@/configuration/site';
import { client } from '@/sanity/lib/client';
import { sitemapQuery } from '@/sanity/lib/queries';
import { SitemapQueryResult } from '@/sanity/sanity.types';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { home, posts } = await client.fetch<SitemapQueryResult>(sitemapQuery);

  const postsSitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'daily',
    priority: 1,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: home?.lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsSitemap,
  ];
}
