'use client'


import RichText from '@/components/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type PricingPlan = {
  plan?: SerializedEditorState;
  features?: SerializedEditorState;
  button: {
    title: string;
  };
};

type Props = {
  content?: SerializedEditorState;
  pricingPlan: PricingPlan;
};

export type Pricing1BlockType = {
  blockName?: string
  blockType?: 'pricing1'
  content?: SerializedEditorState;
  pricingPlan: PricingPlan;
}

export const Pricing1 = (props: Pricing1BlockType) => {
  const { content, pricingPlan } = {
    ...Pricing1Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <div className="mx-auto w-full max-w-md">
          <PricingPlan plan={pricingPlan} />
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan }: { plan: PricingPlan }) => (
  <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
    <div className="mb-6 md:mb-8">
      <div className="text-center">
        {plan.plan && (
          <RichText data={plan.plan} />
        )}
      </div>
    </div>
    <div className="mb-8 py-2">
      {plan.features && (
        <RichText data={plan.features} />
      )}
    </div>
    <div>
      <button 
        className="w-full min-w-[120px] bg-black text-white px-5 py-2 rounded font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {plan.button.title}
      </button>
    </div>
  </div>
);

export const Pricing1Defaults: Props = {
  content: undefined,
  pricingPlan: {
    plan: undefined,
    features: undefined,
    button: { 
      title: "Get started"
    },
  },
};
