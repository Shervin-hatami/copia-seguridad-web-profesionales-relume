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
        },
        {
          name: 'src',
          type: 'text',
          label: 'Logo Image URL',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Logo Alt Text',
        },
      ],
    },
    {
      name: 'navText',
      type: 'text',
      label: 'Navigation Text',
    },
    {
      name: 'navButton',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Button Text',
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
        },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer Text',
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
