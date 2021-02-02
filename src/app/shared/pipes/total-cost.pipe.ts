import { Pipe, PipeTransform } from '@angular/core';
import { OfferValues } from '../../contracts/components/sellers-offers/offerValues.model';
import memo from 'memo-decorator';
import { Contract } from 'src/app/contracts/components/contract/contract.model';
import { Content } from 'src/app/contracts/components/contract/content.model';

@Pipe({
  name: 'totalCost',
})
export class TotalCostPipe implements PipeTransform {
  buildItem = (pyme: boolean, total: number) => ({ pyme, total });

  @memo()
  transform(collection: Contract[]): number {
    if (!collection || collection.length === 0) {
      return 0;
    }

    const contractContents: Content[] = collection.map((c) => c.content);
    let total = 0;

    contractContents.forEach((content: Content) => {
      if (content.awardees.length === 1) {
        total += content.offerValues[0].value;
      } else if (content.awardees.length > 1) {
        content.awardees.forEach((_, index) => {
          total += content.offerValues[index].value;
        });
      }
    });

    return total;
  }
}
