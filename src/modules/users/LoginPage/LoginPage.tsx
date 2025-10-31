import useAuth from "@components/hooks/useAuth";
import PageBase from "@components/PageBase/PageBase";
import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

interface LocationState {
	from?: {
		pathname: string;
	};
}

export default function LoginPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(username, password);
			const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
			localStorage.removeItem("redirectAfterLogin");
			navigate(redirectPath, { replace: true });
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Error inesperado.");
			}
		}
	};


	return (
		<PageBase>
			<div className="flex justify-center items-center h-screen bg-gray-50">
				<div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
					<h1 className="text-2xl font-semibold text-center mb-6 text-black">
						Iniciar sesión
					</h1>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Nombre de usuario */}
						<div>
							<label
								htmlFor="username"
								className="block text-base font-semibold mb-1 text-gray-800"
							>
								Nombre de usuario
							</label>
							<input
								type="text"
								id="username"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500"
								placeholder="Ingrese su nombre de usuario"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						{/* Contraseña */}
						<div>
							<label
								htmlFor="password"
								className="block text-base font-semibold mb-1 text-gray-800"
							>
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
										className={
											showPassword ? "icon-[mdi--eye-off]" : "icon-[mdi--eye]"
										}
									/>
								</button>
							</div>
						</div>

						{/* Mensaje de error */}
						{error && (
							<p className="text-red-600 text-sm text-center mt-2">{error}</p>
						)}

						{/* Botón */}
						<button
							type="submit"
							className="w-full bg-black text-white rounded-lg py-2 mt-2 hover:bg-gray-800 transition"
						>
							Iniciar sesión
						</button>
					</form>


					{/* Links */}
					<div className="mt-4 text-sm text-left flex flex-col gap-2">
						<button
							onClick={() => navigate("/authentication/repass1")}
							className="text-gray-900 underline hover:text-black text-left"
						>
							¿Olvidaste tu contraseña?
						</button>
						<button
							onClick={() => navigate("/authentication/reuser")}
							className="text-gray-900 underline hover:text-black text-left"
						>
							¿Olvidaste tu nombre de usuario?
						</button>
					</div>
				</div>
			</div>
		</PageBase>
	);
}
