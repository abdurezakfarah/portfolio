import { Icon } from '@iconify/react';
import { defineField, defineType, Rule } from 'sanity';

export const customicon = defineType({
  name: 'customIcon',
  type: 'object',
  title: 'icon',
  fields: [
    defineField({
      name: 'foreground',
      title: 'Icon foreground',
      type: 'simplerColor',
    }),
    defineField({
      name: 'background',
      title: 'Icon background',
      type: 'simplerColor',
    }),
    defineField({
      name: 'icon',
      type: 'icon',
      title: 'icon',
      validation: (Rule: Rule) => Rule.required().error('Icon is required.'),
    }),
  ],
  preview: {
    select: {
      fg: 'foreground.value.value',
      bg: 'background.value.value',
      icon: 'icon.name',
    },
    prepare({ fg, bg, icon }) {
      return {
        media: <Icon icon={icon} style={{ background: bg, color: fg }} />,
      };
    },
  },
  options: {
    collapsible: true,
  },
});
