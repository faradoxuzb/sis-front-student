import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCurrency',
    standalone: true,
})
export class FormatCurrencyPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '0';
        }

        return Number(value).toLocaleString('sv-SE');
    }
}
