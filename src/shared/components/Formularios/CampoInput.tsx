import {FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";
interface CampoInputProps {
  label: string;
  nombre: string;
  placeholder?: string;
  descripcion?: string;
  obligatorio?: boolean;
  type?: "text" | "password" | "email";
  icono?: ReactNode;
}
export function CampoInput({label,nombre,placeholder,descripcion,obligatorio,type = "text",icono,}: CampoInputProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={nombre}
      render={({ field }) => (
        <FormItem>
          {/* Label */}
          <FormLabel className="text-black dark:text-black font-medium">
            {label} {obligatorio && <span className="text-red-500">*</span>}
          </FormLabel>
          {/* Input */}
          <FormControl>
            <div className="flex items-center gap-2">
              {icono && <span>{icono}</span>}
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                className="text-black dark:text-black placeholder:text-gray-500 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </FormControl>
          {/* Descripción */}
          {descripcion && (
            <FormDescription className="text-black dark:text-black text-sm mt-1">
              {descripcion}
            </FormDescription>
          )}
          {/* Mensaje de error */}
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  );
}