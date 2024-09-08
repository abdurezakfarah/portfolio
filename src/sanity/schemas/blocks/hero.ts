import { MdStarOutline } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const hero = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: MdStarOutline,
  fields: [
    defineField({
      type: 'string',
      name: 'eyebrow',
      title: 'Eyebrow text',
      validation: (Rule) => Rule.required().error('Eyebrow text is required'),
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
      validation: (Rule) => Rule.required().error('Subtext is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Hero',
      };
    },
  },
});
