'use client'
import React, { useState } from 'react'

import type { Layout5Block as Layout5BlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@relume_io/relume-ui'
import { FaCirclePlay } from 'react-icons/fa6'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

export const Layout5Block: React.FC<Layout5BlockProps> = ({ 
  tagline, 
  heading, 
  description, 
  subHeadings,
  buttons,
  video,
  image
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Función para convertir URLs de YouTube al formato embed correcto
  const getVideoUrl = (url: string) => {
    if (!url) return ''
    
    // Si ya es una URL de embed, la devolvemos tal como está
    if (url.includes('youtube.com/embed/')) {
      return url
    }
    
    // Si es una URL normal de YouTube, la convertimos a embed
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(youtubeRegex)
    
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    
    // Si no es YouTube, devolvemos la URL tal como está
    return url
  }

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            )}
            {heading && (
              <div className="mb-5 md:mb-6 [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:md:text-7xl [&_h1]:lg:text-8xl [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:md:text-6xl [&_h2]:lg:text-7xl [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:md:text-5xl [&_h3]:lg:text-6xl [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:md:text-4xl [&_h4]:lg:text-5xl">
                <RichText 
                  data={heading} 
                  enableGutter={false} 
                  enableProse={false}
                />
              </div>
            )}
            {description && (
              <div className="mb-6 md:mb-8 md:text-md">
                <RichText 
                  data={description} 
                  enableGutter={false} 
                  enableProse={false}
                />
              </div>
            )}
            {Array.isArray(subHeadings) && subHeadings.length > 0 && (
              <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                {subHeadings.map((subHeading, index) => (
                  <div key={index}>
                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                      {subHeading.title}
                    </h6>
                    <p>{subHeading.description}</p>
                  </div>
                ))}
              </div>
            )}
            {Array.isArray(buttons) && buttons.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {buttons.map(({ link }, index) => (
                  <CMSLink 
                    key={index} 
                    {...link}
                    appearance={index === 0 ? 'secondary' : 'link'}
                    size={index === 0 ? 'default' : undefined}
                  />
                ))}
              </div>
            )}
          </div>
          {video && (
            <>
              <button 
                className="relative flex w-full items-center justify-center cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                {image && typeof image === 'object' && (
                  <Media 
                    resource={image}
                    className="size-full object-cover"
                  />
                )}
                {!image && (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagen de portada</span>
                  </div>
                )}
                <span className="absolute inset-0 z-10 bg-black/50" />
                <FaCirclePlay className="absolute z-20 size-16 text-white" />
              </button>
              
              {isDialogOpen && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setIsDialogOpen(false)
                      setIsIframeLoaded(false)
                    }
                  }}
                >
                  <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
                    <button
                      onClick={() => {
                        setIsDialogOpen(false)
                        setIsIframeLoaded(false)
                      }}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
                    >
                      ×
                    </button>
                    <div className="relative">
                      {!isIframeLoaded && (
                        <div className="flex items-center justify-center h-64">
                          <CgSpinner className="size-16 animate-spin text-gray-500" />
                        </div>
                      )}
                                             <iframe
                         className={clsx("w-full aspect-video", {
                           visible: isIframeLoaded,
                           hidden: !isIframeLoaded,
                         })}
                         src={getVideoUrl(video)}
                         title="Video"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                         onLoad={() => setIsIframeLoaded(true)}
                       />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {!video && image && (
            <div className="relative flex w-full items-center justify-center">
              <Media 
                resource={image}
                className="size-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
