import { TotalCostPipe } from './total-cost.pipe';
import { OfferValues } from '../../contracts/components/sellers-offers/offerValues.model';
import { Contract } from 'src/app/contracts/components/contract/contract.model';
import { Seller } from 'src/app/contracts/components/sellers-offers/sellers.model';

type PartialContent = Partial<{ awardees: Partial<Seller>[]; offerValues: Partial<OfferValues>[] }>;
type PartialContract = Partial<{ content: PartialContent }>;

describe('ReduceCollectionPipe', () => {
  it('create an instance', () => {
    const pipe = new TotalCostPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 0 if null|undefined is passed', () => {
    const pipe = new TotalCostPipe();
    const givenResultNull = pipe.transform(null);
    const givenResultUndefined = pipe.transform(undefined);
    expect(givenResultNull).toEqual(0);
    expect(givenResultUndefined).toEqual(0);
  });

  it('should return 0 if empty array is passed', () => {
    const pipe = new TotalCostPipe();
    const collection = [];
    const givenResult = pipe.transform(collection);
    expect(givenResult).toEqual(0);
  });

  it('should return 1 if given 1 offerValues', () => {
    const pipe = new TotalCostPipe();
    const partialContent: PartialContent = {
      offerValues: [
        {
          value: 1,
          text: '',
        },
        {
          value: 2,
          text: '',
        },
      ],
      awardees: [{}],
    };
    const collection: PartialContract[] = [
      {
        content: partialContent,
      },
    ];
    const givenResult = pipe.transform(collection as Contract[]);
    expect(givenResult).toEqual(1);
  });

  it('should return 4 if given 2 offersValues', () => {
    const pipe = new TotalCostPipe();
    const partialContent: PartialContent = {
      offerValues: [
        {
          value: 2,
          text: '',
        },
        {
          value: 2,
          text: '',
        },
      ],
      awardees: [{}, {}],
    };
    const collection: PartialContract[] = [
      {
        content: partialContent,
      },
    ];
    const givenResult = pipe.transform(collection as Contract[]);
    expect(givenResult).toEqual(4);
  });
});
