import { Pipe, type PipeTransform } from '@angular/core';
import { Constants } from 'app/config/constants';
import { NgxMaskPipe } from 'ngx-mask';

@Pipe({
  name: 'appPhone',
  standalone: true,
})
export class PhonePipe extends NgxMaskPipe implements PipeTransform {
  override transform(value: any): string {
    if (!value) {
      return '';
    }
    return `${Constants.PHONE_PREFIX}${super.transform(value, '(00) 000 00 00')}`;
  }
}
