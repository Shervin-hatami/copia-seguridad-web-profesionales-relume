import type { Block } from 'payload'

import { simpleLink } from '@/fields/simpleLink'

export const Footer1Block: Block = {
  slug: 'footer1',
  interfaceName: 'Footer1Block',
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
      name: 'newsletterDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'Join our newsletter to stay up to date on features and releases.',
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
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X (Twitter)', value: 'x' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Youtube', value: 'youtube' },
              ],
            },
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
          title: 'Follow us',
          links: [
            { title: 'Facebook', link: { type: 'custom', url: '#' }, icon: 'facebook' },
            { title: 'Instagram', link: { type: 'custom', url: '#' }, icon: 'instagram' },
            { title: 'X', link: { type: 'custom', url: '#' }, icon: 'x' },
            { title: 'LinkedIn', link: { type: 'custom', url: '#' }, icon: 'linkedin' },
            { title: 'Youtube', link: { type: 'custom', url: '#' }, icon: 'youtube' },
          ],
        },
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
