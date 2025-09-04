'use client'

import { BiCheck } from "react-icons/bi";
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type FeatureSection = {
  icon: {
    media: any;
    alt?: string;
  };
  heading: string;
  description?: SerializedEditorState;
};

type PricingPlan = {
  planName: string;
  description?: SerializedEditorState;
  monthlyPrice: string;
  features: {
    feature?: SerializedEditorState;
  }[];
  button: {
    title: string;
  };
};

type Props = {
  tagline: string;
  heading: string;
  description?: SerializedEditorState;
  featureSections: FeatureSection[];
  pricingPlan: PricingPlan;
};

export type Pricing5BlockType = {
  blockName?: string
  blockType?: 'pricing5'
  tagline: string;
  heading: string;
  description?: SerializedEditorState;
  featureSections: FeatureSection[];
  pricingPlan: PricingPlan;
}

export const Pricing5 = (props: Pricing5BlockType) => {
  const { tagline, heading, description, featureSections, pricingPlan } = {
    ...Pricing5Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-8 w-full max-w-lg lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          {description && (
            <RichText data={description} />
          )}
        </div>
        <div className="grid w-full grid-cols-1 items-center gap-y-12 md:gap-x-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2">
            {featureSections?.map((featureSection, index) => (
              <div key={index} className="flex self-start">
                <div className="mr-6 flex-none self-start">
                  {featureSection.icon?.media && (
                    <Media
                      resource={featureSection.icon.media}
                      className="size-8"
                      alt={featureSection.icon.alt || ''}
                    />
                  )}
                </div>
                <div>
                  <h3 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                    {featureSection.heading}
                  </h3>
                  {featureSection.description && (
                    <RichText data={featureSection.description} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <PricingPlan plan={pricingPlan} />
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan }: { plan: PricingPlan }) => (
  <div className="h-full border border-border-primary px-6 py-8 md:p-8">
    <div className="flex items-start justify-between">
      <div>
        <h4 className="mb-2 text-xl font-bold md:text-2xl">{plan.planName}</h4>
        {plan.description && (
          <RichText data={plan.description} />
        )}
      </div>
      <h5 className="justify-self-end text-6xl font-bold md:text-9xl lg:text-10xl">
        {plan.monthlyPrice}
        <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">/mo</span>
      </h5>
    </div>
    <div className="my-8 h-px w-full shrink-0 bg-border" />
    <p>Includes:</p>
    <div className="mb-8 mt-4 grid grid-cols-1 gap-y-4 py-2 md:grid-cols-2 md:gap-x-6">
      {plan.features?.map((feature, index) => (
        <div key={index} className="flex self-start">
          <div className="mr-4 flex-none self-start">
            <BiCheck className="size-6" />
          </div>
          {feature.feature && (
            <RichText data={feature.feature} />
          )}
        </div>
      ))}
    </div>
    <div className="my-8 h-px w-full shrink-0 bg-border" />
    <div>
      <button 
        className="w-full bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {plan.button.title}
      </button>
    </div>
  </div>
);

export const Pricing5Defaults: Props = {
  tagline: "Tagline",
  heading: "Pricing plan",
  description: undefined,
  featureSections: [
    {
      icon: { media: undefined, alt: "Icono 1" },
      heading: "Característica principal",
      description: undefined,
    },
    {
      icon: { media: undefined, alt: "Icono 2" },
      heading: "Característica secundaria",
      description: undefined,
    },
    {
      icon: { media: undefined, alt: "Icono 3" },
      heading: "Característica adicional",
      description: undefined,
    },
  ],
  pricingPlan: {
    planName: "Plan básico",
    description: undefined,
    monthlyPrice: "$19",
    features: [
      { feature: undefined },
      { feature: undefined },
      { feature: undefined },
      { feature: undefined },
      { feature: undefined },
    ],
    button: { title: "Comenzar" },
  },
};
