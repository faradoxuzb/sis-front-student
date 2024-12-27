import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-medicalInfo',
    template: `
        <div class="w-full p-4">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Medical info' | transloco }}
            </p>
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./medicalInfo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent, TranslocoModule],
})
export default class MedicalInfoComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
