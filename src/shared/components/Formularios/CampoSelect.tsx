import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";

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
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
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
    value,
    onChange,
}: CampoSelectProps) {

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">
                {label} {obligatorio && <span className="text-red-500">*</span>}
            </label>

            <Select
                value={value?.toString()}
                onValueChange={(val) => onChange?.(val)}
                disabled={disabled}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={String(option.value)}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {descripcion && (
                <p className="text-sm mt-1 text-gray-500">{descripcion}</p>
            )}
        </div>
    );
}
