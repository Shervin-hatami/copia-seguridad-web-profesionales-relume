'use client'
import React from 'react'

import type { Header44Block as Header44BlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const Header44Block: React.FC<Header44BlockProps> = ({ tagline, heading, description, links }) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="w-full max-w-lg">
          {tagline && (
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          )}
          {heading && (
            <div className="mb-5 md:mb-6 [&_h1]:text-6xl [&_h1]:font-bold [&_h1]:md:text-9xl [&_h1]:lg:text-10xl [&_h2]:text-5xl [&_h2]:font-bold [&_h2]:md:text-8xl [&_h2]:lg:text-9xl [&_h3]:text-4xl [&_h3]:font-bold [&_h3]:md:text-7xl [&_h3]:lg:text-8xl [&_h4]:text-3xl [&_h4]:font-bold [&_h4]:md:text-6xl [&_h4]:lg:text-7xl">
              <RichText 
                data={heading} 
                enableGutter={false} 
                enableProse={false}
              />
            </div>
          )}
          {description && (
            <div className="md:text-md">
              <RichText 
                data={description} 
                enableGutter={false} 
                enableProse={false}
              />
            </div>
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
      </div>
    </section>
  )
}
