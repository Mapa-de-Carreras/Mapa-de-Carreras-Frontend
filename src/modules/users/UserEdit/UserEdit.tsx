import { useEffect, useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import InputConLabel from "../../../shared/components/InputConLabel/InputConLabel";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useNavigate, useParams } from "react-router";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    celular: "",
    esCoordinador: false,
    esAdministrador: false,
    carrera: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado");

        const response = await fetch(`${URL_API}auth/usuarios/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener datos del usuario");

        const data = await response.json();
         console.log("Datos del usuario obtenidos:", data);
        setForm({
          legajo: data.legajo || "",
          nombre: data.first_name || "",
          apellido: data.last_name || "",
          usuario: data.username || "",
          email: data.email || "",
          celular: data.celular || "",
          esCoordinador: data.roles?.includes("Rol-prueba-coord") || false,
          esAdministrador: data.roles?.includes("Rol-prueba-admin") || false,
          carrera: data.carrera || "",
        });
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (field: "esCoordinador" | "esAdministrador") => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Guardar cambios
  const handleGuardar = async () => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Token no encontrado");

      const body: any = {
        username: form.usuario,
        first_name: form.nombre,
        last_name: form.apellido,
        email: form.email,
        legajo: form.legajo,
        celular: form.celular,
        is_staff: form.esAdministrador,
        roles: form.esAdministrador
          ? ["Rol-prueba-admin"]
          : form.esCoordinador
          ? ["Rol-prueba-coord"]
          : [],
        carrera: form.carrera,
      };

      const response = await fetch(`${URL_API}usuarios/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.detail) {
          if (errorData.detail.includes("No tienes permisos")) {
            setError(
              "No tienes permisos para editar este usuario. Solo Coordinadores o Docentes pueden hacerlo."
            );
            return;
          }
        }

        if (errorData.email)
          setError("El email ya está registrado por otro usuario.");
        else if (errorData.legajo)
          setError("El legajo ya está registrado por otro usuario.");
        else setError("Error al actualizar el usuario.");

        return;
      }

      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el usuario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => navigate("/administracion/usuarios/");
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/administracion/usuarios/");
  };

  return (
    <PageBase>
      <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
        {loading && <PantallaCarga mensaje="Guardando usuario..." />}

        <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-300">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-black">
              Editar Usuario
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleGuardar();
              }}
            >
              {[
                { label: "Legajo", name: "legajo" },
                { label: "Nombre", name: "nombre" },
                { label: "Apellido", name: "apellido" },
                { label: "Usuario", name: "usuario" },
                { label: "Email", name: "email" },
                { label: "Celular", name: "celular" },
                { label: "Carrera", name: "carrera" },
              ].map(({ label, name }) => (
                <InputConLabel
                  key={name}
                  label={label}
                  name={name}
                  placeholder={`Ingrese ${label.toLowerCase()}`}
                  supportingText="Este campo es opcional"
                  value={(form as any)[name]}
                  onChange={(val) => handleChange(name, val)}
                />
              ))}

              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="coordinador"
                    checked={form.esCoordinador}
                    onCheckedChange={() => handleCheck("esCoordinador")}
                    className="border border-black data-[state=checked]:bg-green-600"
                  />
                  <Label htmlFor="coordinador" className="text-gray-700">
                    ¿Es coordinador?
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
                    ¿Es administrador?
                  </Label>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <div className="flex justify-between mt-6">
                <BotonGenerico
                  texto="Guardar cambios"
                  color="#47ADA4"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">
                      <span className="icon-[mdi--content-save]" />
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
                  type="button"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span className="icon-[mdi--check-bold] text-green-600 text-5xl" />
        }
        titulo="Éxito"
        mensaje="Usuario actualizado exitosamente."
        textoBoton="Aceptar"
        colorBoton="#3E9956"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}
