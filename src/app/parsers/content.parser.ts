import { DLContent } from '../mocks';
import { sellersParser } from './seller.parser';
import { offerValuesParser } from './offer-values.parser';
import { offersReceivedParser } from './offers-received.parser';
import { stringCollectionParser } from './string-collection.parser';
import { CODIGO_CPV, DESCRIPCION_LICITACION, FECHA_ANUNCIO } from '../core';
import { contractingAuthorityParser } from './contracting-authority.parser';
import {
  Content,
  emptyContent,
} from '../contracts/components/contract/content.model';
import {
  indexStorageReducer,
  extractorIndices,
  getValorSeguro,
} from '../utils';

export const contentParser = (input: DLContent): Content => {
  let defaultContenido = emptyContent();
  if (!input) {
    return defaultContenido;
  }

  let valores = [CODIGO_CPV, DESCRIPCION_LICITACION, FECHA_ANUNCIO];

  const indices = extractorIndices(input.dt, valores);
  const detalleIndex = indexStorageReducer(indices, 0);
  const descripcionIndex = indexStorageReducer(indices, 1);
  const fechaIndex = indexStorageReducer(indices, 2);

  const contractingAuthority = contractingAuthorityParser(input);
  const offersReceived = offersReceivedParser(input);
  const sellers = sellersParser(input);
  const details = stringCollectionParser(input, detalleIndex);
  const sellingDescription = stringCollectionParser(input, descripcionIndex);
  const offerValues = offerValuesParser(input);
  const date = getValorSeguro(input.dd, fechaIndex);

  return {
    contractingAuthority,
    offersReceived,
    sellers,
    details,
    sellingDescription,
    offerValues,
    date,
  };
};
