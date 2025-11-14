import { useNavigate } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';

import { CampoSelect } from '@components/Formularios/CampoSelect'; 
import { Button } from '@components/ui/button';
import PageBase from '@components/PageBase/PageBase';
import { usePostCarrera } from '@apis/carreras'; // 1. Cambiado
import useGetInstitutos from '@apis/intitutos'; // 2. Añadido
import { useModal } from '@components/Providers/ModalProvider';
import { useEffect } from 'react';
import BotonBase from '@components/Botones/BotonBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { CarreraPostPayload, Nivel } from '@globalTypes/carrera'; // 3. Importa tipos

// Opciones para el <select> de Nivel
const opcionesNivel = [
    { value: 'TECNICATURA', label: 'Tecnicatura' },
    { value: 'DIPLOMATURA', label: 'Diplomatura' },
    { value: 'PREGRADO', label: 'Pregrado' },
    { value: 'GRADO', label: 'Grado' },
    { value: 'POSGRADO', label: 'Posgrado' },
    { value: 'MAESTRIA', label: 'Maestría' },
];

export default function DegreeAdd() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    
    const { mutate, isPending, error, isSuccess, isError } = usePostCarrera();
    
    const { data: institutos, isLoading: isLoadingInstitutos } = useGetInstitutos();

    useEffect(() => {
        if (isSuccess) {
            showModal({
                title: 'Éxito',
                description: 'La carrera se ha creado correctamente.', // 6. Texto cambiado
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => navigate(-1),
                    },
                ],
            });
        }

        if (isError) {
            showModal({
                title: 'Error',
                description: error?.message || 'No se pudo crear la carrera.', // 7. Texto cambiado
                buttons: [
                    {
                        variant: 'error',
                        onClick: () => {},
                    },
                ],
            });
        }
    }, [isSuccess, isError, error, showModal, navigate]);

    const handleSubmit = ({nombre, codigo, nivel, instituto_id}: CarreraPostPayload) => {
        
        const payload = {
            nombre,
            codigo,
            nivel,
            instituto_id
        };
        mutate(payload);
    };
    

    const valoresIniciales = {
        nombre: '',
        codigo: '',
        nivel: 'GRADO' as Nivel, // 'as Nivel' ayuda a TypeScript
        instituto_id: 0,
    };

    return (
        <PageBase titulo="Agregar Nueva Carrera">
            <div className="mb-4">
                <BotonBase variant="regresar" onClick={() => navigate(-1)} />
            </div>

            <div className="mx-auto max-w-lg">
                <Card className="shadow-lg">
                    <Formulario
                        onSubmit={handleSubmit}
                        valoresIniciales={valoresIniciales}
                    >
    
                        <CardContent className="space-y-4 pt-6">
                            <CampoInput label="Nombre de la Carrera" nombre="nombre" />
                            <CampoInput label="Código (Ej: LS, TUP)" nombre="codigo" />
                            
                            <CampoSelect
                                label="Nivel"
                                nombre="nivel"
                                options={opcionesNivel}
                            />
                            
                            <CampoSelect
                                label="Instituto"
                                nombre="instituto_id"
            
                                options={institutos?.map(inst => ({
                                    value: inst.id.toString(), 
                                    label: inst.nombre
                                })) || []}
                                placeholder="Seleccione un instituto..."
                                disabled={isLoadingInstitutos}
                            />
                            
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <BotonBase 
                            variant="cancelar" 
                            onClick={() => navigate(-1)}/>

                            <Button type="submit" disabled={isPending || isLoadingInstitutos}>
                                {isPending ? 'Guardando...' : 'Crear Carrera'}
                            </Button>
                        </CardFooter>
                    </Formulario>
                </Card>
            </div>
        </PageBase>
    );
}