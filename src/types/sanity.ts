import { PageQueryResult } from '@/sanity/sanity.types';

export type Content = NonNullable<PageQueryResult>['content'][number];

export type Heading = Omit<Extract<Content, { _type: 'heading' }>, '_key'>;
export type Hero = Omit<Extract<Content, { _type: 'hero' }>, '_key'>;
export type TextSection = Omit<Extract<Content, { _type: 'textSection' }>, '_key'>;
export type Experience = Omit<Extract<Content, { _type: 'experience' }>, '_key'>;
export type Projects = Omit<Extract<Content, { _type: 'projectBlock' }>, '_key'>;
export type Skills = Omit<Extract<Content, { _type: 'skills' }>, '_key'>;
export type Testimonials = Omit<Extract<Content, { _type: 'testimonials' }>, '_key'>;
