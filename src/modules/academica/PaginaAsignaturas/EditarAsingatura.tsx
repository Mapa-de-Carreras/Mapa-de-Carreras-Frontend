import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'


export default function EditarAsignatura() {
    return (
        <div>
            <Formulario
                onSubmit={() => {}}
                valoresIniciales={{ nombre: "" }}
            >
                <CampoInput label="Nombre" nombre="nombre" />
            </Formulario>
        </div>
    )
}