import { ReactNode } from "react";

type DescripcionDePaginaProps = {
    children: ReactNode,
};

export default function DescripcionDePagina({children}: DescripcionDePaginaProps) {
    return (
        <p className="text-xl italic">
            {children}
        </p>
    );
}