import { OffersReceived } from '../sellers-offers/offersReceivedmodel';
import {
  ContractingAuthority,
  emptyContractingAuthority,
} from '../contracting-authority/contracting-authority.model';
import { Seller } from '../sellers-offers/sellers.model';
import { OfferValues } from '../sellers-offers/offerValues.model';
import { Description, Details } from '../description/description.types';

export interface Content {
  contractAuthority: ContractingAuthority;
  details: Details;
  description: Description;
  offersReceived: OffersReceived[];
  awardees: Seller[];
  offerValues: OfferValues[];
  date: string;
}

export const emptyContent = (): Content => ({
  contractAuthority: emptyContractingAuthority(),
  details: [],
  description: [],
  offersReceived: [],
  awardees: [],
  offerValues: [],
  date: '',
});
