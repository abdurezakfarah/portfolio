import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import readingTime from 'reading-time';

// Source: /src/sanity/sanity.types.ts
// type: PostPageQueryResult - recentPosts / reletedPosts
type PostListItem = {
  title: string;
  slug: string;
  ogImage: string | null;
  publishedAt: string;
  plainText: string;
};

interface PostsListProps {
  title: string;
  link?: {
    text: string;
    href: string;
  };
  posts: PostListItem[];
}

export function PostsList({ title, link, posts }: PostsListProps) {
  if (!posts.length) return null;
  return (
    <section className="relative">
      <hgroup className="flex items-center justify-between bg-background py-1">
        <h2 className="text-lg font-bold capitalize">{title}</h2>
        {link && posts.length > 5 && (
          <Link href={link.href} className="text-sm">
            {link.text} &rarr;
          </Link>
        )}
      </hgroup>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

interface PostListItemProps {
  post: PostListItem;
}

function PostListItem({ post }: PostListItemProps) {
  return (
    <article key={post.slug} className="relative flex w-full gap-4 sm:flex-col">
      {post.ogImage && (
        <Image
          src={post.ogImage}
          alt="Post cover image"
          width={804}
          height={452}
          className="aspect-[3/2] rounded-lg max-sm:size-20"
        />
      )}
      <section>
        <h3 className="line-clamp-2 font-medium sm:line-clamp-3">{post.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground md:mt-2">
          <time dateTime={format(post.publishedAt, 'yyyy-mm-dd')}>
            {format(post.publishedAt, 'PPP')}
          </time>
          <span className="mx-2" aria-hidden>
            &#x2022;
          </span>
          <span>{readingTime(post.plainText).text}</span>
        </p>
      </section>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </article>
  );
}
