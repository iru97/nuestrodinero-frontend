export interface OffersReceived {
  text: string;
  totalOffers: number;
}

export const emptyOffersReceived = (): OffersReceived => ({
  text: '',
  totalOffers: 0,
});
