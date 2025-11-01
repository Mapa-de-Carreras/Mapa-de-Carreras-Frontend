type props = {
    children: React.ReactNode,
    className?: string
}

export default function PageBase({ children, className } : props) {
    return (
        <div className={`w-full h-full p-2 ${className} overflow-y-auto`}>
            {children}
        </div>
    );
}