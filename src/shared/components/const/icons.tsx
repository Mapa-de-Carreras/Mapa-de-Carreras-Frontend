import { cn } from '@lib/utils'; // O una utilidad similar para fusionar clases

// 1. Tu objeto de iconos (constante)
export const icons = {
    homeIcon: "icon-[material-symbols--home]",
    adminIcon: "icon-[eos-icons--admin-outlined]",
    instituosIcon: "icon-[cil--institution]",
    docentesIcon: "icon-[hugeicons--teacher]",
    designacionesIcon: "icon-[material-symbols--pending-actions]",
    estadisticasIcon: "icon-[akar-icons--statistic-up]",
    agregar: 'icon-[mdi--plus]',
    guardar: 'icon-[mdi--content-save]',
    cancelar: 'icon-[mdi--close]',
    eliminar: 'icon-[mdi--trash-can]',
    editar: 'icon-[ph--note-pencil]',
    filtro: '',
    default: '',
} as const; // 'as const' es clave para que TS entienda las claves exactas

// 2. Definimos los tipos de props para el componente
interface IconProps {
    // 'type' debe ser una de las CLAVES del objeto 'icons'
    type: keyof typeof icons;
    
    // 'className' para pasar estilos extra (tamaño, color, etc.)
    className?: string;
}

// 3. Tu componente (renombrado a 'Icon' por claridad)
export default function Icon({ type, className }: IconProps) {
    
    // Busca la clase del icono en el objeto
    const iconClass = icons[type];

    // Si el 'type' es 'filtro' o 'default', o no se encuentra, no renderiza nada.
    if (!iconClass) {
        return null;
    }

    // Fusiona la clase base del icono con cualquier clase extra
    const finalClassName = cn(iconClass, className);

    return <span className={finalClassName} />;
}