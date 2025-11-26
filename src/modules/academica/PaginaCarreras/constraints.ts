import { z } from 'zod';
export const CarreraSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre de la carrera es requerido" }),
    codigo: z.string().min(1, { message: "El codigo de la carrera es requerido" }),
    nivel: z.string().min(1, { message: "Debes seleccionar un nivel" }),
    instituto_id: z.string().min(1, {message: 'El instituto es requerido'})
});
export type CarreraForm = z.infer<typeof CarreraSchema>;

export const opcionesNivel = [
    { value: 'TECNICATURA', label: 'Tecnicatura' },
    { value: 'DIPLOMATURA', label: 'Diplomatura' },
    { value: 'PREGRADO', label: 'Pregrado' },
    { value: 'GRADO', label: 'Grado' },
    { value: 'POSGRADO', label: 'Posgrado' },
    { value: 'MAESTRIA', label: 'Maestría' },
];

