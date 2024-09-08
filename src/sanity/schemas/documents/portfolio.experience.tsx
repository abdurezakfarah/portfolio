import { MdOutlineWorkHistory } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

//TODO: upgrade sanity-plugin-icon

export const experience = defineType({
  name: 'portfolio.experience',
  type: 'document',
  title: 'Experience',
  icon: MdOutlineWorkHistory,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the experience.',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'The company where the experience was gained.',
      validation: (Rule) => Rule.required().error('Company name is required.'),
    }),
    defineField({
      name: 'icon',
      type: 'customIcon',
      title: 'Icon',
    }),
    //TODO: create date plugin, and use here
    defineField({
      name: 'date',
      type: 'string',
      title: 'Date',
      description: 'The date range or specific date of the experience.',
      validation: (Rule) => Rule.required().error('Date is required'),
    }),
    defineField({
      name: 'duties',
      type: 'array',
      title: 'Duties',
      description:
        'A list of duties or responsibilities associated with this experience.',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.min(1)
          .error('At least one duty is required.')
          .max(10)
          .warning('Provide between 1 and 10 duties.')
          .required()
          .error('Tell your duties.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
    },
    prepare({ title, company }) {
      return {
        title,
        subtitle: company,
      };
    },
  },
});
