import { OfertasRecibidas, ofertasRecibidasCreator } from '../models';
import { OFERTAS_RECIBIDAS, enumeracionDeListasRegexp } from '../core';
import {
  extractorIndices,
  normalizeString,
  indexStorageReducer,
  doRecursion,
} from '../utils';
import { DLContainer, DLContent } from '../mocks';

export const ofertasRecibidasParser = (input): OfertasRecibidas[] => {
  let defaultOfertasRecibidas: OfertasRecibidas[] = [];

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

  let ofertasRecursivas: OfertasRecibidas[] = doRecursion(
    ofertasRecibidas,
    ofertasRecibidasCreator
  );

  ofertasRecursivas.forEach((item, index) => {
    let medio = normalizeString(
      ofertasRecibidas.dt[index],
      enumeracionDeListasRegexp
    );

    defaultOfertasRecibidas.push({
      ...item,
      medio,
    });
  });

  return defaultOfertasRecibidas;
};
