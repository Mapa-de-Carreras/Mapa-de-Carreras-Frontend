import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";

export default function UserDetail() {
  const handleEditar = () => {
    console.log("Editar usuario");
  };

  const handleEliminar = () => {
    console.log("Eliminar usuario");
  };

  const handleVerCarrera = (id: number) => {
    console.log("Ver carrera con id:", id);
  };

  return (
    <PageBase>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-4">
          {/* Cabecera: foto a la izquierda y nombre a la derecha */}
          <CardHeader className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-gray-300">
                <span
                  className="icon-[codicon--account] text-black text-[48px]"
                  aria-label="Usuario"
                />
              </div>
              <CardTitle className="text-xl font-semibold text-center text-black">
                Horacio Pendenti
              </CardTitle>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-3">
              <BotonGenerico
                texto="Editar"
                color="#3E9956"
                icono={
                 <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-2xl">
                    <span className="icon-[ph--note-pencil]" aria-label="Editar" />
                  </span>
                }
                onClick={handleEditar}
              />

            <BotonGenerico
                texto="Eliminar"
                color="#B53B3B"
                icono={
                    <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-2xl">
                    <span className="icon-[mdi--trash-can]" aria-label="Eliminar" />
                    </span>
                }
                onClick={handleEliminar}
                />
            </div>
          </CardHeader>

          {/* Datos del usuario */}
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
                    <p className="font-semibold text-black">Licenciatura en Sistemas</p>
                    <p className="text-sm text-gray-600">
                      Coordinador: Ezequiel Moyano
                    </p>
                  </div>
                <BotonGenerico
                    color="white" 
                    icono={
                        <span className="w-8 h-8 flex items-center justify-center rounded-full text-black text-3xl">
                        <span className="icon-[ph--arrow-circle-right]" />
                        </span>
                    }
                    onClick={() => handleVerCarrera(1)}
                    />
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageBase>
  );
}
