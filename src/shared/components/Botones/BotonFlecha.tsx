import React from "react";

interface BotonFlechaProps {
  id?: string | number;
  onClick?: (id?: string | number) => void;
  direccion?: "izquierda" | "derecha"; // opcional
}

export default function BotonFlecha({
  id,
  onClick,
  direccion = "derecha",
}: BotonFlechaProps) {
  // Clase del icono según la dirección
  const iconClass =
    direccion === "izquierda"
      ? "icon-[codicon--arrow-left]"
      : "icon-[codicon--arrow-right]";

  return (
    <button
      onClick={() => onClick?.(id)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black border border-black hover:opacity-80 transition"
      aria-label={`Flecha ${direccion}`}
    >
      <span className={`${iconClass} text-2xl`} />
    </button>
  );
}
