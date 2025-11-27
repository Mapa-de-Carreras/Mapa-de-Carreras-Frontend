import { useEffect } from 'react'; // Importación necesaria
import { useNavigate } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { CampoSelect } from '@components/Formularios/CampoSelectAntiguo'; // Usando tu componente revertido
import { Button } from '@components/ui/button';
import PageBase from '@components/PageBase/PageBase';
import { usePostCarrera } from '@apis/carreras'; 
import { useGetInstitutos } from '@apis/intitutos'; 
import { useModal } from '@components/Providers/ModalProvider';
import BotonBase from '@components/Botones/BotonBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { CarreraForm, CarreraSchema, opcionesNivel } from './constraints';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import useRol from '@hooks/useRol';

export default function AgregarCarrera() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    
    const { mutate: crearCarrera, isPending: isPendingCarrera } = usePostCarrera();
    const { data: institutos, isLoading: isLoadingInstitutos } = useGetInstitutos();

    const isAdmin = useRol('Administrador');

  
    useEffect(() => {
        if (isAdmin === false) { 
            navigate('/'); 
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return <ComponenteCarga />;

    const handleSubmit = (data: CarreraForm) => {

        const payload = {
            ...data,
            instituto_id: parseInt(data.instituto_id, 10)
        };

        showModal({
            isLoading: true, 
            msg: 'Creando carrera...',
        });

        crearCarrera({ data: payload }, { 
            onSuccess: () => {
                showModal({
                    title: 'Éxito',
                    description: 'La carrera se ha creado correctamente.',
                    buttons: [
                        {
                            variant: 'aceptar',
                            onClick: () => navigate(-1),
                        },
                    ],
                    isLoading: false,
                });
            }, 
            onError: (errorPosting) => { 
                showModal({
                    title: 'Error',
                    description: errorPosting.message || 'No se pudo crear la carrera.',
                    buttons: [{ variant: 'error', onClick: () => {} }],
                    isLoading: false,
                });
            } 
        });
    };

    const valoresIniciales = {
        nombre: '',
        codigo: '',
        nivel: '',
        instituto_id: '',
    };

    return (
        <PageBase titulo="Agregar Nueva Carrera" volver>
            {(isLoadingInstitutos || isPendingCarrera) && <ComponenteCarga/>}
            <div className="mx-auto max-w-lg">
                <Card className="shadow-lg">
                    <Formulario
                        onSubmit={handleSubmit}
                        valoresIniciales={valoresIniciales}
                        schema={CarreraSchema}
                    >
                        <CardContent className="space-y-4 pt-6">
                            <CampoInput label="Nombre de la Carrera" nombre="nombre" />
                            <CampoInput label="Código (Ej: LS, TUP)" nombre="codigo" />
                            
                            <CampoSelect
                                label="Nivel"
                                nombre="nivel"
                                placeholder="Seleccione un nivel..."
                                options={opcionesNivel}
                            />
                            
                            <CampoSelect
                                label="Instituto"
                                nombre="instituto_id"
                    
                                options={institutos?.map(inst => ({
                                    value: String(inst.id), 
                                    label: inst.nombre
                                })) || []}
                                placeholder="Seleccione un instituto..."
                                disabled={isLoadingInstitutos}
                            />
                            
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <BotonBase 
                                variant="cancelar" 
                                onClick={() => navigate(-1)}
                            />

                            <Button type="submit" disabled={isPendingCarrera}>
                                {isPendingCarrera ? 'Guardando...' : 'Crear Carrera'}
                            </Button>
                        </CardFooter>
                    </Formulario>
                </Card>
            </div>
        </PageBase>
    );
}