'use client'

import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import { Checkbox } from "@/components/ui/checkbox";
import type { ButtonProps } from "@relume_io/relume-ui";
import React, { useState } from "react";
import RichText from '@/components/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = {
  content?: SerializedEditorState;
  button: ButtonProps;
  terms?: SerializedEditorState;
};

export type Contact1BlockType = {
  blockName?: string
  blockType?: 'contact1'
  content?: SerializedEditorState;
  button: ButtonProps;
  terms?: SerializedEditorState;
}

export const Contact1 = (props: Contact1BlockType) => {
  const { content, button, terms } = {
    ...Contact1Defaults,
    ...props,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Mostrar datos en consola para desarrollo
    console.log('Formulario de contacto enviado:', { 
      name, 
      email, 
      message, 
      acceptTerms,
      timestamp: new Date().toISOString()
    });

    // Aquí posteriormente se puede integrar con un servicio de email
    // o plugin de Payload para el envío real
    
    // Resetear formulario después del envío
    setName("");
    setEmail("");
    setMessage("");
    setAcceptTerms(false);
    
    // Mostrar mensaje de éxito (opcional)
    alert('Mensaje enviado correctamente. Revisa la consola para ver los datos.');
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mx-auto mb-8 w-full max-w-lg text-center md:mb-10 lg:mb-12">
          {content && (
            <RichText data={content} />
          )}
        </div>
        <form className="mx-auto grid w-full max-w-md grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div className="grid w-full items-center">
            <Label htmlFor="name" className="mb-2">
              Nombre
            </Label>
            <Input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
          <div className="text-center">
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
    </section>
  );
};

export const Contact1Defaults: Props = {
  content: undefined,
  button: { 
    title: "Enviar",
    variant: "primary",
    size: "sm"
  },
  terms: undefined,
};
