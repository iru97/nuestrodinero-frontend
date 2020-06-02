import { pymeStats } from './pymes.stats';
import {
  contractCollectionMock,
  contractCollectionMock2,
} from 'src/app/mocks/contract-collection.mock';
import { PymeStats, Stats } from './stats.model';
import { activityStats } from './activity.stats';

describe('stats specs', () => {
  it('should return stats from pymes & non-pymes', () => {
    const expectedResult = [
      { numberOfCompanies: 4, label: 'PYMES', value: 50080.88 },
      { numberOfCompanies: 7, label: 'NO PYMES', value: 1550123.84 },
    ];

    const givenResult: PymeStats[] = pymeStats(contractCollectionMock);

    expect(givenResult).toStrictEqual(expectedResult);
  });

  it.only('should return stats from money spent by activities', () => {
    const expectedResult = [
      { label: 'Defensa', value: 155681.6 },
      { label: 'Administración Financiera y Tributaria', value: 92709 },
      { label: 'Sin actividad definida', value: 587090.05 },
      { label: 'Interior', value: 415840.92 },
      {
        label: 'Seguridad Ciudadana e Instituciones Penitenciarias',
        value: 2247946.29,
      },
      { label: 'Servicios de Carácter General', value: 1027513.35 },
      { label: 'Fomento del Empleo', value: 217750 },
      { label: 'Servicios Sociales y Promoción Social', value: 402374.81 },
      { label: 'Agricultura,Pesca y Alimentación', value: 73739.78 },
      { label: 'Medio Ambiente', value: 5304109.08 },
      { label: 'Investigación,Desarrollo e Innovación', value: 1074648.25 },
      {
        label: 'Gestión y Administración de la Seguridad Social',
        value: 652560.97,
      },
    ];

    const givenResult: Stats[] = activityStats(contractCollectionMock2);

    expect(givenResult).toStrictEqual(expectedResult);
  });
});
