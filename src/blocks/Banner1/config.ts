import type { Block } from 'payload'

export const Banner1Block: Block = {
  slug: 'banner1',
  interfaceName: 'Banner1Block',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Medium length banner heading goes here',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
        },
        {
          name: 'src',
          type: 'text',
          required: true,
          defaultValue: 'https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg',
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Relume logo',
        },
      ],
    },
    {
      name: 'inputPlaceholder',
      type: 'text',
      required: true,
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
          defaultValue: 'Sign up',
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
          defaultValue: 'default',
        },
      ],
    },
  ],
}
