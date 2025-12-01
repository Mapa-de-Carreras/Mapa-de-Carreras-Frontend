import { Checkbox } from "@components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { useFormContext } from "react-hook-form";

type CampoCheckboxSimpleProps = {
    nombre: string,
    label: string,
    descripcion?: string,
    obligatorio?: boolean,
    mensajeObligatorio?: string, 
};

export default function CampoCheckboxSimple({
    nombre,
    label,
    descripcion,
    obligatorio = false,
    mensajeObligatorio, // Ahora es útil para el mensaje
}: CampoCheckboxSimpleProps) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={nombre}
            rules={
                obligatorio
                ? {
                    validate: (value) =>
                        value === true || mensajeObligatorio || 'Este campo es obligatorio',
                }
                : undefined
            }
            render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                        <Checkbox
                            className='cursor-pointer'
                            checked={!!field.value} 
                            onCheckedChange={field.onChange} 
                        />
                    </FormControl>
                   <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer font-medium">
                            {label} {obligatorio && <span className="text-red-500">*</span>}
                        </FormLabel>

                        {descripcion && <FormDescription>{descripcion}</FormDescription>}

                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    )
}