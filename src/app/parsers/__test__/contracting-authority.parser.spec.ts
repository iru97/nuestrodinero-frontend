import { contenidoMock, DLContent, contenidoMock2 } from '../../mocks';
import {
  emptyContractingAuthority,
  ContractingAuthority,
} from 'src/app/contracts/components/contracting-authority/contracting-authority.model';
import { contractingAuthorityParser } from '../contracting-authority.parser';

describe('contracting authority specs', () => {
  it('returns an empty contracting authority if null|undefined is passed', () => {
    // Arrange
    const resultadoEsperado = emptyContractingAuthority();
    // Act
    const resultado = contractingAuthorityParser(undefined);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('parses contracting authority #1 empty input', () => {
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

  it('parses contracting authority #2 half input', () => {
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

  it('parses contracting authority #3 complete input', () => {
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
