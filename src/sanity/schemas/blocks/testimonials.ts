import { MdOutlineFormatQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: MdOutlineFormatQuote,
  fields: [
    defineField({
      name: 'heading',
      type: 'heading',
      title: 'Heading',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'testimonial',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().error('Testimonial is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Testimonials',
      };
    },
  },
});
