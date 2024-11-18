import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appIdentity',
  standalone: true,
})
export class IdentityPipe implements PipeTransform {
  // {identity_number, identity_serial} | null | undefined
  transform(value: any): string {
    if (!value) {
      return '';
    }

    return `${value.identity_serial} ${value.identity_number}`;
  }
}
