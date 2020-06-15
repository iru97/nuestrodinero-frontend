import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  @memo()
  transform(yyyymmdd: string): string {
    if (!yyyymmdd) return '';

    let yyyy = yyyymmdd.substring(0, 4);
    let mm = yyyymmdd.substring(4, 6);
    let dd = yyyymmdd.substring(6);

    return `${dd}/${mm}/${yyyy}`;
  }
}
