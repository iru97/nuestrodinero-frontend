import { DLContainer, DLContent } from '../mocks';
import { OFERTAS_RECIBIDAS, enumeracionDeListasRegexp } from '../core';
import {
  extractorIndices,
  normalizeString,
  indexStorageReducer,
  doRecursion,
} from '../utils';
import {
  OffersReceived,
  offersReceivedCreator,
} from '../contracts/components/sellers-offers/offersReceivedmodel';

export const offersReceivedParser = (input): OffersReceived[] => {
  let defaultOfertasRecibidas: OffersReceived[] = [];

  if (!input) {
    return defaultOfertasRecibidas;
  }

  let valores = [OFERTAS_RECIBIDAS];

  const indices = extractorIndices(input.dt, valores);
  const ofertasRecibidasIndex = indexStorageReducer(indices, 0);

  if (ofertasRecibidasIndex === -1) {
    return defaultOfertasRecibidas;
  }

  const ofertasRecibidas: DLContent = (input.dd[
    ofertasRecibidasIndex
  ] as DLContainer).dl[0];

  let ofertasRecursivas: OffersReceived[] = doRecursion(
    ofertasRecibidas,
    offersReceivedCreator
  );

  ofertasRecursivas.forEach((item, index) => {
    let text = normalizeString(
      ofertasRecibidas.dt[index],
      enumeracionDeListasRegexp
    );

    defaultOfertasRecibidas.push({
      ...item,
      text,
    });
  });

  return defaultOfertasRecibidas;
};
