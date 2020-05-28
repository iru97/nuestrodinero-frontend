import { DLContent, DLContainer } from '../mocks';
import { PODER_ADJUDICADOR, PODER_TIPO } from '../core';
import { extractorIndices, indexStorageReducer } from '../utils';
import {
  ContractingAuthority,
  emptyContractingAuthority,
  authorityTypeCreator,
  contractingAuthorityCreator,
} from '../contracts/components/contracting-authority/contracting-authority.model';

export const contractingAuthorityParser = (
  input: DLContent
): ContractingAuthority => {
  let defaultContractingAuthority = emptyContractingAuthority();

  if (!input) {
    return defaultContractingAuthority;
  }

  let valores = [PODER_ADJUDICADOR, PODER_TIPO];

  const indices = extractorIndices(input.dt, valores);

  const ContractingAuthorityIndex = indexStorageReducer(indices, 0);
  const tipoPoderIndex = indexStorageReducer(indices, 1);

  if (ContractingAuthorityIndex !== -1) {
    const valorContractingAuthority = (input.dd[
      ContractingAuthorityIndex
    ] as DLContainer).dl[0];

    defaultContractingAuthority = {
      ...defaultContractingAuthority,
      ...contractingAuthorityCreator(valorContractingAuthority),
    };
  }

  if (tipoPoderIndex !== -1) {
    const valortipoPoder = (input.dd[tipoPoderIndex] as DLContainer).dl[0];

    defaultContractingAuthority = {
      ...defaultContractingAuthority,
      ...authorityTypeCreator(valortipoPoder),
    };
  }

  return defaultContractingAuthority;
};
