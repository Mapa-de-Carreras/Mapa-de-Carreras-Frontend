import { useForm, SubmitHandler } from "react-hook-form";
import { IDocenteForm } from "./DocenteForm";
import BotonGenerico from "@components/Botones/BotonGenerico";
import BotonBase from "@components/Botones/BotonBase";
import { useNavigate } from "react-router";
import useGetModalidades from "@apis/modalidades";
import useGetDedicaciones from "@apis/dedicacion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { useGetCaracteres } from "@apis/caracteres";

interface EditarDocenteFormProps {
  onSubmit: SubmitHandler<IDocenteForm>;
  defaultValues: IDocenteForm;
  soloLecturaUsuario?: boolean;
  nombreCompleto?: string; 
}

export default function EditarDocenteForm({
  onSubmit,
  defaultValues,
  soloLecturaUsuario = false,
  nombreCompleto = "",
}: EditarDocenteFormProps) {
  const navigate = useNavigate();
  const { handleSubmit, register, setValue } = useForm<IDocenteForm>({
    defaultValues,
  });

  const { data: caracteres } = useGetCaracteres();
  const { data: modalidades } = useGetModalidades();
  const { data: dedicaciones } = useGetDedicaciones();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-gray-900 dark:text-gray-100"
    >
      {/* Usuario (solo lectura) */}
      <div>
        <label className="text-sm font-medium mb-1">Usuario</label>
        <input
          type="text"
          value={nombreCompleto} 
          readOnly={soloLecturaUsuario}
          className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Modalidad */}
      <div>
        <label className="text-sm font-medium mb-1">Modalidad</label>
        <Select
          defaultValue={String(defaultValues.modalidad_id)}
          onValueChange={(v) => setValue("modalidad_id", Number(v))}
        >
          <SelectTrigger className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Seleccionar modalidad" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            {modalidades?.map((m) => (
              <SelectItem key={m.id} value={String(m.id)}>
                {m.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Carácter */}
      <div>
        <label className="text-sm font-medium mb-1">Carácter</label>
        <Select
          defaultValue={String(defaultValues.caracter_id)}
          onValueChange={(v) => setValue("caracter_id", Number(v))}
        >
          <SelectTrigger className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Seleccionar carácter" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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
        <label className="text-sm font-medium mb-1">Dedicación</label>
        <Select
          defaultValue={String(defaultValues.dedicacion_id)}
          onValueChange={(v) => setValue("dedicacion_id", Number(v))}
        >
          <SelectTrigger className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Seleccionar dedicación" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            {dedicaciones?.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>
                {d.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cantidad de materias */}
      <div>
        <label className="text-sm font-medium mb-1">Cantidad de materias</label>
        <input
          type="number"
          {...register("cantidad_materias", { required: true })}
          className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4 mt-6">
        <BotonGenerico
          texto="Guardar"
          type="submit"
          icono={<span className="icon-[mdi--content-save] text-xl" />}
          color="#47ADA4"
        />
        <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
      </div>
    </form>
  );
}
