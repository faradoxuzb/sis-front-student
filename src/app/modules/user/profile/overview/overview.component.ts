import { AsyncPipe, DatePipe, KeyValuePipe, NgClass } from '@angular/common';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { NoDataComponent } from 'app/modules/shared/components/no-data/no-data.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable, map } from 'rxjs';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { ProfileService } from '../profile.service';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './customDateFormat';
import { GradePipe } from './grade.pipe';
import { DailySchedule, OverviewAttendance } from './module';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
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
        NgxSkeletonLoaderModule,
        GradePipe,
        KeyValuePipe,
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

    overviewAttendance = signal<OverviewAttendance>(null);

    schedules: Observable<DailySchedule>;

    $user = inject(UserService);

    constructor(private _baseHttpService: BaseService) {
        this.changeDate();
        const studentId = this.$user.chooseStudentId();
        let link = 'students/overviews/yearly-lessons';
        if (studentId) {
            link = link + '/' + studentId;
        }
        this._baseHttpService.get<OverviewAttendance>(link).subscribe((res) => {
            this.overviewAttendance.set(res);
        });
    }

    changeDate(index?: number) {
        this.schedules = null;
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
        let url = 'students/overviews/daily-lessons';
        if (studentId) {
            url = url + '/' + studentId + '?date=' + dateFormat;
        } else {
            url = url + '?date=' + dateFormat;
        }

        this.schedules = this._baseHttpService.get<DailySchedule>(url).pipe(
            map((res) => {
                //removve seconds from time
                res.lessons.forEach((element) => {
                    element.start_time = element.start_time.slice(0, 5);
                    element.end_time = element.end_time.slice(0, 5);
                });
                return res;
            })
        );

        this.$cdr.markForCheck();
    }
}
