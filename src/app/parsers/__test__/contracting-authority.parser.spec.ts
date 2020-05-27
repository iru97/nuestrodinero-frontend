import { contenidoMock, DLContent, contenidoMock2 } from '../../mocks';
import {
  emptyContractingAuthority,
  ContractingAuthority,
} from 'src/app/contracts/components/contracting-authority/contracting-authority.model';
import { contractingAuthorityParser } from '../contracting-authority.parser';

describe('poder adjudicador specs', () => {
  it('retorna poder adjudicador por defecto si se le pasan parametros indefinidos', () => {
    // Arrange
    const resultadoEsperado = emptyContractingAuthority();
    // Act
    const resultado = contractingAuthorityParser(undefined);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador por defecto si algun valor asociado', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = emptyContractingAuthority();
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = contractingAuthorityParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador con los valores asociados', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado: ContractingAuthority = {
      activity: 'Cultura.',
      address: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
      email: 'subsecretaria.mcd@cultura.gob.es',
      nif: 'S2800239B.',
      name: 'Subsecretaría de Cultura y Deporte.',
      phone: '',
      type: 'Administración General del Estado.',
      web: '',
    };
    // Act
    const resultado = contractingAuthorityParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna poder adjudicador con los valores asociados si no tenemos el tipo/actividad', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock2[0] };
    const resultadoEsperado: ContractingAuthority = {
      activity: '',
      address: 'C/ Prim 6-8 (desp. 2E24). Madrid. Madrid. 28004. España.',
      email: 'contratacion_maper@et.mde.es',
      nif: 'S2830086A.',
      name: 'Jefatura de Asuntos Económicos del Mando de Personal.',
      phone: '917802666.',
      type: '',
      web: '',
    };
    // Act
    const resultado = contractingAuthorityParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
