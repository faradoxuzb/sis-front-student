import { AsyncPipe, DatePipe, KeyValuePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
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
import { Observable, map, distinctUntilChanged } from 'rxjs';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { ProfileService } from '../profile.service';
import { GradePipe } from './grade.pipe';
import { DailySchedule, OverviewAttendance } from './module';
import { DateTime } from 'luxon';

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
        ReactiveFormsModule,
    ]
})
export default class OverviewComponent {
    public $profileService = inject(ProfileService);

    private $cdr = inject(ChangeDetectorRef);

    private route = inject(ActivatedRoute);
    datePickerControl = DateTime.now();

    profileInfo = this.route.snapshot.data.profileInfo;

    overviewAttendance = signal<OverviewAttendance>(null);

    schedules: Observable<DailySchedule>;

    $user = inject(UserService);

    constructor(private _baseHttpService: BaseService) {
        const studentId = this.$user.chooseStudentId();
        let link = 'students/overviews/yearly-lessons';
        if (studentId) {
            link = link + '/' + studentId;
        }
        this._baseHttpService.get<OverviewAttendance>(link).subscribe((res) => {
            this.overviewAttendance.set(res);
        });
        this.load(this.datePickerControl.toFormat('yyyy-MM-dd'));
    }

    changeDate(index?: number) {
        this.datePickerControl = this.datePickerControl.plus({ days: index });
        this.schedules = null;
        const dateFormat = this.datePickerControl.toFormat('yyyy-MM-dd') ;
        this.load(dateFormat);

    }

    load(date) {
        const studentId = this.$user.chooseStudentId();
        let url = 'students/overviews/daily-lessons';
        if (studentId) {
            url = url + '/' + studentId + '?date=' + date;
        } else {
            url = url + '?date=' + date;
        }

        this.schedules = this._baseHttpService.get<DailySchedule>(url).pipe(
            map((res) => {
                res.lessons.forEach((element) => {
                    element.start_time = element.start_time.slice(0, 5);
                    element.end_time = element.end_time.slice(0, 5);
                });
                this.$cdr.markForCheck();
                return res;
            })
        );
    }
}
