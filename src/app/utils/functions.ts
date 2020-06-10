import { CHART_TYPES } from '../core/const.api.model';
import { isArray } from 'underscore';

/*
 * If countUndefined is false we count the properties that has value != undefined
 * If countUndefined is true we count the properties that has value == undefined || value != undefined or || value isEmptyArray
 */
export const numberOfFieldsWithValue = (
  o: any,
  countUndefined: boolean
): number => {
  let counter = 0;

  for (let key in o) {
    let item = o[key];

    if (isObject(item)) {
      if (countUndefined) {
        if (isArray(item) && item.length == 0) {
          counter++;
        } else {
          counter += numberOfFieldsWithValue(item, countUndefined);
        }
      } else {
        counter += numberOfFieldsWithValue(item, countUndefined);
      }
    } else {
      counter += countUndefined ? 1 : item ? 1 : 0;
    }
  }

  return counter;
};

function isObject(o) {
  return typeof o === 'object';
}

export const normalizeStringReplacement = (
  str: string,
  simbolos: RegExp,
  replacement: string
) => {
  let substr = str.replace(simbolos, replacement);

  return substr.trim();
};

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
