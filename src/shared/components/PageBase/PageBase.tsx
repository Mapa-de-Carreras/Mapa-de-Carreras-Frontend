import DescripcionDePagina from '@components/Tipografia/DescripcionDePagina'
import TituloDePagina from '@components/Tipografia/TItuloDePagina'
import FONDO from '@assets/fondo.png'
import { useTheme } from '@hooks/useTheme'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router'

type props = {
	children: ReactNode
	className?: string
	titulo?: string
	subtitulo?: string
	fondo?: boolean
	path?: string
	volver?: boolean
}

export default function PageBase({
	children,
	className,
	titulo,
	subtitulo,
	fondo = false,
	volver = false,
	path = '',
}: props) {
	const navigate = useNavigate()
	const onClick = () => {
		if (path) navigate(path)
		else navigate(-1)
	}
	const { theme } = useTheme()

	return (
		<div
			className={`relative h-full w-full bg-cover bg-center p-0 sm:p-4 lg:p-8 ${className} overflow-y-auto`}
			style={
				fondo
					? {
							backgroundImage: `url(${FONDO})`,
						}
					: {}
			}
		>
			<div className='flex items-center gap-2'>
				{volver && (
					<button
						type="button"
						onClick={onClick}
						className="bg-accent item-center flex cursor-pointer justify-center rounded-full p-2"
					>
						<span className="icon-[material-symbols--arrow-back-rounded] text-2xl" />
					</button>
				)}
				{(titulo) && (
					<div className="hidden sm:flex items-start gap-10">
						{titulo && (
							<>
								<TituloDePagina>{titulo}</TituloDePagina>
								<br />
							</>
						)}
					</div>
				)}
			</div>
			{children}
		</div>
	)
}
