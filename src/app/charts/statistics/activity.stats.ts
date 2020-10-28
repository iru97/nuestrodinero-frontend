import { Contract } from 'src/app/contracts/components/contract/contract.model';
import { Stats, ContractingAuthoritiesSpent } from './stats.model';
import { TotalCostPipe } from 'src/app/shared/pipes/total-cost.pipe';
import * as _ from 'underscore';
import { normalizeStringReplacement } from 'src/app/utils';

// group by activity & moneySpent
export const activityStats = (contractCollection: Contract[]): Stats[] => {
  const totalCost: TotalCostPipe = new TotalCostPipe();

  const caaSpent: ContractingAuthoritiesSpent[] = contractCollection.map(
    (c) => {
      let totalSpent: number = totalCost.transform(c.content.offerValues);
      return { ...c.content.contractAuthority, totalSpent };
    }
  );

  const caaSpentGroup = _.groupBy(caaSpent, (value) => {
    return value.activity
      ? normalizeStringReplacement(value.activity, /[\s\.,]/g, '_')
      : 'Sin_actividad_definida';
  });

  let stats: Stats[] = [];

  _.mapObject(caaSpentGroup, function (
    val: ContractingAuthoritiesSpent[],
    key: string
  ) {
    const mappedToStats: Stats = {
      label: normalzieLabel(key),
      value: val.reduce((acc, curr) => {
        return acc + curr.totalSpent;
      }, 0),
    };

    stats.push(mappedToStats);
    return mappedToStats;
  });

  return stats;
};

const normalzieLabel = (str: string): string => {
  let strWithComma = str.replace(/__/g, ',');
  let strWithSpaces = strWithComma.replace(/_/g, ' ');

  return strWithSpaces.trim();
};
