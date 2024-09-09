import { PostsList } from '@/components/blog/blog-list';
import { JsonLd } from '@/components/json-ld';
import { PortableText } from '@/components/portable-text';
import { Toc, nestToc } from '@/components/sanity-toc';
import { buttonVariants } from '@/components/shadcn/button';
import { siteConfig } from '@/configuration/site';
import { cn } from '@/lib/utilities/cn';
import { client } from '@/sanity/lib/client';
import { postPageQuery, postsQuery } from '@/sanity/lib/queries';
import type { PostPageQueryResult, PostsQueryResult } from '@/sanity/sanity.types';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdChevronLeft } from 'react-icons/md';
import readingTime from 'reading-time';
import type { BlogPosting, WithContext } from 'schema-dts';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Ensure this is statically generated
export const dynamic = 'force-static';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await client.fetch<PostPageQueryResult>(postPageQuery, { slug });

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `${siteConfig.url}/post/${slug}`,
      title: post.title,
      description: post.excerpt,
      images: post.ogImage ?? undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.ogImage ?? undefined,
      creator: post.author.twitter || undefined,
    },
    keywords: post.keywords,
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<PostsQueryResult>(postsQuery);

  if (!posts) {
    throw notFound();
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = await client.fetch<PostPageQueryResult>(postPageQuery, { slug });

  if (!post) return;

  const postJsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}/`,
    },
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    url: `${siteConfig.url}/blog/${post.slug}/`,
    author: {
      '@type': 'Person',
      '@id': `http://www.twitter.com/${post.author.twitter}`,
      url: `http://www.twitter.com/${post.author.twitter}`,
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    ...(post.ogImage && {
      image: {
        '@type': 'ImageObject',
        '@id': post.ogImage,
        url: post.ogImage,
        height: '630',
        width: '1200',
      },
    }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#post-body'],
    },
    keywords: post.keywords || undefined,
    articleBody: post.plainText,
  };

  return (
    <main className="container relative w-full px-8 pb-6 md:pb-10">
      <JsonLd jsonLd={postJsonLd} />
      <div className="gap-4 pt-6 lg:flex lg:pt-10">
        <article id="post-body" className="mx-auto max-w-2xl">
          <div>
            <div className="flex gap-2 text-muted-foreground">
              <time dateTime={format(post.publishedAt, 'yyyy-mm-dd')}>
                Published on {format(post.publishedAt, 'PPP')}
              </time>
              <span aria-hidden>&#x2022;</span>
              <span>{readingTime(post.plainText).text}</span>
            </div>
            <h1 className="mt-2 inline-block text-pretty font-heading text-4xl font-bold leading-[1.1] text-[#f9f7fd] lg:text-5xl">
              {post.title}
            </h1>
            <Link
              key={post.author.slug}
              href={`https://twitter.com/${post.author.twitter}`}
              className="mt-4 flex items-center space-x-2 text-sm"
            >
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full bg-white"
                />
              )}
              <div className="flex-1 text-left leading-tight">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  @{post.author.twitter}
                </p>
              </div>
            </Link>
          </div>
          {post.ogImage && (
            <Image
              src={post.ogImage}
              alt={post.title}
              width={720}
              height={405}
              className="my-8 rounded-md border bg-muted transition-colors"
              priority
            />
          )}
          <PortableText value={post.body} />
          <hr className="mt-12" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost' }))}>
              <MdChevronLeft className="mr-2 size-4" />
              See all posts
            </Link>
          </div>
        </article>
        <aside className="sticky top-16 mr-auto hidden h-fit max-h-[calc(100vh-3rem)] w-72 overflow-y-auto overscroll-y-contain rounded-xl bg-black-100 px-8 pb-10 lg:block">
          <Toc elements={nestToc(post.toc)} title="Content" />
        </aside>
      </div>
      {!(post.recentPosts || post.relatedPosts) && (
        <aside className="container space-y-10 p-0 sm:space-y-12 md:space-y-16">
          {post.relatedPosts && (
            <PostsList posts={post.relatedPosts} title="Similar posts" />
          )}
          {post.recentPosts && (
            <PostsList posts={post.recentPosts} title="Recent posts" />
          )}
        </aside>
      )}
    </main>
  );
}
