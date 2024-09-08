import { MdOutlineWorkHistory } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const experienceBlock = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'object',
  icon: MdOutlineWorkHistory,
  fields: [
    defineField({
      name: 'heading',
      type: 'heading',
      title: 'Heading',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'portfolio.experience',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().error('Experience is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Experience',
      };
    },
  },
});
