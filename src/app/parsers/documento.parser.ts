import { Documento, defaultDocumento } from '../models';
import { contenidoParser } from './contenido.parser';
import { metadatosParser } from './metadataos.parser';

export const documentoParser = (boeResponseAsJson: any): Documento => {
  let emptyDoc: Documento = defaultDocumento();

  if (!boeResponseAsJson) {
    return emptyDoc;
  }

  if (
    boeResponseAsJson.documento &&
    boeResponseAsJson.documento.texto &&
    boeResponseAsJson.documento.metadatos
  ) {
    let content = undefined;
    try {
      content = boeResponseAsJson.documento.texto[0].dl[0];
    } catch (err) {
      console.warn('malformed content', err);
    }
    let metadata = boeResponseAsJson.documento.metadatos[0];

    return {
      contenido: contenidoParser(content),
      metadatos: metadatosParser(metadata),
    };
  }

  return emptyDoc;
};
