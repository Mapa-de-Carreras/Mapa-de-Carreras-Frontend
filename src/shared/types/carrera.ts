import Instituto from "./instituto";

type Carrera = {
    codigo: number,
    instituto: Instituto,
    titulo: string,
    coordinador: string,
    estado: boolean,
};

export default Carrera;