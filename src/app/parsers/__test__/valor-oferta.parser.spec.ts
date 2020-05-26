import {
  ValoresOfertas,
  valorOfertasVacio,
  valorOfertaCreator,
} from '../../models';
import { valorOfertaParser } from '../valor-oferta.parser';
import { DLContent, contenidoMock } from '../../mocks';

describe('valor ofertas specs', () => {
  it('retorna un array vacio si se le pasa undefined', () => {
    const resultadoEsperado = [];
    const resultado = valorOfertaParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('retorna el objeto por defecto si el contenido es undefined', () => {
    const expectedResult = valorOfertasVacio();
    const givenResult = valorOfertaCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('retorna un array vacio si algun valor  no existe asociado', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = valorOfertaParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna los valores de las ofertas con los valores asociados (nested)', () => {
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
                      dd: ['33.235,20 euros.'],
                      dt: ['13.1.1) Valor de la oferta seleccionada: '],
                    },
                  ],
                },
                {
                  dl: [
                    {
                      dd: ['12.780,00 euros.'],
                      dt: ['13.2.1) Valor de la oferta seleccionada:'],
                    },
                  ],
                },
              ],
              dt: [
                '13.1) Contrato 2020C1AJ0189: ',
                '13.2) Contrato 2020C1AJ0189: ',
              ],
            },
          ],
        },
      ],
      dt: ['13. Valor de las ofertas: '],
    };
    const resultadoEsperado: ValoresOfertas[] = [
      {
        valor: 33235.2,
        medio: 'Contrato 2020C1AJ0189',
      },
      {
        valor: 12780,
        medio: 'Contrato 2020C1AJ0189',
      },
    ];
    // Act
    const resultado = valorOfertaParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna los valores de las ofertas con los valores asociados (no nested)', () => {
    // Arrange
    const mock: DLContent = {
      dd: [
        {
          dl: [
            {
              dd: ['4.300.000,00 euros. '],
              dt: ['13.1) Valor de la oferta seleccionada: '],
            },
          ],
        },
      ],
      dt: ['13. Valor de las ofertas: '],
    };
    const resultadoEsperado: ValoresOfertas[] = [
      {
        valor: 4300000,
        medio: 'Valor de la oferta seleccionada',
      },
    ];
    // Act
    const resultado = valorOfertaParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
