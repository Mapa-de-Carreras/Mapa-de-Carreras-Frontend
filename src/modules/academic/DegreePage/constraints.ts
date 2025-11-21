import { z } from 'zod';
export const CarreraSchema = z.object({
    nombre: z.string().min(1, { message: "Requerido" }),
    codigo: z.string().min(1, { message: "Requerido" }),
    nivel: z.string().min(1, { message: "Requerido" }),
    instituto_id: z.string({message: 'Requerido'})
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