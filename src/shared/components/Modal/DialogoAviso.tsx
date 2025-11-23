import BotonBase from '@components/Botones/BotonBase'
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

type DialogoAvisoProps = {
	icono?: ReactNode
	type: 'error' | 'aceptar' | 'default'
	titulo: string
	descripcion: string
	open: boolean
	onClose: () => void
}

export default function DialogoAviso({
	icono,
	titulo,
	type,
	descripcion,
	open,
	onClose,
}: DialogoAvisoProps) {

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
						{icono}
						{titulo}
					</DialogTitle>
                    <DialogDescription>{descripcion}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <BotonBase variant={type} onClick={onClose} />
                    </DialogClose>
                </DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
