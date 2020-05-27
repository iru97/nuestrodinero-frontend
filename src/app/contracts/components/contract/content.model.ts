import { OffersReceived } from '../sellers-offers/offersReceivedmodel';
import {
  ContractingAuthority,
  emptyContractingAuthority,
} from '../contracting-authority/contracting-authority.model';
import { Seller } from '../sellers-offers/sellers.model';
import { OfferValues } from '../sellers-offers/offerValues.model';

export interface Content {
  contractingAuthority: ContractingAuthority;
  details: string[];
  sellingDescription: string[];
  offersReceived: OffersReceived[];
  sellers: Seller[];
  offerValues: OfferValues[];
  date: string;
}

export const emptyContent = (): Content => ({
  contractingAuthority: emptyContractingAuthority(),
  details: [],
  sellingDescription: [],
  offersReceived: [],
  sellers: [],
  offerValues: [],
  date: '',
});
