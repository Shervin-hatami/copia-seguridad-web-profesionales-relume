import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { simpleLink } from '../../fields/simpleLink'

export const Team1Block: Block = {
  slug: 'team1',
  labels: {
    singular: 'Team1',
    plural: 'Team1 Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido superior',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
        ],
      }),
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Miembros del equipo',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'group',
          label: 'Imagen del miembro',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Texto alternativo',
              required: true,
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nombre',
          required: true,
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: 'Título del trabajo',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Enlaces sociales',
          minRows: 0,
          maxRows: 3,
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Plataforma',
              options: [
                {
                  label: 'LinkedIn',
                  value: 'linkedin',
                },
                {
                  label: 'Twitter/X',
                  value: 'twitter',
                },
                {
                  label: 'Dribbble',
                  value: 'dribbble',
                },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'footerContent',
      type: 'richText',
      label: 'Contenido del footer',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
        ],
      }),
    },
    {
      name: 'button',
      type: 'group',
      label: 'Botón',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título del botón',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Variante del botón',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
          defaultValue: 'secondary',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Tamaño del botón',
          options: [
            {
              label: 'Small',
              value: 'sm',
            },
            {
              label: 'Medium',
              value: 'md',
            },
            {
              label: 'Large',
              value: 'lg',
            },
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
}
