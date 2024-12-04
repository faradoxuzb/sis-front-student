import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { DayStatusDirective } from './day-status.directive';
import { MonthNamePipe } from './month-name.pipe';
import { isEqualDate } from 'app/core/utils/util';

export enum DayStatus {
   present = 0,
    late=1,
     absent=2
}
export interface MyDay {
    date: number;
    fullDate: Date;
    isCurrentMonth: boolean;
    daystatus?: DayStatus;
    isDayOff?: boolean;
}

@Component({
    selector: 'app-attendance',
    template: `
    <div class="w-full">
        <div class="w-full flex justify-end gap-10 font-medium">
        <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-[8px] bg-red-600"></div>
            <p>{{'Absent' | transloco}}</p>
        </div>
        <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-[8px] bg-red-400"></div>
            <p>{{'Late' | transloco}}</p>
        </div>
        <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-[8px] bg-[#ede7ff]"></div>
            <p>{{'Present' | transloco}}</p>
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
                                class="p-2 rounded-[8px] font-medium"
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
})
export default class AttendanceComponent {
    data: {
        month: number;
        data: { date: number; fullDate: Date; isCurrentMonth: boolean }[];
    }[] = [];

    constructor() {
        const startCalendarDate = new Date(2024, 8, 1);
        this.makeCalendar(startCalendarDate);
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
            let findDayStatus = this.mockDate.find((h) =>isEqualDate(h.date, fullDate));
            let dayStatus;
            if(findDayStatus)
            {
                dayStatus = findDayStatus.type
            }

            months.push({
                date: startMonth.getDate(),
                fullDate,
                isCurrentMonth: currentMonth === startMonth.getMonth(),
                isDayOff: fullDate.getDay() === 0 || fullDate.getDay() == 6,
                daystatus: dayStatus ?? DayStatus.present,
            });
            startMonth.setDate(startMonth.getDate() + 1);
        }

        return months;
    }
    mockDate: {
        date: Date;
        type: DayStatus
    }[] = [
        {
            date: new Date('2024-09-02'),
            type: DayStatus.present,
        },
        {
            date: new Date('2024-09-03'),
            type: DayStatus.absent,
        },
        {
            date: new Date('2024-09-05'),
            type: DayStatus.late,
        },
        {
            date: new Date('2024-10-03'),
            type: DayStatus.present,
        },
        {
            date: new Date('2024-10-22'),
            type: DayStatus.absent,
        },
        {
            date: new Date('2024-11-29'),
            type: DayStatus.late,
        },
    ];
}
