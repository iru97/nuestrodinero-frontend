import { DLContent, DLContainer } from '../mocks/contenido.mock';
import {
  offerValueCreator,
  OfferValues,
} from '../contracts/components/sellers-offers/offerValues.model';
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

export const offerValuesParser = (input: DLContent): OfferValues[] => {
  let defaultValoresOfertas: OfferValues[] = [];

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

  let valorOfertasRecursivas: OfferValues[] = doRecursion(
    valoresOfertas,
    offerValueCreator
  );

  valorOfertasRecursivas.forEach((item, index) => {
    let text = normalizeString(
      valoresOfertas.dt[index],
      enumeracionDeListasRegexp
    );

    defaultValoresOfertas.push({
      ...item,
      text,
    });
  });

  return defaultValoresOfertas;
};
