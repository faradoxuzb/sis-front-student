import { Pipe, type PipeTransform } from '@angular/core';
import { IPerson } from '../models/person.model';


@Pipe({
  name: 'appFullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(value: IPerson | null | undefined, short = false) {
    if (!value) {
      return '';
    }
    let fullName = '';
    if (value.last_name) {
      fullName = `${value.last_name} `;
    }
    if (value.first_name) {
      fullName += short ? `${value.first_name[0]}. ` : `${value.first_name} `;
    }
    if (value.middle_name) {
      fullName += short ? `${value.middle_name[0]}.` : value.middle_name;
    }
    return fullName;
  }
}
