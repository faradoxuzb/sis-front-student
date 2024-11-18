import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-attendance',
    template: `
        <div id="attendance" class="tab-content">
            <div class="mb-4 flex items-center space-x-3">
                <h2 class="text-2xl font-semibold text-gray-800">Attendance</h2>
                <div class="mt-1">
                    <nz-tag nzColor="success">Present</nz-tag>
                    <nz-tag nzColor="warning">Late</nz-tag>
                    <nz-tag nzColor="error">Absent</nz-tag>
                </div>
            </div>

            <!-- View Switcher -->
            <!--<div class="flex justify-between items-center mb-6">
    <div class="space-x-4">
      <button
        id="weekView"
        class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
        Week View
      </button>
      <button
        id="yearView"
        class="bg-gray-200 text-gray-600 px-4 py-2 rounded shadow hover:bg-gray-300">
        Year View
      </button>
    </div>
    <p class="text-gray-500 text-sm">Select a view to track attendance</p>
  </div>-->

            <!-- Yearly View -->
            <div id="yearlyView" class="">
                <!--    <h3 class="text-lg font-semibold text-gray-700 mb-4">Year View</h3>-->
                <div
                    class="flex flex-wrap items-center justify-between space-y-4"
                >
                    <!-- Months -->
                    <div class="mt-4">
                        <p class="mb-2 font-bold text-gray-600">September</p>
                        <div class="">
                            <nz-date-picker
                                nzInline
                                [(ngModel)]="september"
                                [nzShowToday]="false"
                                [nzDisabled]="true"
                                [nzDateRender]="tplRender"
                            ></nz-date-picker>
                        </div>
                    </div>
                    <div class="">
                        <p class="mb-2 font-bold text-gray-600">October</p>
                        <div class="">
                            <nz-date-picker
                                nzInline
                                [(ngModel)]="october"
                                [nzShowToday]="false"
                            ></nz-date-picker>
                        </div>
                    </div>

                    <div class="">
                        <p class="mb-2 font-bold text-gray-600">November</p>
                        <div class="">
                            <nz-date-picker
                                nzInline
                                [(ngModel)]="november"
                                [nzShowToday]="false"
                            ></nz-date-picker>
                        </div>
                    </div>

                    <div class="">
                        <p class="mb-2 font-bold text-gray-600">December</p>
                        <div class="">
                            <nz-date-picker
                                nzInline
                                [(ngModel)]="december"
                                [nzShowToday]="false"
                            ></nz-date-picker>
                        </div>
                    </div>
                </div>
                <ng-template #tplRender let-current>
                    <div
                        class="ant-picker-cell-inner"
                        [ngClass]="{
                            'bg-green-100':
                                current.getDay() !== 0 &&
                                current.getDay() !== 6,
                        }"
                    >
                        {{ current.getDate() }}
                    </div>
                </ng-template>
            </div>
        </div>
    `,
    styleUrls: ['./attendance.component.scss'],
    standalone:true,
    imports: [

    ],
})
export class AttendanceComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
