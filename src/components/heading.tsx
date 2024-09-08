import { slugify } from '@/lib/utilities/slugify';
import { type Heading } from '@/types/sanity';

type HeadingProps = {
  heading: Heading;
};

export function Heading({ heading }: HeadingProps) {
  const { eyebrow, title, subtitle } = heading;
  return (
    <hgroup className="max-w-3xl">
      {eyebrow && <p className="section-subtext">{eyebrow}</p>}
      <h2 id={slugify(title)} className="section-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-lg font-medium text-muted-foreground sm:text-xl">
          {subtitle}
        </p>
      )}
    </hgroup>
  );
}
