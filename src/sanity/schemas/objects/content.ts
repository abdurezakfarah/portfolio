import { MdArticle } from 'react-icons/md';
import { defineType } from 'sanity';

export const content = defineType({
  name: 'content',
  title: 'Content',
  icon: MdArticle,
  type: 'array',
  of: [
    {
      type: 'heading',
      title: 'Heading',
    },
    {
      type: 'textSection',
      title: 'Text section',
    },
    {
      type: 'richtextBlock',
      title: 'Richtext',
    },

    {
      type: 'hero',
      title: 'Hero',
    },
    {
      type: 'experience',
      title: 'Experience',
    },
    {
      type: 'skills',
      title: 'Skills',
    },
    {
      type: 'projectBlock',
      title: 'Project',
    },
    {
      type: 'testimonials',
      title: 'Testimonials',
    },
  ],
  options: {
    insertMenu: {
      showIcons: true,
      groups: [
        {
          name: 'intro',
          title: 'Intro',
          of: ['hero', 'heading'],
        },
        {
          name: 'content',
          title: 'Content',
          of: [
            'richtext',
            'textSection',
            'experience',
            'skills',
            'projectBlock',
            'testimonials',
          ],
        },
      ],
      views: [
        {
          name: 'grid',
          previewImageUrl: (type) => `/assets/sanity/${type}-preview.png`,
        },
        {
          name: 'list',
        },
      ],
    },
  },
});
