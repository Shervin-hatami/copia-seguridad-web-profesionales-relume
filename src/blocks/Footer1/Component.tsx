"use client";

import React, { useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";

import { CMSLink } from "@/components/Link";
import { Media as MediaComponent } from "@/components/Media";

import type { Media as MediaType } from '@/payload-types'

type LinkType = {
  type?: 'reference' | 'custom';
  reference?: {
    relationTo: 'pages' | 'posts';
    value: any; // Usando any para compatibilidad con CMSLinkType
  };
  url?: string;
  newTab?: boolean;
};

type LogoType = {
  media: MediaType;
  link?: LinkType;
};

type ColumnLinkType = {
  title: string;
  link?: LinkType;
  icon?: 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube';
};

type ColumnLinksType = {
  title: string;
  links?: ColumnLinkType[];
};

type FooterLinkType = {
  title: string;
  link?: LinkType;
};

type TermsAndConditionsType = {
  text: string;
  link?: LinkType;
  suffix: string;
};

type Props = {
  logo: LogoType;
  newsletterDescription: string;
  inputPlaceholder?: string;
  button: ButtonProps;
  termsAndConditions?: TermsAndConditionsType;
  columnLinks?: ColumnLinksType[];
  footerText?: string;
  footerLinks?: FooterLinkType[];
};

export type Footer1Props = React.ComponentPropsWithoutRef<"footer"> & Partial<Props>;

const getSocialIcon = (icon?: string) => {
  switch (icon) {
    case 'facebook':
      return <BiLogoFacebookCircle className="size-6" />;
    case 'instagram':
      return <BiLogoInstagram className="size-6" />;
    case 'x':
      return <FaXTwitter className="size-6 p-0.5" />;
    case 'linkedin':
      return <BiLogoLinkedinSquare className="size-6" />;
    case 'youtube':
      return <BiLogoYoutube className="size-6" />;
    default:
      return null;
  }
};

export const Footer1 = (props: Footer1Props) => {
  const {
    logo,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions,
    columnLinks,
    footerText,
    footerLinks,
  } = {
    ...Footer1Defaults,
    ...props,
  };

  const [emailInput, setEmailInput] = useState<string>("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      emailInput,
    });
  };

  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
          <div className="flex flex-col">
            <CMSLink {...logo.link} className="mb-5 md:mb-6">
              <MediaComponent 
                resource={logo.media} 
                className="inline-block"
                size="medium"
              />
            </CMSLink>
            <p className="mb-5 md:mb-6">{newsletterDescription}</p>
            <div className="w-full max-w-md">
              <form
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                onSubmit={handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={inputPlaceholder}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <Button {...button}>{button.title}</Button>
              </form>
              <div className="text-xs">
                {termsAndConditions && (
                  <>
                    {termsAndConditions.text}{' '}
                    {termsAndConditions.link && (
                      <CMSLink {...termsAndConditions.link} className="underline">
                        Terms and Conditions
                      </CMSLink>
                    )}
                    {' '}{termsAndConditions.suffix}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
            {columnLinks?.map((column, index) => (
              <div key={index} className="flex flex-col items-start justify-start">
                <h2 className="mb-3 font-semibold md:mb-4">{column.title}</h2>
                <ul>
                  {column.links?.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-2 text-sm">
                      <CMSLink {...link.link} className="flex items-center gap-3">
                        {link.icon && <span>{getSocialIcon(link.icon)}</span>}
                        <span>{link.title}</span>
                      </CMSLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-6 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks?.map((link, index) => (
              <li key={index} className="underline">
                <CMSLink {...link.link}>{link.title}</CMSLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const Footer1Defaults: Props = {
  logo: {
    media: {
      id: 1,
      alt: 'Logo image',
      url: 'https://d22po4pjz3o32e.cloudfront.net/logo-image.svg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as MediaType,
    link: {
      type: 'custom',
      url: '#',
    },
  },
  newsletterDescription: "Join our newsletter to stay up to date on features and releases.",
  inputPlaceholder: "Enter your email",
  button: {
    title: "Subscribe",
    variant: "secondary",
    size: "sm",
  },
  termsAndConditions: {
    text: 'By subscribing you agree to with our',
    link: {
      type: 'custom',
      url: '#',
    },
    suffix: 'and provide consent to receive updates from our company.',
  },
  columnLinks: [
    {
      title: "Column One",
      links: [
        { title: "Link One", link: { type: 'custom', url: '#' } },
        { title: "Link Two", link: { type: 'custom', url: '#' } },
        { title: "Link Three", link: { type: 'custom', url: '#' } },
        { title: "Link Four", link: { type: 'custom', url: '#' } },
        { title: "Link Five", link: { type: 'custom', url: '#' } },
      ],
    },
    {
      title: "Column Two",
      links: [
        { title: "Link Six", link: { type: 'custom', url: '#' } },
        { title: "Link Seven", link: { type: 'custom', url: '#' } },
        { title: "Link Eight", link: { type: 'custom', url: '#' } },
        { title: "Link Nine", link: { type: 'custom', url: '#' } },
        { title: "Link Ten", link: { type: 'custom', url: '#' } },
      ],
    },
    {
      title: "Follow us",
      links: [
        { title: "Facebook", link: { type: 'custom', url: '#' }, icon: 'facebook' },
        { title: "Instagram", link: { type: 'custom', url: '#' }, icon: 'instagram' },
        { title: "X", link: { type: 'custom', url: '#' }, icon: 'x' },
        { title: "LinkedIn", link: { type: 'custom', url: '#' }, icon: 'linkedin' },
        { title: "Youtube", link: { type: 'custom', url: '#' }, icon: 'youtube' },
      ],
    },
  ],
  footerText: "© 2024 Relume. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", link: { type: 'custom', url: '#' } },
    { title: "Terms of Service", link: { type: 'custom', url: '#' } },
    { title: "Cookies Settings", link: { type: 'custom', url: '#' } },
  ],
};
