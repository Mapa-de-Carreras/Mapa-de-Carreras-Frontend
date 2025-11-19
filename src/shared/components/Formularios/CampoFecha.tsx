import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { formatDate, parseDate } from '@lib/fechas'
import { getFechaValidators } from '@lib/react-hook-forms'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

type CampoFechaProps = {
	nombre: string
	label: string
	descripcion?: string
	placeholder?: string
	obligatorio?: boolean
}

export default function CampoFecha({
	nombre,
	label,
	descripcion,
	placeholder = "",
	obligatorio = false,
}: CampoFechaProps) {
	const [open, setOpen] = useState(false)
	const [month, setMonth] = useState<Date | undefined>(undefined)

	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={nombre}
			rules={{
				required: obligatorio ? 'Este campo es obligatorio' : undefined,
				validate: getFechaValidators(obligatorio),
			}}
			render={({ field }) => {
				const selectedDate = parseDate(field.value)
				const currentMonth = month ?? selectedDate ?? new Date()

				return (
					<FormItem>
						<FormLabel className="font-medium">
							{label} {obligatorio && <span className="text-red-500">*</span>}
						</FormLabel>

						<FormControl>
							<div className="flex items-center gap-2">
								<div className="relative flex w-full items-center">
									<Input
										{...field}
										value={field.value ?? ''}
										placeholder={placeholder ?? 'dd/mm/aaaa'}
										autoComplete="bday"
										className="bg-background w-full"
										onChange={(e) => {
											const raw = e.target.value
											field.onChange(raw)
											const d = parseDate(raw)
											if (d) {
												setMonth(d)
											}
										}}
										onKeyDown={(e) => {
											if (e.key === 'ArrowDown') {
												e.preventDefault()
												setOpen(true)
											}
										}}
									/>

									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												type="button"
												id={`${nombre}-date-picker`}
												variant="ghost"
												className="absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer"
											>
												<CalendarIcon className="size-3.5" />
												<span className="sr-only">
													{descripcion ?? 'Seleccionar fecha'}
												</span>
											</Button>
										</PopoverTrigger>

										<PopoverContent
											className="bg-background z-1 w-auto p-0"
											align="end"
											alignOffset={-8}
											sideOffset={10}
										>
											<Calendar
												mode="single"
												selected={selectedDate}
												captionLayout="dropdown"
												month={currentMonth}
												onMonthChange={setMonth}
												onSelect={(d) => {
													if (!d) {
														field.onChange('')
														return
													}
													const formatted = formatDate(d)
													field.onChange(formatted)
													setMonth(d)
													setOpen(false)
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</FormControl>

						{descripcion && (
							<FormDescription className="mt-1 text-sm">
								{descripcion}
							</FormDescription>
						)}

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
