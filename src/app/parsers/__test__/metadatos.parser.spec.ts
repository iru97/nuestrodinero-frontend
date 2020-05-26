import { metadatosVacios, Metadatos } from '../../models';
import { metadatosParser } from '../metadataos.parser';
import { metadatosMock } from 'src/app/mocks';

describe('metadatos parser', () => {
  it('retorna metadatos vacios si no se le pasa argumento', () => {
    const resultadoEsperado = metadatosVacios();
    const resultado = metadatosParser(undefined);

    expect(resultado).toEqual(resultadoEsperado);
  });

  it('retorna metadatos segun el parametro pasado', () => {
    const resultadoEsperado: Metadatos = {
      departamento: 'Ministerio de Cultura y Deporte',
      fecha: new Date(2020, 3, 30),
      identificador: 'BOE-B-2020-13137',
      numDiario: 120,
      seccion: '5A',
      titulo:
        'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
      pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
    };

    const resultado = metadatosParser(metadatosMock);

    expect(resultadoEsperado).toStrictEqual(resultado);
  });

  it('retorna metadatos si le pasamos un objeto incompleto', () => {
    const mockIncompleto = {
      ...metadatosMock,
      departamento: undefined,
    };

    const resultadoEsperado: Metadatos = {
      departamento: '',
      fecha: new Date(2020, 3, 30),
      identificador: 'BOE-B-2020-13137',
      numDiario: 120,
      seccion: '5A',
      titulo:
        'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
      pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
    };

    const resultado = metadatosParser(mockIncompleto);

    expect(resultadoEsperado).toStrictEqual(resultado);
  });
});
