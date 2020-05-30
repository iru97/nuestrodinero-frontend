import { Seller } from 'src/app/contracts/components/sellers-offers/sellers.model';
import { OfferValues } from 'src/app/contracts/components/sellers-offers/offerValues.model';

export interface Stats {
  label: string;
  value: number;
}

export type PymeStats = Stats & { numberOfCompanies: number };
export type SellerOffer = Seller & OfferValues;
