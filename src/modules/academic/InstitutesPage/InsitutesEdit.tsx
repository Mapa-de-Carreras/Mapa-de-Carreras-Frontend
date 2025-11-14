import { useParams, useNavigate } from 'react-router';

// --- API Hooks ---
import { useGetInstituto, usePutInstituto } from '@apis/intitutos'; // Importa GET y PUT

// --- Context Hooks ---
import { useModal } from '@components/Providers/ModalProvider';

// --- UI Components ---
import PageBase from '@components/PageBase/PageBase';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { Card, CardContent, CardFooter } from '@components/ui/card'; // Para el marco
import { Button } from '@components/ui/button';
import BotonBase from '@components/Botones/BotonBase';

// Asumo un tipo para los datos del formulario
type InstitutoFormValues = {
    nombre: string;
    codigo: string;
    // ...otros campos si los hay
};

export default function InstitutesEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showModal } = useModal();

    // --- 1. GET (Fetch) ---
    // Busca los datos del instituto para llenar el formulario
    const { 
        data: instituto, 
        isLoading: isLoadingData, 
        error: loadError 
    } = useGetInstituto(Number(id));

    // --- 2. PUT (Mutación) ---
    // Prepara la función para actualizar
    const { 
        mutate: putInstituto, 
        isPending: isUpdating 
    } = usePutInstituto();


    // --- 3. Handle Submit ---
    const handleSubmit = (formData: InstitutoFormValues) => {
        if (!id) return; // Seguridad

        // Llama a la mutación de PUT.
        // El hook 'usePutMutation' espera { id, ...data }
        putInstituto({ id: Number(id), ...formData }, {
            onSuccess: () => {
                showModal({
                    title: 'Éxito',
                    description: 'Instituto actualizado correctamente.',
                    buttons: [
                        {
                            variant: 'aceptar',
                            onClick: () => navigate(-1), // Vuelve a la pág. de detalle o lista
                        },
                    ],
                });
            },
            onError: (err) => {
                showModal({
                    title: 'Error',
                    description: err.message || 'No se pudo actualizar el instituto.',
                    buttons: [
                        {
                            variant: 'error',
                            onClick: () => {},
                        },
                    ],
                });
            }
        });
    };

    // --- 4. Renderizado ---

    // Estado de Carga (mientras se busca el instituto)
    if (isLoadingData || isUpdating) {
        return (
            <PageBase titulo="Cargando Instituto...">
                <ComponenteCarga />
            </PageBase>
        );
    }

    // Estado de Error (si el GET falla)
    if (loadError) {
        return (
            <PageBase titulo="Error">
                <p className="text-center text-red-500">
                    No se pudo cargar el instituto: {loadError.message}
                </p>
            </PageBase>
        );
    }

    // Estado "No Encontrado"
    if (!instituto) {
        return (
            <PageBase titulo="Error">
                <p className="text-center">Instituto no encontrado.</p>
            </PageBase>
        );
    }

    // --- Éxito: Renderiza el Formulario con datos ---
    return (
        <PageBase titulo="Editar Instituto">
            <div className="mb-4"> 
                <BotonBase 
                    variant="regresar" 
                    onClick={() => navigate(-1)}
                />
            </div>
            
            {/* Contenedor "enmarcado" y centrado */}
            <div className="max-w-lg mx-auto">
                <Card className="shadow-lg">
                    
                    <Formulario
                        valoresIniciales={instituto}
                    
                        key={instituto.id} 
                        
                        onSubmit={handleSubmit}
                    >
                        <CardContent className="pt-6 space-y-4">
                            <CampoInput label="Nombre del Instituto" nombre="nombre" />
                            <CampoInput label="Código (Ej: IDEI)" nombre="codigo" />
                            {/* Aquí irían más campos si los tuvieras */}
                        </CardContent>

                        <CardFooter className="flex justify-between">                            
                            <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? 'Guardando...' : 'Actualizar Instituto'}
                            </Button>
                        </CardFooter>
                    </Formulario>
                </Card>
            </div>
        </PageBase>
    );
}