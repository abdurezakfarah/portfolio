/**
 * Singletons types
 */
export const singletons = new Set(['settings']);

/**
 * Set of document types hidden from the structure sidebar - the root list.
 */
export const hiddenTypes = new Set<string>([
  'media.tag', // This comes from the media tool plugin
  'post',
  'tag',
  'author',
  'portfolio.experience',
  'project',
  'testimonial',
]);

type Action =
  | 'publish'
  | 'discardChanges'
  | 'restore'
  | 'delete'
  | 'duplicate'
  | 'unpublish';

export const unMutableActions = new Set<Action>(['publish', 'discardChanges', 'restore']);
