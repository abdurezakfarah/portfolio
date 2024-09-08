import { type Content } from '@/types/sanity';
import { Heading } from './heading';
import { Experience } from './portfolio/experience';
import { Hero } from './portfolio/hero';
import { Projects } from './portfolio/projects';
import { Skills } from './portfolio/skills';
import { Testimonials } from './portfolio/testimonials';
import { TextSection } from './portfolio/text-section';

type SanityContentProps = {
  content: Content[];
};

export function SanityContent({ content }: SanityContentProps) {
  return content.map(renderContent);
}

function renderContent(block: Content) {
  switch (block._type) {
    case 'heading': {
      const { _key, ...heading } = block;
      return <Heading key={_key} heading={heading} />;
    }
    case 'textSection': {
      const { _key, ...textSection } = block;
      return <TextSection key={_key} textSection={textSection} />;
    }

    case 'hero': {
      const { _key, ...hero } = block;
      return <Hero key={_key} hero={hero} />;
    }
    case 'experience': {
      const { _key, ...experience } = block;
      return <Experience key={_key} experience={experience} />;
    }
    case 'skills': {
      const { _key, ...skills } = block;
      return <Skills key={_key} skills={skills} />;
    }
    case 'projectBlock': {
      const { _key, ...projects } = block;
      return <Projects key={_key} projects={projects} />;
    }
    case 'testimonials': {
      const { _key, ...testimonials } = block;
      return <Testimonials key={_key} testimonials={testimonials} />;
    }

    default:
      return null;
  }
}
