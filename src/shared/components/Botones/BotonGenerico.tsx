import { Button } from "@components/ui/button";
import { useNavigate } from "react-router";

interface BotonGenericoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  texto?: string;
  color?: string;
  icono?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
}

export default function BotonGenerico({
  texto,
  color = "#000000",
  icono,
  to,
  onClick,
  type = "button",
  ...props
}: BotonGenericoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  return (
    <Button
      type={type} // usamos el type definido
      style={{ backgroundColor: color, color: "#fff" }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg"
      onClick={handleClick}
      {...props} // ahora acepta className, disabled, etc.
    >
      {icono && <span>{icono}</span>}
      {texto}
    </Button>
  );
}
