import { MdOutlineConstruction } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const skills = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'object',
  icon: MdOutlineConstruction,
  fields: [
    defineField({
      name: 'heading',
      type: 'heading',
      title: 'Heading',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        defineField({
          name: 'stack',
          title: 'Stack',
          type: 'stack',
        }),
      ],
      validation: (Rule) => Rule.required().error('Skills is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Skills',
      };
    },
  },
});
