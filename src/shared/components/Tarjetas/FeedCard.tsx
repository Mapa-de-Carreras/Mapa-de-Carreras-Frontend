import { cn } from '@components/lib/utils'

import { Card } from '@components/ui/card'
import { ReactNode } from 'react'

type CardProps = {
	titulo: string
	descripcion?: string
	texto?: string
	actions?: ReactNode
	className?: string
}

export default function FeedCard({ titulo, descripcion, texto, actions, className }: CardProps) {
	return (
		<Card className={cn('flex flex-row items-center rounded-sm px-6 snap-start bg-table-background py-4', className)}>
			<div className="grow">
				<h3 className="text-xl font-semibold">{titulo}</h3>
				<p className="mt-1 text-sm">{descripcion}</p>
				<p className="pl-5 text-sm text-gray-400">{texto}</p>
			</div>

			{actions && <div className="ml-4 shrink-0">{actions}</div>}
		</Card>
	)
}
