import { slugify } from '@/lib/utilities/slugify';
import { urlForImage } from '@/sanity/lib/image';
import {
  type PortableTextComponents,
  type PortableTextProps as PortableTextPropsType,
  PortableText as PortableTextReact,
  toPlainText,
} from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Callout } from './callout';
import Code from './code';

interface PortableTextProps extends PortableTextPropsType {
  components?: PortableTextComponents;
  overwriteComponents?: boolean;
}

export function PortableText({
  components = portableTextDefaultComponents,
  overwriteComponents,
  ...props
}: PortableTextProps) {
  return (
    <PortableTextReact
      components={
        overwriteComponents
          ? components
          : { ...portableTextDefaultComponents, ...components }
      }
      {...props}
    />
  );
}

const portableTextDefaultComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value)}
        alt="Post"
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
      />
    ),

    customCode: ({ value }) => <Code value={value} />,

    callout: ({ value }) => {
      return <Callout value={value} />;
    },
  },
  marks: {
    strong: ({ children, value }) => {
      return <strong className="font-bold text-[#e2d6ff]">{children}</strong>;
    },
    link: ({ children, value }) => {
      const external = !(value.href.startsWith('/') || value.href.startsWith('#'))
        ? 'noreferrer noopener'
        : undefined;

      return (
        <Link
          href={value.href}
          rel={external}
          target={!!external ? '_blank' : undefined}
          className="font-medium text-[#f5f1ff] underline underline-offset-4"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="relative rounded border bg-[rgb(11,9,23)] px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
    highlight: ({ children }) => (
      <mark style={{ backgroundColor: 'yellow' }}>{children}</mark>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc text-[#efe9ff]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal text-[#efe9ff]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mt-2 text-[#efe9ff]">{children}</li>,
    number: ({ children }) => <li className="mt-2 text-[#efe9ff]">{children}</li>,
  },
  block: {
    normal: ({ children }) => (
      <p className="leading-7 text-[#efe9ff] [&:not(:first-child)]:mt-6">{children}</p>
    ),

    h1: ({ children, value }) => (
      <h1
        id={slugify(toPlainText(value))}
        className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-[#f8f7fa]"
      >
        {children}
      </h1>
    ),

    h2: ({ children, value }) => (
      <h2
        id={slugify(toPlainText(value))}
        className="mt-10 scroll-m-20 text-3xl font-semibold leading-[1.2] tracking-tight text-[#f8f7fa] first:mt-0"
      >
        {children}
      </h2>
    ),

    h3: ({ children, value }) => (
      <h3
        id={slugify(toPlainText(value))}
        className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-[#f8f7fa]"
      >
        {children}
      </h3>
    ),

    h4: ({ children, value }) => (
      <h4
        id={slugify(toPlainText(value))}
        className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-[#f8f7fa]"
      >
        {children}
      </h4>
    ),
    h5: ({ children, value }) => (
      <h5
        id={slugify(toPlainText(value))}
        className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-[#f8f7fa]"
      >
        {children}
      </h5>
    ),
    h6: ({ children, value }) => (
      <h6
        id={slugify(toPlainText(value))}
        className="mt-8 scroll-m-20 text-base font-semibold tracking-tight text-[#f8f7fa]"
      >
        {children}
      </h6>
    ),
    blockquote: ({ children, value }) => (
      <blockquote
        id={slugify(toPlainText(value))}
        className="mt-6 border-l-2 pl-6 italic text-muted-foreground [&>*]:text-muted-foreground"
      >
        {children}
      </blockquote>
    ),
  },
};
