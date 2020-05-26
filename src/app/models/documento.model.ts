import { Metadatos, metadatosVacios } from "./metadatos.model";
import { Contenido, contenidoVacio } from "./contenido.model";

export interface Documento {
  metadatos: Metadatos;
  contenido: Contenido;
}

export const defaultDocumento = (): Documento => ({
  metadatos: metadatosVacios(),
  contenido: contenidoVacio(),
});
