interface PantallaCargaProps {
	mensaje?: string
}

export default function ComponenteCarga({ mensaje = 'Cargando...' }: PantallaCargaProps) {
	return (
		<div className="compontecarga flex h-10/12 flex-col items-center justify-center overflow-hidden rounded-md border p-2 text-xl">
			<span className="icon-[line-md--loading-twotone-loop] mb-3 animate-spin text-6xl text-white" />
			<p className="text-lg font-medium text-shadow-white">{mensaje}</p>
		</div>
	)
}
