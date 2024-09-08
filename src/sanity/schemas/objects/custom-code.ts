import { MdOutlineCode } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const customCode = defineType({
  name: 'customCode',
  title: 'Code',
  icon: MdOutlineCode,
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        withFilename: true,
      },
    }),
    defineField({
      name: 'showCopy',
      title: 'Show copy',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required().error('Should copy button shown'),
    }),
  ],
  preview: {
    select: {
      title: 'code.code',
    },
  },
});
