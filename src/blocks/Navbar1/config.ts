import type { Block } from 'payload'

import { simpleLink } from '../../fields/simpleLink'

export const Navbar1Block: Block = {
  slug: 'navbar1',
  interfaceName: 'Navbar1Block',
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'useMedia',
          type: 'checkbox',
          label: 'Usar imagen subida',
          defaultValue: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.useMedia === true,
          },
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
          admin: {
            condition: (_, siblingData) => siblingData?.useMedia !== true,
          },
        },
        {
          name: 'src',
          type: 'text',
          defaultValue: 'https://d22po4pjz3o32e.cloudfront.net/logo-image.svg',
          admin: {
            condition: (_, siblingData) => siblingData?.useMedia !== true,
          },
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Logo image',
          admin: {
            condition: (_, siblingData) => siblingData?.useMedia !== true,
          },
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      dbName: 'nav_links',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'home',
        },
        simpleLink(),
        {
          name: 'subMenuLinks',
          type: 'array',
          dbName: 'sub_links',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'google',
            },
            simpleLink(),
          ],
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      dbName: 'btns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'youtube',
        },
        simpleLink(),
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Large', value: 'lg' },
          ],
          defaultValue: 'lg',
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Link', value: 'link' },
          ],
          defaultValue: 'default',
        },
      ],
    },
  ],
}
