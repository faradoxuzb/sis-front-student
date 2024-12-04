import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-medicalInfo',
    template: `
        <div class="w-full p-4">
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./medicalInfo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent],
})
export default class MedicalInfoComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
