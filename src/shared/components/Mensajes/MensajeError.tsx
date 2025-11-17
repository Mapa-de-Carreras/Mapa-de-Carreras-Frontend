import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { ReactNode } from 'react'

type MensajeErrorProps = {
	titulo: string
	descripcion: string | ReactNode
}

export default function MensajeError({ titulo, descripcion }: MensajeErrorProps) {
	return (
		<Alert variant="destructive" className='text-xl items-center'>
			<AlertCircleIcon />
			<AlertTitle>{titulo}</AlertTitle>
			<AlertDescription>{descripcion}</AlertDescription>
		</Alert>
	)
}
