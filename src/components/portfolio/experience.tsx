'use client';

import { type Experience } from '@/types/sanity';
import { Icon } from '@iconify/react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { Heading } from '../heading';

interface ExperienceProps {
  experience: Experience;
}

export function Experience({ experience: experiences }: ExperienceProps) {
  const { experience, heading } = experiences;
  return (
    <section id="experience" className="container py-14 md:px-[106px]">
      <Heading heading={heading} />
      <div className="mt-16 flex flex-col md:mt-20">
        <VerticalTimeline animate={false} lineColor="#e5e4e7">
          {experience.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}

type ExperienceCardProps = {
  experience: Experience['experience'][number];
};

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#1d1836',
        color: '#e5e4e7',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #1d1836' }}
      date={experience.date}
      iconStyle={{
        background: experience.icon?.background?.value ?? '#333347',
      }}
      dateClassName="text-[#f9f7fd]"
      icon={
        experience.icon ? (
          <Icon
            icon={experience.icon.icon.name!}
            style={{
              color: experience.icon?.foreground?.value,
              background: experience.icon.background?.value ?? '#333347',
              width: 35,
              height: 35,
              marginLeft: '-17px',
              marginTop: '-17px',
            }}
          />
        ) : undefined
      }
    >
      <div>
        <h3 className="text-2xl font-bold">{experience.title}</h3>
        <p className="font-semibold text-muted-foreground" style={{ margin: 0 }}>
          {experience.company}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.duties.map((duty, index) => (
          <li key={`experience-point-${index}`} className="pl-1 md:text-lg">
            {duty}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};
