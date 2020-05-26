import { defaultDocumento, Documento } from 'src/app/models';
import { documentoParser } from '../documento.parser';
import { documentoMock } from 'src/app/mocks/documento.mock';

describe('documento parser specs', () => {
  it('should return default document if undefined is passed', () => {
    const expectedResult = defaultDocumento();
    const givenResult = documentoParser(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return default document if its a malformed object', () => {
    const expectedResult = defaultDocumento();
    const givenResult = documentoParser({ random: 1 });
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return a parsed document', () => {
    const expectedResult: Documento = {
      contenido: {
        poderAdjudicador: {
          nombre: 'Subsecretaría de Cultura y Deporte.',
          nif: 'S2800239B.',
          direccion: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
          telefono: '',
          email: 'subsecretaria.mcd@cultura.gob.es',
          web: '',
          tipo: 'Administración General del Estado.',
          actividad: 'Cultura.',
        },
        ofertasRecibidas: [
          {
            numOfertas: 1,
            medio: 'Contrato 2020C1AJ0189',
          },
          {
            numOfertas: 1,
            medio: 'Contrato 2020C1AJ0189',
          },
        ],
        adjudicatarios: [
          {
            nombre: 'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
            nif: 'A28526275.',
            direccion: 'España.',
          },
          {
            nombre: 'COMPUSOF, S.A.,.',
            nif: 'A28793917.',
            direccion: 'España.',
          },
        ],
        detalle: ['30213100 (Ordenadores portátiles).'],
        descripcionLicitacion: [
          'Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19.',
        ],
        valorOferta: [
          {
            valor: 33235.2,
            medio: 'Contrato 2020C1AJ0189',
          },
          {
            valor: 12780,
            medio: 'Contrato 2020C1AJ0189',
          },
        ],
        fechaAnuncio: '27 de abril de 2020.',
      },
      metadatos: {
        departamento: 'Ministerio de Cultura y Deporte',
        fecha: new Date(2020, 3, 30),
        identificador: 'BOE-B-2020-13137',
        numDiario: 120,
        seccion: '5A',
        titulo:
          'Anuncio de formalización de contratos de: Subsecretaría de Cultura y Deporte. Objeto: Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19. Expediente: 2020C1AJ0189.',
        pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13137.pdf',
      },
    };
    const givenResult = documentoParser(documentoMock);
    expect(givenResult).toStrictEqual(expectedResult);
  });
});
