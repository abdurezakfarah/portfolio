import { cn } from '@/lib/utilities/cn';

import Link from 'next/link';
import { IconBaseProps, IconType } from 'react-icons/lib';
import { Button, ButtonProps } from './shadcn/button';

type SocialLinkProps = {
  href: string;
  Icon: IconType;
  label: string;
  buttonProps?: ButtonProps;
} & IconBaseProps;

export function SocialLink({
  href,
  Icon,
  label,
  buttonProps,
  className,
  ...props
}: SocialLinkProps) {
  return (
    <Button
      asChild
      variant="outline"
      className="hover:bg-black-100 hover:text-foreground"
      size="icon"
      {...buttonProps}
    >
      <Link href={href} aria-label={label} title={label}>
        <Icon {...props} className={cn('size-[1.2rem]', className)} />
      </Link>
    </Button>
  );
}
