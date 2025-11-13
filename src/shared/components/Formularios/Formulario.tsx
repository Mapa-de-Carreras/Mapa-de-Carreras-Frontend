import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@components/ui/form";
import { ReactNode } from "react";

interface FormularioProps<T extends Record<string, any>> {
  onSubmit: (data: T) => void;
  valoresIniciales: T;
  children: ReactNode;
}


function toDefaultValues<T>(values: T): import("react-hook-form").DefaultValues<T> {
  return values as import("react-hook-form").DefaultValues<T>;
}

export function Formulario<T extends Record<string, any>>({
  onSubmit,
  valoresIniciales,
  children,
}: FormularioProps<T>) {
  const form = useForm<T>({
    defaultValues: toDefaultValues(valoresIniciales),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormProvider {...form}>{children}</FormProvider>
      </form>
    </Form>
  );
}
