import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useLocation, useNavigate } from "react-router";
import { URL_API } from "@apis/constantes";
import BotonGenerico from "@components/Botones/BotonGenerico";
import PageBase from "@components/PageBase/PageBase";

export default function AsignaturaDetalle() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
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
      const res = await fetch(`${URL_API}asignaturas/${id}`, {
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
    if (id) fetchAsignatura();
  }, [id]);

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
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
          <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <CardHeader className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white border border-black">
                            <span
                            className="icon-[mdi--book-open-page-variant] text-black text-[48px] sm:text-[60px]"
                            aria-label="Asignatura"
                            />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black">
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

            <CardContent className="mt-6 space-y-3 text-base sm:text-lg text-gray-800">
              <div>
                <strong className="text-black">Código:</strong> {asignatura.codigo}
              </div>
              <div>
                <strong className="text-black">Tipo:</strong> {asignatura.tipo_asignatura}
              </div>
              <div>
                <strong className="text-black">Duración:</strong> {asignatura.tipo_duracion}
              </div>
              <div>
                <strong className="text-black">Cuatrimestre:</strong>{" "}
                {asignatura.cuatrimestre}
              </div>
              <div>
                <strong className="text-black">Horas Teoría:</strong>{" "}
                {asignatura.horas_teoria}
              </div>
              <div>
                <strong className="text-black">Horas Práctica:</strong>{" "}
                {asignatura.horas_practica}
              </div>
              <div>
                <strong className="text-black">Horas Semanales:</strong>{" "}
                {asignatura.horas_semanales}
              </div>
              <div>
                <strong className="text-black">Horas Totales:</strong>{" "}
                {asignatura.horas_totales}
              </div>
              <div>
                <strong className="text-black">Activa:</strong>{" "}
                {asignatura.activo ? "Sí" : "No"}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageBase>
  );
}
