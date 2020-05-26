import { DLContent, DLContainer } from '../mocks/contenido.mock';
import { valorOfertaCreator } from '../models/valores-ofertas.model';
import { ValoresOfertas } from '../models';
import {
  normalizeString,
  extractorIndices,
  indexStorageReducer,
  doRecursion,
} from '../utils/functions';
import {
  VALOR_OFERTAS,
  enumeracionDeListasRegexp,
} from '../core/const.api.model';

export const valorOfertaParser = (input: DLContent): ValoresOfertas[] => {
  let defaultValoresOfertas = [];

  if (!input) {
    return defaultValoresOfertas;
  }

  let valores = [VALOR_OFERTAS];

  const indices = extractorIndices(input.dt, valores);
  const valorOfertasIndex = indexStorageReducer(indices, 0);

  if (valorOfertasIndex === -1) {
    return defaultValoresOfertas;
  }

  const valoresOfertas: DLContent = (input.dd[valorOfertasIndex] as DLContainer)
    .dl[0];

  let valorOfertasRecursivas: ValoresOfertas[] = doRecursion(
    valoresOfertas,
    valorOfertaCreator
  );

  valorOfertasRecursivas.forEach((item, index) => {
    let medio = normalizeString(
      valoresOfertas.dt[index],
      enumeracionDeListasRegexp
    );

    defaultValoresOfertas.push({
      ...item,
      medio,
    });
  });

  return defaultValoresOfertas;
};
