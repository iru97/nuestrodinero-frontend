import { DLContainer, DLContent } from '../mocks';

export const detalleParser = (
  input: DLContent,
  index: number = -1
): string[] => {
  if (!input) {
    return [];
  }

  if (index === -1) {
    return [];
  }

  const detalleValor: string | DLContainer = input.dd[index];

  if (typeof detalleValor === 'string') {
    return [detalleValor];
  }

  return detalleValor.dl[0].dd as string[];
};
