import PageBase from "@components/PageBase/PageBase";
import useAuth from "@components/hooks/useAuth";
import { useTheme } from "@components/hooks/useTheme";

const carreras = [
    {
        instituto: "IDEI",
        titulo: "Licenciatura en Sistemas",
        coordinador: "Ezequiel Moyano",
    },
    {
        instituto: "IDEI",
        titulo: "Tecnicatura en Análisis de Sistemas",
        coordinador: "Ezequiel Moyano",
    },
    {
        instituto: "IDEI",
        titulo: "Tecnicatura Universitaria en Desarrollo de Aplicaciones",
        coordinador: "Ezequiel Moyano",
    },
    {
        instituto: "ICPA",
        titulo: "Tecnicatura Universitaria en Desarrollo de Aplicaciones",
        coordinador: "Ezequiel Moyano",
    },
];

const institutos = ["IDEI", "ICPA"];

export default function DegreePage() {
    const { setTheme } = useTheme();
    const { refresh } = useAuth();
    
    const token = localStorage.getItem("refresh_token");
    
    if (token) refresh(token);

    return (
        <PageBase>
            <h2>Página de Carreras</h2>
            {(institutos && institutos.length) && institutos.map((instituto) => (
                <div key={instituto}>
                    <h4>{instituto}</h4>
                </div>
            ))}
        </PageBase>
    )
}