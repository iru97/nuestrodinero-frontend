export interface OffersReceived {
  text: string;
  total: number;
}

export const emptyOffersReceived = (): OffersReceived => ({
  text: '',
  total: 0,
});
