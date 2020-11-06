export interface ContractingAuthority {
  name: string;
  nif: string;
  address: string;
  telephone: string;
  email: string;
  web: string;
  activityType: string;
  activity: string;
}

export const emptyContractingAuthority = (): ContractingAuthority => ({
  name: '',
  nif: '',
  address: '',
  telephone: '',
  email: '',
  web: '',
  activityType: '',
  activity: '',
});
