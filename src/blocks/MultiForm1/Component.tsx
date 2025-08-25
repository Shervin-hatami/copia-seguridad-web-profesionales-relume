'use client'

import {
  Button,
  Calendar,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiEnvelope } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FaRegCalendar } from "react-icons/fa6";
import { DateTime } from "luxon";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  logo: ImageProps;
  navText: string;
  navButton: ButtonProps;
  footerText: string;
};

export type MultiForm1BlockType = {
  blockName?: string
  blockType?: 'multiForm1'
  logo: ImageProps;
  navText: string;
  navButton: ButtonProps;
  footerText: string;
}

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  serviceType: z.string().optional(),
  budget: z.string().optional(),
  aboutProject: z.string().optional(),
  companyName: z.string().optional(),
  employees: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  date: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StepProps {
  form: ReturnType<typeof useForm<FormValues>>;
}

export const MultiForm1Block: React.FC<
  {
    id?: string
    disableInnerContainer?: boolean
  } & MultiForm1BlockType
> = (props) => {
  const { logo, navText, navButton, footerText, disableInnerContainer } = {
    ...MultiForm1Defaults,
    ...props,
  };
  
  const [step, setStep] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      budget: "",
      aboutProject: "",
      companyName: "",
      employees: "",
      website: "",
      country: "",
      date: undefined,
    },
    mode: "onSubmit",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
             // Enviar datos a la API personalizada
       const response = await fetch('/api/multi-form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
                 body: JSON.stringify({
           form: 'multiForm1',
           submissionData: [
             { field: 'name', value: values.name || '' },
             { field: 'email', value: values.email || '' },
             { field: 'serviceType', value: values.serviceType || '' },
             { field: 'budget', value: values.budget || '' },
             { field: 'aboutProject', value: values.aboutProject || '' },
             { field: 'companyName', value: values.companyName || '' },
             { field: 'employees', value: values.employees || '' },
             { field: 'website', value: values.website || '' },
             { field: 'country', value: values.country || '' },
             { field: 'date', value: values.date?.toISOString() || '' },
           ],
         }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Opcional: Resetear el formulario
        form.reset();
        setStep(0);
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const steps = [
    { component: StepOne, fields: ["name", "email"] },
    { component: StepTwo, fields: ["serviceType", "budget", "aboutProject"] },
    { component: StepThree, fields: ["companyName", "employees", "website"] },
    { component: StepFour, fields: ["country", "date"] },
  ] as const;
  
  const Step = steps[step].component;
  const currentFields = steps[step].fields;
  const totalSteps = steps.length;
  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;
  
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setStep((prev) => prev - 1);
    }
  };

  const content = (
    <div className="flex min-h-dvh flex-col">
      <nav className="px-[5%]">
        <div className="flex min-h-16 items-center justify-between md:min-h-18">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} />
          </a>
          <div className="flex items-center gap-x-1">
            <span className="hidden md:inline-block">{navText}</span>
            <Button className="underline" {...navButton}>
              {navButton.title}
            </Button>
          </div>
        </div>
      </nav>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <section id="relume" className="flex grow flex-col justify-center px-[5%] pb-5 pt-10">
        <div className="mx-auto w-full max-w-md">
          <Form {...form}>
                         <form
               onSubmit={(e) => {
                 e.preventDefault();
                 if (!isLastStep) {
                   handleNext();
                 } else {
                   try {
                     form.handleSubmit(onSubmit)();
                   } catch (error) {
                     console.error('Form submission error:', error);
                   }
                 }
               }}
             >
              <Step form={form} />
              <StepAction
                step={step}
                totalSteps={totalSteps}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                handlePrev={handlePrev}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
              />
            </form>
          </Form>
        </div>
      </section>
      <footer className="px-[5%]">
        <div className="flex min-h-16 items-center justify-center md:min-h-18">
          <p className="text-sm">{footerText}</p>
        </div>
      </footer>
    </div>
  );

  if (disableInnerContainer) {
    return content;
  }

  return (
    <div className="container mx-auto">
      {content}
    </div>
  );
};

const ProgressBar = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="relative h-1 bg-background-secondary">
      <div
        className="absolute left-0 top-0 h-full bg-background-alternative transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const StepAction = ({
  step,
  totalSteps,
  isFirstStep,
  isLastStep,
  handlePrev,
  isSubmitting,
  submitStatus,
}: {
  step: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  handlePrev: () => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
}) => (
  <div className="mt-6 space-y-4">
    {/* Mensajes de estado */}
    {submitStatus === 'success' && (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-center">
          ¡Formulario enviado exitosamente! Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    )}
    
    {submitStatus === 'error' && (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-center">
          Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
        </p>
      </div>
    )}
    
    {/* Controles de navegación */}
    <div className="flex items-center justify-between gap-2">
      <p>
        Step {step + 1}/{totalSteps}
      </p>
      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (!isFirstStep) {
              handlePrev();
            }
          }}
          disabled={isSubmitting}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </span>
          ) : (
            isLastStep ? "Enviar formulario" : "Next"
          )}
        </Button>
      </div>
    </div>
  </div>
);

