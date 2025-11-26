type DetalleProps = {
    label: string,
    body?: string | null,
};

export default function DetalleUsuario({
    label,
    body = "",
}: DetalleProps) {
    return (
        <div className="flex gap-2">
            <h4 className="font-semibold">{label}</h4>
            <p>{body}</p>
        </div>
    );
}