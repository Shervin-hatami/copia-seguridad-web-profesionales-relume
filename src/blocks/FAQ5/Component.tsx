'use client'

import {
  Button,
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@relume_io/relume-ui";

import type { ButtonProps } from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";
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

export type FAQ5BlockType = {
  blockName?: string
  blockType?: 'faq5'
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

export const FAQ5 = (props: FAQ5BlockType) => {
  const { content, questions, footerContent, button } = {
    ...FAQ5Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <Accordion type="multiple" className="grid items-start justify-stretch gap-4">
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border-primary px-5 md:px-6"
            >
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                <RichText data={question.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
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

export const FAQ5Defaults: Props = {
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
