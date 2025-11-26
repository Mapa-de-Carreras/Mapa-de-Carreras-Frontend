import { z } from 'zod';
export const AsignaturaSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es requerido para la asignatura" }),
    codigo: z.string().min(1, { message: "El codigo es requerido para la asignatura" }),
    cuatrimestre: z.coerce.number().min(1, { message: "Requerido" }).max(2, { message: "El cuatrimestre es requerido para la asignatura" }),
    tipo_asignatura: z.string().min(1, { message: "El tipo de asignatura es requerido" }),
    tipo_duracion: z.string().min(1, { message: "La duracion de la asignatura es requerida" }),
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