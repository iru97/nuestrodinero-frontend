import { DLContent, DLContainer } from '../mocks';
import {
  PoderAdjudicador,
  poderAdjudicadorVacio,
  valorPoderAdjudicadorCreator,
  valorTipoPoderCreator,
} from '../models';
import { extractorIndices, indexStorageReducer } from '../utils';
import { PODER_ADJUDICADOR, PODER_TIPO } from '../core';

export const poderAdjudicadorParser = (input: DLContent): PoderAdjudicador => {
  let defaultPoderAdjudicador = poderAdjudicadorVacio();

  if (!input) {
    return defaultPoderAdjudicador;
  }

  let valores = [PODER_ADJUDICADOR, PODER_TIPO];

  const indices = extractorIndices(input.dt, valores);

  const poderAdjudicadorIndex = indexStorageReducer(indices, 0);
  const tipoPoderIndex = indexStorageReducer(indices, 1);

  if (poderAdjudicadorIndex !== -1) {
    const valorPoderAdjudicador = (input.dd[
      poderAdjudicadorIndex
    ] as DLContainer).dl[0];

    defaultPoderAdjudicador = {
      ...defaultPoderAdjudicador,
      ...valorPoderAdjudicadorCreator(valorPoderAdjudicador),
    };
  }

  if (tipoPoderIndex !== -1) {
    const valortipoPoder = (input.dd[tipoPoderIndex] as DLContainer).dl[0];

    defaultPoderAdjudicador = {
      ...defaultPoderAdjudicador,
      ...valorTipoPoderCreator(valortipoPoder),
    };
  }

  return defaultPoderAdjudicador;
};
