import { metadatosMock } from 'src/app/mocks';
import {
  emptyMetadata,
  Metadata,
} from 'src/app/contracts/components/contract/metadata.model';
import { metadataParser } from '../metadata.parser';

describe('metadatos parser', () => {
  it('returns empty metadata if null|undefined is passed', () => {
    const resultadoEsperado = emptyMetadata();
    const resultado = metadataParser(undefined);

    expect(resultado).toEqual(resultadoEsperado);
  });

  it('parses metadata #1', () => {
    const resultadoEsperado: Metadata = {
      department: 'Ministerio de Cultura y Deporte',
      date: new Date(2020, 3, 30),
      identifier: 'BOE-B-2020-13137',
      diaryNumber: 120,
      section: '5A',
      title:
        'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
      pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
    };

    const resultado = metadataParser(metadatosMock);

    expect(resultadoEsperado).toStrictEqual(resultado);
  });

  it('parses metadata #2 half input', () => {
    const mockIncompleto = {
      ...metadatosMock,
      departamento: undefined,
    };

    const resultadoEsperado: Metadata = {
      department: '',
      date: new Date(2020, 3, 30),
      identifier: 'BOE-B-2020-13137',
      diaryNumber: 120,
      section: '5A',
      title:
        'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
      pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
    };

    const resultado = metadataParser(mockIncompleto);

    expect(resultadoEsperado).toStrictEqual(resultado);
  });
});
