/* eslint-disable react-refresh/only-export-components */
import Ventana, { TipoVentana } from "@components/Ventanas/Ventana";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type VentanaOptions = {
    tipoVentana: TipoVentana
    icono?: string
    titulo?: string
    descripcion?: string
    cargando?: boolean
    content?: ReactNode
    onConfirm?: () => void,
    onClose: () => void,
};

type VentanaContextProps = {
    abierto: boolean
    abrirVentana: (_opciones: VentanaOptions) => void,
    cerrarVentana: () => void,
    ventanaContent: VentanaOptions | null,
};

const initialState = {
    abierto: false,
    abrirVentana: (_opciones?: VentanaOptions) => {},
    cerrarVentana: () => {},
    ventanaContent: null,
};

const VentanaContext = createContext<VentanaContextProps>(initialState);

export function useVentana(): VentanaContextProps {
    const context = useContext(VentanaContext);
    if (!context) {
        throw new Error('useVentana debe ser usado dentro de un VentanaProvider');
    }
    return context;
}

type VentanaProviderProps = {
    children: ReactNode
};

export default function VentanaProvider({
    children,
}: VentanaProviderProps) {
    const [ventanaContent, setVentanaContent] = useState<VentanaOptions | null>(null);
    const [abierto, setAbierto] = useState(false);

    const abrirVentana = (opciones?: VentanaOptions) => {
        if (opciones) {
            setVentanaContent(opciones);
        };
        setAbierto(true);
    };

    const cerrarVentana = () => {
        setAbierto(false);
    };

    const contextValue = useMemo(() => ({
        abierto,
        abrirVentana,
        cerrarVentana,
        ventanaContent,
    }), [abierto, ventanaContent]);
    
    return (
        <VentanaContext.Provider value={contextValue}>
            {children}
            <Ventana
                abierto={abierto}
                onClose={cerrarVentana}
                cargando={ventanaContent?.cargando}
                onConfirm={ventanaContent?.onConfirm || (() => {})}
                tipo={ventanaContent?.tipoVentana}
                titulo={ventanaContent?.titulo}
                descripcion={ventanaContent?.descripcion}
                icono={ventanaContent?.icono}
            >{ventanaContent?.content}</Ventana>
        </VentanaContext.Provider>
    );
}
