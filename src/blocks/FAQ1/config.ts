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

export const FAQ1Block: Block = {
  slug: 'faq1',
  interfaceName: 'FAQ1Block',
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
    singularName: 'FAQ1Block',
  },
  labels: {
    plural: 'FAQ 1 Blocks',
    singular: 'FAQ 1 Block',
  },
}
