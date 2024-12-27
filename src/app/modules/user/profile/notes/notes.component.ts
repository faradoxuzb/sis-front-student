import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ComingSoonComponent } from 'app/modules/shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-notes',
    template: `
        <div class="w-full p-4">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Notes/Incidents' | transloco }}
            </p>
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./notes.component.scss'],
    standalone: true,
    imports: [ComingSoonComponent, TranslocoModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
