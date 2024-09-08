import { StructureResolver } from 'sanity/structure';
import { hiddenTypes } from './constants';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId()!)),
      S.divider(),
      S.documentTypeListItem('post').title('Blog'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.documentTypeListItem('portfolio.experience').title('Experience'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ]);
