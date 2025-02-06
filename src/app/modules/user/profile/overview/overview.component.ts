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

@Component({
    selector: 'app-overview',
    template: `
        @if ($profileService.profileInfo$ | async; as profileInfo) {
            <div class="w-full">
                <div
                    class="mb-3 w-full rounded-[8px] bg-white p-2 shadow-xl sm:p-4"
                >
                    <div class="flex w-full items-center gap-3 md:w-[800px]">
                        <img
                            src="/images/noPhoto.png"
                            class="h-20 w-20 rounded-full"
                            alt=""
                        />
                        <div class="grid w-full grid-cols-1 sm:grid-cols-2">
                            <div class="flex flex-col gap-2">
                                <p class="font-medium uppercase">
                                    {{ profileInfo | appFullName }}
                                </p>
                                <p>
                                    {{ 'Student ID' | transloco }}:
                                    <span>
                                        {{ profileInfo.id }}
                                    </span>
                                </p>
                                <p class="w-full">
                                    {{ profileInfo.user.phone }}
                                </p>
                            </div>
                            <div class="flex flex-col gap-2">
                                <p class="text-primary-600">
                                    {{ profileInfo.currentGroup.groupName }}-
                                    {{
                                        profileInfo.currentGroup.classType
                                            | translateJson
                                            | async
                                    }}
                                </p>
                                <p class="w-full">
                                    {{ profileInfo.user.email }}
                                </p>
                                <p>
                                    {{ profileInfo.address }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex w-full flex-col gap-4 rounded-[8px] bg-white p-4 shadow-xl"
                >
                    <p class="text-[18px] font-semibold">
                        {{ 'At a glance' | transloco }}
                    </p>
                    <div class="grid w-full grid-cols-1 gap-2 sm:grid-cols-4">
                        @for (item of attendances; track $index) {
                            <div class="flex w-full">
                                <div
                                    [ngClass]="
                                        item.bgColor + ' ' + item.borderColor
                                    "
                                    class="flex w-20 items-center justify-center border text-white"
                                >
                                    <p class="text-[22px] font-bold">
                                        {{ item.count }}
                                    </p>
                                </div>
                                <div
                                    class="flex w-full items-center border px-2 sm:w-fit"
                                    [ngClass]="item.borderColor"
                                >
                                    <p class="font-medium">
                                        {{ item.type | transloco }}
                                        {{ 'day' | transloco }}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div class="flex items-center gap-3">
                        <p class="text-[18px] font-semibold">
                            {{ 'Schedule' | transloco }}
                        </p>
                        <div class="flex items-center">
                            <mat-icon
                                (click)="changeDate(1)"
                                class="cursor-pointer hover:text-blue-300"
                                >chevron_left</mat-icon
                            >
                            <mat-form-field>
                                <input
                                    matInput
                                    [(ngModel)]="date"
                                    [matDatepicker]="picker"
                                    (dateChange)="changeDate()"
                                />
                                <mat-datepicker-toggle
                                    matIconSuffix
                                    [for]="picker"
                                ></mat-datepicker-toggle>
                                <mat-datepicker #picker></mat-datepicker>
                            </mat-form-field>
                            <mat-icon
                                (click)="changeDate(2)"
                                class="cursor-pointer hover:text-blue-300"
                                >chevron_right</mat-icon
                            >
                        </div>
                    </div>
                    <div class="w-full">
                        @if (schedules()?.length !== 0) {
                            <table class="rounded-[10px] border">
                                <tbody>
                                    @for (
                                        item of schedules;
                                        track $index;
                                        let e = $even
                                    ) {
                                        <tr
                                            class=""
                                            [ngClass]="{ 'bg-[#f5f5f5]': e }"
                                        >
                                            <td class="text-gray-500">
                                                {{
                                                    item.dailyLesson.start_time
                                                }}
                                                -
                                                {{ item.dailyLesson.end_time }}
                                            </td>
                                            <td
                                                class="text-[20px] text-gray-500"
                                            >
                                                {{ item.grade }}
                                            </td>
                                            <td class="font-bold">
                                                {{
                                                    item.subject.name
                                                        | translateJson
                                                        | async
                                                }}
                                            </td>
                                            <td class="">
                                                {{
                                                    item.dailyLesson.teacher
                                                        .full_name
                                                }}
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        } @else {
                            <app-no-data
                                class="sm:h-[200px] sm:w-[200px]"
                            ></app-no-data>
                        }
                    </div>
                </div>
            </div>
        }
    `,
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
    ],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    ],
})
export default class OverviewComponent {
    public $profileService = inject(ProfileService);
    private $cdr = inject(ChangeDetectorRef);
    date = signal<Date>(new Date());
    schedules = signal<Schedule[]>(null);
    $user = inject(UserService);
    absent: number = 0;
    late: number = 0;
    present: number = 0;
    constructor(private _baseHttpService: BaseService) {
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
            url = url + '/' + studentId + '?' + dateFormat;
        } else {
            url = url + '?' + dateFormat;
        }

        this._baseHttpService.get<Schedule[]>(url).subscribe((res) => {
            this.schedules.set(res);
        });

        this.$cdr.markForCheck();
    }
}
