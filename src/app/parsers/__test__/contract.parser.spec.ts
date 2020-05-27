import { contractParser } from '../Contract.parser';
import {
  Contract,
  emptyContract,
} from 'src/app/contracts/components/contract/contract.model';
import { ContractMock } from 'src/app/mocks/documento.mock';

describe('Contract parser specs', () => {
  it('should return default document if undefined is passed', () => {
    const expectedResult = emptyContract();
    const givenResult = contractParser(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return default document if its a malformed object', () => {
    const expectedResult = emptyContract();
    const givenResult = contractParser({ random: 1 });
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return a parsed document', () => {
    const expectedResult: Contract = {
      content: {
        contractingAuthority: {
          name: 'Subsecretaría de Cultura y Deporte.',
          nif: 'S2800239B.',
          address: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
          phone: '',
          email: 'subsecretaria.mcd@cultura.gob.es',
          web: '',
          type: 'Administración General del Estado.',
          activity: 'Cultura.',
        },
        offersReceived: [
          {
            totalOffers: 1,
            text: 'Contrato 2020C1AJ0189',
          },
          {
            totalOffers: 1,
            text: 'Contrato 2020C1AJ0189',
          },
        ],
        sellers: [
          {
            name: 'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
            nif: 'A28526275.',
            address: 'España.',
          },
          {
            name: 'COMPUSOF, S.A.,.',
            nif: 'A28793917.',
            address: 'España.',
          },
        ],
        details: ['30213100 (Ordenadores portátiles).'],
        sellingDescription: [
          'Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19.',
        ],
        offerValues: [
          {
            cost: 33235.2,
            text: 'Contrato 2020C1AJ0189',
          },
          {
            cost: 12780,
            text: 'Contrato 2020C1AJ0189',
          },
        ],
        date: '27 de abril de 2020.',
      },
      metadata: {
        department: 'Ministerio de Cultura y Deporte',
        date: new Date(2020, 3, 30),
        identifier: 'BOE-B-2020-13137',
        diaryNumber: 120,
        section: '5A',
        title:
          'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
        pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
      },
    };
    const givenResult = contractParser(ContractMock);
    expect(givenResult).toStrictEqual(expectedResult);
  });
});
