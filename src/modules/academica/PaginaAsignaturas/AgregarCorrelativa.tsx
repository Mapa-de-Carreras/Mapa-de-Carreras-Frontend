import React, { useEffect, useMemo, useState } from 'react'
import { URL_API } from '@apis/constantes'
import { useParams, useNavigate } from 'react-router'
import { useGetAsignaturaYcorrelativas, useGetAsignaturas } from '@apis/asignaturas'
import { usePostAsignarCorrelativa, useDeleteCorrelativa } from '@apis/planestudio'
import { Checkbox } from '@components/ui/checkbox'
import BotonBase from '@components/Botones/BotonBase'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useModal } from '@components/Providers/ModalProvider'
import { extraerMensajeDeError } from '@lib/errores'
import useGet from '@apis/hooks/useGet'
import { useQueryClient } from '@tanstack/react-query'

type RouteParams = {
    asignaturaId?: string
    planId?: string
}

type PlanAsignaturasResponse = any[] | { results: any[] }

export default function AgregarCorrelativas() {
    const { asignaturaId: asignaturaIdParam, planId: planIdParam } = useParams<RouteParams>()
    const navigate = useNavigate()
    const modal = useModal()
    const queryClient = useQueryClient()

    const asignaturaId = Number(asignaturaIdParam)
    const planId = Number(planIdParam)

    const { data: asignaturaConCorrelativas, isLoading: loadingAsignatura } =
        useGetAsignaturaYcorrelativas(asignaturaId, planId)

    const { data: todasAsignaturas, isLoading: loadingTodas } = useGetAsignaturas(true)

    const { data: planAsignaturasResponse, isLoading: loadingPlanAsignaturas } = useGet<PlanAsignaturasResponse>({
        key: `plan-asignaturas-${planId}`,
        urlApi: `${URL_API}plan-asignatura/`,
        params: { queryParams: { plan_id: planId } },
        isEnabled: !!planId && !isNaN(planId)
    })

    const planAsignaturas = useMemo(() => {
        if (!planAsignaturasResponse) return []
        if (Array.isArray(planAsignaturasResponse)) return planAsignaturasResponse
        if (planAsignaturasResponse.results && Array.isArray(planAsignaturasResponse.results)) {
            return planAsignaturasResponse.results
        }
        return []
    }, [planAsignaturasResponse])

    useEffect(() => {
        console.log('DBG planAsignaturasResponse:', planAsignaturasResponse)
        console.log('DBG planAsignaturas (normalized):', planAsignaturas)
    }, [planAsignaturasResponse, planAsignaturas])

    const currentPlanAsignaturaId = useMemo(() => {
        if (!planAsignaturas || !planAsignaturas.length) return null

        const pa = planAsignaturas.find((p: any) => {
            // p.asignatura_id (número)
            if (typeof p.asignatura_id === 'number') return p.asignatura_id === asignaturaId
            // p.asignatura puede ser objeto { id: ... } o número
            if (p.asignatura && typeof p.asignatura === 'object' && typeof p.asignatura.id === 'number') {
                return p.asignatura.id === asignaturaId
            }
            if (typeof p.asignatura === 'number') return p.asignatura === asignaturaId
            return false
        })
        return pa ? pa.id : null
    }, [planAsignaturas, asignaturaId])

    // Debug: ver cuál quedó el currentPlanAsignaturaId
    useEffect(() => {
        console.log('DBG currentPlanAsignaturaId:', currentPlanAsignaturaId, { asignaturaId, planId })
    }, [currentPlanAsignaturaId, asignaturaId, planId])

    const { data: correlativasReales, isLoading: loadingCorrelativas } = useGet<any[]>({
        key: `correlativas-${currentPlanAsignaturaId}`,
        urlApi: `${URL_API}planes/correlativas/`,
        params: { queryParams: { plan_asignatura_id: currentPlanAsignaturaId } },
        isEnabled: !!currentPlanAsignaturaId
    })

    useEffect(() => {
        console.log('DBG correlativasReales:', correlativasReales)
    }, [correlativasReales])

    // --- MUTATIONS ---
    const postCorrelativa = usePostAsignarCorrelativa()
    const deleteCorrelativa = useDeleteCorrelativa()

    const [seleccionadas, setSeleccionadas] = useState<number[]>([])
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (asignaturaConCorrelativas?.correlativas && asignaturaConCorrelativas.correlativas.length) {
            setSeleccionadas(asignaturaConCorrelativas.correlativas.map((c: any) => c.id))
            return
        }

        if (correlativasReales && correlativasReales.length && planAsignaturas && planAsignaturas.length) {
            const inverse: Record<number, number> = {}
            planAsignaturas.forEach((p: any) => {

                const asId =
                    typeof p.asignatura_id === 'number'
                        ? p.asignatura_id
                        : p.asignatura && typeof p.asignatura === 'object' && typeof p.asignatura.id === 'number'
                            ? p.asignatura.id
                            : typeof p.asignatura === 'number'
                                ? p.asignatura
                                : null
                if (asId) inverse[p.id] = asId
            })
            const sel = correlativasReales.map((c: any) => {
                const paReq = c.correlativa_requerida ?? c.correlativa ?? null
                return paReq ? inverse[paReq] ?? null : null
            }).filter(Boolean) as number[]

            if (sel.length) setSeleccionadas(sel)
        }

    }, [asignaturaConCorrelativas, correlativasReales, planAsignaturas])

    const opcionesCorrelativas = useMemo(() => {
        if (!todasAsignaturas) return []
        return todasAsignaturas.filter((a: any) => a.id !== asignaturaId)
    }, [todasAsignaturas, asignaturaId])

    const toggleSeleccion = (id: number) => {
        setSeleccionadas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }


    const onSave = async () => {

        if (!currentPlanAsignaturaId) {
            modal.showModal({
                title: 'Error',
                description: 'No se pudo identificar el plan de la asignatura actual. Recargá la página.',
                buttons: [{ variant: 'aceptar' }]
            })
            return
        }

        setGuardando(true)
        try {

            const actualesAsignaturaIds = (correlativasReales || []).map((c: any) => {
                const paReqId = c.correlativa_requerida ?? c.correlativa ?? null
                if (!paReqId) return null
                const pa = planAsignaturas.find((p: any) => p.id === paReqId)
                if (!pa) return null

                return typeof pa.asignatura_id === 'number' ? pa.asignatura_id
                    : pa.asignatura && typeof pa.asignatura === 'object' && typeof pa.asignatura.id === 'number' ? pa.asignatura.id
                        : typeof pa.asignatura === 'number' ? pa.asignatura
                            : null
            }).filter(Boolean) as number[]

            const aAgregar = seleccionadas.filter(id => !actualesAsignaturaIds.includes(id))
            const aEliminar = actualesAsignaturaIds.filter(id => !seleccionadas.includes(id))

            const correlativasMapPorPaReq: Record<number, any> = {};
            (correlativasReales || []).forEach((c: any) => {
                const paReq = c.correlativa_requerida ?? c.correlativa ?? null
                if (paReq) correlativasMapPorPaReq[paReq] = c
            })

            const deletes: Promise<any>[] = []
            for (const asignIdEliminar of aEliminar) {
                const paIdEliminar = planAsignaturas.find((p: any) => {
                    const asId =
                        typeof p.asignatura_id === 'number' ? p.asignatura_id
                            : p.asignatura && typeof p.asignatura === 'object' && typeof p.asignatura.id === 'number' ? p.asignatura.id
                                : typeof p.asignatura === 'number' ? p.asignatura
                                    : null
                    return asId === asignIdEliminar
                })?.id
                if (!paIdEliminar) {
                    console.warn('No se encontró PlanAsignatura para eliminar asignaturaId=', asignIdEliminar)
                    continue
                }
                const correlObj = correlativasMapPorPaReq[paIdEliminar]
                if (!correlObj || !correlObj.id) {
                    console.warn('No se encontró objeto Correlativa para DELETE, paId=', paIdEliminar)
                    continue
                }
                deletes.push(deleteCorrelativa.mutateAsync({ params: { id: correlObj.id } }))
            }

            const posts: Promise<any>[] = []
            for (const asignIdAgregar of aAgregar) {
                const paAgregar = planAsignaturas.find((p: any) => {
                    const asId =
                        typeof p.asignatura_id === 'number' ? p.asignatura_id
                            : p.asignatura && typeof p.asignatura === 'object' && typeof p.asignatura.id === 'number' ? p.asignatura.id
                                : typeof p.asignatura === 'number' ? p.asignatura
                                    : null
                    return asId === asignIdAgregar
                })
                if (!paAgregar) {
                    console.warn('No se encontró PlanAsignatura para agregar asignaturaId=', asignIdAgregar)
                    continue
                }
                posts.push(postCorrelativa.mutateAsync({
                    data: {
                        plan_asignatura_id: currentPlanAsignaturaId,
                        correlativa_requerida_id: paAgregar.id
                    }
                }))
            }

            await Promise.all([...deletes, ...posts])

            queryClient.invalidateQueries({ queryKey: ['useGetAsignaturaYcorrelativas', { asignatura_id: asignaturaId, plan_id: planId }] })
            queryClient.invalidateQueries({ queryKey: [`correlativas-${currentPlanAsignaturaId}`] })
            queryClient.invalidateQueries({ queryKey: [`plan-asignaturas-${planId}`] })

            modal.showModal({ title: 'Éxito', description: 'Correlativas actualizadas correctamente.', buttons: [{ variant: 'aceptar', autoClose: true }] })
            navigate(-1)
        } catch (err: any) {
            console.error('Error al guardar correlativas:', err)
            modal.showModal({ title: 'Error', description: `No se pudo actualizar correlativas: ${extraerMensajeDeError(err)}`, buttons: [{ variant: 'default', autoClose: true }] })
        } finally {
            setGuardando(false)
        }
    }

    if (loadingAsignatura || loadingTodas) {
        return <ComponenteCarga mensaje="Cargando correlativas..." />
    }

    if (!asignaturaConCorrelativas) {
        return (
            <PageBase titulo="Editar correlativas" volver>
                <p className="p-4 text-center">No se encontró la asignatura.</p>
            </PageBase>
        )
    }

    const tituloAsignatura = asignaturaConCorrelativas.nombre ?? 'Asignatura'

    return (
        <PageBase titulo={`Editar correlativas — ${tituloAsignatura}`} volver>
            <div className="mx-auto max-w-4xl px-4 py-6">
                <Card className="shadow-lg">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <span className="icon-[mdi--link-variant] text-3xl" />
                            {tituloAsignatura}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Seleccioná las asignaturas que serán requisito previo para cursar esta materia
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <span className="icon-[mdi--information-outline]" />
                                Correlativas actuales
                            </h3>
                            {asignaturaConCorrelativas.correlativas && asignaturaConCorrelativas.correlativas.length > 0 ? (
                                <ul className="list-disc pl-6 space-y-1">
                                    {asignaturaConCorrelativas.correlativas.map((c: any) => (
                                        <li key={c.id} className="text-sm">
                                            <span className="font-medium">{c.nombre}</span>
                                            {c.codigo && <span className="text-muted-foreground ml-2">({c.codigo})</span>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No tiene correlativas asignadas</p>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Seleccionar correlativas</h3>

                            {opcionesCorrelativas.length > 0 ? (
                                <div className="grid gap-2 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                    {opcionesCorrelativas.map((a: any) => (
                                        <label key={a.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer transition-colors">
                                            <Checkbox
                                                checked={seleccionadas.includes(a.id)}
                                                onCheckedChange={() => toggleSeleccion(a.id)}
                                            />
                                            <div className="flex-1">
                                                <span className="font-medium">{a.nombre}</span>
                                                {a.codigo && <span className="text-sm text-muted-foreground ml-2">({a.codigo})</span>}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded-lg">
                                    No hay asignaturas disponibles para seleccionar
                                </p>
                            )}
                        </div>

                        <div className="text-sm text-muted-foreground bg-transparent p-3 rounded">
                            <span className="font-medium">Seleccionadas: </span>
                            {seleccionadas.length} asignatura{seleccionadas.length !== 1 ? 's' : ''}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-3 bg-transparent">
                        <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
                        <BotonBase
                            variant="guardar"
                            onClick={onSave}
                            isLoading={guardando}
                        />
                    </CardFooter>
                </Card>
            </div>
        </PageBase>
    )
}
