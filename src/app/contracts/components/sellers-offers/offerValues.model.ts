export interface OfferValues {
  value: number;
  text: string;
}

export const emptyOfferValue = (): OfferValues => ({
  text: '',
  value: 0,
});
