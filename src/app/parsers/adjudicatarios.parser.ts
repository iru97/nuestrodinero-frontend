import { ADJUDICATARIOS } from '../core';
import { DLContent, DLContainer } from '../mocks';
import { Adjudicatarios, adjudicatarioCreator } from '../models';
import {
  extractorIndices,
  indexStorageReducer,
  doRecursion,
} from '../utils/functions';

export const adjudicatariosParser = (input): Adjudicatarios[] => {
  let defaultAdjudicatarios: Adjudicatarios[] = [];

  if (!input) {
    return defaultAdjudicatarios;
  }

  let valores = [ADJUDICATARIOS];

  const indices = extractorIndices(input.dt, valores);
  const adjudicatariosIndex = indexStorageReducer(indices, 0);

  if (adjudicatariosIndex === -1) {
    return defaultAdjudicatarios;
  }

  const adjudicatarios: DLContent = (input.dd[
    adjudicatariosIndex
  ] as DLContainer).dl[0];

  return doRecursion(adjudicatarios, adjudicatarioCreator);
};
