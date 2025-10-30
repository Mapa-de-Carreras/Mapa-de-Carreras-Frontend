import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";

interface ModalGenericoProps {
  abierto: boolean;
  onClose: () => void;
  icono?: React.ReactNode;
  titulo: string;
  mensaje?: string;
  textoBoton?: string;
  colorBoton?: string;
  onConfirmar?: () => void;
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
}: ModalGenericoProps) {
  return (
    <Drawer open={abierto} onOpenChange={onClose}>
      <DrawerContent className="rounded-t-3xl p-6 text-center bg-white">
        <DrawerHeader className="flex flex-col items-center">
          {icono && <div className="mb-3">{icono}</div>}
          <DrawerTitle className="text-xl font-bold text-black">
            {titulo}
          </DrawerTitle>
          {mensaje && <p className="text-gray-600 mt-2">{mensaje}</p>}
        </DrawerHeader>

        <DrawerFooter className="mt-4">
          <div className="w-full flex justify-center">
            <Button
              style={{ backgroundColor: colorBoton, color: "#fff" }}
              className="w-28 h-9 rounded-lg flex items-center justify-center gap-2"
              onClick={() => {
                onConfirmar?.();
                onClose();
              }}
            >
              {textoBoton}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
