import { Post } from '@/components/blog/post';
import { client } from '@/sanity/lib/client';
import { blogPageQuery } from '@/sanity/lib/queries';
import { BlogPageQueryResult } from '@/sanity/sanity.types';

export const metadata = {
  title: 'Blog',
};

// Ensure this is statically generated
export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await client.fetch<BlogPageQueryResult>(blogPageQuery);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <hgroup className="max-w-3xl flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-pretty text-lg font-medium text-[#dfd9ff] md:text-xl">
            Sharing Thoughts, Projects, and a Little Bit of Everything in Between
          </p>
        </hgroup>
      </div>

      <hr className="my-8" aria-hidden />
      {!posts.length && <p>No posts published.</p>}
      {posts?.length && (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Post key={post._id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
