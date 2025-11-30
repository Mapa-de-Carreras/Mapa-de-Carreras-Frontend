import React, { useEffect, ReactNode } from "react";
import { useFormContext, useWatch, Control } from "react-hook-form";

interface ObserverFieldProps<T> {
    nombre: string;
    setState: React.Dispatch<React.SetStateAction<T>>;
    defaultValue?: T;
    children: ReactNode;
}

export function ObserverField<T>({ 
    nombre, 
    setState, 
    defaultValue, 
    children 
}: ObserverFieldProps<T>): React.ReactNode {
    const { control } = useFormContext();

    const value = useWatch({ 
        name: nombre, 
        control: control as Control<any>,
        defaultValue 
    }) as T;

    useEffect(() => {
        setState(value);
    }, [value, setState]);

    return children;
}