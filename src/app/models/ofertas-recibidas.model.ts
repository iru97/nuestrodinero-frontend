import { DLContent } from "../mocks";
import { normalizeString } from "../utils";
import { enumeracionDeListasRegexp } from "../core";

export interface OfertasRecibidas {
  medio: string;
  numOfertas: number;
}

export const ofertasRecibidasVacio = (): OfertasRecibidas => ({
  medio: "",
  numOfertas: 0,
});

export const ofertasRecibidasCreator = (
  contenido: DLContent
): OfertasRecibidas => {
  if (!contenido) {
    return ofertasRecibidasVacio();
  }

  let value = {
    numOfertas: +normalizeString(contenido.dd[0] as string, /[\.]/g),
    medio: normalizeString(contenido.dt[0], enumeracionDeListasRegexp),
  };

  return value;
};
