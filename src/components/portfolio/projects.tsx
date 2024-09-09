import { type Projects } from '@/types/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { BiLinkExternal, BiLogoGithub } from 'react-icons/bi';
import { Heading } from '../heading';

interface ProjectsProps {
  projects: Projects;
}

export function Projects({ projects: projectsSection }: ProjectsProps) {
  const { heading, projects } = projectsSection;
  return (
    <section id="work" className="container py-16 md:px-16">
      <Heading heading={heading} />

      <div className="mt-20 grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-9">
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Projects['projects'][number];
};

function Project({ project }: ProjectCardProps) {
  const { title, description, tech, image, source, preview } = project;
  const imageURL = image.asset?.url;
  return (
    <div className="w-full rounded-2xl bg-tertiary p-5 sm:w-[360px]">
      <div className="relative h-[230px] w-full p-4">
        <Image
          src={imageURL!}
          alt={`${title} cover image`}
          fill
          sizes="100%"
          className="absolute size-full rounded-2xl object-cover"
        />
        <div className="relative mx-auto flex w-fit min-w-28 items-center justify-center gap-x-4 rounded-3xl bg-black px-6 py-3">
          {source && (
            <Link href={source} title="Github Repo">
              <BiLogoGithub className="size-6 text-muted-foreground hover:text-white" />
              <span className="sr-only">See the source code</span>
            </Link>
          )}
          {preview && (
            <Link href={preview} title="Preview">
              <BiLinkExternal className="size-6 text-muted-foreground hover:text-white" />
              <span className="sr-only">See it in live</span>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-[24px] font-bold text-white">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        {tech.map((t) => (
          <p key={`${title}-${t}`} className="text-sm text-muted-foreground">
            &#x2022; {t}
          </p>
        ))}
      </div>
    </div>
  );
}
