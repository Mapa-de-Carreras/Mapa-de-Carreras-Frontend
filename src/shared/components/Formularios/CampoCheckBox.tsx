import { Checkbox } from '@components/ui/checkbox'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form'
import { useFormContext } from 'react-hook-form'

type CampoCheckboxProps = {
	nombre: string
	value: string
	label: string
	descripcion?: string
	obligatorio?: boolean
	mensajeObligatorio?: string
}

export default function CampoCheckbox({
	nombre,
	value,
	label,
	descripcion,
	obligatorio = false,
	mensajeObligatorio,
}: CampoCheckboxProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={nombre}
			rules={
				obligatorio
				? {
					validate: (value: unknown) =>
						value === true || mensajeObligatorio || 'Este campo es obligatorio',
				}
				: undefined
			}
			render={({ field }) => {
				const current: string[] = Array.isArray(field.value) ? field.value : [];
				const checked = current.includes(value);

				const handleChange = (nuevoChecked: boolean | 'indeterminate') => {
					const isChecked = nuevoChecked === true;

					if (isChecked) {
						if (!current.includes(value)) {
							field.onChange([...current, value])
						}
					} else {
						field.onChange(current.filter((v) => v !== value))
					}
				};

				return (
					<FormItem className="flex flex-row items-start gap-3 space-y-0">
						<FormControl>
							<Checkbox
								className='cursor-pointer'
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
