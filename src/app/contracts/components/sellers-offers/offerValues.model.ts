import { DLContent } from '../../../mocks';
import { replaceCommaWithDots, normalizeString } from '../../../utils';
import {
  enumeracionDeListasRegexp,
  dotsCharsAndSpacesRegexp,
} from '../../../core';

export interface OfferValues {
  cost: number;
  text: string;
}

export const emptyOfferValue = (): OfferValues => ({
  text: '',
  cost: 0,
});

export const offerValueCreator = (contenido: DLContent): OfferValues => {
  if (!contenido) {
    return emptyOfferValue();
  }

  let value = {
    cost: replaceCommaWithDots(
      normalizeString(contenido.dd[0] as string, dotsCharsAndSpacesRegexp)
    ),
    text: normalizeString(contenido.dt[0], enumeracionDeListasRegexp),
  };

  return value;
};
