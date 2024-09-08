import { MdOutlineDeveloperBoard } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const stack = defineType({
  name: 'stack',
  title: 'Stack',
  type: 'object',
  icon: MdOutlineDeveloperBoard,
  fields: [
    defineField({
      name: 'title',
      title: 'Stack title',
      type: 'string',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Technology Name',
              type: 'string',
              validation: (Rule) => Rule.required().error('Icon is required'),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required().error('Icon is required'),
            }),
          ],
        },
      ],
    }),
  ],
});
