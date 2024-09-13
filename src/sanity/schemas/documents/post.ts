import { format, parseISO } from 'date-fns';
import { MdOutlineRssFeed } from 'react-icons/md';
import { defineField, defineType, type FieldGroupDefinition } from 'sanity';

const postGroups: FieldGroupDefinition[] = [
  {
    name: 'seo',
    title: 'SEO',
  },
  {
    name: 'media',
    title: 'Media',
  },
  {
    name: 'content',
    title: 'Content',
  },
];

export const post = defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  icon: MdOutlineRssFeed,
  groups: postGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Make it clear, grab attention, and mention your topic ( make it 50 - 60 characters)',
      group: 'seo',
      validation: (Rule) => [
        Rule.required().error('Title is required.'),
        Rule.max(60).warning('Shorter titles are always better for SEO.'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'seo',
      description: 'This is the URL of the blog.',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('Slug is required to be the post url.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Description / Excerpt',
      type: 'text',
      group: 'seo',
      rows: 4,
      description: 'A brief summary to catch attention, around 150-160 characters.',
      validation: (Rule) => [
        Rule.required().error('Description of the post is required for the SEO.'),
        Rule.max(160).warning('Shorter Excerpts are always better for SEO.'),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'text',
      rows: 5,
      group: 'seo',
      description: 'Words that relate to your content, separated by (,) commas.',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'media',
    }),
    defineField({
      type: 'boolean',
      name: 'showOg',
      title: 'Show Opengraph in the post',
      description: 'Show Opengraph image after the post heading.',
      initialValue: false,
      group: "media"
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description:
        'Use specific tags to help list related posts and improve discoverability.',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      validation: (Rule) => Rule.required().error('Tags are required'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => [Rule.required().error('The Post should have an author(s)')],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => [Rule.required().error('Published time is required')],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richtext',
      validation: (Rule) => [Rule.required().error('Post body is required.')],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'ogImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, publishedAt }) {
      const formattedPublishedAt = format(parseISO(publishedAt), 'PPP');
      return {
        title,
        media,
        subtitle: formattedPublishedAt,
      };
    },
  },
});
