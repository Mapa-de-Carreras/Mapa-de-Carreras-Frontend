import { useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import InputConLabel from "../../../shared/components/InputConLabel/InputConLabel";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useNavigate } from "react-router";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import BotonBase from "@components/Botones/BotonBase";

export default function UserCreate() {
  const [form, setForm] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    password2: "",
    email: "",
    celular: "",
    fecha_nacimiento: "",
    esCoordinador: false,
    esAdministrador: false,
    carrera: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState("");
  const [erroresCampos, setErroresCampos] = useState<Record<string, string>>({});
  const [mostrarPass, setMostrarPass] = useState(false);
  const [mostrarPass2, setMostrarPass2] = useState(false);

  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (field: "esCoordinador" | "esAdministrador") => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validarCampos = () => {
    const camposRequeridos = [
      "legajo",
      "nombre",
      "apellido",
      "usuario",
      "contrasena",
      "password2",
      "email",
      "celular",
      "fecha_nacimiento",
      "carrera",
    ];
    const vacios = camposRequeridos.filter((campo) => !form[campo as keyof typeof form]);
    if (vacios.length > 0) {
      setErrorGeneral("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const formatearFecha = (fecha: string): string => {
    // Convierte DD/MM/YYYY → YYYY-MM-DD
    const partes = fecha.split("/");
    if (partes.length === 3) {
      const [dia, mes, anio] = partes;
      return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return fecha;
  };

  const handleGuardar = async () => {
    setErrorGeneral("");
    setErroresCampos({});

    if (!validarCampos()) return;

    if (form.contrasena !== form.password2) {
      setErrorGeneral("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Token no encontrado.");

      const body = {
        username: form.usuario,
        first_name: form.nombre,
        last_name: form.apellido,
        email: form.email,
        is_staff: form.esAdministrador,
        is_active: true,
        password: form.contrasena,
        password2: form.password2,
        old_password: "",
        legajo: form.legajo,
        fecha_nacimiento: formatearFecha(form.fecha_nacimiento),
        celular: form.celular,
        roles: ["Rol-prueba"],
      };

      console.log("Cuerpo a enviar en el registro: ", body);
      const response = await fetch(`${URL_API}auth/registrar-usuario/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        const nuevosErrores: Record<string, string> = {};

        const traducirError = (campo: string, mensaje: string) => {
          if (mensaje.includes("already exists")) {
            if (campo === "email") return "El correo electrónico ya está registrado.";
            if (campo === "legajo") return "El legajo ya está registrado.";
            if (campo === "username") return "El nombre de usuario ya está en uso.";
            return "El valor ingresado ya existe.";
          }
          if (mensaje.includes("This field may not be blank")) return "Este campo no puede estar vacío.";
          if (mensaje.includes("password")) return "Las contraseñas no cumplen los requisitos.";
          return mensaje;
        };

        Object.keys(data).forEach((campo) => {
          const valor = Array.isArray(data[campo]) ? data[campo][0] : data[campo];
          nuevosErrores[campo] = traducirError(campo, valor);
        });

        setErroresCampos(nuevosErrores);
        throw new Error("Error en el registro");
      }

      setMostrarModal(true);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      if (!Object.keys(erroresCampos).length)
        setErrorGeneral("Error al crear el usuario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => navigate(-1);
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/administracion/usuarios/");
  };

  return (
    <PageBase>
      <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
        {loading && <PantallaCarga mensaje="Creando usuario..." />}

        <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-300">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-black">
              Agregar Usuario
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
                {
                  label: "Contraseña",
                  name: "contrasena",
                  type: mostrarPass ? "text" : "password",
                  icon: (
                    <span
                      onClick={() => setMostrarPass(!mostrarPass)}
                      className="absolute right-0 p-1 text-gray-600 hover:text-black cursor-pointer"
                    >
                      <span className={mostrarPass ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"} />
                    </span>
                  ),
                },
                {
                  label: "Confirme su Contraseña",
                  name: "password2",
                  type: mostrarPass2 ? "text" : "password",
                  icon: (
                    <span
                      onClick={() => setMostrarPass2(!mostrarPass2)}
                      className="absolute right-0 p-1 text-gray-600 hover:text-black cursor-pointer"
                    >
                      <span className={mostrarPass2 ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"} />
                    </span>
                  ),
                },
                { label: "Email", name: "email" },
                { label: "Celular", name: "celular" },
                {
                  label: "Fecha de nacimiento (DD/MM/AAAA)",
                  name: "fecha_nacimiento",
                  placeholder: "Ej: 01/01/2000",
                },
                { label: "Carrera", name: "carrera" },
              ].map(({ label, name, type, icon, placeholder }) => (
                <div key={name} className="relative">
                  <InputConLabel
                    label={label}
                    name={name}
                    placeholder={placeholder || `Ingrese ${label.toLowerCase()}`}
                    supportingText={erroresCampos[name]}
                    value={(form as any)[name]}
                    onChange={(val) => handleChange(name, val)}
                    type={type || "text"}
                  />
                  {icon}
                </div>
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
              {errorGeneral && <p className="text-red-500 text-sm text-center mt-2">{errorGeneral}</p>}
              <div className="flex justify-between mt-6">
                <BotonBase variant="guardar" onClick={handleGuardar} />
                <BotonBase variant="cancelar" onClick={handleCancelar} />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
        titulo="Éxito"
        mensaje="Usuario creado exitosamente."
        textoBoton="Aceptar"
        colorBoton="#3E9956"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}