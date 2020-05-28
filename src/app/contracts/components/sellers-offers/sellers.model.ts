import { DLContent } from '../../../mocks';
import {
  NOMBRE,
  NIF,
  DIRECCION,
  LOCALIDAD,
  PROVINCIA,
  CP,
  PAIS,
  PYME,
} from '../../../core';
import {
  extractorIndices,
  indexStorageReducer,
  getValorSeguro,
  direccionBuilder,
  adjustIndex,
} from '../../../utils';

export interface Seller {
  name: string;
  nif: string;
  address: string;
  pyme: boolean;
}

export const emptySeller = (): Seller => ({
  address: '',
  nif: '',
  name: '',
  pyme: false,
});

export const sellerCreator = (contenido: DLContent): Seller => {
  if (!contenido) {
    return emptySeller();
  }

  let valores = [NOMBRE, NIF, DIRECCION, LOCALIDAD, PROVINCIA, CP, PAIS];
  // this is ugly

  let ddStringCollection: string[] = contenido.dd.filter(
    (i) => typeof i === 'string'
  ) as string[];

  const ddValues = extractorIndices(ddStringCollection, [PYME]);
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
  const pymeIndex = indexStorageReducer(ddValues, 0);

  let address = direccionBuilder(
    [direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex],
    contenido
  );

  return {
    name: getValorSeguro(contenido.dd, nombreIndex),
    nif: getValorSeguro(contenido.dd, nifIndex),
    address,
    pyme: pymeIndex !== -1,
  };
};
