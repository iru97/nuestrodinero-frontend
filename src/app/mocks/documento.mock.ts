import { metadatosMock } from "./metadatos.mock";
import { contenidoMock } from "./contenido.mock";

export const documentoMock: any = {
  documento: {
    texto: [
      {
        dl: contenidoMock,
      },
    ],
    metadatos: [metadatosMock],
  },
};
