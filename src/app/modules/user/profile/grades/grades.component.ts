import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-grades',
    template: `
        <div class="w-full p-4">
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./grades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent],
})
export default class GradesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
