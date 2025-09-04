import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Pricing1Block: Block = {
  slug: 'pricing1',
  interfaceName: 'Pricing1Block',
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
      label: 'Contenido superior (tagline, título y descripción)',
      required: true,
    },
    {
      name: 'pricingPlan',
      type: 'group',
      fields: [
        {
          name: 'plan',
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
          label: 'Plan (nombre, precio mensual y anual)',
          required: true,
        },
        {
          name: 'features',
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
          label: 'Características del plan (usa listas para cada característica)',
          required: true,
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
            {
              name: 'variant',
              type: 'select',
              label: 'Variante del botón',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Link', value: 'link' },
              ],
              defaultValue: 'primary',
            },
            {
              name: 'size',
              type: 'select',
              label: 'Tamaño del botón',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Primary', value: 'primary' },
                { label: 'Icon', value: 'icon' },
                { label: 'Link', value: 'link' },
              ],
              defaultValue: 'sm',
            },
          ],
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'Pricing1Block',
  },
  labels: {
    plural: 'Pricing 1 Blocks',
    singular: 'Pricing 1 Block',
  },
}
