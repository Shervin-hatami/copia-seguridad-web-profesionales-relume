import React from 'react'
import { Button } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'

import type { CTA5Block as CTA5BlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const CTA5Block: React.FC<CTA5BlockProps> = ({ content, buttons, video }) => {
  // Función para extraer el ID del video de YouTube de la URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ''
  }

  // Función para generar la URL de embed de YouTube
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1` : ''
  }

  const embedUrl = video?.youtubeUrl ? getYouTubeEmbedUrl(video.youtubeUrl) : ''

  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="w-full max-w-lg">
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
      </div>
      <div className="absolute inset-0 z-0">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
            }}
            title="Video de fondo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video 
            className="absolute inset-0 w-full h-full" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
            }}
            autoPlay 
            loop 
            muted
          >
            <source src={video?.youtubeUrl || ''} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>
    </section>
  )
}
