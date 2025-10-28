import { Button } from "@components/ui/button";
import { useNavigate } from "react-router";

interface BotonGenericoProps {
  texto: string;
  color?: string; 
  icono?: React.ReactNode; 
  to?: string;
  onClick?: () => void; // <-- agregar
}

export default function BotonGenerico({
  texto,
  color = "#000000",
  icono,
  to,
  onClick,
  ...props
}: BotonGenericoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); // ejecuta la función que pase el usuario
    if (to) navigate(to);   // navega si se definió la ruta
  };

  return (
    <Button
      style={{ backgroundColor: color, color: "#fff" }} 
      className="flex items-center gap-2 px-4 py-2 rounded-lg"
      onClick={handleClick}
      {...props}
    >
      {icono && <span>{icono}</span>}
      {texto}
    </Button>
  );
}
