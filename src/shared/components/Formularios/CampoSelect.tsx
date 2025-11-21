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
    className?: string; // <-- AGREGADO
}

export function CampoSelect({ 
    label,
    nombre,
    placeholder,
    descripcion,
    obligatorio,
    disabled,
    options,
    className,
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
                            onValueChange={field.onChange}
                            value={displayValue}
                            disabled={disabled}
                        >
                            <FormControl>
                                <SelectTrigger className={className}>
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
