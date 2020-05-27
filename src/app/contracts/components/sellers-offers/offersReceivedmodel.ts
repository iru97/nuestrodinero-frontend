import { DLContent } from '../../../mocks';
import { normalizeString } from '../../../utils';
import { enumeracionDeListasRegexp } from '../../../core';

export interface OffersReceived {
  text: string;
  totalOffers: number;
}

export const emptyOffersReceived = (): OffersReceived => ({
  text: '',
  totalOffers: 0,
});

export const offersReceivedCreator = (contenido: DLContent): OffersReceived => {
  if (!contenido) {
    return emptyOffersReceived();
  }

  let value = {
    totalOffers: +normalizeString(contenido.dd[0] as string, /[\.]/g),
    text: normalizeString(contenido.dt[0], enumeracionDeListasRegexp),
  };

  return value;
};
