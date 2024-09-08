export interface Link {
  name: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
}
export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  email: string;
  twitter: string;
  github: string;
}

export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
}
