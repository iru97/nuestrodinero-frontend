import { Pipe, PipeTransform } from '@angular/core';
import { OfferValues } from '../components/sellers-offers/offerValues.model';
import memo from 'memo-decorator';

@Pipe({
  name: 'totalCost',
})
export class TotalCostPipe implements PipeTransform {
  @memo()
  transform(collection: OfferValues[]): number {
    if (!collection) {
      return 0;
    }

    return collection.reduce((acc, curr: OfferValues) => acc + curr.cost, 0);
  }
}
