import BotonBase from "@components/Botones/BotonBase"
import Titulo from "@components/Tipografia/Titulo";
import { log } from "console";
import { ReactNode } from "react";

type ListadoProps<TOrden, TData> = {
    data: TData[],
    dataRender: (data: TData) => ReactNode,
    onClick?: () => void,
    orderData?: TOrden[],
    orderKey?: (orderData: TOrden) => string,
    compareTo?: (orderData: TOrden, data: TData) => boolean,
    mensajeSinDatos?: string,
};

export default function Listado<TOrden, TData>({
    orderData = [],
    data,
    onClick,
    orderKey,
    dataRender,
    compareTo,
    mensajeSinDatos = "No hay datos disponibles",
}: ListadoProps<TOrden, TData>) {
	return (
		<div className="flex flex-col">
            {onClick && <BotonBase variant="agregar" onClick={onClick} />}
            {(orderData.length > 0 && orderKey && compareTo) ? (
                orderData.map((order) => {
                    console.log("Data: ", data);
                    
                    const dataFiltered = data.filter((element) => compareTo(order, element));
                    return (
                        <div key={orderKey(order)}>
                            <h2 className="py-4 text-2xl font-semibold">{orderKey(order)}</h2>
                            {dataFiltered.length ? (
                                <div className="flex flex-col gap-4">
                                    {dataFiltered.map((data) => (dataRender(data)))}
                                </div>
                            ) : (
                                <div>
                                    <Titulo>{mensajeSinDatos}</Titulo>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col gap-4">
                    {data.map((data) => dataRender(data))}
                </div>
            )}
		</div>
	);
}
