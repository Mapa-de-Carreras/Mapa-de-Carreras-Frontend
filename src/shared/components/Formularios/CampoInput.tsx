import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ReactNode } from 'react'
import { Button } from '@components/ui/button'

interface CampoInputProps {
	label: string
	nombre: string
	placeholder?: string
	descripcion?: string
	obligatorio?: boolean
	type?: 'text' | 'password' | 'email'
	icono?: ReactNode
	adorno?: ReactNode
	autoComplete?: string
}

export function CampoInput({
	label,
	nombre,
	placeholder,
	descripcion,
	obligatorio,
	type = 'text',
	icono,
	adorno,
	autoComplete
}: CampoInputProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={nombre}
			render={({ field }) => (
				<FormItem>
					{/* Label */}
					<FormLabel className="font-medium">
						{' '}
						{/* <-- 1. ELIMINADO: text-black dark:text-black */}
						{label} {obligatorio && <span className="text-red-500">*</span>}
					</FormLabel>
					{/* Input */}
					<FormControl>
						<div className="flex items-center gap-2">
							{icono && <span>{icono}</span>}
							<div className='relative flex items-center w-full'>
								<Input
									{...field}
									placeholder={placeholder}
									type={type}
									autoComplete={autoComplete}
									// <-- 2. ELIMINADO: Todo el className.
									// El <Input> base de shadcn ya usa tus variables CSS:
									// --color-input (para el fondo)
									// --color-border (para el borde)
									// --color-foreground (para el texto)
									// --color-ring (para el foco)
									// --color-muted-foreground (para el placeholder)
								/>
								{adorno}
							</div>
						</div>
					</FormControl>
					{/* Descripción */}
					{descripcion && (
						<FormDescription className="mt-1 text-sm">
							{' '}
							{/* <-- 3. ELIMINADO: text-black dark:text-black */}
							{descripcion}
						</FormDescription>
					)}
					{/* Mensaje de error */}
					<FormMessage /> {/* <-- 4. ELIMINADO: className="text-red-600" */}
				</FormItem>
			)}
		/>
	)
}
