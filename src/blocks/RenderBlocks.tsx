import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { Banner1 } from '@/blocks/Banner1/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CTA1Block } from '@/blocks/CTA1/Component'
import { CTA5Block } from '@/blocks/CTA5/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { Footer1 } from '@/blocks/Footer1/Component'
import { Footer5 } from '@/blocks/Footer5/Component'
import { Header44Block } from '@/blocks/Header44/Component'
import { Header48Block } from '@/blocks/Header48/Component'
import { Layout1Block } from '@/blocks/Layout1/Component'
import { Layout5Block } from '@/blocks/Layout5/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MultiForm1Block } from '@/blocks/MultiForm1/Component'
import { Contact1 } from '@/blocks/Contact1/Component'
import { Contact5 } from '@/blocks/Contact5/Component'
import { Pricing1 } from '@/blocks/Pricing1/Component'
import { Pricing5 } from '@/blocks/Pricing5/Component'
import { FAQ1 } from '@/blocks/FAQ1/Component'
import { Navbar1 } from '@/blocks/Navbar1/Component'
import { Navbar5 } from '@/blocks/Navbar5/Component'

const blockComponents = {
  archive: ArchiveBlock,
  banner1: Banner1,
  content: ContentBlock,
  cta: CallToActionBlock,
  cta1: CTA1Block,
  cta5: CTA5Block,
  contact1: Contact1,
  contact5: Contact5,
  footer1: Footer1,
  footer5: Footer5,
  header44: Header44Block,
  header48: Header48Block,
  layout1: Layout1Block,
  layout5: Layout5Block,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  multiForm1: MultiForm1Block,
  navbar1: Navbar1,
  navbar5: Navbar5,
  pricing1: Pricing1,
  pricing5: Pricing5,
  faq1: FAQ1,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
