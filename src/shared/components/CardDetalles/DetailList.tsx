// src/components/DetailCard/DetailList.tsx
import { ReactNode } from 'react';
import { CardTitle } from '@components/ui/card';

interface DetailListProps {
    label: string;
    children: ReactNode; // Los <li>...</li>
    scrollable?: boolean; // Para hacerlo con scroll
}

export function DetailList({ label, children, scrollable = false }: DetailListProps) {
    
    // Clases base de la lista
    let listClassName = "flex flex-col gap-y-2 mt-2";
    
    // Clases condicionales para el scroll
    if (scrollable) {
        listClassName += " max-h-[386px] overflow-y-auto snap-y snap-mandatory scroll-pt-0 pr-2";
    }

    return (
        <div>
            <CardTitle className="text-lg">{label}:</CardTitle>
            <ul className={listClassName}>
                {children}
            </ul>
        </div>
    );
}