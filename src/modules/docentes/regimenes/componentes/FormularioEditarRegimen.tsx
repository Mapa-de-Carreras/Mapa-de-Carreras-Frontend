import BotonBase from "@components/Botones/BotonBase";
import { CampoInput } from "@components/Formularios/CampoInput";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import { Formulario } from "@components/Formularios/Formulario";
import { Dedicacion } from "@globalTypes/dedicaciones";
import { Modalidad } from "@globalTypes/modalidades";
import { RegimenEditForm } from "@globalTypes/regimenes";
import { useNavigate } from "react-router";

type FormularioEditarRegimenProps = {
    modalidades: Modalidad[];
    dedicaciones: Dedicacion[];
    valoresIniciales: RegimenEditForm;
    onSubmit: (_data: RegimenEditForm) => void;
}

export default function FormularioEditarRegimen({ onSubmit, modalidades, dedicaciones, valoresIniciales }: FormularioEditarRegimenProps) {
    const navigate = useNavigate();

    const handleSubmit = (data: RegimenEditForm) => {
        onSubmit(data);
    }

    return (
        <Formulario onSubmit={handleSubmit} valoresIniciales={valoresIniciales}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CampoSelect
                    className="w-full"
                    label="Modalidad"
                    nombre="modalidad"
                    placeholder="Seleccione una modalidad"
                    options={modalidades?.map(modalidad => ({ value: modalidad, label: modalidad.nombre })) || []}
                    obligatorio
                />
                <CampoSelect
                    className="w-full"
                    label="Dedicación"
                    nombre="dedicacion"
                    placeholder="Seleccione una dedicación"
                    options={dedicaciones?.map(dedicacion => ({ value: dedicacion, label: dedicacion.nombre })) || []}
                    obligatorio
                />
                <CampoInput
                    label="Horas mínimas frente a alumnos"
                    placeholder="Ingrese las horas mínimas frente a alumnos"
                    nombre="horas_min_frente_alumnos"
                    type="number"
                    obligatorio
                />
                <CampoInput
                    label="Horas máximas frente a alumnos"
                    placeholder="Ingrese las horas máximas frente a alumnos"
                    nombre="horas_max_frente_alumnos"
                    type="number"
                    obligatorio
                />
                <CampoInput
                    label="Horas mínimas anuales"
                    placeholder="Ingrese las horas mínimas anuales"
                    nombre="horas_min_anual"
                    type="number"
                    obligatorio
                />
                <CampoInput
                    label="Horas máximas anuales"
                    placeholder="Ingrese las horas máximas anuales"
                    nombre="horas_max_anual"
                    type="number"
                    obligatorio
                />
                <CampoInput
                    label="Maximas asignaturas"
                    placeholder="Ingrese las maximas asignaturas"
                    nombre="max_asignaturas"
                    type="number"
                    obligatorio
                />
            </div>
            <div className="flex flex-row justify-between">
                <BotonBase type="button" variant="cancelar" onClick={() => navigate(-1)}/>
                <BotonBase type="submit" variant="guardar"/>
            </div>
        </Formulario>
    );
}