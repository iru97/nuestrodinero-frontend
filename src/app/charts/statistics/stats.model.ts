import { Seller } from 'src/app/contracts/components/sellers-offers/sellers.model';
import { OfferValues } from 'src/app/contracts/components/sellers-offers/offerValues.model';
import { ContractingAuthority } from 'src/app/contracts/components/contracting-authority/contracting-authority.model';

export interface Stats {
  label: string;
  value: number;
}

export type ContractingAuthoritiesSpent = ContractingAuthority & {
  totalSpent: number;
};
export type SellerOffer = Seller & OfferValues;
