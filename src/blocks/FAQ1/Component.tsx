'use client'

import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";

import type { ButtonProps } from "@relume_io/relume-ui";
import RichText from '@/components/RichText';
import { CMSLink } from '@/components/Link';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Question = {
  title: string;
  answer: SerializedEditorState;
};

type Props = {
  content?: SerializedEditorState;
  questions: Question[];
  footerContent?: SerializedEditorState;
  button: ButtonProps & {
    link: {
      type: 'reference' | 'custom';
      reference?: any;
      url?: string;
      newTab?: boolean;
    };
  };
};

export type FAQ1BlockType = {
  blockName?: string
  blockType?: 'faq1'
  content?: SerializedEditorState;
  questions: Question[];
  footerContent?: SerializedEditorState;
  button: ButtonProps & {
    link: {
      type: 'reference' | 'custom';
      reference?: any;
      url?: string;
      newTab?: boolean;
    };
  };
}

export const FAQ1 = (props: FAQ1BlockType) => {
  const { content, questions, footerContent, button } = {
    ...FAQ1Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <Accordion type="multiple">
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="md:py-5 md:text-md">{question.title}</AccordionTrigger>
              <AccordionContent className="md:pb-6">
                <RichText data={question.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          {footerContent && (
            <RichText data={footerContent} />
          )}
          <div className="mt-6 md:mt-8">
            <CMSLink {...button.link}>
              <Button variant={button.variant} size={button.size}>
                {button.title}
              </Button>
            </CMSLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ1Defaults: Props = {
  content: undefined,
  questions: [
    {
      title: "Question text goes here",
      answer: {} as SerializedEditorState,
    },
    {
      title: "Question text goes here", 
      answer: {} as SerializedEditorState,
    },
    {
      title: "Question text goes here",
      answer: {} as SerializedEditorState,
    },
  ],
  footerContent: undefined,
  button: {
    title: "Contact",
    variant: "secondary",
    size: "sm",
    link: {
      type: "custom" as const,
      url: "#",
      newTab: false,
    },
  },
};
