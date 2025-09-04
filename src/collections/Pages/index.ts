import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { Banner1Block } from '../../blocks/Banner1/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CTA1Block } from '../../blocks/CTA1/config'
import { CTA5Block } from '../../blocks/CTA5/config'
import { Content } from '../../blocks/Content/config'
import { Footer1Block } from '../../blocks/Footer1/config'
import { Footer5Block } from '../../blocks/Footer5/config'
import { FormBlock } from '../../blocks/Form/config'
import { Header44Block } from '../../blocks/Header44/config'
import { Header48Block } from '../../blocks/Header48/config'
import { Layout1Block } from '../../blocks/Layout1/config'
import { Layout5Block } from '../../blocks/Layout5/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { MultiForm1Block } from '../../blocks/MultiForm1/config'
import { Contact1Block } from '../../blocks/Contact1/config'
import { Contact5Block } from '../../blocks/Contact5/config'
import { Pricing1Block } from '../../blocks/Pricing1/config'
import { Pricing5Block } from '../../blocks/Pricing5/config'
import { FAQ1Block } from '../../blocks/FAQ1/config'
import { Navbar1Block } from '../../blocks/Navbar1/config'
import { Navbar5Block } from '../../blocks/Navbar5/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Banner1Block, CallToAction, CTA1Block, CTA5Block, Content, Footer1Block, Footer5Block, Header44Block, Header48Block, Layout1Block, Layout5Block, MediaBlock, Archive, FormBlock, MultiForm1Block, Contact1Block, Contact5Block, Pricing1Block, Pricing5Block, FAQ1Block, Navbar1Block, Navbar5Block],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
