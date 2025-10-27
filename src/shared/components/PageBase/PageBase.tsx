type props = {
    children: React.ReactNode
}

export default function PageBase({ children } : props) {
    return (
        <div className="p-2">
            {children}
        </div>
    );
}