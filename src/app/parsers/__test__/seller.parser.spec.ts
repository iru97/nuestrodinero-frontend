import { DLContent, contenidoMock } from '../../mocks';
import { sellersParser } from '../seller.parser';
import {
  emptySeller,
  sellerCreator,
  Seller,
} from 'src/app/contracts/components/sellers-offers/sellers.model';

describe('sellers specs', () => {
  it('returns an empty array if undefined|null is passed', () => {
    const resultadoEsperado = [];
    const resultado = sellersParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('returns an empty seller if undefined|null is passed', () => {
    const expectedResult = emptySeller();
    const givenResult = sellerCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('returns an empty array if we have no matches', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = sellersParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('parses sellers (nested)', () => {
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
                      dd: [
                        'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
                        'A28526275.',
                        'España.',
                      ],
                      dt: [
                        '12.1.1) Nombre: ',
                        '12.1.2) Número de identificación fiscal: ',
                        '12.1.7) País: ',
                      ],
                    },
                  ],
                },
                {
                  dl: [
                    {
                      dd: ['COMPUSOF, S.A.,.', 'A28793917.', 'España.'],
                      dt: [
                        '12.2.1) Nombre: ',
                        '12.2.2) Número de identificación fiscal: ',
                        '12.2.7) País: ',
                      ],
                    },
                  ],
                },
              ],
              dt: [
                '12.1) Contrato 2020C1AJ0189: ',
                '12.2) Contrato 2020C1AJ0189: ',
              ],
            },
          ],
        },
      ],
      dt: ['12. Adjudicatarios: '],
    };
    const resultadoEsperado: Seller[] = [
      {
        address: 'España.',
        nif: 'A28526275.',
        name: 'AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.',
      },
      {
        address: 'España.',
        nif: 'A28793917.',
        name: 'COMPUSOF, S.A.,.',
      },
    ];
    // Act
    const resultado = sellersParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('parses sellers (not nested)', () => {
    // Arrange
    const mock: DLContent = {
      dd: [
        {
          dl: [
            {
              dd: [
                'FRANCISCO JAVIER TORRES BARROSO.',
                '74918841K.',
                'España.',
                'El adjudicatario es una PYME.',
              ],
              dt: [
                '12.1) Nombre: ',
                '12.2) Número de identificación fiscal: ',
                '12.7) País: ',
                '12.13) ',
              ],
            },
          ],
        },
      ],
      dt: ['12. Adjudicatarios: '],
    };
    const resultadoEsperado: Seller[] = [
      {
        address: 'España.',
        nif: '74918841K.',
        name: 'FRANCISCO JAVIER TORRES BARROSO.',
      },
    ];
    // Act
    const resultado = sellersParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});