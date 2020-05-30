import { DD, DLContent, DLContainer } from '../mocks';
import { isArray } from 'util';
import { indexesStorage } from '../models/utils.models';

export const extractorIndices = (
  collection: string[],
  values: string[]
): indexesStorage[] => {
  let indices: indexesStorage[] = [];
  let charsToRemove = /[\.\d\):]/g;

  if (!collection || !values) {
    return indices;
  }

  collection.forEach((item, index) => {
    item = normalizeString(item.trim(), charsToRemove);
    let valorIndex = values.indexOf(item);

    // rellenar con -1 los elemenos que no esten presentes
    let acc = index;
    while (valorIndex > indices.length) {
      indices.push({
        valorIndex: -1,
        collectionIndex: acc,
      });
      acc++;
    }

    indices.push({
      valorIndex,
      collectionIndex: acc,
    });
  });

  // rellenar con -1 los elemenos que falten
  let acc = indices.length;
  while (indices.length < values.length) {
    indices.push({
      valorIndex: -1,
      collectionIndex: acc,
    });
    acc++;
  }

  return indices;
};

export const normalizeString = (str: string, simbolos: RegExp) => {
  let substr = str.replace(simbolos, '');

  return substr.trim();
};

export const indexStorageReducer = (
  collection: indexesStorage[],
  index: number
): number => {
  if (!collection || index < 0) {
    return -1;
  }

  return collection.reduce((acc: number, curr: indexesStorage) => {
    if (acc != -1) {
      return acc;
    }
    return curr.valorIndex == index ? curr.collectionIndex : -1;
  }, -1);
};

export const getValorSeguro = (collection: DD, indice: number): string => {
  if (!collection || indice < 0) {
    return '';
  }

  return (collection[indice] as string) ?? '';
};

export const replaceCommaWithDots = (str: string): number =>
  str ? +str.replace(',', '.') : 0;

export const doRecursion = <T>(
  contenido: DLContent,
  itemCreator: (item: DLContent) => T
): T[] => {
  let total: T[] = [];

  if (
    contenido.dt &&
    contenido.dt.length &&
    typeof contenido.dd[0] === 'string'
  ) {
    total.push(itemCreator(contenido));
    return total;
  }

  for (const iterator of contenido.dd) {
    const element: DLContent = (iterator as DLContainer).dl[0];
    total = [...total, ...doRecursion(element, itemCreator)];
  }

  return total;
};

export const direccionBuilder = (
  collection: number[],
  content: DLContent
): string => {
  if (!collection || !collection.length) {
    return '';
  }

  let [
    direccionIndex,
    localidadIndex,
    provinciaIndex,
    cpIndex,
    paisIndex,
  ] = collection;

  let calle = getValorSeguro(content.dd, direccionIndex);
  let loc = getValorSeguro(content.dd, localidadIndex);
  let prov = getValorSeguro(content.dd, provinciaIndex);
  let cp = getValorSeguro(content.dd, cpIndex);
  let pais = getValorSeguro(content.dd, paisIndex);

  return `${calle} ${loc} ${prov} ${cp} ${pais}`.trim();
};

// this function is used if we have more items in IndexStorage than items inside DLContent
// in order to place empty strings in the DLContent where we have -1 in the IndexStorage
export const adjustIndex = (
  { dd, dt }: DLContent,
  indices: indexesStorage[]
): DLContent => {
  let localContent: DLContent = {
    dt: [],
    dd: [],
  };

  if (!indices) {
    return localContent;
  }

  indices.forEach((item) => {
    if (item.valorIndex != -1) {
      localContent.dd.push(dd.shift());
      localContent.dt.push(dt.shift());
    } else {
      localContent.dd.push('');
      localContent.dt.push('');
    }
  });

  return localContent;
};

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

export const formatDate = (date: Date): string => {
  let isoDateTime: string = date.toISOString();
  let tIndex: number = isoDateTime.indexOf('T');
  let isoDate: string = isoDateTime.substring(0, tIndex);

  return isoDate.replace(/-/g, '');
};
