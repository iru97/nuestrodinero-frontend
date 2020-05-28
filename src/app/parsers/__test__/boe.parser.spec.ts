import { boeParser } from '../boe.parser';
import { boeMock, BoeAPiModel } from '../../mocks/boe.mock';
import { BOE, defaultBOEVacio } from 'src/app/models/boe.model';

describe('boe model spec', () => {
  it('should return a boe with empty array of id if arguments are undefined', () => {
    // Arrange
    const expectedResult: BOE = defaultBOEVacio();
    // Act
    const givenResult: BOE = boeParser(undefined);
    // Assert
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return a boe with empty array if the arguments are malformed', () => {
    // Arrange
    const expectedResult: BOE = defaultBOEVacio();
    // Act
    const givenResult: BOE = boeParser({ random: 1 } as any);
    // Assert
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('should return a boe with a list of the Anuncios Ids', () => {
    // Arrange
    const mock: BoeAPiModel = { ...boeMock };
    const expectedResult: BOE = {
      idAnuncio: ['BOE-B-2020-13442', 'BOE-B-2020-13445'],
    };
    // Act
    const givenResult: BOE = boeParser(mock);
    // Assert
    expect(givenResult).toStrictEqual(expectedResult);
  });
});
