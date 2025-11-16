import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useLocation, useNavigate } from "react-router";
import { URL_API } from "@apis/constantes";
import BotonGenerico from "@components/Botones/BotonGenerico";
import PageBase from "@components/PageBase/PageBase";
import asignaturas from "@data/asignaturas";

export default function AsignaturaDetalle() {
  const location = useLocation();
  const { asignaturaId, planId } = location.state || {};
  const navigate = useNavigate();

  const [asignatura, setAsignatura] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAsignatura = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Token no encontrado. Inicie sesión nuevamente.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${URL_API}asignaturas/${asignaturaId}/plan/${planId}`, {  
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener la asignatura");
      const data = await res.json();
      setAsignatura(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la información de la asignatura.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Plan id recibido: ",planId," id asignatura recibido: ",asignaturaId);
    if (asignaturaId) fetchAsignatura();
  }, [asignaturaId]);

  const handleVolver = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <PageBase>
        <div className="flex justify-center items-center min-h-screen text-lg">
          Cargando asignatura...
        </div>
      </PageBase>
    );
  }

  if (error) {
    return (
      <PageBase>
        <div className="flex flex-col justify-center items-center min-h-screen text-red-600">
          <p>{error}</p>
          <BotonGenerico texto="Volver" color="#49454F" onClick={handleVolver} />
        </div>
      </PageBase>
    );
  }

return (
    <PageBase>
      {asignatura && (
        <div className="flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10
                        bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border
                          border-gray-200 dark:border-gray-700 p-6 md:p-8">

            <CardHeader className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full
                                bg-white dark:bg-gray-700 border border-black dark:border-gray-300">
                  <span
                    className="icon-[mdi--book-open-page-variant] text-black dark:text-white
                              text-[48px] sm:text-[60px]"
                    aria-label="Asignatura"
                  />
                </div>

                <CardTitle className="text-2xl sm:text-3xl font-bold text-center
                                      text-black dark:text-white">
                  {asignatura.nombre || "Asignatura sin nombre"}
                </CardTitle>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-5">
                <BotonGenerico
                  texto="Volver"
                  color="#49454F"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">
                      <span className="icon-[mdi--arrow-left]" aria-label="Volver" />
                    </span>
                  }
                  onClick={handleVolver}
                />
              </div>
            </CardHeader>

            <CardContent className="mt-6 space-y-3 text-base sm:text-lg
                                    text-gray-800 dark:text-gray-200">

              <div>
                <strong className="text-black dark:text-white">Código:</strong> {asignatura.codigo}
              </div>

              <div>
                <strong className="text-black dark:text-white">Tipo:</strong> {asignatura.tipo_asignatura}
              </div>

              <div>
                <strong className="text-black dark:text-white">Duración:</strong> {asignatura.tipo_duracion}
              </div>

              <div>
                <strong className="text-black dark:text-white">Cuatrimestre:</strong> {asignatura.cuatrimestre}
              </div>

              <div>
                <strong className="text-black dark:text-white">Horas Teoría:</strong> {asignatura.horas_teoria}
              </div>

              <div>
                <strong className="text-black dark:text-white">Horas Práctica:</strong> {asignatura.horas_practica}
              </div>

              <div>
                <strong className="text-black dark:text-white">Horas Semanales:</strong> {asignatura.horas_semanales}
              </div>

              <div>
                <strong className="text-black dark:text-white">Horas Totales:</strong> {asignatura.horas_totales}
              </div>

              <div>
                <strong className="text-black dark:text-white">Activa:</strong>{" "}
                {asignatura.activo ? "Sí" : "No"}
              </div>

              {/* CORRELATIVAS — solo si existen */}
              {asignatura.correlativas && asignatura.correlativas.length > 0 && (
                <div className="mt-4">
                  <strong className="text-black dark:text-white">Correlativas:</strong>
                  <ul className="list-disc ml-6 mt-1 text-black-600 dark:text-white-300">
                    {asignatura.correlativas.map((c: any) => (
                      <li
                        key={c.id}
                        className="cursor-pointer hover:underline"
                        onClick={() =>
                          navigate("/academica/asignaturas/detalle", {
                            state: { asignaturaId: c.id, planId }
                          })
                        }
                      >
                        {c.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      )}
    </PageBase>
  );
}
