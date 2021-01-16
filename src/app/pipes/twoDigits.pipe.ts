import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'twoDigits' })
export class TwoDigits implements PipeTransform {
  isNumber(n: any) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  transform(value: any): any {
    if (value === undefined) return 'undefined';
    if (this.isNumber(value) === false) return value;
    return (Math.round(value * 100) / 100).toFixed(2);
  }
}

//
