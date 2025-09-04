'use client'

import RichText from '@/components/RichText';
import { Media } from '@/components/Media';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = {
  content?: SerializedEditorState;
  logos: {
    media: any;
    alt?: string;
  }[];
};

export type Logo1BlockType = {
  blockName?: string
  blockType?: 'logo1'
  content?: SerializedEditorState;
  logos: {
    media: any;
    alt?: string;
  }[];
}

export const Logo1 = (props: Logo1BlockType) => {
  const { content, logos } = {
    ...Logo1Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto mb-6 w-full max-w-lg text-center md:mb-8">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-2 pt-4 md:pt-2">
          {logos.map((logo, index) => (
            logo.media && (
              <Media
                key={index}
                resource={logo.media}
                className="max-h-12 md:max-h-14"
                alt={logo.alt || ''}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export const Logo1Defaults: Props = {
  content: undefined,
  logos: [
    { 
      media: undefined, 
      alt: "Logo 1" 
    },
    { 
      media: undefined, 
      alt: "Logo 2" 
    },
    { 
      media: undefined, 
      alt: "Logo 3" 
    },
    { 
      media: undefined, 
      alt: "Logo 4" 
    },
    { 
      media: undefined, 
      alt: "Logo 5" 
    },
    { 
      media: undefined, 
      alt: "Logo 6" 
    },
  ],
};
