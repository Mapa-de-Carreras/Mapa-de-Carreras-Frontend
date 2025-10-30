import { useState, FormEvent } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (field: "esCoordinador" | "esAdministrador") => {
    setForm({
      ...form,
      [field]: !form[field],
    });
  };

  const handleAgregar = () => {
    console.log("Usuario agregado:", form);
  };

  const handleGuardar = () => {
    console.log("Guardar usuario:", form);
  };

  const handleCancelar = () => {
    console.log("Cancelado");
  };

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
            <form onSubmit={handleGuardar} className="space-y-4">
              {[
                { label: "Legajo", name: "legajo" },
                { label: "Nombre", name: "nombre" },
                { label: "Apellido", name: "apellido" },
                { label: "Usuario", name: "usuario" },
                { label: "Contraseña Provisional", name: "contrasena" },
                { label: "Email", name: "email" },
                { label: "Celular", name: "celular" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="border-gray-400 focus:ring-green-600"
                    placeholder={`Ingrese ${label.toLowerCase()}`}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Este campo es obligatorio
                  </p>
                </div>
              ))}

              {/* Checkboxes */}
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="coordinador"
                    checked={form.esCoordinador}
                    onCheckedChange={() => handleCheck("esCoordinador")}
                  />
                  <Label htmlFor="coordinador">Es coordinador?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admin"
                    checked={form.esAdministrador}
                    onCheckedChange={() => handleCheck("esAdministrador")}
                  />
                  <Label htmlFor="admin">Es administrador?</Label>
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
              <div className="mt-4">
                <Label htmlFor="carrera">Carrera:</Label>
                <Input
                  id="carrera"
                  name="carrera"
                  value={form.carrera}
                  onChange={handleChange}
                  placeholder="Ingrese carrera"
                  className="border-gray-400"
                />
              </div>

              {/* Botones Guardar / Cancelar */}
              <div className="flex justify-between mt-6">
                <BotonGenerico
                  texto="Guardar"
                  color="#3E9956"
                  icono={
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600">
                      <span className="icon-[mdi--content-save]" />
                    </span>
                  }
                  onClick={handleGuardar}
                />
                <BotonGenerico
                  texto="Cancelar"
                  color="#808080"
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
