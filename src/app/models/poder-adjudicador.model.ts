import { DLContent } from "../mocks";
import {
  TIPO,
  ACTIVIDAD,
  NOMBRE,
  NIF,
  DIRECCION,
  LOCALIDAD,
  PROVINCIA,
  CP,
  PAIS,
  TELEFONO,
  EMAIL,
  WEB,
} from "../core";
import {
  extractorIndices,
  indexStorageReducer,
  getValorSeguro,
  direccionBuilder,
  adjustIndex,
} from "../utils";

export interface PoderAdjudicador {
  nombre: string;
  nif: string;
  direccion: string;
  telefono: string;
  email: string;
  web: string;
  tipo: string;
  actividad: string;
}

export const poderAdjudicadorVacio = (): PoderAdjudicador => ({
  nombre: "",
  nif: "",
  direccion: "",
  telefono: "",
  email: "",
  web: "",
  tipo: "",
  actividad: "",
});

export const valorTipoPoderCreator = (
  valortipoPoder: DLContent
): Partial<PoderAdjudicador> => {
  let valores = [TIPO, ACTIVIDAD];

  const indices = extractorIndices(valortipoPoder.dt, valores);

  const tipoIndex = indexStorageReducer(indices, 0);
  const actividadIndex = indexStorageReducer(indices, 1);

  return {
    tipo: getValorSeguro(valortipoPoder.dd, tipoIndex),
    actividad: getValorSeguro(valortipoPoder.dd, actividadIndex),
  };
};

export const valorPoderAdjudicadorCreator = (
  valorPoderAdjudicador: DLContent
): Partial<PoderAdjudicador> => {
  let valores = [
    NOMBRE,
    NIF,
    DIRECCION,
    LOCALIDAD,
    PROVINCIA,
    CP,
    PAIS,
    TELEFONO,
    EMAIL,
    WEB,
  ];

  const indices = extractorIndices(valorPoderAdjudicador.dt, valores);

  if (valorPoderAdjudicador.dt.length < indices.length) {
    valorPoderAdjudicador = adjustIndex(valorPoderAdjudicador, indices);
  }

  const nombreIndex = indexStorageReducer(indices, 0);
  const nifIndex = indexStorageReducer(indices, 1);
  const direccionIndex = indexStorageReducer(indices, 2);
  const localidadIndex = indexStorageReducer(indices, 3);
  const provinciaIndex = indexStorageReducer(indices, 4);
  const cpIndex = indexStorageReducer(indices, 5);
  const paisIndex = indexStorageReducer(indices, 6);
  const telfIndex = indexStorageReducer(indices, 7);
  const mailIndex = indexStorageReducer(indices, 8);
  const webIndex = indexStorageReducer(indices, 9);

  let direccion = direccionBuilder(
    [direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex],
    valorPoderAdjudicador
  );

  return {
    nombre: getValorSeguro(valorPoderAdjudicador.dd, nombreIndex),
    nif: getValorSeguro(valorPoderAdjudicador.dd, nifIndex),
    direccion,
    telefono: getValorSeguro(valorPoderAdjudicador.dd, telfIndex),
    email: getValorSeguro(valorPoderAdjudicador.dd, mailIndex),
    web: getValorSeguro(valorPoderAdjudicador.dd, webIndex),
  };
};
