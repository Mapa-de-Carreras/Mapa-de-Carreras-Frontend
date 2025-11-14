import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { useFormContext } from "react-hook-form";


interface Option {
    value: string | number;
    label: string;
}


interface CampoSelectProps {
    label: string;
    nombre: string;
    placeholder?: string;
    descripcion?: string;
    obligatorio?: boolean;
    disabled?: boolean;
    options: Option[]; 
}

export function CampoSelect({ 
    label,
    nombre,
    placeholder,
    descripcion,
    obligatorio,
    disabled,
    options,
}: CampoSelectProps) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={nombre}
            render={({ field }) => { 
                const displayValue = field.value ? String(field.value) : undefined;

                return (
                    <FormItem>
                        <FormLabel className="font-medium">
                            {label} {obligatorio && <span className="text-red-500">*</span>}
                        </FormLabel>
                        
                        <Select
                            onValueChange={field.onChange} // RHF se encarga de actualizar
                            value={displayValue} // 3. Pasa el valor transformado
                            disabled={disabled}
                            // 4. 'defaultValue' se elimina. 'value' es suficiente
                            //    cuando se usa con RHF 'control'.
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem 
                                      key={option.value} 
                                      value={String(option.value)} 
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {descripcion && (
                            <FormDescription className="text-sm mt-1">
                                {descripcion}
                            </FormDescription>
                        )}
                        
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}