import PageBase from "../../../shared/components/PageBase/PageBase";
import { useState } from "react";
import type { FormEvent } from "react";

export default function RecoverUsername2() {
  const [codigo, setCodigo] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Codigo:", codigo);

  };

  const handleCancel = () => {
    setCodigo("");
  };

  return (
    <PageBase>
     <div className="flex justify-center items-start h-screen pt-60 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-200">
        <h1 className="text-xl font-semibold text-center mb-6 text-black">
            Ingrese código de verificación de 5 dígitos
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="código"
                className="block text-base font-semibold mb-1 text-gray-800"
              >
                Código
              </label>
              <input
                type="código"
                id="código"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500"
                placeholder="12345"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
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
