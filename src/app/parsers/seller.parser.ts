import { ADJUDICATARIOS } from '../core';
import { DLContent, DLContainer } from '../mocks';

import {
  extractorIndices,
  indexStorageReducer,
  doRecursion,
} from '../utils/functions';
import {
  Seller,
  sellerCreator,
} from '../contracts/components/sellers-offers/sellers.model';

export const sellersParser = (input): Seller[] => {
  let sellersCollection: Seller[] = [];

  if (!input) {
    return sellersCollection;
  }

  let valores = [ADJUDICATARIOS];

  const indices = extractorIndices(input.dt, valores);
  const adjudicatariosIndex = indexStorageReducer(indices, 0);

  if (adjudicatariosIndex === -1) {
    return sellersCollection;
  }

  const adjudicatarios: DLContent = (input.dd[
    adjudicatariosIndex
  ] as DLContainer).dl[0];

  return doRecursion(adjudicatarios, sellerCreator);
};
