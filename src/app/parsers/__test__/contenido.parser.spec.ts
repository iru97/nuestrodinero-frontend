import { Contenido, contenidoVacio } from '../../models';
import { contenidoParser } from '../contenido.parser';
import { contenidoMock } from '../../mocks';

describe('texto parser specs', () => {
  it('retorna en valor por defecto si se pasa null|undefined', () => {
    const valorEsperado: Contenido = contenidoVacio();
    const valor: Contenido = contenidoParser(undefined);

    expect(valor).toStrictEqual(valorEsperado);
  });

  it('retorna el contenido parseado con los datos que se haya podido, en su defecto retornara ese obetjo en su forma porDefecto', () => {
    const mock = { ...contenidoMock };
    const resultado = contenidoParser(mock[0]);
    const resultadoEsperado: Contenido = {
      adjudicatarios: [
        {
          direccion: 'España.',
          nif: 'A28526275.',
          nombre: 'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
        },
        {
          direccion: 'España.',
          nif: 'A28793917.',
          nombre: 'COMPUSOF, S.A.,.',
        },
      ],
      descripcionLicitacion: [
        'Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19.',
      ],
      detalle: ['30213100 (Ordenadores portátiles).'],
      fechaAnuncio: '27 de abril de 2020.',
      ofertasRecibidas: [
        {
          medio: 'Contrato 2020C1AJ0189',
          numOfertas: 1,
        },
        {
          medio: 'Contrato 2020C1AJ0189',
          numOfertas: 1,
        },
      ],
      poderAdjudicador: {
        actividad: 'Cultura.',
        direccion: 'Pz del Rey, 1. Madrid. Madrid. 28004. España.',
        email: 'subsecretaria.mcd@cultura.gob.es',
        nif: 'S2800239B.',
        nombre: 'Subsecretaría de Cultura y Deporte.',
        telefono: '',
        tipo: 'Administración General del Estado.',
        web: '',
      },
      valorOferta: [
        {
          medio: 'Contrato 2020C1AJ0189',
          valor: 33235.2,
        },
        {
          medio: 'Contrato 2020C1AJ0189',
          valor: 12780,
        },
      ],
    };
    expect(resultadoEsperado).toEqual(resultado);
  });
});
