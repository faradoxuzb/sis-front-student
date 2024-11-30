import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-contracts',
    template: `
        <div class="w-full p-4">
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./contracts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent],
})
export default class ContractsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
