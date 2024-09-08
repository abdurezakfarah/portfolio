import { MdOutlineSubtitles } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const copy = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: MdOutlineSubtitles,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'heading',
      validation: (Rule) => Rule.required().error('Section heading is required.'),
    }),
    defineField({
      name: 'richtext',
      title: 'Richtext',
      type: 'richtext',
      validation: (Rule) => Rule.required().error('Section body is required.'),
    }),
  ],
  preview: {
    select: {
      text: 'richtext.0.children.0.text',
    },
    prepare({ text }) {
      return {
        title: text,
        subtitle: 'Text section',
      };
    },
  },
});
