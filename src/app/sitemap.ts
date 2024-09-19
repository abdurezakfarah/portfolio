import { siteConfig } from '@/configuration/site';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import { PostsQueryResult } from '@/sanity/sanity.types';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<PostsQueryResult>(postsQuery);

  const postsSitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'daily',
    priority: 1,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsSitemap,
  ];
}
