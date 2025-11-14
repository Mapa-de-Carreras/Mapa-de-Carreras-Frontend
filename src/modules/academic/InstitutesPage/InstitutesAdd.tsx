import { useNavigate } from 'react-router';
import {Formulario} from '@components/Formularios/Formulario';
import {CampoInput} from '@components/Formularios/CampoInput';
import { Button } from '@components/ui/button';
import PageBase from '@components/PageBase/PageBase';
import { usePostInstituto } from '@apis/intitutos';

export default function InstitutesAdd() {
    const navigate = useNavigate();
    
    const { mutate, isPending, error } = usePostInstituto();


    const handleSubmit = (dataDelFormulario: { nombre: string; codigo: string }) => {
        // 4. Llama a 'mutate' con los datos.
        // 'usePostMutation' se encargará de todo:
        //   - Hará el POST
        //   - Si tiene éxito, llamará a 'useInvalidateAndRefetch'
        //   - 'useInvalidateAndRefetch' refrescará 'useGetInstitutos'
        //   - El hook genérico 'usePostMutation' te llevará de vuelta (-1)
        mutate(dataDelFormulario); 
    };

    return (
        <PageBase titulo="Agregar Nuevo Instituto">
            <Formulario
                onSubmit={handleSubmit}
                valoresIniciales={{ nombre: '', codigo: '' }}
            >
                <CampoInput label="Nombre del Instituto" nombre="nombre" />
                <CampoInput label="Código (Ej: IDEI)" nombre="codigo" />

                {error && <p className="text-red-500">Error: {error.message}</p>}

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Guardando...' : 'Crear Instituto'}
                </Button>
            </Formulario>
        </PageBase>
    );
}