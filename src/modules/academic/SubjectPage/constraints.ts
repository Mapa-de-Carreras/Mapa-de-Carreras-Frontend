import { z } from 'zod';
export const AsignaturaSchema = z.object({
    nombre: z.string().min(1, { message: "Requerido" }),
    codigo: z.string().min(1, { message: "Requerido" }),
    cuatrimestre: z.coerce.number().min(1, { message: "Requerido" }).max(2, { message: "Requerido" }),
    tipo_asignatura: z.string().min(1, { message: "Requerido" }),
    tipo_duracion: z.string().min(1, { message: "Requerido" }),
});

export type AsignaturaForm = z.infer<typeof AsignaturaSchema>;

export const opcionesTipoAsignatura = [
    { value: 'OBLIGATORIA', label: 'Obligatoria' },
    { value: 'OPTATIVA', label: 'Optativa' },
];

export const opcionesTipoDuracion = [
    { value: 'ANUAL', label: 'Anual' },
    { value: 'CUATRIMESTRAL', label: 'Cuatrimestral' },
];

export const opcionesCuatrimestre = [
    { value: "1", label: "Primer Cuatrimestre" },
    { value: "2", label: "Segundo Cuatrimestre" },
];