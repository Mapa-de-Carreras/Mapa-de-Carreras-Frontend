import { useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import InputConLabel from "../../../shared/components/InputConLabel/InputConLabel";

export default function UserCreate() {
  const [form, setForm] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    email: "",
    celular: "",
    esCoordinador: false,
    esAdministrador: false,
    carrera: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheck = (field: "esCoordinador" | "esAdministrador") => {
    setForm({
      ...form,
      [field]: !form[field],
    });
  };

  const handleAgregar = () => console.log("Usuario agregado:", form);
  const handleGuardar = () => console.log("Guardar usuario:", form);
  const handleCancelar = () => console.log("Cancelado");

  return (
    <PageBase>
      <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-300">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-black">
              Agregar Usuario
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              {/* Campos principales */}
              {[
                { label: "Legajo", name: "legajo" },
                { label: "Nombre", name: "nombre" },
                { label: "Apellido", name: "apellido" },
                { label: "Usuario", name: "usuario" },
                { label: "Contraseña Provisional", name: "contrasena" },
                { label: "Email", name: "email" },
                { label: "Celular", name: "celular" },
              ].map(({ label, name }) => (
                <InputConLabel
                  key={name}
                  label={label}
                  name={name}
                  placeholder={`Ingrese ${label.toLowerCase()}`}
                  supportingText="Este campo es obligatorio"
                  value={(form as any)[name]}
                  onChange={(val) => handleChange(name, val)}
                />
              ))}

              {/* Checkboxes */}
                <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="coordinador"
                    checked={form.esCoordinador}
                    onCheckedChange={() => handleCheck("esCoordinador")}
                    className="border border-black data-[state=checked]:bg-green-600"
                    />
                    <Label htmlFor="coordinador" className="text-gray-700">
                    Es coordinador?
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="admin"
                    checked={form.esAdministrador}
                    onCheckedChange={() => handleCheck("esAdministrador")}
                    className="border border-black data-[state=checked]:bg-green-600"
                    />
                    <Label htmlFor="admin" className="text-gray-700">
                    Es administrador?
                    </Label>
                </div>
                </div>
              {/* Botón Agregar */}
              <div className="flex justify-start mt-2">
                <BotonGenerico
                  texto="Agregar"
                  color="#3E9956"
                  icono={
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600">
                      <span className="icon-[mdi--plus]" />
                    </span>
                  }
                  onClick={handleAgregar}
                />
              </div>

              {/* Carrera */}
              <InputConLabel
                label="Carrera"
                name="carrera"
                placeholder="Ingrese carrera"
                value={form.carrera}
                onChange={(val) => handleChange("carrera", val)}
              />

              {/* Botones Guardar / Cancelar */}
              <div className="flex justify-between mt-6">
             <BotonGenerico
                    texto="Guardar"
                    color="#47ADA4"
                    icono={
                        <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-2xl">
                        <span className="icon-[mdi--content-save]" aria-label="Guardar" />
                        </span>
                    }
                    onClick={handleGuardar}
                    />
                <BotonGenerico
                  texto="Cancelar"
                  color="#929292"
                  icono={
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-gray-600">
                      <span className="icon-[mdi--close]" />
                    </span>
                  }
                  onClick={handleCancelar}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageBase>
  );
}
