import { useEffect, useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardContent } from "@components/ui/card";
import { useGetNotificaciones, useMarcarLeida, usePosponerNotificacion, useArchivarNotificacion } from "@apis/notificaciones";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import { UsuarioNotificacion } from "@globalTypes/notificaciones";
import { useModal } from "@components/Providers/ModalProvider";
import BotonBase from "@components/Botones/BotonBase";

type NotificacionItemProps = {
  data: UsuarioNotificacion;
};

const NotificacionItem = ({data} : NotificacionItemProps) => {
  const {showModal} = useModal();
  const [notifis, setNotifis] = useState(data)
  const [expandido, setExpandido] = useState(false); 
  const [leido, setLeido] = useState(data.leida);
  const [visible, setVisible] = useState(true);

  const {mutate: marcarLeida} = useMarcarLeida();
  const {mutate: posponer} = usePosponerNotificacion();
  const {mutate: archivar} = useArchivarNotificacion();

  useEffect(()=>{
    setNotifis(data)
    setLeido(data.leida) 
    if(data.fecha_recordatorio ){
      setVisible(false)
    }else{ setVisible(true)}
  },[data])

  if (data.fecha_recordatorio || !visible) return null;
  const openNotifi = () => {
    if (!leido) {
      setLeido(true);
      marcarLeida({data: {}, params : {id: data.id} });
    }
    setExpandido(!expandido)
  }

  const colorTipo = {
    MSG: "bg-green-500/4 hover:bg-green-500/10",
    INFO: "bg-blue-500/4 hover:bg-blue-500/10",
    ALERTA: "bg-red-500/4 hover:bg-red-500/10",
    ADVERTENCIA:  "bg-orange-500/4 hover:bg-orange-500/10",
    SISTEMA: "bg-slate-500/4 hover:bg-slate-500/10"
  };  
  const claseColor = colorTipo[data.tipo] || colorTipo.MSG;

  const posponerNoti = () => {

      showModal({
        isLoading: true,
      })
    

    posponer({data: {}, params : {id: data.id} }, {

      onSuccess: () => {
          setVisible(false);
          showModal({
            title: 'Éxito',
            description: 'La notificacion se ha pospondido correctamente.',
            buttons: [
              {
                variant: 'aceptar',
                onClick: () => {}
              },
            ],
            isLoading: false,
          })
      },
      onError: (err) => {
        showModal({
          title: 'Error',
          description: err.message || 'No se pudo posponer la notificacion.',
          buttons: [
            {
              variant: 'error',
              onClick: () => {}
            },
          ],
          isLoading: false,
        })
      }
    });
  }

  const eliminarNoti = () => {
    
    archivar({data: {}, params : {id: data.id} }, {
      onSuccess: () => {
          setVisible(false);
      }
    })
    
  }

  return (
    <div
      onClick={openNotifi} 
      className={`border rounded-md p-4 mb-2 relative w-full cursor-pointer transition-colors duration-200 
        ${claseColor}`}
    >
      {!leido && (
        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500" />
      )}

      <div className="flex justify-between items-start mb-1 pr-4 select-none">
        <h4 className={`text-sm ${!leido ? "font-bold" : "font-medium"}`}>
          {data.titulo}
        </h4>
        <span className="text-xs opacity-70 shrink-0 ml-2">
          {new Date(notifis.fecha_emision).toLocaleDateString()}
        </span>
      </div>

      <p className="text-xs opacity-70 mb-1 select-none">
        De: {notifis.emitido_por}
      </p>


      {expandido && (
        <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="border-t my-2" />
          
          <p className="text-sm mb-3 leading-relaxed cursor-text" onClick={(e) => e.stopPropagation()}>
            {notifis.mensaje}
          </p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-60">
            <span>ID: {notifis.id}</span>
          </div>

     
          
              <div className="mt-3 flex justify-end gap-2">
                <BotonBase variant="eliminar" onClick={eliminarNoti}/>
                {
                  data.tipo==="ADVERTENCIA" && (
                    <BotonBase variant="exportar" icono="ninguno" onClick={posponerNoti}>Posponer por 7 días</BotonBase>
                  )
                }
                
              </div>
            
        </div>
      )}
    </div>
  );
};


export default function NotificacionesPage() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const {
    data: notificaciones,
    isLoading: cargandoNotificaciones,
    error: errorNotificaciones,
  } = useGetNotificaciones({
		params: {
      page,
			pageSize,
		},
		refetch: 30000,
	});


  return (
    <PageBase volver titulo="Notificaciones">
      <br />
      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          {cargandoNotificaciones && <ComponenteCarga />}
          {errorNotificaciones && (
            <p className="text-red-500">{errorNotificaciones.message}</p>
          )}

          {!cargandoNotificaciones && !errorNotificaciones && notificaciones && (
            <Listado
              data={notificaciones.results}
              dataRender={(data) => <NotificacionItem key={data.id} data={data} />}
              mensajeSinDatos="No hay notificaciones"
            />
          )}
        </CardContent>
      </Card>
    </PageBase>
  );
}