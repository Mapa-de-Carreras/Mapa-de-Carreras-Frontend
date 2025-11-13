import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'
import { InstitutoPayload } from '@globalTypes/instituto'
import { useGetInstituto, usePutInstituto } from '@apis/intitutos'
import { useParams, useNavigate } from 'react-router'
import { useModal } from '@components/Providers/ModalProvider'
import PageBase from '@components/PageBase/PageBase'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { Button } from '@components/ui/button'
import MarcoFormulario from '@components/Formularios/MarcoFormulario'

export default function EditarInstituto() {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { showModal } = useModal()

    const { mutate, loading: isMutating, error: errorMutate } = usePutInstituto()
    const { data: instituto, isLoading: isLoadingGet, error: errorGet } = useGetInstituto(Number(id))

    const handleSubmit = async (data: InstitutoPayload) => {
        try {
            await mutate(Number(id), data)
            
            showModal({
                title: 'Instituto Actualizado',
                description: 'El instituto se ha actualizado correctamente.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => navigate('/academica/institutos'),
                    },
                ],
            })
            navigate('/academica/institutos')

        } catch (err) {
            showModal({
                title: 'Error',
                description: (err as Error).message || 'No se pudo actualizar el instituto.',
                buttons: [
                    {
                        variant: 'cancelar',
                        onClick: () => {console.log('Cancelado')},
                    },
                ],
            })
        }
    }

        // --- 6. Manejo de estados de carga/error ---
    if (isLoadingGet) {
        return <PageBase><ComponenteCarga /></PageBase>
    }

    if (errorGet) {
        return <PageBase><p className="text-red-500">Error al cargar datos: {errorGet.message}</p></PageBase>
    }

    if (!instituto) {
        return <PageBase><p>Instituto no encontrado.</p></PageBase>
    }

    return (
        <PageBase>
            <MarcoFormulario>

                {isLoadingGet && <ComponenteCarga />}
                {errorGet && <p>Error al cargar datos: {errorGet}</p>}
                {errorMutate && <p>Error al actualizar instituto: {errorMutate.message}</p>}

                <Formulario
                    onSubmit={handleSubmit}
                    
                    valoresIniciales={{ 
                        codigo: instituto.codigo, 
                        nombre: instituto.nombre 
                    }}
                >
                    <CampoInput label="Código" nombre="codigo" />
                    <CampoInput label="Nombre" nombre="nombre" />

                    <Button 
                        type="submit" 
                        disabled={isMutating} 
                    >
                        {isMutating ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </Formulario>
            </MarcoFormulario>
        </PageBase>
    )
}