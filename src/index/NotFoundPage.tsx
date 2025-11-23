import { useNavigate } from 'react-router';
// Asumo que usas Lucide React por el estilo de tu CSS, si no, puedes quitar el icono
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'; 

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--background)] p-4 text-[var(--foreground)]">
            
      
            <div className="
                relative flex w-full max-w-md flex-col items-center text-center
                rounded-[var(--radius-xl)] 
                border border-[var(--border)] 
                bg-[var(--card)] 
                p-10 
                shadow-2xl 
                transition-all
            ">
                

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)]/10 p-6 ring-1 ring-[var(--primary)]/20">
                    <div className="rounded-full bg-[var(--primary)]/20 p-4">
                        <FileQuestion className="h-12 w-12 text-[var(--primary)]" strokeWidth={1.5} />
                    </div>
                </div>

  
                <div className="mt-12 space-y-4">
                    <h1 className="text-6xl font-black tracking-tighter text-[var(--foreground)] opacity-90">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                        Página no encontrada
                    </h2>
                    <p className="text-[var(--muted-foreground)]">
                        Lo sentimos, la página que buscas no existe o ha sido movida. Verifica la URL o regresa al inicio.
                    </p>
                </div>

             
                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                    
                   
                    <button 
                        onClick={() => navigate(-1)}
                        className="
                            flex flex-1 items-center justify-center gap-2 
                            rounded-[var(--radius)] 
                            bg-[var(--color-regresar)] 
                            px-4 py-2.5 
                            text-sm font-medium text-white 
                            transition-colors 
                            hover:bg-[var(--color-regresar-hover)]
                            active:bg-[var(--color-regresar-active)]
                        "
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Regresar
                    </button>

                    <button 
                        onClick={() => navigate('/')}
                        className="
                            flex flex-1 items-center justify-center gap-2 
                            rounded-[var(--radius)] 
                            bg-[var(--primary)] 
                            px-4 py-2.5 
                            text-[var(--primary-foreground)] 
                            font-medium
                            shadow-sm
                            transition-opacity hover:opacity-90
                        "
                    >
                        <Home className="h-4 w-4" />
                        Ir al Inicio
                    </button>
                </div>
            </div>


            <p className="mt-8 text-xs text-[var(--muted-foreground)] opacity-50">
                Error Code: 404_NOT_FOUND
            </p>
        </div>
    );
}