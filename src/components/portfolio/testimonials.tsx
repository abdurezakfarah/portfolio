import { type Testimonials } from '@/types/sanity';
import Image from 'next/image';
import { Heading } from '../heading';

interface TestimonialsProps {
  testimonials: Testimonials;
}

export function Testimonials({ testimonials: testimonialsBlock }: TestimonialsProps) {
  const { heading, testimonials } = testimonialsBlock;
  return (
    <section id="testimonials" className="container py-16">
      <div className="padding -mx-8 min-h-[300px] w-[100%+2rem] bg-tertiary">
        <Heading heading={heading} />
      </div>
      <div className="-mt-36 grid gap-7 pb-14 sm:grid-cols-2 md:-mt-24 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}

type TestimonialProps = {
  testimonial: Testimonials['testimonials'][number];
};

function Testimonial({ testimonial }: TestimonialProps) {
  const { text, name, designation, company, image } = testimonial;

  return (
    <article className="rounded-3xl bg-black-200 p-10">
      <span className="text-5xl font-black" aria-hidden>
        &quot;
      </span>
      <div className="mt-1">
        <p className="line-clamp-3 text-lg">{text}</p>
        <div className="mt-7 flex items-center justify-between gap-1">
          <div className="flex flex-1 flex-col">
            <p className="font-medium capitalize">{name}</p>
            <p className="mt-1 text-pretty text-xs text-muted-foreground">
              {designation} of {company}
            </p>
          </div>
          {image.asset?.url && (
            <Image
              src={image.asset?.url}
              alt={`feedback_by-${name}`}
              height={40}
              width={40}
              className="size-10 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </article>
  );
}
