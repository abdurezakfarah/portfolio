import { format } from 'date-fns';
import { MdOutlineDescription, MdOutlineHome } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: MdOutlineDescription,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
      hidden: ({ document }) => document?.isHomePage as boolean,
    },
    {
      name: 'content',
      title: 'Content',
      hidden: ({ document }) => document?.isHomePage as boolean,
    },
  ],
  fields: [
    defineField({
      name: 'isHomePage',
      type: 'boolean',
      initialValue: false,
      hidden: true,
      validation: (Rule) => Rule.required().error('Is this home page'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Page title is required'),
      hidden: ({ parent }) => parent.isHomePage,
      group: 'seo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) =>
        Rule.custom((slug, context) => {
          //bypass this validation for the home page
          if (context.document?.isHomepage) return true;

          //required for other pages
          if (!slug) {
            return 'Slug is required to be the page url.';
          }

          return true;
        }),
      hidden: ({ parent }) => parent.isHomePage,
      group: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      hidden: ({ parent }) => parent.isHomePage,
      group: 'seo',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'content',
      validation: (Rule) => Rule.required().error('Page content is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isHomePage: 'isHomePage',
      createdAt: '_createdAt',
    },
    prepare({ isHomePage, title, createdAt }) {
      const media = isHomePage ? MdOutlineHome : MdOutlineDescription;
      return {
        title,
        media,
        subtitle: format(createdAt, 'PPP'),
      };
    },
  },
});
