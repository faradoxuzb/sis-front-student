import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appNoAvatar',
  standalone: true,
})
export class NoAvatarPipe implements PipeTransform {
  transform(value: string | null | undefined): unknown {
    if (!value || value === '') {
      return './assets/images/avatar-anonym.png';
    }
    return value;
  }
}
