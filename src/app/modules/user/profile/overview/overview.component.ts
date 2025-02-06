import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { NoDataComponent } from 'app/modules/shared/components/no-data/no-data.component';
import { Dates } from '../attendance/attendance.component';
import { ProfileService } from '../profile.service';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './customDateFormat';
import { Schedule } from './module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        AsyncPipe,
        FullNamePipe,
        TranslocoModule,
        TranslateJsonPipe,
        NgClass,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        DatePipe,
        TranslateJsonPipe,
        AsyncPipe,
        NoDataComponent,
        FuseCardComponent,
        RouterLink,
        NgxSkeletonLoaderModule
    ],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    ],
})
export default class OverviewComponent {
    public $profileService = inject(ProfileService);
    private $cdr = inject(ChangeDetectorRef);
    private route = inject(ActivatedRoute);
    profileInfo = this.route.snapshot.data.profileInfo;
    date = signal<Date>(new Date());
    schedules: Observable<any[]>;
    $user = inject(UserService);
    absent: number = 0;
    late: number = 0;
    present: number = 0;
    constructor(private _baseHttpService: BaseService) {
        console.log(this.route.snapshot);
        this.changeDate();
        const studentId = this.$user.chooseStudentId();
        let url = 'students/activities';
        if (studentId) {
            url = url + '/' + studentId;
        }
        this._baseHttpService.get<Dates[]>(url).subscribe((res) => {
            for (let x of res) {
                if (x.status == 'absent') {
                    this.absent += 1;
                }
                if (x.status == 'late') {
                    this.late += 1;
                }
                if (x.status == 'present') {
                    this.present += 1;
                }
            }
            this.attendances = [
                {
                    type: 'Absent',
                    borderColor: 'border-red-600',
                    bgColor: 'bg-red-600',
                    count: this.absent,
                },
                {
                    type: 'Late',
                    borderColor: 'border-[#FFBF00]',
                    bgColor: 'bg-[#FFBF00]',
                    count: this.late,
                },
                {
                    type: 'Present',
                    borderColor: 'border-green-400',
                    bgColor: 'bg-green-400',
                    count: this.present,
                },
            ];
            this.$cdr.markForCheck();
        });
    }
    attendances = [];
    changeDate(index?: number) {
        if (index == 1) {
            this.date().setDate(this.date().getDate() - 1);
        } else if (index == 2) {
            this.date().setDate(this.date().getDate() + 1);
        }

        this.date.set(new Date(this.date()));

        const dateFormat = new DatePipe('en-Us').transform(
            this.date(),
            'yyyy-MM-dd'
        );

        const studentId = this.$user.chooseStudentId();
        let url = 'students/daily-lessons';
        if (studentId) {
            url = url + '/' + studentId + '?date=' + dateFormat;
        } else {
            url = url + '?date=' + dateFormat;
        }

        this.schedules = this._baseHttpService.get<any[]>(url).pipe(
            map((res) => {
                //removve seconds from time
                res.forEach((element) => {
                    element.dailyLesson.start_time = element.dailyLesson.start_time.slice(0, 5);
                    element.dailyLesson.end_time = element.dailyLesson.end_time.slice(0, 5);
                });
                return res;

            })
        );

        this.$cdr.markForCheck();
    }
}
