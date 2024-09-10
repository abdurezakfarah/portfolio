import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';
import type { PortableTextComponents } from '@portabletext/react';
import { CircleCheck, Info, LucideIcon, Skull, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '.';

import { type Callout } from '@/sanity/sanity.types';

const icons: Record<Callout['theme'], LucideIcon> = {
  default: Info,
  primary: Info,
  positive: CircleCheck,
  caution: TriangleAlert,
  critical: Skull,
};

interface CalloutProps {
  value: Callout;
}

export function Callout({ value }: CalloutProps) {
  const { theme, title, text } = value;
  const Icon = icons[theme];
  return (
    <Alert variant={theme} className="my-6">
      <Icon className="size-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        <PortableText value={text} components={portableTextComponents} />
      </AlertDescription>
    </Alert>
  );
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="font-medium underline underline-offset-4"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-2 ml-6 list-disc">{children}</ul>,
    number: ({ children }) => <ol className="my-2 ml-6 list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mt-1 text-sm">{children}</li>,
    number: ({ children }) => <li className="mt-1 text-sm">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="text-sm [&_p]:leading-relaxed">{children}</p>,
  },
};
