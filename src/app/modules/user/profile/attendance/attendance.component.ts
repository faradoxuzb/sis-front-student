import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { isEqualDate } from 'app/core/utils/util';
import { DayStatusDirective } from './day-status.directive';
import { MonthNamePipe } from './month-name.pipe';

export interface MyDay {
    date: number;
    fullDate: Date;
    isCurrentMonth: boolean;
    daystatus?: 'absent' | 'late' | 'present';
    isDayOff?: boolean;
}
export interface Dates {
    date: Date;
    status: 'absent' | 'late' | 'present';
}

@Component({
    selector: 'app-attendance',
    template: `
        <div class="w-full py-2 px-4">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Attendance' | transloco }}
            </p>
            <div class="mb-5 flex w-full justify-end gap-10 font-medium">
                <div class="flex items-center gap-2">
                    <div class="h-6 w-6 rounded-[8px] bg-red-600"></div>
                    <p>{{ 'Absent' | transloco }}</p>
                    -
                    <p>{{ absent }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-6 w-6 rounded-[8px] bg-[#FFBF00]"></div>
                    <p>{{ 'Late' | transloco }}</p>
                    -
                    <p>{{ late }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-6 w-6 rounded-[8px] bg-green-400"></div>
                    <p>{{ 'Present' | transloco }}</p>
                    -
                    <p>{{ present }}</p>
                </div>
            </div>
            <div
                class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
                @for (month of data; track $index) {
                    <div
                        class="flex flex-col gap-2 rounded-2xl bg-white p-4 text-center"
                    >
                        <h2 class="py-2 font-semibold">
                            {{ month.month | appMonthName | transloco }}
                        </h2>
                        <div class="grid grid-cols-7 gap-1 py-2 font-semibold">
                            <span>{{ 'Mon' | transloco }}</span>
                            <span>{{ 'Tue' | transloco }}</span>
                            <span>{{ 'Wed' | transloco }}</span>
                            <span>{{ 'Thu' | transloco }}</span>
                            <span>{{ 'Fri' | transloco }}</span>
                            <span>{{ 'Sat' | transloco }}</span>
                            <span>{{ 'Sun' | transloco }}</span>
                        </div>

                        <div class="grid grid-cols-7 gap-1">
                            @for (day of month.data; track day.fullDate) {
                                <span
                                    appDayStatus
                                    [day]="day"
                                    class="rounded-[8px] p-2 font-medium"
                                    >{{ day.date }}</span
                                >
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
    styleUrls: ['./attendance.component.scss'],
    standalone: true,
    imports: [MonthNamePipe, TranslocoModule, DayStatusDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AttendanceComponent {
    data: {
        month: number;
        data: { date: number; fullDate: Date; isCurrentMonth: boolean }[];
    }[] = [];
    absent = 0;
    late = 0;
    present = 0;
    $baseHttp = inject(BaseService);
    $router = inject(Router);
    $cdr = inject(ChangeDetectorRef);
    $user = inject(UserService);
    dates: Dates[] = [];

    constructor() {
        const studentId = this.$user.chooseStudentId();
        let url = 'students/activities';
        if (studentId) {
            url = url + '/' + studentId;
        }
        this.$baseHttp.get<Dates[]>(url).subscribe((res) => {
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
            this.dates = res;
            const startCalendarDate = new Date(2024, 8, 1);
            this.makeCalendar(startCalendarDate);
            this.$cdr.markForCheck();
        });
    }

    makeCalendar(startDate: Date) {
        for (let i = 0; i < 12; i++) {
            const startMonth = new Date(
                startDate.getFullYear(),
                startDate.getMonth() + i,
                1
            );
            this.data.push({
                month: startMonth.getMonth(),
                data: this.makeMonth(startMonth),
            });
        }
    }

    makeMonth(startMonth: Date) {
        const months: MyDay[] = [];
        const currentMonth = startMonth.getMonth();
        startMonth.setDate(1);
        const firstDay = startMonth.getDay();
        startMonth.setDate(startMonth.getDate() - ((firstDay + 6) % 7));
        for (let i = 0; i < 42; i++) {
            const fullDate = new Date(
                startMonth.getFullYear(),
                startMonth.getMonth(),
                startMonth.getDate()
            );
            let findDayStatus = this.dates.find((h) =>
                isEqualDate(h.date, fullDate)
            );
            let dayStatus;
            if (findDayStatus) {
                dayStatus = findDayStatus.status;
            }

            months.push({
                date: startMonth.getDate(),
                fullDate,
                isCurrentMonth: currentMonth === startMonth.getMonth(),
                isDayOff: fullDate.getDay() === 0 || fullDate.getDay() == 6,
                daystatus: dayStatus,
            });
            startMonth.setDate(startMonth.getDate() + 1);
        }

        return months;
    }
}
