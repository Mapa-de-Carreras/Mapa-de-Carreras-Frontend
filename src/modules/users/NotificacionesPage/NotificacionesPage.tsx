import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardContent } from "@components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export default function NotificacionesPage() {
  const notificaciones = [
    {
      id: 1,
      nombre: "Horacio Pendenti",
      imagenUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 2,
      nombre: "Sofía González",
      imagenUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 3,
      nombre: "Juan Pérez",
      imagenUrl: "",
    },
  ];

  return (
    <PageBase>
      <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8 md:p-14">
        <Card className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Notificaciones
            </h1>
          </div>

          <CardContent className="space-y-6 p-8">
            {notificaciones.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-6 p-5 rounded-xl hover:bg-gray-100 transition"
              >
                {/* Avatar del usuario */}
                <Avatar className="w-16 h-16 border border-gray-300">
                  {user.imagenUrl ? (
                    <AvatarImage src={user.imagenUrl} alt={user.nombre} />
                  ) : (
                    <AvatarFallback className="text-lg">
                      {user.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Texto */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-xl">
                    {user.nombre}
                  </span>
                  <span className="text-gray-600 text-base md:text-lg">
                    Te dejó un mensaje 📩
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageBase>
  );
}
