import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComingSoonComponent } from 'app/modules/shared/components/coming-soon/coming-soon.component';

@Component({
    selector: 'app-notes',
    template: `
        <div class="w-full p-4">
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./notes.component.scss'],
    standalone: true,
    imports: [ComingSoonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
