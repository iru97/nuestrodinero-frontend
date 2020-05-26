export interface BOE {
  idAnuncio: string[];
}

export const defaultBOEVacio = (): BOE => ({
  idAnuncio: [],
});
