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


interface Option<T = any> {
    value: T;
    label: string;
}


interface CampoSelectProps<T = any> {
    label: string;
    nombre: string;
    placeholder?: string;
    descripcion?: string;
    obligatorio?: boolean;
    disabled?: boolean;
    options: Option<T>[]; 
    className?: string;
}

export function CampoSelect<T = any>({ 
    label,
    nombre,
    placeholder,
    descripcion,
    obligatorio,
    disabled,
    options,
    className,
}: CampoSelectProps<T>) {
    const { control } = useFormContext();

    const getValueString = (value: any): string => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return String(value);
    };

    return (
        <FormField
            control={control}
            name={nombre}
            rules={obligatorio ? { required: 'Este campo es obligatorio' } : undefined}
            render={({ field }) => { 
                const displayValue = (field.value !== undefined && field.value !== null) 
                    ? getValueString(field.value) 
                    : undefined;

                return (
                    <FormItem>
                        <FormLabel className="font-medium">
                            {label} {obligatorio && <span className="text-red-500">*</span>}
                        </FormLabel>
                        
                        <Select
                            onValueChange={(val) => {
                                const selectedOption = options.find(opt => getValueString(opt.value) === val);
                                if (selectedOption) {
                                    field.onChange(selectedOption.value);
                                }
                            }}
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
                                        key={getValueString(option.value)} 
                                        value={getValueString(option.value)}
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
