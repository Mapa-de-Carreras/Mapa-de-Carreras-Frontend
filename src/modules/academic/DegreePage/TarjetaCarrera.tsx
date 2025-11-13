import TarjetaLista from '@components/Tarjetas/TarjetaLista'
import Subtitulo from '@components/Tipografia/Subtitulo'
import Titulo from '@components/Tipografia/Titulo'


type TarjetaCarreraProps = {
	carrera: any
}

export default function TarjetaCarrera({ carrera }: TarjetaCarreraProps) {
    const {titulo, coordinador, estado} = carrera;

	return (
		<TarjetaLista onClick={() => {}}>
			<div className="flex grow flex-col">
				<Titulo>{titulo}</Titulo>
				<Subtitulo>Coordinador: {coordinador}</Subtitulo>
				<Subtitulo>Estado: {estado ? 'Activa' : 'Inactiva'}</Subtitulo>
			</div>
		</TarjetaLista>
	)
}
