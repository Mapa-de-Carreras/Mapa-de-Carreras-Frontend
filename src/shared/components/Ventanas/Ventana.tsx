/* eslint-disable no-extra-boolean-cast */
import BotonBase from '@components/Botones/BotonBase'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { Drawer, DrawerContent } from '@components/ui/drawer'
import { useIsMobile } from '@hooks/use-mobile'
import { ReactNode } from 'react'
import VentanaCuerpo from './VentanaCuerpo'

export type TipoVentana = 'error' | 'info' | 'exito' | 'eliminar' | 'none' | 'form'

export type TipoBoton = 'aceptar' | 'guardar' | 'eliminar' | 'default'

export type VentanaProps = {
	abierto: boolean
	cargando?: boolean
	onClose: () => void
	onConfirm?: () => void
	children?: ReactNode
	icono?: string
	tipo?: TipoVentana
	titulo?: string
	descripcion?: string
}

function buttonVariants(tipo: TipoVentana): TipoBoton {
	switch (tipo) {
		case 'eliminar':
			return 'eliminar'
		case 'exito':
			return 'aceptar'
		case 'error':
			return 'default'
		case 'form':
			return 'guardar'
		default:
			return 'default'
	}
}

function iconVariants(tipo: TipoVentana): string {
	switch (tipo) {
		case 'eliminar':
			return 'icon-[mdi--trash-can] text-eliminar'
		case 'exito':
			return 'icon-[icon-park-outline--success] text-aceptar'
		case 'error':
			return 'icon-[bx--error-alt] text-eliminar'
		case 'form':
			return 'icon-[mdi--content-save]'
		default:
			return ''
	}
}

export default function Ventana({
	abierto,
	cargando = false,
	onClose,
	onConfirm = () => {},
	children = null,
	tipo = 'error',
	titulo = '',
	descripcion = '',
	icono,
}: VentanaProps) {
	const esMovil = useIsMobile()
	const handleClose = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return esMovil ? (
		<Drawer open={abierto} onClose={onClose} direction="bottom">
			<DrawerContent className="h-[60%]">
				{cargando ? (
					<ComponenteCarga />
				) : !!children ? (
					children
				) : (
					<div className="flex flex-col gap-2 pt-8">
						<VentanaCuerpo
							titulo={titulo}
							descripcion={descripcion}
							icono={icono || iconVariants(tipo)}
						/>
						<div className="flex flex-col-reverse items-center justify-between gap-5 p-2">
							{tipo !== 'error' && tipo !== 'info' && tipo !== 'exito' && (
								<BotonBase
									className="w-full max-w-80 md:w-auto"
									type="button"
									variant="cancelar"
									onClick={() => {
										if (!cargando) onClose()
									}}
								/>
							)}
							<BotonBase
								className="w-full max-w-80 md:w-auto"
								type="button"
								variant={buttonVariants(tipo)}
								isLoading={cargando}
								onClick={() => onConfirm()}
							/>
						</div>
					</div>
				)}
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={abierto} onOpenChange={handleClose}>
			<DialogContent className="h-min sm:max-w-[425px]">
				{cargando ? (
					<ComponenteCarga />
				) : !!children ? (
					children
				) : (
					<div className="flex flex-col gap-2">
						<VentanaCuerpo
							titulo={titulo}
							descripcion={descripcion}
							icono={icono || iconVariants(tipo)}
						/>
						{(tipo !== 'error' && tipo !== 'info' && tipo !== 'exito') ? (
							<div className='flex justify-between pt-2'>
								<BotonBase
									className="w-full max-w-80 md:w-auto"
									type="button"
									variant="cancelar"
									onClick={() => {
										if (!cargando) onClose()
									}}
								/>
								<BotonBase
									className="w-full max-w-80 md:w-auto"
									type="button"
									variant={buttonVariants(tipo)}
									isLoading={cargando}
									onClick={() => onConfirm()}
								/>
							</div>
						) : (
							<div className='flex justify-end pt-4'>
								<BotonBase
									className="w-full max-w-80 md:w-auto"
									type="button"
									variant={buttonVariants(tipo)}
									isLoading={cargando}
									onClick={() => onConfirm()}
								/>
							</div>
						)}
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
