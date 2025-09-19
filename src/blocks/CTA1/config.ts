import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { simpleLink } from '../../fields/simpleLink'

export const CTA1Block: Block = {
  slug: 'cta1',
  interfaceName: 'CTA1Block',
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
      name: 'image',
      type: 'group',
      label: 'Imagen',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen',
          admin: {
            description: 'Upload image or use placeholder',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Texto alternativo',
          admin: {
            description: 'Descripción de la imagen para accesibilidad',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'CTA1',
    plural: 'CTA1s',
  },
}
