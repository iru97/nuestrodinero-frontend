import { DLContent } from "../mocks";
import { replaceCommaWithDots, normalizeString } from "../utils";
import { enumeracionDeListasRegexp, dotsCharsAndSpacesRegexp } from "../core";

export interface ValoresOfertas {
  valor: number;
  medio: string;
}

export const valorOfertasVacio = (): ValoresOfertas => ({
  medio: "",
  valor: 0,
});

export const valorOfertaCreator = (contenido: DLContent): ValoresOfertas => {
  if (!contenido) {
    return valorOfertasVacio();
  }

  let value = {
    valor: replaceCommaWithDots(
      normalizeString(contenido.dd[0] as string, dotsCharsAndSpacesRegexp)
    ),
    medio: normalizeString(contenido.dt[0], enumeracionDeListasRegexp),
  };

  return value;
};
