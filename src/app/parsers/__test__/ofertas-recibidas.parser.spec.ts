import {
  OfertasRecibidas,
  ofertasRecibidasCreator,
  ofertasRecibidasVacio,
} from '../../models';
import { ofertasRecibidasParser } from '../ofertas-recibidas.parser';
import { DLContent, contenidoMock } from '../../mocks';

describe('ofertas recibidas specs', () => {
  it('retorna un array vacio si se le pasa undefined', () => {
    const resultadoEsperado = [];
    const resultado = ofertasRecibidasParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('retorna el objeto por defecto si el contenido es undefined', () => {
    const expectedResult = ofertasRecibidasVacio();
    const givenResult = ofertasRecibidasCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('retorna un array vacio si algun valor  no existe asociado', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = ofertasRecibidasParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna las ofertas recibidas con los valores asociados (nested)', () => {
    // Arrange
    const mock: DLContent = {
      dd: [
        {
          dl: [
            {
              dd: [
                {
                  dl: [
                    {
                      dd: ['1'],
                      dt: ['11.1.1) Número de ofertas recibidas: '],
                    },
                  ],
                },
                {
                  dl: [
                    {
                      dd: ['1'],
                      dt: ['11.2.1) Número de ofertas recibidas: '],
                    },
                  ],
                },
              ],
              dt: [
                '11.1) Contrato 2020C1AJ0189: ',
                '11.2) Contrato 2020C1AJ0189: ',
              ],
            },
          ],
        },
      ],
      dt: ['11. Ofertas recibidas: '],
    };
    const resultadoEsperado: OfertasRecibidas[] = [
      {
        numOfertas: 1,
        medio: 'Contrato 2020C1AJ0189',
      },
      {
        numOfertas: 1,
        medio: 'Contrato 2020C1AJ0189',
      },
    ];
    // Act
    const resultado = ofertasRecibidasParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna las ofertas recibidas con los valores asociados (no nested)', () => {
    // Arrange
    const mock: DLContent = {
      dd: [
        {
          dl: [
            {
              dd: ['1. '],
              dt: ['11.1) Número de ofertas recibidas: '],
            },
          ],
        },
      ],
      dt: ['11. Ofertas recibidas: '],
    };
    const resultadoEsperado: OfertasRecibidas[] = [
      {
        numOfertas: 1,
        medio: 'Número de ofertas recibidas',
      },
    ];
    // Act
    const resultado = ofertasRecibidasParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
