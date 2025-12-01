import { useState } from "react";
import PageBase from "@components/PageBase/PageBase";
import { Input } from "@components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@components/ui/select";
import BotonBase from "@components/Botones/BotonBase";
import { downloadFromApiUrl } from "@components/lib/download";
import { useNavigate } from "react-router";

export default function Reportes() {
    const [tipo, setTipo] = useState<string>("DESIGNACIONES"); // DESIGNACIONES | HORAS | MODALIDAD | DEDICACION
    const [desde, setDesde] = useState<string>("");
    const [hasta, setHasta] = useState<string>("");
    const [formato, setFormato] = useState<string>("csv");
    const [loading, setLoading] = useState<boolean>(false);

    const token = localStorage.getItem("access_token") || undefined;
    const navigate = useNavigate();

    function buildApiBase(): string {
        const rawApi = (import.meta as any).env?.VITE_API_URL;
        if (rawApi && rawApi.trim() !== "") {
            return rawApi.replace(/\/+$/, "");
        }
        const viteBase = (import.meta as any).env?.VITE_BASE ?? "/";
        const baseTrim = viteBase.replace(/\/+$/, "");
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const basePart = baseTrim === "" || baseTrim === "/" ? "" : baseTrim;
        // normaliza barras duplicadas para no romper "https://"
        return `${origin}${basePart}/api`.replace(/\/+/g, "/").replace(":/", "://");
    }

    const API_BASE = buildApiBase();

    const handleExport = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            params.append("tipo", tipo.toUpperCase());
            params.append("formato", formato);

            if (desde) params.append("desde", desde);
            if (hasta) params.append("hasta", hasta);

            const url = `${API_BASE}/estadisticas/exportar/?${params.toString()}`;

            await downloadFromApiUrl(
                url,
                `reporte_${tipo.toLowerCase()}_${new Date().toISOString().slice(0, 10)}`,
                token
            );
        } catch (err: any) {
            console.error(err);
            alert("Error al generar el reporte: " + (err?.message ?? String(err)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageBase titulo="Reportes" subtitulo="Generá y descargá reportes (designaciones, docentes, carreras, horas). Filtra por fechas y formato.">
            <div className="mb-6">

                <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Tipo</label>
                        <Select onValueChange={(v) => setTipo(v)} value={tipo}>
                            <SelectTrigger>
                                <SelectValue>{tipo}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DESIGNACIONES">Designaciones</SelectItem>
                                <SelectItem value="HORAS">Horas por Docente</SelectItem>
                                <SelectItem value="MODALIDAD">Docentes por Modalidad</SelectItem>
                                <SelectItem value="DEDICACION">Docentes por Dedicación</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Desde</label>
                        <Input type="date" value={desde} onChange={(e) => setDesde((e.target as HTMLInputElement).value)} />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Hasta</label>
                        <Input type="date" value={hasta} onChange={(e) => setHasta((e.target as HTMLInputElement).value)} />
                    </div>

                    <div className="md:col-span-2 flex gap-2 justify-end items-center">
                        <div>
                            <label className="block text-sm font-medium mb-1">Formato</label>
                            <Select onValueChange={(v) => setFormato(v)} value={formato}>
                                <SelectTrigger>
                                    <SelectValue>{formato.toUpperCase()}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="csv">CSV</SelectItem>
                                    <SelectItem value="xlsx">XLSX</SelectItem>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="pt-6">
                            <BotonBase
                                variant="exportar"
                                onClick={handleExport}
                                isLoading={loading}
                                className="whitespace-nowrap"
                                aria-label="Exportar reporte"
                            >
                                {loading ? "Generando..." : "Exportar"}
                            </BotonBase>
                        </div>
                    </div>
                </div>
            </div>

        </PageBase>
    );
}
