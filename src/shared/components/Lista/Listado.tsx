import BotonBase from "@components/Botones/BotonBase";
import Titulo from "@components/Tipografia/Titulo";
import { ReactNode, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@components/Providers/ModalProvider";

const searchSchema = z.object({
    search: z.string().optional(),
});
type SearchFormValues = z.infer<typeof searchSchema>;

export type FilterOption<TData> = {
    label: string;
    key: keyof TData;
    value: any;
};

type ListadoProps<TOrden, TData> = {
    data: TData[];
    dataRender: (data: TData) => ReactNode;
    onClick?: () => void;
    orderData?: TOrden[];
    orderKey?: (orderData: TOrden) => string;
    compareTo?: (orderData: TOrden, data: TData) => boolean;
    mensajeSinDatos?: string;
    // Buscador
    enableSearch?: boolean;
    searchFields?: string[]; // Cambiado a string[] para permitir rutas con puntos
    searchPlaceholder?: string;
    // Filtros
    enableFilters?: boolean;
    filterOptions?: FilterOption<TData>[]; 
    filterModalTitle?: string;
};

const FiltersModalContent = <TData,>({ 
    options, 
    initialSelection, 
    onSelectionChange 
}: { 
    options: FilterOption<TData>[], 
    initialSelection: number[], 
    onSelectionChange: (newSelection: number[]) => void 
}) => {
    const [localSelection, setLocalSelection] = useState<number[]>(initialSelection);

    const toggleFilter = (index: number) => {
        setLocalSelection(prev => {
            const exists = prev.includes(index);
            const newSelection = exists 
                ? prev.filter(i => i !== index)
                : [...prev, index];
            
            onSelectionChange(newSelection);
            return newSelection;
        });
    };

    return (
        <div className="flex flex-col gap-3 py-2">
            {options.map((option, index) => {
                const isChecked = localSelection.includes(index);
                return (
                    <label 
                        key={`${String(option.key)}-${index}`} 
                        className="flex items-center gap-3 p-3 rounded-md border cursor-pointer opacity-80 hover:opacity-100"
                    >
                        <input 
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                            checked={isChecked}
                            onChange={() => toggleFilter(index)}
                        />
                        <span className={`text-sm font-medium ${isChecked ? 'opacity-100 font-semibold' : 'opacity-80'}`}>
                            {option.label}
                        </span>
                    </label>
                );
            })}
            {options.length === 0 && <p className="opacity-60 italic">No hay filtros disponibles.</p>}
        </div>
    );
};

export default function Listado<TOrden, TData>({
    orderData = [],
    data,
    onClick,
    orderKey,
    dataRender,
    compareTo,
    mensajeSinDatos = "No hay datos disponibles",
    enableSearch = false,
    searchFields = [],
    searchPlaceholder = "Buscar...",
    enableFilters = false, 
    filterOptions = [],
    filterModalTitle = "Filtrar resultados"
}: ListadoProps<TOrden, TData>) {

    const { showModal } = useModal();
    const [appliedFilterIndices, setAppliedFilterIndices] = useState<number[]>([]);
    const tempFilterRef = useRef<number[]>([]);

    const { register, watch } = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: { search: "" }
    });
    const searchTerm = watch("search") || "";

    const handleOpenFilters = () => {
        tempFilterRef.current = appliedFilterIndices;

        showModal({
            title: filterModalTitle,
            content: (
                <FiltersModalContent 
                    options={filterOptions}
                    initialSelection={appliedFilterIndices}
                    onSelectionChange={(val) => { tempFilterRef.current = val; }}
                />
            ),
            buttons: [
                {
                    variant: 'aceptar',
                    onClick: () => setAppliedFilterIndices(tempFilterRef.current)
                },
                {
                    variant: 'cancelar', 
                    onClick: () => {
                        setAppliedFilterIndices([]);
                        tempFilterRef.current = [];
                    } 
                }
            ]
        });
    };

    const filteredData = useMemo(() => {
        let result = data;

        if (enableFilters && appliedFilterIndices.length > 0) {
            result = result.filter(item => {
                return appliedFilterIndices.some(index => {
                    const option = filterOptions[index];
                    // Comparación segura para strings (ignora mayúsculas/minúsculas en el filtro)
                    if (typeof item[option.key] === 'string' && typeof option.value === 'string') {
                         return String(item[option.key]).toLowerCase() === String(option.value).toLowerCase();
                    }
                    return item[option.key] === option.value;
                });
            });
        }

      
        if (enableSearch && searchTerm.trim() && searchFields.length > 0) {
            const term = searchTerm.toLowerCase();

 
            const getNestedValue = (obj: any, path: string) => {
                return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
            };

            result = result.filter((item) => {
                return searchFields.some((field) => {
                    const value = getNestedValue(item, field);
                    if (value == null) return false;
                    return String(value).toLowerCase().includes(term);
                });
            });
        }

        return result;
    }, [data, searchTerm, enableSearch, searchFields, appliedFilterIndices, filterOptions, enableFilters]);

    return (
        <div className="flex flex-col gap-2 items-start w-full px-2">
            <div className="sticky top-0 z-2 bg-background flex w-full justify-between items-center gap-2 flex-wrap sm:flex-nowrap py-2">

                <div className="flex gap-2 items-center shrink-0">
                    {onClick && <BotonBase variant="agregar" onClick={onClick} />}
                    
                    {enableFilters && filterOptions.length > 0 && (
                        <BotonBase 
                            variant="filtro" 
                            onClick={handleOpenFilters}
                        >
                            {appliedFilterIndices.length > 0 ? `Filtros (${appliedFilterIndices.length})` : "Filtrar"}
                        </BotonBase>
                    )}
                </div>

                {/* Buscador a la derecha */}
                {enableSearch && (
                    <div className="w-full sm:max-w-xs relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-50 pointer-events-none">
                            <span className="icon-[lucide--search] text-lg" />
                        </span>
                        <input
                            {...register("search")}
                            type="text"
                            placeholder={searchPlaceholder}
                            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-current bg-transparent"
                        />
                    </div>
                )}
            </div>

            {(orderData.length > 0 && orderKey && compareTo) ? (
                orderData.map((order) => {
                    const dataFiltered = filteredData.filter((element) => compareTo(order, element));
                    
                    const hasActiveFilters = enableFilters && appliedFilterIndices.length > 0;
                    if ((enableSearch || hasActiveFilters) && dataFiltered.length === 0) return null;

                    return (
                        <div key={orderKey(order)} className="w-full">
                            <h2 className="py-4 text-2xl font-semibold">{orderKey(order)}</h2>
                            {dataFiltered.length ? (
                                <div className="flex flex-col gap-4">
                                    {dataFiltered.map((data) => (dataRender(data)))}
                                </div>
                            ) : (
                                <div><Titulo>{mensajeSinDatos}</Titulo></div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    {filteredData.length > 0 ? (
                        filteredData.map((data) => dataRender(data))
                    ) : (
                        <div className="py-4 opacity-70 text-center w-full">
                            <Titulo>
                                {(searchTerm || (enableFilters && appliedFilterIndices.length > 0))
                                    ? "No hay resultados con estos filtros." 
                                    : mensajeSinDatos}
                            </Titulo>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}