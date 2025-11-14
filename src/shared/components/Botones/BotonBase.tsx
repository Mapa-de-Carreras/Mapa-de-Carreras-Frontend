import { Button } from '@components/ui/button'
import { ReactNode } from 'react'

export type BotonBaseProps = {
	children?: ReactNode
	onClick?: () => void
	className?: string
	variant?: 'agregar' | 'guardar' | 'cancelar' | 'eliminar' | 'editar' | 'filtro' | 'default' | 'aceptar'
}

export default function BotonBase({
	children,
	onClick,
	className = '',
	variant = 'default',
}: BotonBaseProps) {
	const iconsVariants = {
		agregar: 'icon-[mdi--plus]',
		guardar: 'icon-[mdi--content-save]',
		cancelar: 'icon-[mdi--close]',
		eliminar: 'icon-[mdi--trash-can]',
		editar: 'icon-[ph--note-pencil]',
		aceptar: 'icon-[mdi--check]',
		filtro: '',
		default: '',
	}

	const colorVariants = {
		agregar: 'bg-agregar hover:bg-agregar-hover active:bg-agregar-active',
		guardar: 'bg-guardar hover:bg-guardar-hover active:bg-guardar-active',
		cancelar: 'bg-cancelar hover:bg-cancelar-hover active:bg-cancelar-active',
		eliminar: 'bg-eliminar hover:bg-eliminar-hover active:bg-eliminar-active',
		editar: 'bg-editar hover:bg-editar-hover active:bg-editar-active',
		filtro: 'bg-filtro',
		aceptar: 'bg-aceptar hover:bg-aceptar-hover active:bg-aceptar-active',
		default: 'bg-default',
		
	}

	const textVariants = {
		agregar: 'Agregar',
		guardar: 'Guardar',
		cancelar: 'Cancelar',
		eliminar: 'Eliminar',
		editar: 'Editar',
		filtro: 'Filtros',
		default: 'Click',
		aceptar: 'Aceptar',
	}

	return (
		<Button
			className={`cursor-pointer text-white ${colorVariants[variant]} ${className}`}
			onClick={onClick}
			type="button"
		>
			{variant !== 'default' && <span className={`text-2xl ${iconsVariants[variant]} `} />}
			{children || textVariants[variant]}
		</Button>
	)
}
