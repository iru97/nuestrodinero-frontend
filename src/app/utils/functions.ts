import { CHART_TYPES } from '../core/const.api.model';

export const formatDate = (date: Date): string => {
  let isoDateTime: string = date.toISOString();
  let tIndex: number = isoDateTime.indexOf('T');
  let isoDate: string = isoDateTime.substring(0, tIndex);

  return isoDate.replace(/-/g, '');
};

export const chartTypesToArray = (): string[] => {
  let arr = [];

  for (let key in CHART_TYPES) {
    arr.push(CHART_TYPES[key]);
  }

  return arr;
};
