import BotonBase from '@components/Botones/BotonBase'
import { Formulario } from '@components/Formularios/Formulario'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components/ui/dialog'
import { ReactNode } from 'react'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'

type DialogoProps<T extends Record<string, any>> = {
	titulo: string
	descripcion: string
	open: boolean
	setOpen: (_open: boolean) => void
	onSubmit: SubmitHandler<T>
	onCancel: () => void
	onError?: SubmitErrorHandler<T>
	valoresIniciales: T
	children: ReactNode
	isLoading?: boolean
}

export default function DialogoFormulario<T extends Record<string, any>>({
	titulo,
	descripcion,
	open,
	setOpen,
	onSubmit,
	onCancel,
	onError,
	valoresIniciales,
	children,
	isLoading = false,
}: DialogoProps<T>) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<Formulario
					onSubmit={onSubmit}
					onError={onError}
					valoresIniciales={valoresIniciales}
				>
					<DialogHeader>
						<DialogTitle>{titulo}</DialogTitle>
						<DialogDescription>{descripcion}</DialogDescription>
					</DialogHeader>
					{children}
					<DialogFooter>
						<DialogClose asChild>
							<BotonBase variant="cancelar" onClick={onCancel} />
						</DialogClose>
						<BotonBase variant="guardar" type="submit" isLoading={isLoading} />
					</DialogFooter>
				</Formulario>
			</DialogContent>
		</Dialog>
	)
}
