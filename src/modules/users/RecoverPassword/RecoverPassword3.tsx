import ModalGenerico from "@components/Modal/ModalGenerico";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { useLocation, useNavigate } from "react-router";


interface LocationState {
  email?: string;
  codigo?: string;
}
export default function RecoverPassword3() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [email, setEmail] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");

  // Obtener email y código desde la pantalla anterior
  useEffect(() => {
    if (state?.email && state?.codigo) {
      setEmail(state.email);
      setCodigo(state.codigo);
    } else {
      navigate("/authentication/repass1");
    }
  }, [state, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      setError("Por favor, complete ambos campos.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${URL_API}auth/recuperar/restablecer-contraseña/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            code: codigo,
            password,
            password2: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      console.log("Contraseña restablecida correctamente");
      setMostrarModal(true);
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      setError("Error al restablecer la contraseña. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/authentication/login");
  };

  return (
    <PageBase>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        {loading && <PantallaCarga mensaje="Restableciendo contraseña..." />}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-semibold text-center text-black">
            Restablecer Contraseña
          </h1>

          {/* Nueva contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Ingrese nueva contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <span
                className={showPassword ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"}
              />
            </button>
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirme la contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <span
                className={showPassword ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"}
              />
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          {/* Botones Cancelar y Confirmar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>  navigate("/authentication/login")}
              className="bg-white text-black border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition"
            >
              Confirmar
            </button>
          </div>
        </form>

        {/* Modal de éxito */}
        <ModalGenerico
          abierto={mostrarModal}
          onClose={handleCerrarModal}
          titulo="Éxito"
          mensaje="Contraseña restablecida correctamente."
          textoBoton="Aceptar"
          colorBoton="#3E9956"
          onConfirmar={handleCerrarModal}
        />
      </div>
    </PageBase>
  );
}