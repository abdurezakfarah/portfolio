import { MdInfoOutline } from 'react-icons/md';

import type { ObjectDefinition, Rule } from 'sanity';

const calloutVariants = [
  { title: 'Default', value: 'default' },
  { title: 'Primary', value: 'primary' },
  { title: 'Positive', value: 'positive' },
  { title: 'Caution', value: 'caution' },
  { title: 'Critical', value: 'critical' },
];

export const callout: ObjectDefinition = {
  name: 'callout',
  type: 'object',
  icon: MdInfoOutline,
  fields: [
    {
      type: 'string',
      name: 'theme',
      title: 'Theme',
      initialValue: 'default',
      options: {
        list: calloutVariants,
      },
      validation: (rule: Rule) => [rule.required().error('Callout theme is required.')],
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
      validation: (rule: Rule) => [rule.required().error('Callout text is required.')],
    },
  ],
  preview: {
    select: {
      title: 'text.0.children.0.text',
      subtitle: 'theme',
    },
  },
};
