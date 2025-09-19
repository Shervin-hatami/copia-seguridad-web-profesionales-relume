import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Contact1Block: Block = {
  slug: 'contact1',
  interfaceName: 'Contact1Block',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Contenido superior (tagline, título y descripción)',
      required: true,
      admin: {
        description: 'Add tagline, heading (H6) and description text as needed',
      },
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Texto del botón',
          required: true,
          defaultValue: 'Submit',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Variante del botón',
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
          label: 'Tamaño del botón',
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
      name: 'terms',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Texto de términos y condiciones',
      required: true,
      admin: {
        description: 'Add terms and conditions text as needed',
      },
    },
  ],
  graphQL: {
    singularName: 'Contact1Block',
  },
  labels: {
    plural: 'Contact 1 Blocks',
    singular: 'Contact 1 Block',
  },
}
