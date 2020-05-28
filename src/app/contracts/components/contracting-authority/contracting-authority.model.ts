import { DLContent } from '../../../mocks';
import {
  TIPO,
  ACTIVIDAD,
  NOMBRE,
  NIF,
  DIRECCION,
  LOCALIDAD,
  PROVINCIA,
  CP,
  PAIS,
  TELEFONO,
  EMAIL,
  WEB,
} from '../../../core';
import {
  extractorIndices,
  indexStorageReducer,
  getValorSeguro,
  direccionBuilder,
  adjustIndex,
} from '../../../utils';

export interface ContractingAuthority {
  name: string;
  nif: string;
  address: string;
  phone: string;
  email: string;
  web: string;
  type: string;
  activity: string;
}

export const emptyContractingAuthority = (): ContractingAuthority => ({
  name: '',
  nif: '',
  address: '',
  phone: '',
  email: '',
  web: '',
  type: '',
  activity: '',
});

export const authorityTypeCreator = (
  valortipoPoder: DLContent
): Partial<ContractingAuthority> => {
  let valores = [TIPO, ACTIVIDAD];

  const indices = extractorIndices(valortipoPoder.dt, valores);

  const tipoIndex = indexStorageReducer(indices, 0);
  const actividadIndex = indexStorageReducer(indices, 1);

  return {
    type: getValorSeguro(valortipoPoder.dd, tipoIndex),
    activity: getValorSeguro(valortipoPoder.dd, actividadIndex),
  };
};

export const contractingAuthorityCreator = (
  valorContractingAuthority: DLContent
): Partial<ContractingAuthority> => {
  let valores = [
    NOMBRE,
    NIF,
    DIRECCION,
    LOCALIDAD,
    PROVINCIA,
    CP,
    PAIS,
    TELEFONO,
    EMAIL,
    WEB,
  ];

  const indices = extractorIndices(valorContractingAuthority.dt, valores);

  if (valorContractingAuthority.dt.length < indices.length) {
    valorContractingAuthority = adjustIndex(valorContractingAuthority, indices);
  }

  const nombreIndex = indexStorageReducer(indices, 0);
  const nifIndex = indexStorageReducer(indices, 1);
  const direccionIndex = indexStorageReducer(indices, 2);
  const localidadIndex = indexStorageReducer(indices, 3);
  const provinciaIndex = indexStorageReducer(indices, 4);
  const cpIndex = indexStorageReducer(indices, 5);
  const paisIndex = indexStorageReducer(indices, 6);
  const telfIndex = indexStorageReducer(indices, 7);
  const mailIndex = indexStorageReducer(indices, 8);
  const webIndex = indexStorageReducer(indices, 9);

  let address = direccionBuilder(
    [direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex],
    valorContractingAuthority
  );

  return {
    name: getValorSeguro(valorContractingAuthority.dd, nombreIndex),
    nif: getValorSeguro(valorContractingAuthority.dd, nifIndex),
    address,
    phone: getValorSeguro(valorContractingAuthority.dd, telfIndex),
    email: getValorSeguro(valorContractingAuthority.dd, mailIndex),
    web: getValorSeguro(valorContractingAuthority.dd, webIndex),
  };
};
