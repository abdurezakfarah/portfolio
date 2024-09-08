import { siteConfig } from '@/configuration/site';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import { PostsQueryResult } from '@/sanity/sanity.types';
import RSS from 'rss';

export async function GET() {
  const rss = new RSS({
    title: "Abdurezak Farah's blog",
    description: "Abdurezak Farah's Blog",
    generator: 'RSS for Node and Next.js',
    feed_url: `${siteConfig.url}/rss.xml`,
    site_url: siteConfig.url,
    managingEditor: 'mail@abdurezak.com (Abdurezak Farah)',
    webMaster: 'mail@abdurezak.com (Abdurezak Farah)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, Abdurezak Farah`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = await client.fetch<PostsQueryResult>(postsQuery);

  if (posts) {
    posts.map((post) => {
      rss.item({
        title: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/blog/${post.slug}`,
        author: 'Abdurezak Farah',
        date: post._updatedAt,
      });
    });
  }

  return new Response(rss.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
