import { metadatosMock } from './metadatos.mock';
import { contenidoMock } from './contenido.mock';

export const ContractMock: any = {
  documento: {
    texto: [
      {
        dl: contenidoMock,
      },
    ],
    metadatos: [metadatosMock],
  },
};
