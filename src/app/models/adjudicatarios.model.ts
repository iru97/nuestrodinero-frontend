import { DLContent } from "../mocks";
import {
  NOMBRE,
  NIF,
  DIRECCION,
  LOCALIDAD,
  PROVINCIA,
  CP,
  PAIS,
} from "../core";
import {
  extractorIndices,
  indexStorageReducer,
  getValorSeguro,
  direccionBuilder,
  adjustIndex,
} from "../utils";

export interface Adjudicatarios {
  nombre: string;
  nif: string;
  direccion: string;
}

export const adjudicatariosVacio = (): Adjudicatarios => ({
  direccion: "",
  nif: "",
  nombre: "",
});

export const adjudicatarioCreator = (contenido: DLContent): Adjudicatarios => {
  if (!contenido) {
    return adjudicatariosVacio();
  }

  let valores = [NOMBRE, NIF, DIRECCION, LOCALIDAD, PROVINCIA, CP, PAIS];

  const indices = extractorIndices(contenido.dt, valores);

  //ajustar indices -> si valorAdjudicatarios.length < indices.length, hay que meter un str vacio por cada -1 que haya en indices, en su posicion correspondiente
  if (contenido.dt.length < indices.length) {
    contenido = adjustIndex(contenido, indices);
  }

  const nombreIndex = indexStorageReducer(indices, 0);
  const nifIndex = indexStorageReducer(indices, 1);
  const direccionIndex = indexStorageReducer(indices, 2);
  const localidadIndex = indexStorageReducer(indices, 3);
  const provinciaIndex = indexStorageReducer(indices, 4);
  const cpIndex = indexStorageReducer(indices, 5);
  const paisIndex = indexStorageReducer(indices, 6);

  let direccion = direccionBuilder(
    [direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex],
    contenido
  );

  return {
    nombre: getValorSeguro(contenido.dd, nombreIndex),
    nif: getValorSeguro(contenido.dd, nifIndex),
    direccion,
  };
};
