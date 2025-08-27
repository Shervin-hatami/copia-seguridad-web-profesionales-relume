'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const Header1Hero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            {richText && (
              <RichText 
                className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl" 
                data={richText} 
                enableGutter={false} 
                enableProse={false}
              />
            )}
                         {Array.isArray(links) && links.length > 0 && (
               <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                 {links.map(({ link }, index) => (
                   <CMSLink 
                     key={index} 
                     {...link}
                     appearance={index === 0 ? 'default' : 'secondary'}
                     size="sm"
                   />
                 ))}
               </div>
             )}
          </div>
          <div>
            {media && typeof media === 'object' && (
              <Media 
                className="w-full object-cover" 
                resource={media}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
