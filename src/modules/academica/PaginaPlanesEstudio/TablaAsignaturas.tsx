import { IAsignatura } from "@globalTypes/planesestudio";

interface TablaAsignaturasProps {
  asignaturas: IAsignatura[];
  onVerAsignatura: (id: number) => void;
}

export default function TablaAsignaturas({
  asignaturas,
  onVerAsignatura,
}: TablaAsignaturasProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold border-b">
              Asignatura
            </th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200 font-semibold border-b">
              Correlativa
            </th>
          </tr>
        </thead>

        <tbody>
          {asignaturas.length > 0 ? (
            asignaturas.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                <td
                  className="px-4 py-3 border-b hover:underline"
                  onClick={() => onVerAsignatura(a.id)}
                >
                  {a.nombre}
                </td>

                <td className="px-4 py-3 border-b">
                  {a.correlativas.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {a.correlativas.map((c) => (
                        <span
                          key={c.id}
                          className="hover:underline cursor-pointer text-gray-800 dark:text-gray-300"
                          onClick={() => onVerAsignatura(c.id)}
                        >
                          {c.nombre}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      — Sin correlativas —
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4">
                No hay asignaturas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
