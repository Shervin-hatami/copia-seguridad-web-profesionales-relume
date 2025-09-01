import React from 'react'
import { Button } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'

import type { CTA1Block as CTA1BlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CTA1Block: React.FC<CTA1BlockProps> = ({ content, buttons, image }) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 md:mb-6">
              <RichText data={content} enableGutter={false} />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons?.map((button, index) => {
                const buttonProps: ButtonProps = {
                  variant: button.variant || 'primary',
                }

                return (
                  <CMSLink key={index} {...button.link}>
                    <Button {...buttonProps}>
                      {button.title}
                    </Button>
                  </CMSLink>
                )
              })}
            </div>
          </div>
          <div>
            {image?.media && (
              <Media
                resource={image.media}
                className="w-full object-cover"
                alt={image.alt || ''}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
