//Es para qeu los componenetes de ui.shadcn sean customisables, junta todas las propiedades className.
//Realiza una mezcla y evalua que pripiedad es la ganadora (p-4 le gana a p-2) y se queda con ellas. 👍🏻
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
