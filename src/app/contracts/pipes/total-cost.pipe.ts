import { Pipe, PipeTransform } from '@angular/core';
import { OfferValues } from '../components/sellers-offers/offerValues.model';

@Pipe({
  name: 'totalCost',
})
export class TotalCostPipe implements PipeTransform {
  transform(collection: OfferValues[]): number {
    if (!collection) {
      return 0;
    }

    return collection.reduce((acc, curr: OfferValues) => acc + curr.cost, 0);
  }
}
