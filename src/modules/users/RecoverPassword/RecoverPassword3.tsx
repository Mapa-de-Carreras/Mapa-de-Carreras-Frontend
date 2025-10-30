import ModalGenerico from "@components/Modal/ModalGenerico";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { useState } from "react";
import type { FormEvent } from "react";

export default function RecoverPassword3() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    console.log("Nueva contraseña establecida:", password);
    setMostrarModal(true);
  };

  const handleCancel = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
  };


  const handleCerrarModal = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
  };


  return (
    <PageBase>
      <div className="flex justify-center items-start h-screen pt-60 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-200">
          <h1 className="text-xl font-semibold text-center mb-6 text-black">
            Ingrese y confirme su nueva contraseña
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-semibold mb-1 text-gray-800"
              >
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black text-gray-500 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Botón de ojo */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                >
                  <span
                    className={
                      showPassword
                        ? "icon-[mdi--eye-off] text-xl"
                        : "icon-[mdi--eye] text-xl"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-base font-semibold mb-1 text-gray-800"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black text-gray-500 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* Botón de ojo */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                >
                  <span
                    className={
                      showPassword
                        ? "icon-[mdi--eye-off] text-xl"
                        : "icon-[mdi--eye] text-xl"
                    }
                  />
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-white text-black border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 bg-black text-white rounded-lg py-2 hover:bg-gray-800 transition"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
       {/* Modal de éxito */}
            <ModalGenerico
              abierto={mostrarModal}
              onClose={handleCerrarModal}
              icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
              titulo="Éxito"
              mensaje="Su contraseña ha sido restablecida correctamente."
              textoBoton="Aceptar"
              colorBoton="#3E9956"
              onConfirmar={handleCerrarModal}
            />
    </PageBase>
  );
}
