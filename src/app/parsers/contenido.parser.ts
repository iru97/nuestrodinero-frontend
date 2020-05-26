import { Contenido, contenidoVacio } from '../models';
import { DLContent } from '../mocks';
import { CODIGO_CPV, DESCRIPCION_LICITACION, FECHA_ANUNCIO } from '../core';
import {
  extractorIndices,
  indexStorageReducer,
  getValorSeguro,
} from '../utils/functions';
import { poderAdjudicadorParser } from './poder-adjudicador.parser';
import { ofertasRecibidasParser } from './ofertas-recibidas.parser';
import { adjudicatariosParser } from './adjudicatarios.parser';
import { valorOfertaParser } from './valor-oferta.parser';
import { detalleParser } from './detalle.parser';

export const contenidoParser = (input: DLContent): Contenido => {
  let defaultContenido = contenidoVacio();
  if (!input) {
    return defaultContenido;
  }

  let valores = [CODIGO_CPV, DESCRIPCION_LICITACION, FECHA_ANUNCIO];

  const indices = extractorIndices(input.dt, valores);
  const detalleIndex = indexStorageReducer(indices, 0);
  const descripcionIndex = indexStorageReducer(indices, 1);
  const fechaIndex = indexStorageReducer(indices, 2);

  const poderAdjudicador = poderAdjudicadorParser(input);
  const ofertasRecibidas = ofertasRecibidasParser(input);
  const adjudicatarios = adjudicatariosParser(input);
  const detalle = detalleParser(input, detalleIndex);
  const descripcionLicitacion = detalleParser(input, descripcionIndex);
  const valorOferta = valorOfertaParser(input);
  const fechaAnuncio = getValorSeguro(input.dd, fechaIndex);

  return {
    poderAdjudicador,
    ofertasRecibidas,
    adjudicatarios,
    detalle,
    descripcionLicitacion,
    valorOferta,
    fechaAnuncio,
  };
};
