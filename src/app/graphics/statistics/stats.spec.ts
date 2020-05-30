import { pymeStats } from './stats';
import { contractCollectionMock } from 'src/app/mocks/contract-collection.mock';
import { PymeStats } from './stats.model';

describe('stats specs', () => {
  it('should return stats from pymes & non-pymes', () => {
    const expectedResult = [
      { numberOfCompanies: 4, label: 'PYMES', value: 50080.88 },
      { numberOfCompanies: 7, label: 'NO PYMES', value: 1550123.84 },
    ];

    const givenResult: PymeStats[] = pymeStats(contractCollectionMock);

    console.log('givenResult', givenResult);

    expect(givenResult).toStrictEqual(expectedResult);
  });
});
