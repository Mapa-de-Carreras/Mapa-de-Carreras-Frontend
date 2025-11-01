export const NAVBAR_ITEMS = [
  {
    title: "Administración",
    icon: "icon-[eos-icons--admin-outlined]",
    id: "item-1",
    subtitles: ["Usuarios", "Roles"],
  },
  {
    title: "Académica",
    icon: "icon-[cil--institution]",
    id: "item-2",
    subtitles: ["Institutos", "Carreras", "Asignaturas", "Planes de Estudio"],
  },
  {
    title: "Docentes",
    icon: "icon-[hugeicons--teacher]",
    id: "item-3",
    subtitles: ["Gestionar Docentes", "Parámetros de Régimen"],
  },
  {
    title: "Designaciones",
    icon: "icon-[material-symbols--pending-actions]",
    id: "item-4",
    subtitles: ["Gestionar Designaciones"],
  },
  {
    title: "Estadísticas",
    icon: "icon-[akar-icons--statistic-up]",
    id: "item-5",
    subtitles: ["Estadísticas", "Reportes"],
  },
];

export type ItemProp = (typeof NAVBAR_ITEMS)[number];