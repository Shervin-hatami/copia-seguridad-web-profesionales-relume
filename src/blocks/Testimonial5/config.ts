import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Testimonial5Block: Block = {
  slug: 'testimonial5',
  interfaceName: 'Testimonial5Block',
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
      label: 'Contenido principal (título y descripción)',
      required: true,
      admin: {
        description: 'Add main content with heading and description as needed',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonios',
      minRows: 1,
      fields: [
        {
          name: 'numberOfStars',
          type: 'number',
          label: 'Número de estrellas',
          min: 1,
          max: 5,
          defaultValue: 5,
          required: true,
        },
        {
          name: 'quote',
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
          label: 'Testimonio (cita)',
          required: true,
          admin: {
            description: 'Add testimonial quote text as needed',
          },
        },
        {
          name: 'avatar',
          type: 'group',
          label: 'Avatar del usuario',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen del avatar',
              admin: {
                description: 'Upload user avatar or use placeholder',
              },
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Texto alternativo',
              admin: {
                description: 'Descripción del avatar para accesibilidad',
              },
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nombre completo',
          required: true,
          defaultValue: 'John Doe',
        },
        {
          name: 'position',
          type: 'text',
          label: 'Cargo/Posición y empresa',
          required: true,
          defaultValue: 'CEO at Company',
        },
        {
          name: 'logo',
          type: 'group',
          label: 'Logo de la empresa',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen del logo',
              admin: {
                description: 'Upload company logo or use placeholder',
              },
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
    },
  ],
  graphQL: {
    singularName: 'Testimonial5Block',
  },
  labels: {
    plural: 'Testimonial 5 Blocks',
    singular: 'Testimonial 5 Block',
  },
}
