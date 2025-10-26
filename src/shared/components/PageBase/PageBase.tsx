type props = {
    children: React.ReactNode
}

export default function PageBase({ children } : props) {
    return (
        <div>
            {children}
        </div>
    );
}