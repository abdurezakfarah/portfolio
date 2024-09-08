import { MdOutlineFormatQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: MdOutlineFormatQuote,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (Rule) => Rule.required().error('Designation is required'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required().error('Company name is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      validation: (Rule) => Rule.required().error('Testimonial text is required'),
    }),
  ],
  preview: {
    select: {
      image: 'image',
      company: 'company',
      name: 'name',
      designation: 'designation',
    },
    prepare({ name, image, company, designation }) {
      return {
        title: name,
        subtitle: `${designation} at ${company}`,
        media: image,
      };
    },
  },
});
