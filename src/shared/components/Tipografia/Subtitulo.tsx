import { ReactNode } from "react";

type SubtituloProps = {
    children: ReactNode,
};

export default function Subtitulo({ children }: SubtituloProps) {
    return (
        <p className="">{children}</p>
    );
}