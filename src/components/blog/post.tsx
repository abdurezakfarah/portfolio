import { BlogPageQueryResult } from '@/sanity/sanity.types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import readingTime from 'reading-time';

type Post = NonNullable<BlogPageQueryResult>[number];

type PostProps = {
  post: Post;
  index: number;
};

export function Post({ post, index }: PostProps) {
  return (
    <article key={post._id} className="group relative flex flex-col">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={804}
          height={452}
          className="aspect-[3/2] rounded-md border bg-muted transition-colors"
          priority={index <= 1}
        />
      )}
      <h2 className="mt-4 text-lg font-semibold">{post.title}</h2>
      {/* <p className="line-clamp-3 text-muted-foreground text-pretty">{post.excerpt}</p> */}
      <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
        <time dateTime={format(post.publishedAt, 'yyyy-mm-dd')}>
          {format(post.publishedAt, 'PPP')}
        </time>
        <span aria-hidden>&#x2022;</span>
        <span>{readingTime(post.plainText).text}</span>
      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}
