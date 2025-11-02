import PageBase from "../../../shared/components/PageBase/PageBase";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

interface LocationState {
  email?: string;
}

export default function RecoverPassword2() {
  const [codigo, setCodigo] = useState<string>("");
  const [error, setError] = useState<string>(""); 
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (state?.email) {
      console.log("Email recibido en RecoverPassword2:", state.email);
      setEmail(state.email);
    } else {
      // Si no hay email, volvemos a la pantalla anterior
      navigate("/authentication/repass1");
    }
  }, [state, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setError("Por favor, ingrese el código de verificación.");
      return;
    }

    if (codigo.length !== 6) {
      setError("El código debe tener 6 dígitos.");
      return;
    }

    setError("");
    console.log("Código:", codigo);
    navigate("/authentication/repass3", { state: { email,codigo } });

  };

  const handleCancel = () => {
    setCodigo("");
    setError("");
    navigate("/authentication/login");
  };

  return (
    <PageBase>
      <div className="flex justify-center items-start h-screen pt-60 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-200">
          <h1 className="text-xl font-semibold text-center mb-6 text-black">
            Ingrese código de verificación de 6 dígitos
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="codigo"
                className="block text-base font-semibold mb-1 text-gray-800"
              >
                Código
              </label>
              <input
                type="text"
                id="codigo"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="12345"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>

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
    </PageBase>
  );
}