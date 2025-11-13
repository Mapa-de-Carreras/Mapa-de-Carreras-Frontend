type MarcoFormularioProps = {
    children: React.ReactNode
    className?: string
}

export default function MarcoFormulario({ children, className }: MarcoFormularioProps) {
    return (
        <div className={`flex flex-col gap-4 ${className ?? ''}`}>
            {children}
        </div>
    );
}
