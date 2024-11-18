import { Pipe, type PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { map, Observable, startWith } from 'rxjs';
import { MultiLanguageField } from '../models/multi-language-field.model';

@Pipe({
    name: 'translateJson',
    standalone: true,
})
export class TranslateJsonPipe implements PipeTransform {
    constructor(private $transloco: TranslocoService) {}

    transform(value: MultiLanguageField): Observable<string> {
        return this.$transloco.langChanges$.pipe(
            startWith({ lang: this.$transloco.getActiveLang() }),
            map((w) => {
                return (
                    value[w as keyof MultiLanguageField] || value['en'] || ''
                );
            })
        );
    }
}
