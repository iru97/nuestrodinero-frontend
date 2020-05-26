import { contenidoMock, DLContent, contenidoMock2 } from '../../mocks';
import { poderAdjudicadorParser } from '../poder-adjudicador.parser';
import { poderAdjudicadorVacio, PoderAdjudicador } from '../../models';

describe('poder adjudicador specs', () => {
  it('retorna poder adjudicador por defecto si se le pasan parametros indefinidos', () => {
    // Arrange
    const resultadoEsperado = poderAdjudicadorVacio();
    // Act
    const resultado = poderAdjudicadorParser(undefined);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador por defecto si algun valor asociado', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = poderAdjudicadorVacio();
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = poderAdjudicadorParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador con los valores asociados', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado: PoderAdjudicador = {
      actividad: 'Cultura.',
      direccion: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
      email: 'subsecretaria.mcd@cultura.gob.es',
      nif: 'S2800239B.',
      nombre: 'Subsecretaría de Cultura y Deporte.',
      telefono: '',
      tipo: 'Administración General del Estado.',
      web: '',
    };
    // Act
    const resultado = poderAdjudicadorParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador con los valores asociados si no tenemos el tipo/actividad', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock2[0] };
    const resultadoEsperado: PoderAdjudicador = {
      actividad: '',
      direccion: 'C/ Prim 6-8 (desp. 2E24). Madrid. Madrid. 28004. España.',
      email: 'contratacion_maper@et.mde.es',
      nif: 'S2830086A.',
      nombre: 'Jefatura de Asuntos Económicos del Mando de Personal.',
      telefono: '917802666.',
      tipo: '',
      web: '',
    };
    // Act
    const resultado = poderAdjudicadorParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
