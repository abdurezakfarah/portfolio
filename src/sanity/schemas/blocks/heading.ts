import { MdTitle } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const heading = defineType({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  icon: MdTitle,
  fields: [
    defineField({
      type: 'string',
      name: 'eyebrow',
      title: 'Eyebrow text',
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Heading',
      };
    },
  },
  options: {
    collapsible: true,
    collapsed: true,
  },
});
