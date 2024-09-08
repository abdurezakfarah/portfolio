import { MdOutlineFolderOpen } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'projectBlock',
  title: 'Project',
  type: 'object',
  icon: MdOutlineFolderOpen,
  fields: [
    defineField({
      name: 'heading',
      type: 'heading',
      title: 'Heading',
      validation: (Rule) => Rule.required().error('Sectin heading is required'),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'project',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().error('Projects are required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Project',
      };
    },
  },
});
