import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Contact5Block: Block = {
  slug: 'contact5',
  interfaceName: 'Contact5Block',
  fields: [
    {
      name: 'content',
      type: 'richText',
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
      label: 'Contenido superior (tagline, título y descripción)',
      required: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
          label: 'Email de contacto',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono de contacto',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          label: 'Dirección de contacto',
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
        {
          name: 'variant',
          type: 'select',
          label: 'Variante del botón',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
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
            { label: 'Large', value: 'lg' },
            { label: 'Link', value: 'link' },
          ],
          defaultValue: 'sm',
        },
      ],
    },
    {
      name: 'terms',
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
      label: 'Texto de términos y condiciones',
      required: true,
    },
  ],
  graphQL: {
    singularName: 'Contact5Block',
  },
  labels: {
    plural: 'Contact 5 Blocks',
    singular: 'Contact 5 Block',
  },
}
