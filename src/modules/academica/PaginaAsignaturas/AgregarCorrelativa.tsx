import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useGetAsignaturaYcorrelativas, useGetAsignaturas, usePutAsignatura } from '@apis/asignaturas'
import { Checkbox } from '@components/ui/checkbox'
import BotonBase from '@components/Botones/BotonBase'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useModal } from '@components/Providers/ModalProvider'
import { extraerMensajeDeError } from '@lib/errores'

type RouteParams = {
    asignaturaId?: string
    planId?: string
}

/**
 * AgregarCorrelativas
 * Ruta esperada: /academica/asignaturas/:asignaturaId/plan/:planId/correlativas
 */
export default function AgregarCorrelativas() {
    const { asignaturaId: asignaturaIdParam, planId: planIdParam } = useParams<RouteParams>()
    const navigate = useNavigate()
    const modal = useModal()
    const asignaturaId = Number(asignaturaIdParam)
    const planId = Number(planIdParam)

    const { data: asignaturaConCorrelativas, isLoading: loadingAsignatura } = useGetAsignaturaYcorrelativas(asignaturaId, planId)
    const { data: todasAsignaturas, isLoading: loadingTodas } = useGetAsignaturas(true)
    const putAsignatura = usePutAsignatura()

    const [seleccionadas, setSeleccionadas] = useState<number[]>([])
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (asignaturaConCorrelativas?.correlativas) {
            setSeleccionadas(asignaturaConCorrelativas.correlativas.map((c) => c.id))
        }
    }, [asignaturaConCorrelativas])

    const opcionesCorrelativas = useMemo(() => {
        if (!todasAsignaturas) return []
        return todasAsignaturas.filter((a) => a.id !== asignaturaId)
    }, [todasAsignaturas, asignaturaId])

    const toggleSeleccion = (id: number) => {
        setSeleccionadas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }

    const onSave = async () => {
        try {
            setGuardando(true)
            // CHANGE: aquí usamos putAsignatura para actualizar correlativas
            await putAsignatura.mutateAsync({
                params: { id: asignaturaId },
                data: {
                    correlativas_ids: seleccionadas,
                } as any,
            })
            modal.showModal({
                title: 'Correlativas actualizadas',
                description: 'Se actualizó la lista de correlativas correctamente.',
                buttons: [{ variant: 'aceptar', autoClose: true }],
            })
            navigate(-1)
        } catch (err) {
            modal.showModal({
                title: 'Error',
                description: `No se pudo actualizar correlativas: ${extraerMensajeDeError(err as any)}`,
                buttons: [{ variant: 'default', autoClose: true }],
            })
        } finally {
            setGuardando(false)
        }
    }

    if (loadingAsignatura || loadingTodas) return <ComponenteCarga mensaje="Cargando correlativas..." />
    if (!asignaturaConCorrelativas) return <PageBase titulo="Editar correlativas" volver><p className="p-4">No se encontró la asignatura.</p></PageBase>

    return (
        <PageBase titulo={`Editar correlativas — ${asignaturaConCorrelativas.nombre}`} volver>
            <div className="mx-auto max-w-3xl">
                <Card>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Correlativas actuales</p>
                            <ul className="list-disc pl-6">
                                {asignaturaConCorrelativas.correlativas.length ? (
                                    asignaturaConCorrelativas.correlativas.map((c) => (
                                        <li key={c.id}>{c.nombre} ({c.codigo})</li>
                                    ))
                                ) : (
                                    <li>No tiene correlativas asignadas</li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium mb-2">Seleccioná las asignaturas que serán correlativas</p>
                            <div className="grid gap-2">
                                {opcionesCorrelativas.map((a) => (
                                    <label key={a.id} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={seleccionadas.includes(a.id)}
                                            onCheckedChange={() => toggleSeleccion(a.id)}
                                        />
                                        <span>{a.nombre} ({a.codigo})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
                        {/* CHANGE: botón para guardar correlativas */}
                        <BotonBase variant="guardar" onClick={onSave} isLoading={guardando} />
                    </CardFooter>
                </Card>
            </div>
        </PageBase>
    )
}
