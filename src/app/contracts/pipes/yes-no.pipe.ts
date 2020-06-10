import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  @memo()
  transform(value: boolean): string {
    if (!value) return 'No';

    return value ? 'Si' : 'No';
  }
}
