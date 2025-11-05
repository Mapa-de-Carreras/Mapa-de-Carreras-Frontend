import Carrera from "./carrera"
import Instituto from "./instituto"

type Asignatura = 

{
    titulo: string,
    instituto: Instituto,
    carrera: Carrera,
    codigo: string,
    anio: string,
    tipo: string,
    etapa: string,
    comision: string
}

export default Asignatura
