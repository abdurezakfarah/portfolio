import { type Hero } from '@/sanity/sanity.types';

type HeroProps = {
  hero: Hero;
};

export function Hero({ hero }: HeroProps) {
  const { eyebrow, title, subtitle } = hero;
  const [firstName, lastName] = title.split(' ');

  return (
    <section className="container relative flex h-[calc(100vh-4rem)] flex-col">
      <div className="relative my-auto flex max-w-3xl gap-5 md:px-8">
        <div
          className="relative mt-3 flex h-[calc(100%-1.25rem)] flex-col items-center justify-center"
          aria-hidden
        >
          <div className="size-5 rounded-full bg-primary" />
          <div className="violet-gradient h-full w-1" />
        </div>
        <hgroup>
          <span className="text-3xl font-black md:text-5xl lg:text-6xl">{eyebrow}</span>
          <h2 className="mt-3 flex flex-col text-5xl font-black leading-[1.1] md:text-6xl lg:text-7xl">
            <span id="first-name" className="text-primary">
              {firstName}
            </span>
            <span id="last-name" className="text-primary">
              {lastName}
            </span>
          </h2>
          <p
            id="about"
            className="mt-4 text-pretty text-lg font-medium text-[#dfd9ff] sm:text-xl lg:text-2xl"
          >
            {subtitle}
          </p>
        </hgroup>
      </div>
    </section>
  );
}
