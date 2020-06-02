export const PODER_ADJUDICADOR = 'Poder adjudicador';
export const PODER_TIPO =
  'Tipo de poder adjudicador y principal actividad ejercida';
export const TIPO = 'Tipo';
export const ACTIVIDAD = 'Actividad principal ejercida';
export const NOMBRE = 'Nombre';
export const NIF = 'Número de identificación fiscal';
export const DIRECCION = 'Dirección';
export const LOCALIDAD = 'Localidad';
export const PROVINCIA = 'Provincia';
export const CP = 'Código postal';
export const PAIS = 'País';
export const TELEFONO = 'Teléfono';
export const EMAIL = 'Correo electrónico';
export const WEB = 'Dirección principal';
export const OFERTAS_RECIBIDAS = 'Ofertas recibidas';
export const NUM_OFERTAS_RECIBIDAS = 'Número de ofertas recibidas';
export const ADJUDICATARIOS = 'Adjudicatarios';
export const VALOR_OFERTAS = 'Valor de las ofertas';
export const FECHA_ANUNCIO = 'Fecha de envío del anuncio';
export const DESCRIPCION_LICITACION = 'Descripción de la licitación';
export const CODIGO_CPV = 'Códigos CPV';
export const FORMALIZACION_CONTRATOS = 'Anuncio de formalización de contratos';
export const PYME = 'El adjudicatario es una PYME';

// REGEXP
export const enumeracionDeListasRegexp: RegExp = /([\d\.]+(?=\))|[:\)])/g;
export const dotsCharsAndSpacesRegexp: RegExp = /[[\.a-z\s]+/g;
// CHARTS
export enum CHART_TYPES {
  ACTIVITY = 'Gasto público por actividad',
  PYMES = 'Gasto público en PYMES',
}

// COLOR PALLETE
export const COLOR_PALLETE: string[] = [
  '#4c78a8',
  '#9ecae9',
  '#f58518',
  '#ffbf79',
  '#54a24b',
  '#88d27a',
  '#b79a20',
  '#f2cf5b',
  '#439894',
  '#83bcb6',
  '#e45756',
  '#ff9d98',
  '#79706e',
  '#bab0ac',
  '#d67195',
  '#fcbfd2',
  '#b279a2',
  '#d6a5c9',
  '#9e765f',
  '#d8b5a5',
];
