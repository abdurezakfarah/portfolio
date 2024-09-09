import { type TextSection } from '@/types/sanity';
import { type PortableTextComponents } from '@portabletext/react';
import { Heading } from '../heading';
import { PortableText } from '../portable-text';

type TextSectionProps = {
  textSection: TextSection;
};

export function TextSection({ textSection }: TextSectionProps) {
  const { heading, richtext } = textSection;
  return (
    <section className="container py-14 md:px-[106px]">
      <Heading heading={heading} />
      <PortableText value={richtext} components={components} />
    </section>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
        {children}
      </p>
    ),
  },
};
