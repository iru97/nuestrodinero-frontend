import { offersReceivedParser } from '../offers-received.parser';
import { DLContent, contenidoMock } from '../../mocks';
import {
  OffersReceived,
  emptyOffersReceived,
  offersReceivedCreator,
} from 'src/app/contracts/components/sellers-offers/offersReceivedmodel';

describe('ofertas recibidas specs', () => {
  it('returns an empty array if undefined|null is passed', () => {
    const resultadoEsperado = [];
    const resultado = offersReceivedParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('returns empty offer if undefined|null is passed', () => {
    const expectedResult = emptyOffersReceived();
    const givenResult = offersReceivedCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('returns an empty array if we have no matches', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = offersReceivedParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('parses offer received (nested)', () => {
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
    const resultadoEsperado: OffersReceived[] = [
      {
        totalOffers: 1,
        text: 'Contrato 2020C1AJ0189',
      },
      {
        totalOffers: 1,
        text: 'Contrato 2020C1AJ0189',
      },
    ];
    // Act
    const resultado = offersReceivedParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('parses offer recevied (not nested)', () => {
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
    const resultadoEsperado: OffersReceived[] = [
      {
        totalOffers: 1,
        text: 'Número de ofertas recibidas',
      },
    ];
    // Act
    const resultado = offersReceivedParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
