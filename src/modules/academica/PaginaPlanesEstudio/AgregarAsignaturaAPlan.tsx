import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useGetAsignaturas } from '@apis/asignaturas'
import { useGetPlanDetalle, usePostPlanAsignatura } from '@apis/planestudio'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import BotonBase from '@components/Botones/BotonBase'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useModal } from '@components/Providers/ModalProvider'
import { extraerMensajeDeError } from '@lib/errores'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"

export default function AgregarAsignaturaAPlan() {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()
    const modal = useModal()
    const id = Number(planId)

    const { data: plan, isLoading: loadingPlan } = useGetPlanDetalle(id)
    const { data: todasAsignaturas, isLoading: loadingAsignaturas } = useGetAsignaturas(true)
    const postPlanAsignatura = usePostPlanAsignatura()

    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState<string>('')
    const [anio, setAnio] = useState<number>(1)
    const [horasTeoria, setHorasTeoria] = useState<number>(0)
    const [horasPractica, setHorasPractica] = useState<number>(0)
    const [horasSemanales, setHorasSemanales] = useState<number>(0)
    const [guardando, setGuardando] = useState(false)

    const opcionesAsignaturas = useMemo(() => {
        if (!todasAsignaturas || !plan) return []

        const idsOcupados = new Set(plan.asignaturas.map((pa: any) => pa.asignatura_id))

        return todasAsignaturas
            .filter((a: any) => !idsOcupados.has(a.id))
            .map((a: any) => ({
                value: String(a.id),
                label: `${a.nombre} (${a.codigo})`
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label))
    }, [todasAsignaturas, plan])

    const onSave = async () => {
        if (!selectedAsignaturaId) {
            modal.showModal({ title: 'Error', description: 'Seleccioná una asignatura.', buttons: [{ variant: 'aceptar' }] })
            return
        }

        setGuardando(true)
        try {
            await postPlanAsignatura.mutateAsync({
                data: {
                    plan_de_estudio_id: id,
                    asignatura_id: Number(selectedAsignaturaId),
                    anio,
                    horas_teoria: horasTeoria,
                    horas_practica: horasPractica,
                    horas_semanales: horasSemanales,
                }
            })

            modal.showModal({
                title: 'Éxito',
                description: 'Asignatura agregada al plan correctamente.',
                buttons: [{ variant: 'aceptar', autoClose: true }]
            })
            navigate(-1)
        } catch (err: any) {
            modal.showModal({
                title: 'Error',
                description: extraerMensajeDeError(err),
                buttons: [{ variant: 'eliminar', autoClose: true }]
            })
        } finally {
            setGuardando(false)
        }
    }

    if (loadingPlan || loadingAsignaturas) return <ComponenteCarga mensaje="Cargando..." />
    if (!plan) return <PageBase><p>No se encontró el plan.</p></PageBase>

    return (
        <PageBase titulo={`Agregar Asignatura a ${plan.documento?.tipo || 'Plan'}`} volver>
            <div className="mx-auto max-w-2xl px-4 py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Nueva Asignatura en Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Asignatura</Label>
                            <Select onValueChange={setSelectedAsignaturaId} value={selectedAsignaturaId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar asignatura..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {opcionesAsignaturas.map((opcion: any) => (
                                        <SelectItem key={opcion.value} value={opcion.value}>
                                            {opcion.label}
                                        </SelectItem>
                                    ))}
                                    {opcionesAsignaturas.length === 0 && (
                                        <div className="p-2 text-sm text-gray-500">No hay asignaturas disponibles</div>
                                    )}
                                </SelectContent>
                            </Select>

                            {opcionesAsignaturas.length === 0 && (
                                <p className="text-sm text-yellow-600">
                                    Todas las asignaturas activas ya están en este plan.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Año de Cursada</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={anio}
                                    onChange={(e) => setAnio(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Horas Semanales</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={horasSemanales}
                                    onChange={(e) => setHorasSemanales(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Horas Teoría (Total)</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={horasTeoria}
                                    onChange={(e) => setHorasTeoria(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Horas Práctica (Total)</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={horasPractica}
                                    onChange={(e) => setHorasPractica(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                            <strong>Total Horas:</strong> {horasTeoria + horasPractica}
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
                        <BotonBase variant="guardar" onClick={onSave} isLoading={guardando} />
                    </CardFooter>
                </Card>
            </div>
        </PageBase>
    )
}
