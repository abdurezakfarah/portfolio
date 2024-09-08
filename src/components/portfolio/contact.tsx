import { siteConfig } from '@/configuration/site';
import { BiLogoGithub, BiLogoTwitter } from 'react-icons/bi';
import { MdOutlineMail } from 'react-icons/md';
import { SocialLink } from '../social-link';

export function Contact() {
  return (
    <section id="contact" className="container pb-16 md:px-16">
      <h2 className="section-subtext">Ping me on</h2>
      <div className="mt-4 flex gap-5">
        <SocialLink
          className="size-6 text-[#aaa6c3] hover:text-white md:size-8"
          label="Github"
          href={siteConfig.github}
          Icon={BiLogoGithub}
          buttonProps={{
            variant: 'ghost',
          }}
        />
        <SocialLink
          className="size-6 text-[#aaa6c3] hover:text-white md:size-8"
          label="Email"
          href={siteConfig.email}
          Icon={MdOutlineMail}
          buttonProps={{
            variant: 'ghost',
          }}
        />
        <SocialLink
          className="size-6 text-[#aaa6c3] hover:text-white md:size-8"
          label="Twitter (X)"
          href={siteConfig.twitter}
          Icon={BiLogoTwitter}
          buttonProps={{
            variant: 'ghost',
          }}
        />
      </div>
    </section>
  );
}
