import { type SchemaTypeDefinition } from 'sanity';
import { experienceBlock } from './blocks/experience';
import { heading } from './blocks/heading';
import { hero } from './blocks/hero';
import { project as projectBlock } from './blocks/project';
import { richtextBlock } from './blocks/richtext';
import { skills } from './blocks/skills';
import { testimonials } from './blocks/testimonials';
import { copy } from './blocks/text-section';
import { author } from './documents/author';
import { page } from './documents/page';
import { experience } from './documents/portfolio.experience';
import { post } from './documents/post';
import { project } from './documents/project';
import { tag } from './documents/tag';
import { testimonial } from './documents/testimonial';
import { callout } from './objects/callout';
import { content } from './objects/content';
import { customCode } from './objects/custom-code';
import { customicon } from './objects/icon';
import { richtext } from './objects/richtext';
import { stack } from './objects/stack';

type Schema = { types: SchemaTypeDefinition[] };

export const schema: Schema = {
  types: [
    /* Documents */

    page,
    experience,
    project,
    testimonial,
    post,
    tag,
    author,

    /* Custom types */
    customicon,
    richtext,
    content,
    stack,
    callout,
    customCode,

    /* Blocks */

    heading,
    richtextBlock,
    hero,
    copy,
    experienceBlock,
    skills,
    projectBlock,
    testimonials,
  ],
};
