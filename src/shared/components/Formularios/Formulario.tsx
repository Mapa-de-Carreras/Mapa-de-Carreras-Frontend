import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@components/ui/form";
import { ReactNode } from "react";

interface FormularioProps<T extends Record<string, any>> {
  onSubmit: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
  valoresIniciales: T;
  children: ReactNode;
}


function toDefaultValues<T>(values: T): import("react-hook-form").DefaultValues<T> {
  return values as import("react-hook-form").DefaultValues<T>;
}

export function Formulario<T extends Record<string, any>>({
  onSubmit,
  onError,
  valoresIniciales,
  children,
}: FormularioProps<T>) {
  const form = useForm<T>({
    defaultValues: toDefaultValues(valoresIniciales),
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
        <FormProvider {...form}>{children}</FormProvider>
      </form>
    </Form>
  );
}
