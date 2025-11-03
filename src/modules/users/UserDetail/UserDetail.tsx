import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useState } from "react";
import BotonBase from "@components/Botones/BotonBase";
export default function UserDetail() {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  const handleEditar = () => {
    console.log("Editar usuario");
  };

  const handleAbrirModalEliminar = () => {
    setMostrarModal(true);
  };

  const handleConfirmarEliminar = () => {
    console.log("Usuario eliminado");
    setMostrarModal(false);
  };

  const handleVerCarrera = (id: number) => {
    console.log("Ver carrera con id:", id);
  };

  const handleCerrarModal = () => {
    console.log("Cerrar modal");
    setMostrarModal(false);
  };

  return (
    <PageBase>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-4">
          <CardHeader className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4">
              <div
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white border"
              style={{ borderColor: "#000000" }}
            >
              <span
                className="icon-[mdi--account] text-black w-full h-full text-[48px] flex items-center justify-center"
                aria-label="Usuario"
              />
            </div>
              <CardTitle className="text-xl font-semibold text-center text-black">
                Horacio Pendenti
              </CardTitle>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-3">
              <BotonBase variant="editar" onClick={handleEditar} />

              <BotonBase variant="eliminar" onClick={handleAbrirModalEliminar}/>
            </div>
          </CardHeader>

          <CardContent className="mt-4 space-y-2 text-sm">
            <div>
              <strong className="text-black">Nombre:</strong>{" "}
              <span className="text-gray-700">Horacio</span>
            </div>
            <div>
              <strong className="text-black">Apellido:</strong>{" "}
              <span className="text-gray-700">Pendenti</span>
            </div>
            <div>
              <strong className="text-black">Usuario:</strong>{" "}
              <span className="text-gray-700">HPendenti</span>
            </div>
            <div>
              <strong className="text-black">Email:</strong>{" "}
              <span className="text-gray-700">hpendenti@hotmail.com</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-black">Celular:</strong>{" "}
                <span className="text-gray-700">2901-411203</span>
              </div>
              <span
                className="icon-[mdi--phone-sync-outline] text-black text-lg"
                aria-label="Llamar"
              />
            </div>
            <div>
              <strong className="text-black">Rol:</strong>{" "}
              <span className="text-gray-700">Coordinador de carrera</span>
            </div>

            {/* Carreras */}
            <div className="mt-4">
              <strong className="text-black">Carreras:</strong>
              <Card className="mt-2 p-3 bg-white border border-black rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-black">
                      Licenciatura en Sistemas
                    </p>
                    <p className="text-sm text-gray-600">
                      Coordinador: Ezequiel Moyano
                    </p>
                  </div>
                  <BotonGenerico
                     color="#49454F"
                     icono={
                          <span className="icon-[majesticons--share] text-white text-4xl" />
                        }
                    onClick={() => handleVerCarrera(1)}
                    type="button"
                    className="ml-auto w-10 h-10 rounded-full flex items-center justify-center p-0 border border-black hover:opacity-80 transition"
                  />
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span
            className="icon-[mdi--trash-can] text-5xl"
            style={{ color: "#B53B3B" }}
          />
        }
        titulo="Eliminar Usuario"
        mensaje="¿Está seguro que desea eliminar este usuario?"
        textoBoton="Eliminar"
        colorBoton="#B53B3B"
        onConfirmar={handleConfirmarEliminar}
        textoBotonSecundario="Cancelar"
        colorBotonSecundario="#929292"
        onCancelar={handleCerrarModal}
      />
    </PageBase>
  );
}