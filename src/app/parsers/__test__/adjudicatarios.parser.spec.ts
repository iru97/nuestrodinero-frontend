import {
  Adjudicatarios,
  adjudicatariosVacio,
  adjudicatarioCreator,
} from '../../models';
import { DLContent, contenidoMock } from '../../mocks';
import { adjudicatariosParser } from '../adjudicatarios.parser';

describe('adjudicatarios specs', () => {
  it('retorna un array vacio le pasa undefined', () => {
    const resultadoEsperado = [];
    const resultado = adjudicatariosParser(undefined);
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('retorna el objeto por defecto si el contenido es undefined', () => {
    const expectedResult = adjudicatariosVacio();
    const givenResult = adjudicatarioCreator(undefined);
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('retorna un array vacio si algun valor asociado no existe', () => {
    // Arrange
    const mock: DLContent = { ...contenidoMock[0] };
    const resultadoEsperado = [];
    // Act
    // borramos valores asociados
    mock.dt = [];
    const resultado = adjudicatariosParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna los adjudicatarios con los valores asociados (nested)', () => {
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
    const resultadoEsperado: Adjudicatarios[] = [
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
    ];
    // Act
    const resultado = adjudicatariosParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it('retorna los adjudicatarios con los valores asociados (no nested)', () => {
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
    const resultadoEsperado: Adjudicatarios[] = [
      {
        direccion: 'España.',
        nif: '74918841K.',
        nombre: 'FRANCISCO JAVIER TORRES BARROSO.',
      },
    ];
    // Act
    const resultado = adjudicatariosParser(mock);
    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
