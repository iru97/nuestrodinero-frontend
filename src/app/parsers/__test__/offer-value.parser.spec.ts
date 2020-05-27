import { DLContent, contenidoMock } from '../../mocks';
import { offerValuesParser } from '../offer-values.parser';
import {
  OfferValues,
  emptyOfferValue,
  offerValueCreator,
} from 'src/app/contracts/components/sellers-offers/offerValues.model';

describe('valor ofertas specs', () => {
  it('retorna un array vacio si se le pasa undefined', () => {
    const resultadoEsperado = [];
    const resultado = offerValuesParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('retorna el objeto por defecto si el contenido es undefined', () => {
    const expectedResult = emptyOfferValue();
    const givenResult = offerValueCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('retorna un array vacio si algun valor  no existe asociado', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = offerValuesParser(mock);
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
    const resultadoEsperado: OfferValues[] = [
      {
        cost: 33235.2,
        text: 'Contrato 2020C1AJ0189',
      },
      {
        cost: 12780,
        text: 'Contrato 2020C1AJ0189',
      },
    ];
    // Act
    const resultado = offerValuesParser(mock);
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
    const resultadoEsperado: OfferValues[] = [
      {
        cost: 4300000,
        text: 'Valor de la oferta seleccionada',
      },
    ];
    // Act
    const resultado = offerValuesParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
