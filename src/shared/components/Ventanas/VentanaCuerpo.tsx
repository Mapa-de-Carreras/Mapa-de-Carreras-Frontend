import { DialogDescription, DialogTitle } from '@components/ui/dialog'

type VentanaCuerpoProps = {
    icono: string
	titulo: string
	descripcion: string
}

export default function VentanaCuerpo({
    icono,
	titulo,
	descripcion,
}: VentanaCuerpoProps) {
	return (
		<div className='flex flex-col items-center gap-2'>
			<span
				className={`${icono} text-6xl `}
			/>
			<DialogTitle className="text-center">{titulo}</DialogTitle>
			<DialogDescription className='text-center max-w-80'>
				{descripcion}
			</DialogDescription>
		</div>
	)
}
