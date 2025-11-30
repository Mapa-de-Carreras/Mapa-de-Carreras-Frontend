import { Checkbox } from "@components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { useFormContext } from "react-hook-form";

type CampoCheckboGroupProps<T> = {
    nombre: string,
    label: string,
    value: T,
    descripcion?: string,
    obligatorio?: boolean,
    keyField: keyof T;
};

// CampoCheckboxGrupo.jsx (Para selección de Roles, Permisos, etc.)
export default function CampoCheckboxGroup<T>({
    nombre,
    label,
    keyField,
    value,
    descripcion,
    obligatorio
}: CampoCheckboGroupProps<T>) {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={nombre}
            render={({ field }) => {
                const current: T[] = Array.isArray(field.value) ? field.value : [];
                const checked = current.some((item) => item[keyField] === value[keyField]);

                const handleChange = (nuevoChecked: boolean | 'indeterminate') => {
                    const isChecked = nuevoChecked === true;
                    if (isChecked) {
                        // Añadir: si no existe un objeto con el mismo keyField
                        if (!current.some((item) => item[keyField] === value[keyField])) {
                            field.onChange([...current, value]);
                        }
                    } else {
                        // Remover: filtrar el objeto con el mismo keyField
                        field.onChange(current.filter((item) => item[keyField] !== value[keyField]));
                    }
                };

                return (
                    <FormItem className="flex flex-row items-start gap-3 space-y-0">
                        <FormControl>
                            <Checkbox
                                className='cursor-pointer border-foreground/50'
                                checked={checked}
                                onCheckedChange={handleChange}
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
                );
            }}
        />
    )
}