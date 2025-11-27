import { z } from 'zod';

export const DocenteSchema = z.object({
    // Datos del Usuario (Anidados en la DB, planos en el Form)
    first_name: z.string().min(1, { message: "El nombre es requerido" }),
    last_name: z.string().min(1, { message: "El apellido es requerido" }),
    username: z.string().min(1, { message: "El usuario es requerido" }),
    email: z.string().email({ message: "Email inválido" }),
    activo: z.boolean(),
    celular: z.string().min(1, { message: "El celular es requerido" }),
    legajo: z.string().min(1, { message: "El legajo es requerido" }), // A veces es string o number

    // Datos del Docente
    modalidad: z.string().optional().nullable(), // Deberían ser IDs si usas Select
    caracter: z.string().optional().nullable(),
    dedicacion: z.string().optional().nullable(),
    cantidad_materias: z.coerce.number().min(0, { message: "Debe ser un número positivo" }),
});

export type DocenteForm = z.infer<typeof DocenteSchema>;