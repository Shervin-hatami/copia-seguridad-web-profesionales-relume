import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const Layout5Block: Block = {
  slug: 'layout5',
  interfaceName: 'Layout5Block',
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
      admin: {
        description: 'Use H1 for "Medium length section heading goes here" or customize as needed',
      },
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
      admin: {
        description: 'Add description text like "Lorem ipsum dolor sit amet, consectetur adipiscing elit."',
      },
    },
    {
      name: 'subHeadings',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Título del subencabezado',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: {
            description: 'Descripción del subencabezado',
          },
        },
      ],
      admin: {
        description: 'Agregue subencabezados (máximo 2)',
      },
      maxRows: 2,
    },
    {
      name: 'buttons',
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
        description: 'Agregue botones/enlaces (máximo 2)',
      },
      maxRows: 2,
    },
    {
      name: 'video',
      type: 'text',
      required: false,
      admin: {
        description: 'URL del video (YouTube, Vimeo, etc. - se aceptan URLs normales y de embed)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Imagen de portada para el video',
      },
    },
  ],
}
