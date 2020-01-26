import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, charAmount: number): string {
    if (!value) {
      return '';
    }

    if (value.length <= charAmount) {
      return value.trim();
    }

    const truncated = value.replace(new RegExp('^(.{' + charAmount + '}[^\\s]*).*'), '$1');

    return truncated + (truncated.trim().length === value.trim().length ? '' : '...');
  }

}
