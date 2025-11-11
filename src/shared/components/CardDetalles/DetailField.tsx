// src/components/DetailCard/DetailField.tsx
import { ReactNode } from 'react';
import { CardTitle, CardDescription } from '@components/ui/card';

interface DetailFieldProps {
    label: string;
    children: ReactNode; // El valor
}

export function DetailField({ label, children }: DetailFieldProps) {
    return (
        <div className="flex flex-row items-baseline gap-x-2">
            <CardTitle className="text-lg">{label}:</CardTitle>
            <CardDescription className="text-lg">{children}</CardDescription>
        </div>
    );
}