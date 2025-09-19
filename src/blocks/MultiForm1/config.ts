import type { Block } from 'payload'

export const MultiForm1Block: Block = {
  slug: 'multiForm1',
  interfaceName: 'MultiForm1Block',
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Logo URL',
          defaultValue: '#',
        },
        {
          name: 'src',
          type: 'text',
          label: 'Logo Image URL',
          required: true,
          defaultValue: 'https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Logo Alt Text',
          defaultValue: 'Relume logo',
        },
      ],
    },
    {
      name: 'navText',
      type: 'text',
      label: 'Navigation Text',
      defaultValue: 'Navigation',
    },
    {
      name: 'navButton',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'button',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Button Variant',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Link', value: 'link' },
          ],
          defaultValue: 'primary',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Button Size',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Small', value: 'sm' },
            { label: 'Large', value: 'lg' },
            { label: 'Link', value: 'link' },
          ],
          defaultValue: 'default',
        },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer Text',
      defaultValue: '© 2024 Relume. All rights reserved.',
    },
  ],
  graphQL: {
    singularName: 'MultiForm1Block',
  },
  labels: {
    plural: 'Multi Form 1 Blocks',
    singular: 'Multi Form 1 Block',
  },
}
