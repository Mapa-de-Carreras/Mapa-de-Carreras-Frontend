import BotonBase from "@components/Botones/BotonBase";
import CampoCheckboxSimple from "@components/Formularios/CampoCheckBoxSimple";
import { CampoInput } from "@components/Formularios/CampoInput";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import { useVentana } from "@components/Providers/VentanaProvider";
import { ComisionPostPayload } from "@globalTypes/comisiones";
import { IPlanAsignatura } from "@globalTypes/planasignatura";
import { IPlanEstudio } from "@globalTypes/planesestudio";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormularioCrearComisionProps = {
	planes: IPlanEstudio[];
    planesAsignatura: IPlanAsignatura[];
    onCancel: () => void;
    onSend: (_payload: ComisionPostPayload) => void;
    isLoading: boolean;
}

type FormValues = {
    nombre: string;
    turno: string;
    promocionable: boolean;
    activo: boolean;
    plan: number | undefined;
    asignatura: number | undefined;
}

export default function FormularioCrearComision({
    planes,
    planesAsignatura,
    onCancel,
    onSend,
    isLoading
}: FormularioCrearComisionProps) {
    // Ventana
    const { abrirVentana, cerrarVentana } = useVentana()

    const valoresIniciales: FormValues = {
        nombre: "",
        turno: "",
        promocionable: false,
        activo: true,
        plan: undefined,
        asignatura: undefined
    }

    const form = useForm<FormValues>({
        defaultValues: valoresIniciales,
    });

    const idPlan = form.watch("plan");

    const { handleSubmit } = form;

    const onConfirm = (data: FormValues) => {
        if (!data.asignatura) return;
        const payload: ComisionPostPayload = {
            nombre: data.nombre,
            turno: data.turno,
            promocionable: data.promocionable,
            activo: data.activo,
            plan_asignatura: data.asignatura,
        }
        onSend(payload);
    }

    const onSubmit = (data: FormValues) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirm(data),
            titulo: 'Crear Comisión',
            descripcion: '¿Estás seguro de crear esta comisión?',
        })
    }

    const asignaturasOpciones = useMemo(() => {
        if (!idPlan || !planesAsignatura) return [];
        const planesAsignaturaFiltrados = planesAsignatura.filter((pa) => pa.plan_de_estudio_id === idPlan);
        const asignaturasFiltradas = planesAsignaturaFiltrados.map((pa) => ({
            value: pa.id,
            label: pa.asignatura_nombre,
        }))
        return asignaturasFiltradas;
    }, [idPlan, planesAsignatura]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormProvider {...form}>
                <CampoInput
                    label="Nombre"
                    nombre="nombre"
                    placeholder="Ej: Comisión A"
                    type="text"
                    obligatorio
                />
                <CampoSelect 
                    label="Turno"
                    nombre="turno"
                    className="w-full"
                    options={[
                        { value: "MATUTINO", label: "Matutino" },
                        { value: "VESPERTINO", label: "Vespertino" }
                    ]}
                    obligatorio
                />

                <CampoSelect
                    label="Plan"
                    nombre="plan"
                    className="w-full"
                    options={planes.map((p) => ({
                        value: p.id,
                        label: p.carrera_nombre,
                    }))}
                    obligatorio
                />
                <CampoSelect
                    label="Asignatura"
                    nombre="asignatura"
                    className="w-full"
                    options={asignaturasOpciones}
                    obligatorio
                />
                <div className="flex gap-2">
                    <CampoCheckboxSimple
                        label="Promocionable"
                        nombre="promocionable"
                    />
                    <CampoCheckboxSimple
                        label="Activo"
                        nombre="activo"
                    />
                </div>
                <div className="flex justify-between">
                    <BotonBase variant="cancelar" onClick={onCancel}/>
                    <BotonBase variant="guardar" type="submit" isLoading={isLoading} />
                </div>
            </FormProvider>
        </form>
	)
}