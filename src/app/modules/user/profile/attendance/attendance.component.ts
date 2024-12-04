import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-attendance',
    template: `
        <div class="w-full p-4">
            <app-coming-soon></app-coming-soon>
        </div>
    `,
    styleUrls: ['./attendance.component.scss'],
    standalone: true,
    imports: [AsyncPipe, ComingSoonComponent],
})
export default class AttendanceComponent implements OnInit {
    constructor() {}
    protected _profileService = inject(ProfileService);
    ngOnInit() {}
}
