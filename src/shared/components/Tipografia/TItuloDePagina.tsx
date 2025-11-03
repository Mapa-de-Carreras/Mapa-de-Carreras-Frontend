import { ReactNode } from "react";

type TituloDePaginaProps = {
    children: ReactNode
};

export default function TituloDePagina({children}: TituloDePaginaProps) {
    return (
        <h2 className="text-3xl sm:text-4xl font-bold">{children}</h2>
    );
}