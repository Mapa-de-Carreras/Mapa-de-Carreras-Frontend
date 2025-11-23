import { z } from 'zod';
export const InstitutoSchema = z.object({
    nombre: z.string().min(1, { message: "Requerido" }),
    codigo: z.string().min(1, { message: "Requerido" }),
});

export type InstitutoForm = z.infer<typeof InstitutoSchema>;