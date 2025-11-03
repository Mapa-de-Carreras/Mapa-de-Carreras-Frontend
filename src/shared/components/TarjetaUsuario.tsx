import { Card, CardHeader, CardTitle } from "@components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import BotonGenerico from "./Botones/BotonGenerico";
import BotonBase from "./Botones/BotonBase";
import BotonDetalle from "./Botones/BotonDetalle";

interface TarjetaUsuarioProps {
  id: string | number;
  nombre: string;
  apellido: string;
  rol: string;
  activo?: string;
  avatarUrl?: string;
  onClickFlecha: (id: string | number) => void;
}

export default function TarjetaUsuario({
  id,
  nombre,
  apellido,
  rol,
  activo,
  avatarUrl,
  onClickFlecha,
}: TarjetaUsuarioProps) {
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl shadow-md bg-white p-4 border border-black">
      <CardHeader className="flex items-center justify-between gap-4">
        {/* Info del usuario */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {avatarUrl ? (
            <Avatar className="w-16 h-16 flex-shrink-0">
              <AvatarImage src={avatarUrl} alt={`${nombre} ${apellido}`} />
              <AvatarFallback>
                {nombre?.slice(0, 2).toUpperCase() || "NA"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white border"
              style={{ borderColor: "#000000" }}
            >
              <span
                className="icon-[mdi--account] text-black w-full h-full text-[48px] flex items-center justify-center"
                aria-label="Usuario"
              />
            </div>
          )}

          <div className="min-w-0">
            <CardTitle className="text-xl font-semibold break-words text-black">
              {`${nombre} ${apellido}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{rol}</p>
            {activo && (
            <p className="text-sm mt-1" style={{ color: "#999999" }}>
                Estado: {activo}
              </p>
            )}
          </div>
        </div>

        {/* Botón con icono de flecha */}
        <BotonDetalle onClick={() => onClickFlecha(id)}/>
      </CardHeader>
    </Card>
  );
}
