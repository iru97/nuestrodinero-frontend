import { Contract } from 'src/app/contracts/components/contract/contract.model';
import { SellerOffer, Stats } from './stats.model';

// Keep in mind that sellers, offerValues & offersReceived have the same length
// and they keep an index relation.

// Return stats with the total money spent on pymes and non-pymes
export const pymeStats = (contractCollection: Contract[]): Stats[] => {
  const allSellers = getSellerWithOffers(contractCollection);

  const pymesCost = allSellers.reduce(
    (acc, curr) => (curr.pyme ? (acc += curr.cost) : acc),
    0
  );

  const nonPymesCost = allSellers.reduce(
    (acc, curr) => (!curr.pyme ? (acc += curr.cost) : acc),
    0
  );

  let numberPymesOfCompanies = allSellers.filter((s) => s.pyme).length;
  let numberNoPymesOfCompanies = allSellers.filter((s) => !s.pyme).length;

  let pymes: Stats = {
    label: `${numberPymesOfCompanies} PYMES`,
    value: pymesCost,
  };

  let nonPymes: Stats = {
    label: `${numberNoPymesOfCompanies} NO PYMES`,
    value: nonPymesCost,
  };

  return [pymes, nonPymes];
};

const getSellerWithOffers = (contractCollection: Contract[]): SellerOffer[] => {
  return contractCollection.reduce((acc: SellerOffer[], curr: Contract) => {
    let mergedSellersAndOfferValue: SellerOffer[] = [];

    curr.content.sellers.forEach((s, i) => {
      let item: SellerOffer = { ...s, ...curr.content.offerValues[i] };
      mergedSellersAndOfferValue.push(item);
    });

    return [...acc, ...mergedSellersAndOfferValue];
  }, []);
};
