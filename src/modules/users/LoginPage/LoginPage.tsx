import PageBase from "../../../shared/components/PageBase/PageBase";
import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Logica de autenticación va aca 
  };

  return (
    <PageBase>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
         <h1 className="text-2xl font-semibold text-center mb-6 text-black">
            Iniciar sesión
            </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
                 <label htmlFor="email" className="block text-base font-semibold mb-1 text-gray-800">
                Email
              </label>
           <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            {/* Contraseña */}
            <div>
           <label htmlFor="password" className="block text-base font-semibold mb-1 text-gray-800">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
             <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
               <span
                className={showPassword ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"} // cambia icono
              />
              </button>
              </div>
            </div>

            {/* Boton */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-2 mt-2 hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 text-sm text-left flex flex-col gap-2">
        <a href="#" className="text-gray-900 underline hover:text-black">
          ¿Olvidaste tu contraseña?
        </a>
        <a href="#" className="text-gray-900 underline hover:text-black">
          ¿Olvidaste tu nombre de usuario?
        </a>
      </div>
      </div>  
    </div>
    </PageBase>
  );
}
