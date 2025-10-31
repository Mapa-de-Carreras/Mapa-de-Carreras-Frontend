interface PantallaCargaProps {
  mensaje?: string;
}

export default function PantallaCarga({ mensaje = "Cargando..." }: PantallaCargaProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
      <span className="icon-[line-md--loading-twotone-loop] text-6xl text-black animate-spin mb-3" />
      <p className="text-black text-lg font-medium">{mensaje}</p>
    </div>
  );
}