const StepOne: React.FC<StepProps> = ({ form }) => (
  <React.Fragment>
    <div className="mb-6 text-center md:mb-8">
      <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
        Let's start with your name & email
      </h2>
      <p className="mt-3 md:mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
      </p>
    </div>
    <div className="flex flex-col gap-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
              Enter your name
            </FormLabel>
            <FormControl>
              <Input className={clsx({ "border-border-error": fieldState.invalid })} {...field} />
            </FormControl>
            <FormMessage className="text-base text-text-error" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
              Enter your email*
            </FormLabel>
            <FormControl>
              <Input
                placeholder="hello@relume.io"
                iconPosition="left"
                icon={<BiEnvelope className="size-6" />}
                className={clsx({ "border-border-error": fieldState.invalid })}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-base text-text-error" />
          </FormItem>
        )}
      />
    </div>
  </React.Fragment>
);

const StepTwo: React.FC<StepProps> = ({ form }) => {
  const serviceTypeData = [
    {
      label: "Website design",
      value: "A",
    },
    {
      label: "Webflow development",
      value: "B",
    },
    {
      label: "Custom code solutions",
      value: "C",
    },
    {
      label: "Other",
      value: "D",
    },
  ];
  return (
    <React.Fragment>
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
          What can we help you with?
        </h2>
        <p className="mt-3 md:mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                Service type
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {serviceTypeData.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        className="py-2 pl-2 pr-4"
                        type="button"
                        variant={field.value === item.value ? "primary" : "secondary"}
                        onClick={() => field.onChange(item.value)}
                      >
                        <span className="mr-2 inline-flex size-8 items-center justify-center border border-border-primary uppercase">
                          {item.value}
                        </span>
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                Your budget
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={clsx({ "border-border-error": fieldState.invalid })}>
                    <SelectValue placeholder="Select one..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First choice</SelectItem>
                    <SelectItem value="second">Second choice</SelectItem>
                    <SelectItem value="third">Third choice</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aboutProject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                About the project
              </FormLabel>
              <FormControl>
                <Input className={clsx({ "border-border-error": fieldState.invalid })} {...field} />
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
      </div>
    </React.Fragment>
  );
};

const StepThree: React.FC<StepProps> = ({ form }) => {
  const employeesData = [
    {
      label: "Just me",
      value: "1",
    },
    {
      label: "2-10",
      value: "2-10",
    },
    {
      label: "11-50",
      value: "11-50",
    },
    {
      label: "51-100",
      value: "51-100",
    },
    {
      label: "101-500",
      value: "101-500",
    },
    {
      label: "501+",
      value: "501+",
    },
  ];
  return (
    <React.Fragment>
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
          Let's confirm your company info
        </h2>
        <p className="mt-3 md:mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                What is your company name?
              </FormLabel>
              <FormControl>
                <Input className={clsx({ "border-border-error": fieldState.invalid })} {...field} />
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employees"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                How many people are you working with?
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {employeesData.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        type="button"
                        className="px-4 py-2"
                        variant={field.value === item.value ? "primary" : "secondary"}
                        onClick={() => field.onChange(item.value)}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                Website link
              </FormLabel>
              <FormControl>
                <Input className={clsx({ "border-border-error": fieldState.invalid })} {...field} />
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
      </div>
    </React.Fragment>
  );
};

const StepFour: React.FC<StepProps> = ({ form }) => {
  const countriesData = [
    { id: 1, value: "US", label: "United States" },
    { id: 2, value: "CA", label: "Canada" },
    { id: 3, value: "GB", label: "United Kingdom" },
    { id: 4, value: "AU", label: "Australia" },
    { id: 5, value: "DE", label: "Germany" },
    { id: 6, value: "FR", label: "France" },
    { id: 7, value: "IT", label: "Italy" },
    { id: 8, value: "ES", label: "Spain" },
    { id: 9, value: "JP", label: "Japan" },
    { id: 10, value: "CN", label: "China" },
    { id: 11, value: "IN", label: "India" },
    { id: 12, value: "BR", label: "Brazil" },
    { id: 13, value: "ZA", label: "South Africa" },
    { id: 14, value: "RU", label: "Russia" },
    { id: 15, value: "MX", label: "Mexico" },
  ];
  return (
    <React.Fragment>
      <div className="mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
          Let's confirm your company info
        </h2>
        <p className="mt-3 md:mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                Country
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={clsx({ "border-border-error": fieldState.invalid })}>
                    <SelectValue placeholder="Select one..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesData.map((country) => (
                      <SelectItem key={country.id} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel className={clsx({ "text-text-error": fieldState.invalid })}>
                Preferred date for chat
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"secondary"}
                    className={cn(
                      "justify-start py-[9px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                      fieldState.invalid && "border-border-error",
                    )}
                    type="button"
                  >
                    <FaRegCalendar className="size-5" />
                    {field.value ? (
                      DateTime.fromJSDate(field.value).toFormat("dd/MM/yyyy")
                    ) : (
                      <span>dd/mm/yyyy</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    disabled={(date) =>
                      DateTime.fromJSDate(date).startOf("day") < DateTime.now().startOf("day")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          )}
        />
      </div>
    </React.Fragment>
  );
};

export const MultiForm1Defaults: Props = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  navText: "Already have an account?",
  navButton: {
    title: "Log In",
    variant: "link",
    size: "link",
  },
  footerText: "© 2024 Relume",
};
