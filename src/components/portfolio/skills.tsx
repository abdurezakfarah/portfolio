import { type Skills } from '@/types/sanity';
import Image from 'next/image';
import { Heading } from '../heading';

type SkillsProps = {
  skills: Skills;
};

export function Skills({ skills: skillsSection }: SkillsProps) {
  const { skills, heading } = skillsSection;
  return (
    <section className="container py-16 md:px-16">
      <Heading heading={heading} />

      <div className="mt-10 flex flex-col flex-wrap gap-x-28 gap-y-12 md:mt-12 md:flex-row md:gap-y-14">
        {skills?.map((categories) => (
          <div key={categories?.title} className="mb-3 flex flex-col gap-5">
            <h3 className="w-full text-left text-xl font-medium capitalize">
              {categories?.title}
            </h3>
            <div className="flex w-fit flex-wrap items-center gap-4">
              {categories?.technologies?.map((tech) => (
                <div
                  id={tech?.name}
                  key={tech?.name}
                  className="flex flex-col items-center gap-y-2"
                >
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-white">
                    {tech.icon && (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={30}
                        height={30}
                        className="size-3/4 rounded-full object-contain"
                      />
                    )}
                  </div>
                  <span className="text-sm font-light tracking-tight md:text-base">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
