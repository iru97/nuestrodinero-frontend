import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titulo',
})
export class TituloPipe implements PipeTransform {
  transform(value: string): string {
    let colonIndex = value.indexOf(':');
    let periodIndex = value.indexOf('.');

    return periodIndex !== -1 && colonIndex !== -1
      ? value.substring(colonIndex + 1, periodIndex)
      : value;
  }
}
