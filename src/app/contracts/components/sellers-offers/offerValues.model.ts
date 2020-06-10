export interface OfferValues {
  cost: number;
  text: string;
}

export const emptyOfferValue = (): OfferValues => ({
  text: '',
  cost: 0,
});
