import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardContent } from "@components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { useActivarNotificacion, useMateriaSinResponsable } from "@apis/notificaciones";
import BotonBase from "@components/Botones/BotonBase";
import Listado from "@components/Lista/Listado";

export default function NotificacionesPage() {
  const {mutate: activarNotificacion} = useActivarNotificacion()
  const {mutate: activarNotificacionSinMateria} = useMateriaSinResponsable()


  const handleActivarNotificacion = () => {
    activarNotificacion({}, {
      onSuccess: () => {
        alert("Notificaciones Activadas")
      },
      onError: () => {
        alert("Error al activar notificaciones")
      }
    })

    activarNotificacionSinMateria({}, {
      onSuccess: () => {
        alert("Notificaciones sin materias Activadas")
      },
      onError: () => {
        alert("Error al activar notificaciones")
      }
    })
  };

  type Notificacion = {
    id: number;
    nombre: string;
    imagenUrl: string;
  }
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
      imagenUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  return (
    <PageBase volver titulo="Notificaciones">
        <Card>
            <CardContent className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <BotonBase onClick={handleActivarNotificacion}>Activar Notificaciones</BotonBase>
                </div>
                <Listado
                    data={notificaciones}
                    dataRender={(item: Notificacion) => (
                        <div className="flex flex-row items-center gap-2 border-2 p-2 rounded-2xl" key={item.id}>
                            <Avatar>
                                <AvatarImage src={item.imagenUrl} />
                                <AvatarFallback>{item.nombre}</AvatarFallback>
                            </Avatar>
                            <span>{item.nombre}</span>
                        </div>
                    )}
                />
            </CardContent>
        </Card>
    </PageBase>
  );
}
