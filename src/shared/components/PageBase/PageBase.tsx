import DescripcionDePagina from "@components/Tipografia/DescripcionDePagina";
import TituloDePagina from "@components/Tipografia/TItuloDePagina";

type props = {
    children: React.ReactNode,
    className?: string,
    titulo?: string,
    subtitulo?: string,
}

export default function PageBase({ children, className, titulo, subtitulo }: props) {
    return (
        <div className={`w-full h-full p-2 sm:p-4 lg:p-8 ${className} overflow-y-auto`}>
            {(titulo || subtitulo) && (
                <div className="">
                    {titulo && (
                        <>
                            <TituloDePagina>{titulo}</TituloDePagina>
                            <br />
                        </>
                    )}
                    {subtitulo && (
                        <>
                            <DescripcionDePagina>{subtitulo}</DescripcionDePagina>
                            <br />
                        </>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}