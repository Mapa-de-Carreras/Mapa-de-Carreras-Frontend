import { useForm, SubmitHandler } from "react-hook-form";
import useGetCaracteres from "@apis/caracteres";
import useGetModalidades from "@apis/modalidades";
import useGetUsuarios from "@apis/usuarios";
import { Input } from "@components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/select";
import BotonGenerico from "@components/Botones/BotonGenerico";
import BotonBase from "@components/Botones/BotonBase";
import { useNavigate } from "react-router";
import useGetDedicaciones from "@apis/dedicacion";

export interface IDocenteForm {
  usuario_id: number;
  modalidad_id: number;
  caracter_id: number;
  dedicacion_id: number;
  cantidad_materias: number;
  activo: boolean;
}

export default function DocenteForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<IDocenteForm>;
}) {

  const { data: usuarios } = useGetUsuarios();
  const { data: caracteres } = useGetCaracteres();
  const { data: modalidades } = useGetModalidades();
  const { data: dedicaciones } = useGetDedicaciones();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue } = useForm<IDocenteForm>({
    defaultValues: {
      usuario_id: 0,
      modalidad_id: 0,
      caracter_id: 0,
      dedicacion_id: 0,
      cantidad_materias: 0,
      activo: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {/* Usuario */}
      <div>
        <label className="text-sm font-medium">Usuario</label>
        <Select onValueChange={(v) => setValue("usuario_id", Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar usuario" />
          </SelectTrigger>
          <SelectContent>
            {usuarios?.map((u) => (
              <SelectItem key={u.id} value={String(u.id)}>
                {u.first_name} {u.last_name} — {u.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Modalidad */}
      <div>
        <label className="text-sm font-medium">Modalidad</label>
        <Select onValueChange={(v) => setValue("modalidad_id", Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar modalidad" />
          </SelectTrigger>
          <SelectContent>
            {modalidades?.map((m) => (
              <SelectItem key={m.id} value={String(m.id)}>
                {m.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Caracter */}
      <div>
        <label className="text-sm font-medium">Carácter</label>
        <Select onValueChange={(v) => setValue("caracter_id", Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar carácter" />
          </SelectTrigger>
          <SelectContent>
            {caracteres?.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dedicación */}
            <div>
            <label className="text-sm font-medium">Dedicación</label>
            <Select onValueChange={(v) => setValue("dedicacion_id", Number(v))}>
                <SelectTrigger>
                <SelectValue placeholder="Seleccionar dedicación" />
                </SelectTrigger>
                <SelectContent>
                {dedicaciones?.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                    {d.nombre}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

      {/* Cantidad materias */}
      <div>
        <label className="text-sm font-medium">Cantidad de materias</label>
        <Input type="number" {...register("cantidad_materias", { required: true })} />
      </div>

      {/* Botones */}
      <div className="flex gap-4 mt-6">
        {/* Botón GUARDAR */}
      <BotonGenerico
            texto="Guardar"
            icono={<span className="icon-[mdi--content-save] text-xl" />}
            color="#47ADA4"
            type="submit"
            />
                    
        {/* Botón CANCELAR */}
       <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
      </div>
    </form>
  );
}