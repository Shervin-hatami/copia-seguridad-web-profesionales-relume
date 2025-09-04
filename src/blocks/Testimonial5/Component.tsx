'use client'

import { BiSolidStar } from "react-icons/bi";
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Testimonial = {
  numberOfStars: number;
  quote: SerializedEditorState;
  avatar: {
    media: any;
    alt?: string;
  };
  name: string;
  position: string;
  logo: {
    media: any;
    alt?: string;
  };
};

type Props = {
  content?: SerializedEditorState;
  testimonials: Testimonial[];
};

export type Testimonial5BlockType = {
  blockName?: string
  blockType?: 'testimonial5'
  content?: SerializedEditorState;
  testimonials: Testimonial[];
}

export const Testimonial5 = (props: Testimonial5BlockType) => {
  const { content, testimonials } = {
    ...Testimonial5Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
    <div className="mb-6 flex md:mb-8">
      {Array(testimonial.numberOfStars)
        .fill(null)
        .map((_, starIndex) => (
          <BiSolidStar key={starIndex} className="size-6" />
        ))}
    </div>
    <blockquote className="text-md font-bold leading-[1.4] md:text-xl">
      <RichText data={testimonial.quote} />
    </blockquote>
    <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:items-center md:gap-5">
      <div>
        {testimonial.avatar.media && (
          <Media
            resource={testimonial.avatar.media}
            className="size-14 min-h-14 min-w-14 rounded-full object-cover overflow-hidden"
            alt={testimonial.avatar.alt || ''}
          />
        )}
      </div>
      <div className="mb-4 md:mb-0">
        <p className="font-semibold">{testimonial.name}</p>
        <p>{testimonial.position}</p>
      </div>
      <div className="hidden w-px self-stretch bg-black md:block" />
      <div>
        {testimonial.logo.media && (
          <Media
            resource={testimonial.logo.media}
            className="max-h-12"
            alt={testimonial.logo.alt || ''}
          />
        )}
      </div>
    </div>
  </div>
);

export const Testimonial5Defaults: Props = {
  content: undefined,
  testimonials: [
    {
      numberOfStars: 5,
      quote: {} as SerializedEditorState,
      avatar: {
        media: undefined,
        alt: "Testimonial avatar 1",
      },
      name: "Name Surname",
      position: "Position, Company name",
      logo: {
        media: undefined,
        alt: "Company logo 1",
      },
    },
    {
      numberOfStars: 5,
      quote: {} as SerializedEditorState,
      avatar: {
        media: undefined,
        alt: "Testimonial avatar 2",
      },
      name: "Name Surname",
      position: "Position, Company name",
      logo: {
        media: undefined,
        alt: "Company logo 2",
      },
    },
  ],
};
