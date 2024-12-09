import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { Constants } from 'app/config/constants';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile/profile.service';
import { ActivatedRoute } from '@angular/router';

// template: ``,
@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    standalone: true,
    imports: [
        NgTemplateOutlet,
        AsyncPipe,
        TranslocoModule,
        TranslateJsonPipe,
        FullNamePipe,
        NgClass
    ],
})
export default class ScheduleComponent implements OnInit {
    readonly WEEK_DAYS = Constants.WEEK_DAYS;
    readonly WEEK_DAYSSHORT = Constants.WEEK_DAYSSHORT;
    readonly TIME = Constants.time;
    activeDay = 0;
    private readonly SCHEDULE_TEMPLATE = Array.from({
        length: Constants.DEFAULT_CLASS_NUMBERS,
    }).map((classNumber, index) => {
        return {
            classNumber: index + 1,
            days: [
                {
                    subjects: [],
                },
                {
                    subjects: [],
                },
                {
                    subjects: [],
                },
                {
                    subjects: [],
                },
                {
                    subjects: [],
                },
                {
                    subjects: [],
                },
            ],
        };
    });

    schedule: { classNumber: number; days: { subjects: any[] }[] }[];

    protected $cdr = inject(ChangeDetectorRef);
    protected $transloco = inject(TranslocoModule);
    protected $profileService = inject(ProfileService);
    protected $activatedRoute = inject(ActivatedRoute);

    maxShowClassNumber = Constants.DEFAULT_CLASS_NUMBERS;

    constructor() {
        // this.initSchedule();
        this.schedule = structuredClone(this.SCHEDULE_TEMPLATE);
    }

    ngOnInit(): void {
        const id = this.$activatedRoute.snapshot.paramMap.get('id');
        this.$profileService.getSchedule(+id).subscribe((lessons) => {
            if (lessons.length > 0) {
                this.schedule = structuredClone(this.SCHEDULE_TEMPLATE);
                lessons.forEach((lesson) => {
                    const classNumber = this.schedule.find(
                        (s) => s.classNumber === lesson.class_number
                    );
                    if (classNumber) {
                        const day = classNumber.days[+lesson.day - 1];
                        day.subjects.push(structuredClone(lesson));
                    }
                });
            }
        });
    }
}
