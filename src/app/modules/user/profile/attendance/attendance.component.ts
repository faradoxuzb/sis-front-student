import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-attendance',
    template: `

    `,
    styleUrls: ['./attendance.component.scss'],
    standalone: true,
    imports: [AsyncPipe],
})
export class AttendanceComponent implements OnInit {
    constructor() {}
    protected _profileService = inject(ProfileService);
    ngOnInit() {

    }
}
