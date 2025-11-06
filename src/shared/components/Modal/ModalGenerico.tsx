import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import React from "react";

interface ModalGenericoProps {
  abierto: boolean;
  onClose: () => void;
  icono?: React.ReactNode;
  titulo: string;
  mensaje?: string;
  textoBoton?: string;
  colorBoton?: string;
  onConfirmar?: () => void;
  textoBotonSecundario?: string;
  colorBotonSecundario?: string;
  onCancelar?: () => void;
  children?: React.ReactNode; 
}

export default function ModalGenerico({
  abierto,
  onClose,
  icono,
  titulo,
  mensaje,
  textoBoton = "Aceptar",
  colorBoton = "#3E9956",
  onConfirmar,
  textoBotonSecundario = "Cancelar",
  colorBotonSecundario = "#929292",
  onCancelar,
  children, 
}: ModalGenericoProps) {
  return (
    <Drawer open={abierto} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="rounded-t-3xl p-6 text-center bg-white">
        <DrawerHeader className="flex flex-col items-center">
          {icono && <div className="mb-3">{icono}</div>}
          <DrawerTitle className="text-xl font-bold text-black">
            {titulo}
          </DrawerTitle>
          {mensaje && <p className="text-gray-600 mt-2">{mensaje}</p>}
        </DrawerHeader>

        {children && <div className="my-4">{children}</div>}

        <DrawerFooter className="mt-4">
            <div className="flex flex-col items-center gap-3 w-full">
            <Button
              style={{
                backgroundColor: colorBoton,
                color: "#fff",
              }}
              className="w-40 h-10 rounded-lg flex items-center justify-center"
              onClick={() => {
                onConfirmar?.();
                onClose();
              }}
            >
              {textoBoton}
            </Button>

            <Button
              style={{
                backgroundColor: colorBotonSecundario,
                color: "#fff",
              }}
              className="w-40 h-10 rounded-lg flex items-center justify-center"
              onClick={() => {
                onCancelar?.();
                onClose();
              }}
            >
              {textoBotonSecundario}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}