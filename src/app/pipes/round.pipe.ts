import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.round(value * 100) / 100;
  }

}
