import * as z from "zod";

export const DesignacionSchema = z.object({
  fecha_inicio: z.string().min(1, "Requerido"),
  fecha_fin: z.string().nullable(),
  tipo_designacion: z.enum(["TEORICO", "PRACTICO", "TEORICO + PRACTICO"])
  .or(z.literal("")),
  docente_id: z.coerce.number(),
  comision_id: z.coerce.number().nullable(),
  cargo_id: z.coerce.number(),
  documento_id: z.coerce.number().nullable(),
  dedicacion_id: z.coerce.number().nullable(),
  observacion: z.string().nullable(),
});

export type DesignacionForm = z.infer<typeof DesignacionSchema>;