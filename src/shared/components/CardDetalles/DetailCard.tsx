// src/components/DetailCard/DetailCard.tsx
import { ReactNode } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@components/ui/card';
import Titulo from '@components/Tipografia/Titulo'; // Asumo la ruta

interface DetailCardProps {
    icono: ReactNode;      // El <span className="icon-[...]"/>
    titulo: string;        // Ej. "IDEI - Detalles"
    descripcion: string; // Ej. "Instituto de..."
    actions: ReactNode;    // Los botones de acción (Editar, Eliminar)
    children: ReactNode;   // El contenido (los campos)
}

export function DetailCard({ 
    icono, 
    titulo, 
    descripcion, 
    actions, 
    children 
}: DetailCardProps) {
    return (
        <Card className="bg-table-background">
            <CardHeader className="justify-center text-center">
                <CardTitle>
                    <div className="flex flex-row justify-center gap-5 items-center">
                        {icono}
                        <Titulo>{titulo}</Titulo>
                    </div>
                </CardTitle>

                <CardDescription>{descripcion}</CardDescription>


            
            </CardHeader>
            <div className="flex flex-row flex-wrap justify-evenly items-center py-">
                {actions}
            </div>

            <CardContent className="flex flex-col gap-y-3 pt-6 py-4">
                {children}
            </CardContent>
        </Card>
    );
}