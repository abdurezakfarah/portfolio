import { MdOutlineSubtitles } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const richtextBlock = defineType({
  name: 'richtextBlock',
  title: 'Richtext',
  type: 'object',
  icon: MdOutlineSubtitles,
  fields: [
    defineField({
      name: 'richtext',
      title: 'Richtext',
      type: 'richtext',
    }),
  ],
  preview: {
    select: {
      text: 'richtext.0.children.0.text',
    },
    prepare({ text }) {
      return {
        title: text,
        subtitle: 'Richtext',
      };
    },
  },
});
