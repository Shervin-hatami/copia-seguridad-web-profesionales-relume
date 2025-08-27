import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const Layout1Block: Block = {
  slug: 'layout1',
  interfaceName: 'Layout1Block',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Tagline',
    },
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'description',
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
      label: false,
    },
          {
        name: 'links',
        type: 'array',
        fields: [
          link({
            overrides: {
              admin: {
                description: 'Configure el enlace para este botón',
              },
            },
          }),
        ],
        admin: {
          description: 'Agregue hasta 2 botones/enlaces',
        },
        maxRows: 2,
      },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
