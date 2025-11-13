import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'

export default function AgregarInstituto (){
    return (
        <Formulario
            onSubmit={() => {}}
            valoresIniciales={{ nombre: "" }}
        >
            <CampoInput label="Nombre" nombre="nombre" />
        </Formulario>
    )
}