import { Content } from 'src/app/contracts/components/contract/content.model';
import { Contract } from 'src/app/contracts/components/contract/contract.model';
import { SellerOffer, Stats } from './stats.model';
type PymeStats = { pyme: boolean; total: number };

// Keep in mind that sellers, offerValues & offersReceived have the same length
// and they keep an index relation.

// Return stats with the total money spent on pymes and non-pymes
export const pymeStats = (contractCollection: Contract[]): Stats[] => {
  const allSellers = getPymesWithValues(contractCollection);

  const pymesCost = allSellers.reduce((acc, curr) => (curr.pyme ? (acc += curr.total) : acc), 0);

  const nonPymesCost = allSellers.reduce((acc, curr) => (!curr.pyme ? (acc += curr.total) : acc), 0);

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

const getPymesWithValues = (contractCollection: Contract[]): PymeStats[] => {
  const contractContents: Content[] = contractCollection.map((c) => c.content);
  let arr = [];

  contractContents.forEach((content: Content) => {
    if (content.awardees.length === 1) {
      arr.push(buildPymeStat(content.awardees[0].pyme, content.offerValues[0].value));
    } else if (content.awardees.length > 1) {
      content.awardees.forEach((item, index) => arr.push(buildPymeStat(item.pyme, content.offerValues[index].value)));
    }
  });

  return arr;
};

const buildPymeStat = (pyme: boolean, total: number): PymeStats => ({ pyme, total });
