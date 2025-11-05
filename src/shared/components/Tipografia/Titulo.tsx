import { ReactNode } from "react";

type TituloProps = {
    children: ReactNode,
};

export default function Titulo({ children }: TituloProps) {
    return (
        <h3 className="font-semibold text-xl">{children}</h3>
    );
}