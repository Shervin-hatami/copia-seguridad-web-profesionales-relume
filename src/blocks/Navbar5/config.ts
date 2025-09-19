import type { Block } from 'payload';
import { simpleLink } from '../../fields/simpleLink';

export const Navbar5Block: Block = {
  slug: 'navbar5',
  interfaceName: 'Navbar5Block',
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'useMedia',
          type: 'checkbox',
          label: 'Usar upload de media',
          defaultValue: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo (Media)',
          admin: {
            condition: (_, siblingData) => siblingData?.useMedia === true,
            description: 'Upload logo image or use placeholder',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL del logo',
          admin: {
            condition: (data, siblingData) => siblingData?.useMedia !== true,
          },
        },
        {
          name: 'src',
          type: 'text',
          label: 'Src de la imagen',
          admin: {
            condition: (data, siblingData) => siblingData?.useMedia !== true,
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt de la imagen',
          admin: {
            condition: (data, siblingData) => siblingData?.useMedia !== true,
          },
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Enlaces de navegación',
      dbName: 'nav_links_5',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        simpleLink(),
        {
          name: 'megaMenu',
          type: 'group',
          label: 'Mega Menú',
          fields: [
            {
              name: 'categoryLinks',
              type: 'array',
              label: 'Categorías de enlaces',
              dbName: 'cat_links_5',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                                {
                  name: 'links',
                 type: 'array',
                 label: 'Enlaces de la categoría',
                 dbName: 'cat_link_items_5',
                  fields: [
                    simpleLink(),
                    {
                      name: 'image',
                      type: 'group',
                      fields: [
                        {
                          name: 'src',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'alt',
                          type: 'text',
                        },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'text',
                    },
                    {
                      name: 'button',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                        },
                        {
                          name: 'size',
                          type: 'select',
                          options: [
                            { label: 'Pequeño', value: 'sm' },
                            { label: 'Grande', value: 'lg' },
                          ],
                          defaultValue: 'sm',
                        },
                        {
                          name: 'variant',
                          type: 'select',
                          options: [
                            { label: 'Por defecto', value: 'default' },
                            { label: 'Secundario', value: 'secondary' },
                            { label: 'Fantasma', value: 'ghost' },
                            { label: 'Enlace', value: 'link' },
                          ],
                          defaultValue: 'default',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'featuredSections',
              type: 'group',
              label: 'Sección destacada',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                                 {
                   name: 'links',
                 type: 'array',
                 label: 'Enlaces destacados',
                 dbName: 'featured_links_5',
                  fields: [
                    simpleLink(),
                    {
                      name: 'image',
                      type: 'group',
                      fields: [
                        {
                          name: 'src',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'alt',
                          type: 'text',
                        },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'text',
                    },
                    {
                      name: 'button',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                        },
                        {
                          name: 'size',
                          type: 'select',
                          options: [
                            { label: 'Pequeño', value: 'sm' },
                            { label: 'Grande', value: 'lg' },
                          ],
                          defaultValue: 'sm',
                        },
                        {
                          name: 'variant',
                          type: 'select',
                          options: [
                            { label: 'Por defecto', value: 'default' },
                            { label: 'Secundario', value: 'secondary' },
                            { label: 'Fantasma', value: 'ghost' },
                            { label: 'Enlace', value: 'link' },
                          ],
                          defaultValue: 'default',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'button',
              type: 'group',
              label: 'Botón del mega menú',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'size',
                  type: 'select',
                  options: [
                    { label: 'Pequeño', value: 'sm' },
                    { label: 'Grande', value: 'lg' },
                  ],
                  defaultValue: 'sm',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Por defecto', value: 'default' },
                    { label: 'Secundario', value: 'secondary' },
                    { label: 'Fantasma', value: 'ghost' },
                    { label: 'Enlace', value: 'link' },
                  ],
                  defaultValue: 'default',
                },
                simpleLink(),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Botones',
      dbName: 'btns_5',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Pequeño', value: 'sm' },
            { label: 'Grande', value: 'lg' },
          ],
          defaultValue: 'sm',
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Por defecto', value: 'default' },
            { label: 'Secundario', value: 'secondary' },
            { label: 'Fantasma', value: 'ghost' },
            { label: 'Enlace', value: 'link' },
          ],
          defaultValue: 'default',
        },
        simpleLink(),
      ],
    },
  ],
};
