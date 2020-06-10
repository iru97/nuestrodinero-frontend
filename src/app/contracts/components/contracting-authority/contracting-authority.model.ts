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
