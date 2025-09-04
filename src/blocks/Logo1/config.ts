import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Logo1Block: Block = {
  slug: 'logo1',
  interfaceName: 'Logo1Block',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            AlignFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Título/Encabezado',
      required: true,
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen del logo',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Texto alternativo',
          admin: {
            description: 'Descripción del logo para accesibilidad',
          },
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'Logo1Block',
  },
  labels: {
    plural: 'Logo 1 Blocks',
    singular: 'Logo 1 Block',
  },
}
