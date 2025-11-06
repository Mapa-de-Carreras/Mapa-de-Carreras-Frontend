import Carrera from "@globalTypes/carrera";

const carreras: Carrera[] = [
    {
        codigo: 0,
        instituto: {codigo: "IDEI", nombre: "Instituto de Desarrollo Económico e Innovación"},
        titulo: "Licenciatura en Sistemas",
        coordinador: "Ezequiel Moyano",
        estado: true,
    },
    {
        codigo: 1,
        instituto: {codigo: "IDEI", nombre: "Instituto de Desarrollo Económico e Innovación"},
        titulo: "Tecnicatura en Análisis de Sistemas",
        coordinador: "Ezequiel Moyano",
        estado: true,
    },
    {
        codigo: 2,
        instituto: {codigo: "IDEI", nombre: "Instituto de Desarrollo Económico e Innovación"},
        titulo: "Tecnicatura Universitaria en Desarrollo de Aplicaciones",
        coordinador: "Ezequiel Moyano",
        estado: true,
    },
];

export default carreras;