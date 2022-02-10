import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelToNumber',
})
export class VowelToNumberPipe implements PipeTransform {
  transform(value: string): string {
    interface Vowels {
      [x: string]: string;
    }

    const vowels: Vowels = {
      a: '@',
      e: '3',
      i: '1',
      o: '0',
      u: '└┘',
    };

    return value
      .split('')
      .map((word: string) => (word in vowels) ? vowels[word] : word)
      .join('');
  }
}
