export interface Seller {
  name: string;
  nif: string;
  address: string;
  pyme: boolean;
}

export const emptySeller = (): Seller => ({
  address: '',
  nif: '',
  name: '',
  pyme: false,
});
