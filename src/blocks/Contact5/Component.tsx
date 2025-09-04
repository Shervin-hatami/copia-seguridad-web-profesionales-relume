'use client'

import { useState } from "react";
import { Input, Label, Textarea, Button } from "@relume_io/relume-ui";
import { Checkbox } from "@/components/ui/checkbox";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import RichText from '@/components/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type ContactInfoProps = {
  email: string;
  phone: string;
  address: string;
};

type Props = {
  content?: SerializedEditorState;
  contactInfo: ContactInfoProps;
  button: ButtonProps;
  terms?: SerializedEditorState;
};

export type Contact5BlockType = {
  blockName?: string
  blockType?: 'contact5'
  content?: SerializedEditorState;
  contactInfo: ContactInfoProps;
  button: ButtonProps;
  terms?: SerializedEditorState;
}

export const Contact5 = (props: Contact5BlockType) => {
  const { content, contactInfo, button, terms } = {
    ...Contact5Defaults,
    ...props,
  };

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Mostrar datos en consola para desarrollo
    console.log('Formulario de contacto enviado:', {
      nameInput,
      emailInput,
      messageInput,
      acceptTerms,
      timestamp: new Date().toISOString()
    });

    // Aquí posteriormente se puede integrar con un servicio de email
    // o plugin de Payload para el envío real
    
    // Resetear formulario después del envío
    setNameInput("");
    setEmailInput("");
    setMessageInput("");
    setAcceptTerms(false);
    
    // Mostrar mensaje de éxito (opcional)
    alert('Mensaje enviado correctamente. Revisa la consola para ver los datos.');
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
          <div>
            {content && (
              <RichText data={content} />
            )}

            <div className="grid grid-cols-1 gap-4 py-2">
              <div className="flex items-center gap-4">
                <BiEnvelope className="size-6 flex-none" />
                <p>{contactInfo.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <BiPhone className="size-6 flex-none" />
                <p>{contactInfo.phone}</p>
              </div>
              <div className="flex items-center gap-4">
                <BiMap className="size-6 flex-none" />
                <p>{contactInfo.address}</p>
              </div>
            </div>
          </div>

          <form className="grid grid-cols-1 grid-rows-[auto_auto] gap-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center">
              <Label htmlFor="name" className="mb-2">
                Nombre
              </Label>
              <Input
                type="text"
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="message" className="mb-2">
                Mensaje
              </Label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje..."
                className="min-h-[11.25rem] overflow-auto"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 flex items-start space-x-3 text-sm md:mb-4">
              <Checkbox 
                id="terms" 
                checked={acceptTerms} 
                onCheckedChange={setAcceptTerms}
                required
                className="mt-1 flex-shrink-0"
              />
              <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
                {terms && <RichText data={terms} />}
              </Label>
            </div>

            <div>
              <Button 
                type="submit"
                size={button.size}
                variant={button.variant}
                className="min-w-[120px]"
              >
                {button.title}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Contact5Defaults: Props = {
  content: undefined,
  contactInfo: {
    email: "hello@relume.io",
    phone: "+1 (555) 000-0000",
    address: "123 Sample St, Sydney NSW 2000 AU",
  },
  button: { 
    title: "Enviar",
    variant: "primary",
    size: "sm"
  },
  terms: undefined,
};
