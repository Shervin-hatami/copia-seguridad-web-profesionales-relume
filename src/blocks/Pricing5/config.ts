import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Pricing5Block: Block = {
  slug: 'pricing5',
  interfaceName: 'Pricing5Block',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Título principal',
      required: true,
    },
    {
      name: 'description',
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
      label: 'Descripción',
      required: true,
    },
    {
      name: 'featureSections',
      type: 'array',
      label: 'Secciones de características',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'icon',
          type: 'group',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Icono',
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Texto alternativo',
              admin: {
                description: 'Descripción del icono para accesibilidad',
              },
            },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Título de la característica',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                ParagraphFeature(),
                AlignFeature(),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: 'Descripción de la característica',
          required: true,
        },
      ],
    },
    {
      name: 'pricingPlan',
      type: 'group',
      fields: [
        {
          name: 'planName',
          type: 'text',
          label: 'Nombre del plan',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                ParagraphFeature(),
                AlignFeature(),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: 'Descripción del plan',
          required: true,
        },
        {
          name: 'monthlyPrice',
          type: 'text',
          label: 'Precio mensual',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Características del plan',
          minRows: 1,
          maxRows: 15,
          fields: [
            {
              name: 'feature',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    ParagraphFeature(),
                    AlignFeature(),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Característica',
              required: true,
            },
          ],
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
            },
          ],
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'Pricing5Block',
  },
  labels: {
    plural: 'Pricing 5 Blocks',
    singular: 'Pricing 5 Block',
  },
}
