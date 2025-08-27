'use client'
import React, { useState } from 'react'

import type { Header48Block as Header48BlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const Header48Block: React.FC<Header48BlockProps> = ({ 
  tagline, 
  heading, 
  description, 
  inputPlaceholder, 
  button, 
  termsAndConditions 
}) => {
  const [emailInput, setEmailInput] = useState<string>("")
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      emailInput,
    })
  }

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12 lg:gap-20">
          <div className="w-full max-w-lg">
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            )}
            {heading && (
              <div className="[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:md:text-9xl [&_h1]:lg:text-10xl [&_h2]:text-5xl [&_h2]:font-bold [&_h2]:md:text-8xl [&_h2]:lg:text-9xl [&_h3]:text-4xl [&_h3]:font-bold [&_h3]:md:text-7xl [&_h3]:lg:text-8xl [&_h4]:text-3xl [&_h4]:font-bold [&_h4]:md:text-6xl [&_h4]:lg:text-7xl">
                <RichText 
                  data={heading} 
                  enableGutter={false} 
                  enableProse={false}
                />
              </div>
            )}
          </div>
          <div className="w-full max-w-lg">
            {description && (
              <div className="md:text-md">
                <RichText 
                  data={description} 
                  enableGutter={false} 
                  enableProse={false}
                />
              </div>
            )}
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                className="mb-4 grid w-full max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  id="email"
                  type="email"
                  placeholder={inputPlaceholder || "Enter your email"}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {button && (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    {button.title || 'Sign up'}
                  </button>
                )}
              </form>
              {termsAndConditions && (
                <div className="text-xs">
                  <RichText 
                    data={termsAndConditions} 
                    enableGutter={false} 
                    enableProse={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
