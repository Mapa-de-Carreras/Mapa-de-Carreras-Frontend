import { Button } from '@components/ui/button'
import { ReactNode } from 'react'

export type BotonBaseProps = {
	children?: ReactNode
	onClick?: () => void
	className?: string
	type?: "button" | "submit" | "reset"
	variant?:
		'agregar' | 'guardar' | 'cancelar' |
		'eliminar' | 'editar' | 'filtro' |
		'default' | 'aceptar' | 'regresar' |
		'error',
	isLoading?: boolean
	icono?: string
}

export default function BotonBase({
	children,
	onClick,
	className = '',
	variant = 'default',
	type = 'button',
	isLoading = false,
	icono,
}: BotonBaseProps) {
	const iconsVariants = {
		agregar: 'icon-[mdi--plus]',
		guardar: 'icon-[mdi--content-save]',
		cancelar: 'icon-[mdi--close]',
		eliminar: 'icon-[mdi--trash-can]',
		editar: 'icon-[ph--note-pencil]',
		aceptar: 'icon-[mdi--check]',
		error: 'icon-[mdi--alert-circle]',
		regresar: 'icon-[mdi--arrow-left]',
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
		error: 'bg-error hover:bg-error-hover active:bg-error-active',
		regresar: 'bg-regresar hover:bg-regresar-hover active:bg-regresar-active',
		default: 'bg-default hover:bg-default-hover active:bg-default-active',
	}

	const textVariants = {
		agregar: 'Agregar',
		guardar: 'Guardar',
		cancelar: 'Cancelar',
		eliminar: 'Eliminar',
		editar: 'Editar',
		filtro: 'Filtros',
		default: 'Cerrar',
		regresar: 'Regresar',
		error: 'Entendido',
		aceptar: 'Aceptar',
	}

	return (
		<Button
			className={`cursor-pointer text-white ${colorVariants[variant]} ${className}`}
			onClick={onClick}
			type={type}
			disabled={isLoading}
		>
			{variant !== 'default' && <span className={`text-2xl ${ isLoading ? "icon-[line-md--loading-twotone-loop]" : icono || iconsVariants[variant]} `} />}
			{children || textVariants[variant]}
		</Button>
	)
}
