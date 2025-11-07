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
    esDocente: false,
    carrera: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [carreras, setCarreras] = useState<any>(null);
  const [mostrarModalCarrera, setMostrarModalCarrera] = useState(false);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [mostrarActual, setMostrarActual] = useState(false);

  const [mostrarModalContraseña, setMostrarModalContraseña] = useState(false);
  const contraseñasCoinciden =
    nuevaContraseña.trim() !== "" &&
    nuevaContraseña === confirmarContraseña;

  // Cargar datos del usuario
  useEffect(() => {
    const id = localStorage.getItem("user_id");

    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado");

        const response = await fetch(`${URL_API}usuarios/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener datos del usuario");

        const data = await response.json();
        setForm((prev) => ({
          ...prev,
          legajo: data.legajo || "",
          nombre: data.first_name || "",
          apellido: data.last_name || "",
          usuario: data.username || "",
          email: data.email || "",
          celular: data.celular || "",
          esCoordinador: data.roles?.includes("Coordinador") || false,
          esAdministrador: data.roles?.includes("Administrador") || false,
          esDocente: data.roles?.includes("Docente") || false,
          carrera: data.carrera || "",
        }));
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCarreras = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${URL_API}carreras/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCarreras(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener las carreras. Intente nuevamente.");
      }
    };

    fetchUser();
    fetchCarreras();
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (field: "esCoordinador" | "esAdministrador" | "esDocente") => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));

    if (field === "esCoordinador" && !form.esCoordinador) {
      setMostrarModalCarrera(true);
    }
  };

  // Guardar cambios
  const handleGuardar = async () => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Token no encontrado");

      const rolesSeleccionados: string[] = [];
      if (form.esAdministrador) rolesSeleccionados.push("Administrador");
      if (form.esCoordinador) rolesSeleccionados.push("Coordinador");
      if (form.esDocente) rolesSeleccionados.push("Docente");

      const body: any = {
        username: form.usuario,
        first_name: form.nombre,
        last_name: form.apellido,
        email: form.email,
        legajo: form.legajo,
        celular: form.celular,
        is_staff: form.esAdministrador,
        roles: rolesSeleccionados,
      };

      if (form.esCoordinador) {
        if (form.carrera) {
          body.carreras_asignadas_ids= [Number(form.carrera)];
          console.log(" Le envío la carrera:", form.carrera);
        } else {
          console.warn("⚠ Es coordinador pero no hay carrera seleccionada");
        }
      }
      console.log("Body a enviar:", body);
      const id = localStorage.getItem("user_id");
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

        if (errorData.email)
          setError("El email ya está registrado por otro usuario.");
        else if (errorData.legajo)
          setError("El legajo ya está registrado por otro usuario.");
        else if (errorData.celular)
          setError("El número de celular ya está en uso.");
        else
          setError("Error al actualizar el usuario.");

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

    const fetchCambiarContraseña = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${URL_API}auth/cambiar-contraseña/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: contraseñaActual,
          password: nuevaContraseña,
          password2: confirmarContraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al cambiar la contraseña");
      }

      setContraseñaActual("");
      setNuevaContraseña("");
      setConfirmarContraseña("");
      alert("Contraseña cambiada correctamente");
    } catch (error) {
      console.error(error);
      setError("Error al cambiar la contraseña. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
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
              ].map(({ label, name }) => (
                <InputConLabel
                  key={name}
                  label={label}
                  name={name}
                  placeholder={`Ingrese ${label.toLowerCase()}`}
                  value={(form as any)[name]}
                  onChange={(val) => handleChange(name, val)}
                />
              ))}

              {/* Roles */}
              <div className="flex flex-col gap-3 mt-3">
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="docente"
                    checked={form.esDocente}
                    onCheckedChange={() => handleCheck("esDocente")}
                    className="border border-black data-[state=checked]:bg-green-600"
                  />
                  <Label htmlFor="docente" className="text-gray-700">
                    ¿Es docente?
                  </Label>
                </div>
              </div>

              {form.carrera && (
                <p className="text-sm text-gray-600 mt-1">
                  Carrera seleccionada:{" "}
                  {
                    carreras?.find(
                      (c: any) => String(c.id) === String(form.carrera)
                    )?.nombre || "Sin nombre"
                  }
                </p>
              )}

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

              <div className="flex justify-center mt-4">
                <BotonGenerico
                  texto="Cambiar contraseña"
                  color="#2563EB"
                  icono={
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-gray-600">
                      <span className="icon-[mdi--lock-reset]" />
                    </span>
                  }
                  onClick={() => setMostrarModalContraseña(true)}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Modal de éxito */}
      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
        titulo="Éxito"
        mensaje="Usuario actualizado exitosamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />

      {/* Modal selección de carrera */}
      <ModalGenerico
        abierto={mostrarModalCarrera}
        onClose={() => setMostrarModalCarrera(false)}
        titulo="Seleccionar carrera"
        mensaje="Seleccione la carrera que coordinará."
        icono={<span className="icon-[mdi--school] text-blue-600 text-5xl" />}
        textoBoton="Guardar"
        colorBoton="#2563EB"
        onConfirmar={() => {
          setForm((prev) => ({ ...prev, carrera: carreraSeleccionada }));
          setMostrarModalCarrera(false);
        }}
      >
        <div className="mt-4 flex flex-col gap-3">
          {carreras?.length ? (
            <select
              className="border border-black text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={carreraSeleccionada}
              onChange={(e) => setCarreraSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.nombre || c.carrera?.nombre || c.codigo || "Sin nombre"}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No hay carreras disponibles.
            </p>
          )}
        </div>
      </ModalGenerico>
      <ModalGenerico
      abierto={mostrarModalContraseña}
      onClose={() => setMostrarModalContraseña(false)}
      titulo="Cambiar contraseña"
      mensaje="Ingrese su contraseña actual, su nueva contraseña y confírmela."
      icono={<span className="icon-[mdi--lock-reset] text-blue-600 text-5xl" />}
      textoBoton="Confirmar"
      colorBoton="#2563EB"
      onConfirmar={() => {
        if (nuevaContraseña === confirmarContraseña) {
          fetchCambiarContraseña();
          setMostrarModalContraseña(false);
        } else {
          setError("Las contraseñas no coinciden.");
        }
      }}
    >
      <div className="mt-4 flex flex-col gap-3">
        {/* Contraseña actual */}
        <div className="relative">
          <input
            type={mostrarActual ? "text" : "password"}
            placeholder="Contraseña actual"
            value={contraseñaActual}
            onChange={(e) => setContraseñaActual(e.target.value)}
            className="border border-black text-black rounded-lg p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setMostrarActual((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
          >
            <span
              className={mostrarActual ? "icon-[mdi--eye-off] text-xl" : "icon-[mdi--eye] text-xl"}
            />
          </button>
        </div>

        {/* Nueva contraseña */}
        <div className="relative">
          <input
            type={mostrarNueva ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            className="border border-black text-black rounded-lg p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setMostrarNueva((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
          >
            <span
              className={mostrarNueva ? "icon-[mdi--eye-off] text-xl" : "icon-[mdi--eye] text-xl"}
            />
          </button>
        </div>

        {/* Confirmar contraseña */}
        <div className="relative">
          <input
            type={mostrarConfirmar ? "text" : "password"}
            placeholder="Confirmar contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            className="border border-black text-black rounded-lg p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setMostrarConfirmar((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
          >
            <span
              className={mostrarConfirmar ? "icon-[mdi--eye-off] text-xl" : "icon-[mdi--eye] text-xl"}
            />
          </button>
        </div>
      </div>
    </ModalGenerico>

    </PageBase>
  );
}