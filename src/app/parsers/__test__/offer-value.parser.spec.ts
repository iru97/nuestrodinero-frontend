import { DLContent, contenidoMock } from '../../mocks';
import { offerValuesParser } from '../offer-values.parser';
import {
  OfferValues,
  emptyOfferValue,
  offerValueCreator,
} from 'src/app/contracts/components/sellers-offers/offerValues.model';

describe('offers value specs', () => {
  it('returns an empty array if undefined|null is passed', () => {
    const resultadoEsperado = [];
    const resultado = offerValuesParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('returns empty offer if undefined|null is passed', () => {
    const expectedResult = emptyOfferValue();
    const givenResult = offerValueCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('returns an empty array if we have no matches', () => {
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

  it('parses offer values (nested)', () => {
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

  it('parses offer values (nested)', () => {
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
