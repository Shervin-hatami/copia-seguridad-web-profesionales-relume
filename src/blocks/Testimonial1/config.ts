import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Testimonial1Block: Block = {
  slug: 'testimonial1',
  interfaceName: 'Testimonial1Block',
  fields: [
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
      label: 'Cargo/Posición',
      required: true,
      defaultValue: 'CEO',
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Nombre de la empresa',
      required: true,
      defaultValue: 'Company Name',
    },
  ],
  graphQL: {
    singularName: 'Testimonial1Block',
  },
  labels: {
    plural: 'Testimonial 1 Blocks',
    singular: 'Testimonial 1 Block',
  },
}
