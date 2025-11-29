// src/modules/academica/PaginaPlanesEstudio/TablaAsignaturas.tsx
import { IAsignatura } from "@globalTypes/planesestudio";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardContent } from "@components/ui/card";

interface TablaAsignaturasProps {
  asignaturas: IAsignatura[];
  onVerAsignatura: (id: number) => void;
  onEditarCorrelativas?: (id: number) => void;
}

export default function TablaAsignaturas({
  asignaturas,
  onVerAsignatura,
  onEditarCorrelativas,
}: TablaAsignaturasProps) {
  const tieneAcciones = Boolean(onEditarCorrelativas);

  return (
    <div className="w-full">
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b">
                Asignatura
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b">
                Correlativas
              </th>
              {tieneAcciones && (
                <th className="px-4 py-3 text-center font-semibold border-b">
                  Agregar correlativas
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {asignaturas.length ? (
              asignaturas.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td
                    className="px-4 py-3 border-b cursor-pointer hover:underline"
                    onClick={() => onVerAsignatura(a.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') onVerAsignatura(a.id) }}
                  >
                    {a.nombre}
                  </td>

                  <td className="px-4 py-3 border-b">
                    {a.correlativas.length ? (
                      <div className="flex flex-col gap-1">
                        {a.correlativas.map((c) => (
                          <span
                            key={c.id}
                            className="hover:underline cursor-pointer"
                            onClick={() => onVerAsignatura(c.id)}
                          >
                            {c.nombre}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "— Sin correlativas —"
                    )}
                  </td>

                  {tieneAcciones && (
                    <td className="px-4 py-3 border-b">
                      <div className="flex gap-2 justify-center">
                        <BotonBase
                          variant="editar"
                          onClick={() => onEditarCorrelativas?.(a.id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tieneAcciones ? 3 : 2} className="text-center py-4">
                  No hay asignaturas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden space-y-4 mt-4">
        {asignaturas.map((a) => (
          <Card key={a.id} className="p-3">
            <CardContent className="space-y-3">
              <div
                className="cursor-pointer hover:underline"
                onClick={() => onVerAsignatura(a.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onVerAsignatura(a.id) }}
              >
                <p className="font-semibold text-lg">{a.nombre}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Correlativas:
                </p>

                {a.correlativas.length ? (
                  <ul className="list-disc ml-5">
                    {a.correlativas.map((c) => (
                      <li
                        key={c.id}
                        className="hover:underline cursor-pointer"
                        onClick={() => onVerAsignatura(c.id)}
                      >
                        {c.nombre}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">— Sin correlativas —</p>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                {onEditarCorrelativas && (
                  <BotonBase
                    variant="editar"
                    onClick={() => onEditarCorrelativas(a.id)}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
