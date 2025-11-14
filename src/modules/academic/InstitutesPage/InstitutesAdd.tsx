import { useNavigate } from 'react-router';
import {Formulario} from '@components/Formularios/Formulario';
import {CampoInput} from '@components/Formularios/CampoInput';
import { Button } from '@components/ui/button';
import PageBase from '@components/PageBase/PageBase';
import { usePostInstituto } from '@apis/intitutos';
import { useModal } from '@components/Providers/ModalProvider';
import { useEffect } from 'react';

export default function InstitutesAdd() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { mutate, isPending, error, isSuccess, isError } = usePostInstituto();


        useEffect(() => {
        // Si la mutación (POST) tuvo ÉXITO
        if (isSuccess) {
            showModal({
                title: 'Éxito',
                description: 'El instituto se ha creado correctamente.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => navigate(-1),
                    }
                ]
            });
        }
        
        // Si la mutación (POST) tuvo ERROR
        if (isError) {
            showModal({
                title: 'Error',
                description: error?.message || 'No se pudo crear el instituto.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => {},
                    }
                ]
                
            });
        }
    }, [isSuccess, isError, error, showModal, navigate]);


    const handleSubmit = (dataDelFormulario: { nombre: string; codigo: string }) => {
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
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Guardando...' : 'Crear Instituto'}
                </Button>
            </Formulario>
        </PageBase>
    );
}