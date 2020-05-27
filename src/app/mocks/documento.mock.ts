import { metadatosMock } from './metadatos.mock';
import { contenidoMock } from './contenido.mock';

export const ContractMock: any = {
  Contract: {
    texto: [
      {
        dl: contenidoMock,
      },
    ],
    metadatos: [metadatosMock],
  },
};
