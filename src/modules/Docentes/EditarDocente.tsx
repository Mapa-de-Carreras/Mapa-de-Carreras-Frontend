import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import PageBase from "@components/PageBase/PageBase";
import { Card, CardContent } from "@components/ui/card";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import BotonBase from "@components/Botones/BotonBase";
import { Formulario } from "@components/Formularios/Formulario";
import { CampoInput } from "@components/Formularios/CampoInput";


import { useGetDocenteDetalle, usePutDocente } from "@apis/docentes";
import { useModal } from '@components/Providers/ModalProvider';
import useRol from "@hooks/useRol";


import useGetModalidades from "@apis/modalidades";
import useGetCaracteres from "@apis/caracteres";
import useGetDedicaciones from "@apis/dedicacion";


import { DocenteSchema, DocenteForm } from "./constrainst";
import { CampoSelect } from "@components/Formularios/CampoSelectAntiguo";




interface ICatalogoItem {
  id: number;
  nombre: string;
  
}


interface IBackendError {
  message?: string;
  detail?: string;
}

export default function EditarDocente() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const navigate = useNavigate();
  const { showModal } = useModal();
  
  const isAdmin = useRol('Administrador');
  const isCoordinador = useRol('Coordinador');


  const { data: docente, isLoading: isLoadingDocente, error: ErrorDocente } = useGetDocenteDetalle(id);
  const { mutate: updateDocente } = usePutDocente();

  //raro pero no encuentro los typados correctos
  const { data: listModalidades } = useGetModalidades() as { data: ICatalogoItem[] | undefined };
  const { data: listCaracteres} = useGetCaracteres() as { data: ICatalogoItem[] | undefined };
  const { data: listDedicaciones } = useGetDedicaciones() as { data: ICatalogoItem[] | undefined };

  useEffect(() => {
    if (!isAdmin && !isCoordinador) navigate('/');
  }, [isAdmin, isCoordinador, navigate]);


  const encontrarIdPorNombre = (
    lista: ICatalogoItem[] | undefined, 
    valorDelDocente: string | ICatalogoItem | null | undefined
  ): string => {
    if (!lista || !valorDelDocente) return "";
    

    if (typeof valorDelDocente === 'object' && 'id' in valorDelDocente) {
        return String(valorDelDocente.id);
    }

    
    if (typeof valorDelDocente === 'string') {
        const encontrado = lista.find((item) => item.nombre === valorDelDocente);
        return encontrado ? String(encontrado.id) : "";
    }

    return "";
  };

  const handlerSubmit = (dataForm: DocenteForm) => {
    showModal({ isLoading: true, msg: 'Actualizando Docente...' });

    const payload = {
        usuario: {
            first_name: dataForm.first_name,
            last_name: dataForm.last_name,
            username: dataForm.username,
            email: dataForm.email,
            celular: dataForm.celular || "",
            legajo: dataForm.legajo || "",
        },
        activo: docente?.activo || true,
        cantidad_materias: Number(dataForm.cantidad_materias),
        
        modalidad_id: Number(dataForm.modalidad),
        caracter_id: Number(dataForm.caracter),
        dedicacion_id: Number(dataForm.dedicacion),
    };

    
    updateDocente({ data: payload, params: { id } }, { 
      onSuccess: () => {
        showModal({
          title: 'Éxito',
          description: 'Docente actualizado.',
          buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
          isLoading: false,
        });
      },
      onError: (error: unknown) => {
        
        const backendError = error as IBackendError;
        showModal({
          title: 'Error',
          description: backendError.message || 'No se pudo actualizar.',
          buttons: [{ variant: 'error', onClick: () => {} }],
          isLoading: false,
        });
      }
    });
  };

  return (
    <PageBase titulo="Editar Docente" volver>
      {isLoadingDocente && <ComponenteCarga/>}
      {ErrorDocente && <p className="text-red-500">Error: {ErrorDocente.message}</p>}

        {!isLoadingDocente && !ErrorDocente && docente && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent>  
                <Formulario
                  onSubmit={handlerSubmit}
                  valoresIniciales={{
                    first_name: docente.usuario?.first_name || "",
                    last_name: docente.usuario?.last_name || "",
                    username: docente.usuario?.username || "",
                    email: docente.usuario?.email || "",
                    celular: docente.usuario?.celular || "",
                    legajo: docente.usuario?.legajo || "",
                    activo: docente.activo ?? true,
                    cantidad_materias: docente.cantidad_materias || 0,

                    
                    modalidad: encontrarIdPorNombre(listModalidades, docente.modalidad as string | ICatalogoItem),
                    caracter: encontrarIdPorNombre(listCaracteres, docente.caracter as string | ICatalogoItem),
                    dedicacion: encontrarIdPorNombre(listDedicaciones, docente.dedicacion as string | ICatalogoItem),
                  }}
                  schema={DocenteSchema}
                >
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-6 px-4">
                      <h3 className="col-span-full font-bold text-gray-700 border-b pb-2">Datos Personales</h3>
                      <CampoInput nombre="first_name" label="Nombre"/>
                      <CampoInput nombre="last_name" label="Apellido"/>
                      <CampoInput nombre="username" label="Usuario"/>
                      <CampoInput nombre="email" label="Correo"/>
                      <CampoInput nombre="celular" label="Celular"/>
                      <CampoInput nombre="legajo" label="Legajo"/>
                    

                      <h3 className="col-span-full font-bold text-gray-700 border-b pb-2 mt-4">Datos Académicos</h3>
                      
                    
                      <CampoSelect 
                        nombre="modalidad" 
                        label="Modalidad"
                        placeholder="Seleccione..."
                        options={listModalidades?.map((m) => ({label: m.nombre, value: String(m.id)})) || []}
                      />
                      
                      <CampoSelect 
                        nombre="caracter" 
                        label="Carácter"
                        placeholder="Seleccione..."
                        options={listCaracteres?.map((c) => ({label: c.nombre, value: String(c.id)})) || []}
                      />

                      <CampoSelect 
                        nombre="dedicacion" 
                        label="Dedicación"
                        placeholder="Seleccione..."
                        options={listDedicaciones?.map((d) => ({label: d.nombre, value: String(d.id)})) || []}
                      />

                      <CampoInput nombre="cantidad_materias" label="Cantidad de Materias" type="number"/>
                  </div>

                  <div className="flex justify-end gap-2 px-4 pb-6">
                      <BotonBase variant="cancelar" onClick={() => navigate(-1)} />
                      <BotonBase variant="guardar" type="submit" />
                  </div>

                </Formulario>
              </CardContent>  
            </Card>
          </div>
        )}
    </PageBase>
  );
}