import PageBase from "../../../shared/components/PageBase/PageBase";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function RecoverPassword1() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>(""); 
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que el campo mail no este vacio
    if (!email.trim()) {
      setError("Por favor, ingrese su email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingrese un email válido.");
      return;
    }

    setError(""); 
    console.log("Email:", email);


    navigate("/usuarios/recuperar-contraseña-2");
  };

  const handleCancel = () => {
    setEmail("");
    setError("");
    navigate(-1);
  };

  return (
    <PageBase>
     <div className="flex justify-center items-start h-screen pt-60 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
          <h1 className="text-2xl font-semibold text-center mb-6 text-black">
            Recuperar Contraseña
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold mb-1 text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>

            <div className="flex gap-4 mt-2">
              {/* Cancelar */}
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-white text-black border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

              {/* Confirmar */}
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
    </PageBase>
  );
}