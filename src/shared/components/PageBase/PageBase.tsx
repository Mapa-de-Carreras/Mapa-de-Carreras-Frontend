import DescripcionDePagina from '@components/Tipografia/DescripcionDePagina'
import TituloDePagina from '@components/Tipografia/TItuloDePagina'
import FONDO from '@assets/fondo.jpg'
import FONDO_OSCURO from '@assets/fondo-oscuro.jpg'
import { useTheme } from '@hooks/useTheme'

type props = {
	children: React.ReactNode
	className?: string
	titulo?: string
	subtitulo?: string
    fondo?: boolean
}

export default function PageBase({ children, className, titulo, subtitulo, fondo = false }: props) {
	const { theme } = useTheme();
    
    return (
		<div
			className={`relative h-full w-full bg-cover bg-center p-2 sm:p-4 lg:p-8 ${className} overflow-y-auto`}
			style={fondo ? {
				backgroundImage: `url(${theme.includes("dark") ? FONDO_OSCURO : FONDO})`,
			} : {}}
		>
			{(titulo || subtitulo) && (
				<div className="">
					{titulo && (
						<>
							<TituloDePagina>{titulo}</TituloDePagina>
							<br />
						</>
					)}
					{subtitulo && (
						<>
							<DescripcionDePagina>{subtitulo}</DescripcionDePagina>
							<br />
						</>
					)}
				</div>
			)}
			{children}
		</div>
	)
}
