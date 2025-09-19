import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { simpleLink } from '../../fields/simpleLink'

export const CTA5Block: Block = {
  slug: 'cta5',
  interfaceName: 'CTA5Block',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenido',
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
      admin: {
        description: 'Add CTA content with headings and text as needed',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Botones',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          title: 'Call to Action',
          variant: 'primary',
          link: {
            type: 'custom',
            url: '#',
          },
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Texto del botón',
          defaultValue: 'Call to Action',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Variante del botón',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primario',
              value: 'primary',
            },
            {
              label: 'Secundario',
              value: 'secondary',
            },
            {
              label: 'Secundario Alternativo',
              value: 'secondary-alt',
            },
            {
              label: 'Fantasma',
              value: 'ghost',
            },
            {
              label: 'Enlace',
              value: 'link',
            },
          ],
        },
        simpleLink({
          overrides: {
            name: 'link',
            label: 'Enlace del botón',
          },
        }),
      ],
    },
    {
      name: 'video',
      type: 'group',
      label: 'Video',
      fields: [
        {
          name: 'youtubeUrl',
          type: 'text',
          required: true,
          label: 'URL de YouTube',
          admin: {
            description: 'Pega la URL del video de YouTube (ej: https://www.youtube.com/watch?v=VIDEO_ID)',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'CTA5',
    plural: 'CTA5s',
  },
}
