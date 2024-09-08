import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Project name is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().error('Project description is required'),
    }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one technology is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Project image is required'),
    }),
    defineField({
      name: 'source',
      title: 'Source Code URL',
      type: 'url',
    }),
    defineField({
      name: 'preview',
      title: 'Preview URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({
            allowRelative: false,
            scheme: ['http', 'https'],
          })
          .error('A valid preview URL is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      image: 'image',
    },
    prepare({ title, description, image }) {
      return {
        title,
        subtitle: description,
        media: image,
      };
    },
  },
});
