import { contenidoMock } from '../../mocks';
import {
  Content,
  emptyContent,
} from 'src/app/contracts/components/contract/content.model';
import { contentParser } from '../content.parser';

describe('texto parser specs', () => {
  it('should return an empty content if null|undefined are passed', () => {
    const valorEsperado: Content = emptyContent();
    const valor: Content = contentParser(undefined);

    expect(valor).toStrictEqual(valorEsperado);
  });

  it('returns the paresed content', () => {
    const mock = { ...contenidoMock };
    const resultado = contentParser(mock[0]);
    const resultadoEsperado: Content = {
      sellers: [
        {
          address: 'España.',
          nif: 'A28526275.',
          name: 'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
        },
        {
          address: 'España.',
          nif: 'A28793917.',
          name: 'COMPUSOF, S.A.,.',
        },
      ],
      sellingDescription: [
        'Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19.',
      ],
      details: ['30213100 (Ordenadores portátiles).'],
      date: '27 de abril de 2020.',
      offersReceived: [
        {
          text: 'Contrato 2020C1AJ0189',
          totalOffers: 1,
        },
        {
          text: 'Contrato 2020C1AJ0189',
          totalOffers: 1,
        },
      ],
      contractingAuthority: {
        activity: 'Cultura.',
        address: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
        email: 'subsecretaria.mcd@cultura.gob.es',
        nif: 'S2800239B.',
        name: 'Subsecretaría de Cultura y Deporte.',
        phone: '',
        type: 'Administración General del Estado.',
        web: '',
      },
      offerValues: [
        {
          text: 'Contrato 2020C1AJ0189',
          cost: 33235.2,
        },
        {
          text: 'Contrato 2020C1AJ0189',
          cost: 12780,
        },
      ],
    };
    expect(resultadoEsperado).toEqual(resultado);
  });
});
