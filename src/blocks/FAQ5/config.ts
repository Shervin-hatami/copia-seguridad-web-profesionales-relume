import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { simpleLink } from '../../fields/simpleLink'

export const FAQ5Block: Block = {
  slug: 'faq5',
  interfaceName: 'FAQ5Block',
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
      name: 'questions',
      type: 'array',
      label: 'Preguntas frecuentes',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Pregunta',
          required: true,
          defaultValue: 'Frequently asked question',
        },
        {
          name: 'answer',
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
          label: 'Respuesta',
          required: true,
          admin: {
            description: 'Add answer text as needed',
          },
        },
      ],
    },
    {
      name: 'footerContent',
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
      label: 'Contenido del pie (título y descripción)',
      required: true,
      admin: {
        description: 'Add footer content with heading and description as needed',
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
          defaultValue: 'Contact',
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
          defaultValue: 'secondary',
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
        simpleLink({
          overrides: {
            name: 'link',
            label: 'Enlace del botón',
          },
        }),
      ],
    },
  ],
  graphQL: {
    singularName: 'FAQ5Block',
  },
  labels: {
    plural: 'FAQ 5 Blocks',
    singular: 'FAQ 5 Block',
  },
}
