import { useParams, useNavigate } from 'react-router';

// --- API Hooks ---
import { useGetInstituto, usePutInstituto } from '@apis/intitutos';

// --- Context Hooks ---
import { useModal } from '@components/Providers/ModalProvider';

// --- UI Components ---
import PageBase from '@components/PageBase/PageBase';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
// Importamos el Boton inteligente que creamos antes
import { Card, CardContent, CardFooter } from '@components/ui/card';
import BotonBase from '@components/Botones/BotonBase';
import { Button } from '@components/ui/button';
import { InstitutoForm, InstitutoSchema } from './contraints';


export default function InstitutesEdit() {
    const { id } = useParams<{ id: string }>();  
    const navigate = useNavigate();
    const { showModal } = useModal();

    const {data: instituto, isLoading: loadingInstituto, error: errorGeting } = useGetInstituto(Number(id));

    const { mutate: actualizarInstituto, isPending: isPendingInsituto } = usePutInstituto();

    const handleSubmit = (formData: InstitutoForm) => {
        if (!id) return;

        showModal({
            isLoading: true, 
			msg: 'Editando Instituto...',
        })

        if(instituto?.nombre == formData.nombre && instituto?.codigo == formData.codigo) {
            showModal({
                title: 'Éxito',
                description: 'El instituto se ha actualizado correctamente.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => navigate(-1),
                    },
                ],
                isLoading: false,
            })
        }

        actualizarInstituto({ 
            data: formData, 
            params: { id: Number(id) } }, 
            { 
            onSuccess: () => {
                showModal({
                    title: 'Éxito',
                    description: 'El instituto se ha actualizado correctamente.',
                    buttons: [
                        {
                            variant: 'aceptar',
                            onClick: () => navigate(-1),
                        },
                    ],
                    isLoading: false,
                })
            }, 
            onError: (errorPuting) => {
                showModal({
                    title: 'Error',
                    description: errorPuting.message || 'No se pudo actualizar el instituto.',
                    buttons: [
                        {
                            variant: 'error',
                            onClick: () => {},  
                        },
                    ],
                    isLoading: false,
                })
            } 
        })
    };


    return (
        <PageBase titulo={'Editar Instituto'}>

            {loadingInstituto && <ComponenteCarga />}
            {errorGeting && <p>{errorGeting.message}</p>}

            <div className="mb-4"> 
                <BotonBase variant="regresar" onClick={() => navigate(-1)} />
            </div>

            {!loadingInstituto && !errorGeting && instituto && (
                    <div className="max-w-lg mx-auto">
                <Card className="shadow-lg">
                    <Formulario<InstitutoForm>
                       
                        key={instituto.id} 
                        valoresIniciales={instituto}
                        schema={InstitutoSchema} 
                        onSubmit={handleSubmit}
                    >
                        <CardContent className="pt-6 space-y-4">
                            <CampoInput 
                                label="Nombre del Instituto" 
                                nombre="nombre" 
                                placeholder="Ej: Instituto Tecnológico"
                            />
                            <CampoInput 
                                label="Código" 
                                nombre="codigo" 
                                placeholder="Ej: IT-2024"
                            />
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <BotonBase variant="cancelar" onClick={() => navigate(-1)} />

                            <Button type="submit" disabled={isPendingInsituto}>
                                {isPendingInsituto ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </CardFooter>
                    </Formulario>
                </Card>
            </div>
            )
        }
            
        </PageBase>
    );
}