import type { Block } from 'payload'

import { simpleLink } from '@/fields/simpleLink'

export const Footer5Block: Block = {
  slug: 'footer5',
  interfaceName: 'Footer5Block',
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload logo image or use placeholder',
          },
        },
        simpleLink(),
      ],
    },
    {
      name: 'newsletterHeading',
      type: 'text',
      required: true,
      defaultValue: 'Join our newsletter',
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'inputPlaceholder',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Subscribe',
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          defaultValue: 'sm',
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Destructive', value: 'destructive' },
            { label: 'Outline', value: 'outline' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Link', value: 'link' },
          ],
          defaultValue: 'secondary',
        },
      ],
    },
    {
      name: 'termsAndConditions',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'By subscribing you agree to with our',
        },
        simpleLink({
          overrides: {
            admin: {
              description: 'Link to Terms and Conditions page',
            },
          },
        }),
        {
          name: 'suffix',
          type: 'text',
          defaultValue: 'and provide consent to receive updates from our company.',
        },
      ],
    },
    {
      name: 'columnLinks',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            simpleLink(),
          ],
        },
      ],
      defaultValue: [
        {
          title: 'Column One',
          links: [
            { title: 'Link One', link: { type: 'custom', url: '#' } },
            { title: 'Link Two', link: { type: 'custom', url: '#' } },
            { title: 'Link Three', link: { type: 'custom', url: '#' } },
            { title: 'Link Four', link: { type: 'custom', url: '#' } },
            { title: 'Link Five', link: { type: 'custom', url: '#' } },
          ],
        },
        {
          title: 'Column Two',
          links: [
            { title: 'Link Six', link: { type: 'custom', url: '#' } },
            { title: 'Link Seven', link: { type: 'custom', url: '#' } },
            { title: 'Link Eight', link: { type: 'custom', url: '#' } },
            { title: 'Link Nine', link: { type: 'custom', url: '#' } },
            { title: 'Link Ten', link: { type: 'custom', url: '#' } },
          ],
        },
        {
          title: 'Column Three',
          links: [
            { title: 'Link Eleven', link: { type: 'custom', url: '#' } },
            { title: 'Link Twelve', link: { type: 'custom', url: '#' } },
            { title: 'Link Thirteen', link: { type: 'custom', url: '#' } },
            { title: 'Link Fourteen', link: { type: 'custom', url: '#' } },
            { title: 'Link Fifteen', link: { type: 'custom', url: '#' } },
          ],
        },
        {
          title: 'Column Four',
          links: [
            { title: 'Link Sixteen', link: { type: 'custom', url: '#' } },
            { title: 'Link Seventeen', link: { type: 'custom', url: '#' } },
            { title: 'Link Eighteen', link: { type: 'custom', url: '#' } },
            { title: 'Link Nineteen', link: { type: 'custom', url: '#' } },
            { title: 'Link Twenty', link: { type: 'custom', url: '#' } },
          ],
        },
        {
          title: 'Column Five',
          links: [
            { title: 'Link Twenty One', link: { type: 'custom', url: '#' } },
            { title: 'Link Twenty Two', link: { type: 'custom', url: '#' } },
            { title: 'Link Twenty Three', link: { type: 'custom', url: '#' } },
            { title: 'Link Twenty Four', link: { type: 'custom', url: '#' } },
            { title: 'Link Twenty Five', link: { type: 'custom', url: '#' } },
          ],
        },
      ],
    },
    {
      name: 'socialMediaLinks',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Youtube', value: 'youtube' },
          ],
        },
      ],
      defaultValue: [
        { url: '#', icon: 'facebook' },
        { url: '#', icon: 'instagram' },
        { url: '#', icon: 'x' },
        { url: '#', icon: 'linkedin' },
        { url: '#', icon: 'youtube' },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      defaultValue: '© 2024 Relume. All rights reserved.',
    },
    {
      name: 'footerLinks',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        simpleLink(),
      ],
      defaultValue: [
        { title: 'Privacy Policy', link: { type: 'custom', url: '#' } },
        { title: 'Terms of Service', link: { type: 'custom', url: '#' } },
        { title: 'Cookies Settings', link: { type: 'custom', url: '#' } },
      ],
    },
  ],
}
