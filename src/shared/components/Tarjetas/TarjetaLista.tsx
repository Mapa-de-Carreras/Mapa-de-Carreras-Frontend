import BotonDetalle from '@components/Botones/BotonDetalle'
import { Card } from '@components/ui/card'
import { ReactNode } from 'react'

type TarjetaListaProps = {
	children: ReactNode
	onClick: () => void
}

export default function TarjetaLista({ children, onClick }: TarjetaListaProps) {
	return (
		<Card className="flex flex-row justify-between rounded-sm px-4 items-center">
			{children}
			<div className=''>
				<BotonDetalle onClick={onClick} />
			</div>
		</Card>
	)
}
