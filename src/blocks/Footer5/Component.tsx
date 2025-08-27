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

type SocialMediaLinkType = {
  url: string;
  icon: 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube';
};

type TermsAndConditionsType = {
  text: string;
  link?: LinkType;
  suffix: string;
};

type Props = {
  logo: LogoType;
  newsletterHeading: string;
  newsletterDescription: string;
  inputPlaceholder?: string;
  button: ButtonProps;
  termsAndConditions?: TermsAndConditionsType;
  columnLinks?: ColumnLinksType[];
  socialMediaLinks?: SocialMediaLinkType[];
  footerText?: string;
  footerLinks?: FooterLinkType[];
};

export type Footer5Props = React.ComponentPropsWithoutRef<"footer"> & Partial<Props>;

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

export const Footer5 = (props: Footer5Props) => {
  const {
    logo,
    newsletterHeading,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions,
    columnLinks,
    socialMediaLinks,
    footerText,
    footerLinks,
  } = {
    ...Footer5Defaults,
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
        <div className="rb-12 mb-12 block items-start justify-between md:mb-18 lg:mb-20 lg:flex">
          <div className="rb-6 mb-6 lg:mb-0">
            <h1 className="font-semibold md:text-md">{newsletterHeading}</h1>
            <p>{newsletterDescription}</p>
          </div>
          <div className="max-w-md lg:min-w-[25rem]">
            <form
              className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-y-4 md:gap-4"
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
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 md:mb-18 md:gap-y-12 lg:mb-20 lg:grid-cols-6">
          <CMSLink {...logo.link} className="sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto">
            <MediaComponent 
              resource={logo.media} 
              className="inline-block"
              size="medium"
            />
          </CMSLink>
          {columnLinks?.map((column, index) => (
            <div key={index} className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">{column.title}</h2>
              <ul>
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm">
                    <CMSLink {...link.link} className="flex items-center gap-3">
                      {link.title}
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start pb-4 pt-6 text-sm md:justify-start md:pb-0 md:pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col-reverse items-start md:flex-row md:gap-6 lg:items-center">
            <p className="mt-8 md:mt-0">{footerText}</p>
            <div className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:justify-center md:gap-x-6 md:gap-y-0 lg:text-left">
              {footerLinks?.map((link, index) => (
                <p key={index} className="underline">
                  <CMSLink {...link.link}>{link.title}</CMSLink>
                </p>
              ))}
            </div>
          </div>
          <div className="mb-8 flex items-center justify-center gap-3 lg:mb-0">
            {socialMediaLinks?.map((link, index) => (
              <a key={index} href={link.url}>
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer5Defaults: Props = {
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
  newsletterHeading: "Join our newsletter",
  newsletterDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
      title: "Column Three",
      links: [
        { title: "Link Eleven", link: { type: 'custom', url: '#' } },
        { title: "Link Twelve", link: { type: 'custom', url: '#' } },
        { title: "Link Thirteen", link: { type: 'custom', url: '#' } },
        { title: "Link Fourteen", link: { type: 'custom', url: '#' } },
        { title: "Link Fifteen", link: { type: 'custom', url: '#' } },
      ],
    },
    {
      title: "Column Four",
      links: [
        { title: "Link Sixteen", link: { type: 'custom', url: '#' } },
        { title: "Link Seventeen", link: { type: 'custom', url: '#' } },
        { title: "Link Eighteen", link: { type: 'custom', url: '#' } },
        { title: "Link Nineteen", link: { type: 'custom', url: '#' } },
        { title: "Link Twenty", link: { type: 'custom', url: '#' } },
      ],
    },
    {
      title: "Column Five",
      links: [
        { title: "Link Twenty One", link: { type: 'custom', url: '#' } },
        { title: "Link Twenty Two", link: { type: 'custom', url: '#' } },
        { title: "Link Twenty Three", link: { type: 'custom', url: '#' } },
        { title: "Link Twenty Four", link: { type: 'custom', url: '#' } },
        { title: "Link Twenty Five", link: { type: 'custom', url: '#' } },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "#", icon: 'facebook' },
    { url: "#", icon: 'instagram' },
    { url: "#", icon: 'x' },
    { url: "#", icon: 'linkedin' },
    { url: "#", icon: 'youtube' },
  ],
  footerText: "© 2024 Relume. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", link: { type: 'custom', url: '#' } },
    { title: "Terms of Service", link: { type: 'custom', url: '#' } },
    { title: "Cookies Settings", link: { type: 'custom', url: '#' } },
  ],
};
