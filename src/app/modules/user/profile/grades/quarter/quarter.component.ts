import { AsyncPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { Constants } from 'app/config/constants';
import { UserService } from 'app/core/user/user.service';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { NoDataComponent } from 'app/modules/shared/components/no-data/no-data.component';
import { GradeByStudent, QuarterlyModel } from '../grade-by-student.model';
import { GradeService } from '../grades.service';

@Component({
    selector: 'app-quarter',
    template: `
        <div class="w-full">
            @if (data?.subjects; as subjects) {
                <div class="flex w-full justify-end">
                    <mat-form-field>
                        <mat-select
                            (selectionChange)="getData()"
                            [(ngModel)]="selectQuarty"
                        >
                            @for (item of quarties()?.data; track item) {
                                <mat-option [value]="item.id">
                                    <p
                                        [matTooltip]="
                                            item.name | translateJson | async
                                        "
                                    >
                                        {{ item.name | translateJson | async }}
                                    </p>
                                </mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </div>
                @if (subjects.length > 0) {
                    <div class="table-container">
                        <table class="">
                            <thead>
                                <tr
                                    class="bg-gradient-to-r from-red-800 to-yellow-700 text-sm uppercase tracking-wide text-white"
                                >
                                    <th>#</th>
                                    <th class="frozen-column">
                                        {{ 'Subjects' | transloco }}
                                    </th>
                                    @for (
                                        day of subjects[0].days;
                                        track $index
                                    ) {
                                        <th
                                            colspan="2"
                                            style="writing-mode: sideways-lr"
                                        >
                                            {{ day.date }}
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                @for (subject of subjects; track $index) {
                                    <tr>
                                        <td>{{ $index + 1 }}</td>
                                        <td class="frozen-column font-semibold">
                                            {{
                                                subject.name
                                                    | translateJson
                                                    | async
                                            }}
                                        </td>
                                        @for (
                                            day of subject.days;
                                            track $index
                                        ) {
                                            <td
                                                [ngClass]="
                                                    ATTENDANCE_STATUS_COLORS[
                                                        day.attendance?.status
                                                    ]
                                                "
                                                class="font-semibold"
                                            >
                                                {{
                                                    day.attendance?.status ||
                                                        '-' | transloco
                                                }}
                                            </td>
                                            <td>
                                                {{ day.attendance?.mark }}
                                            </td>
                                        }
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                } @else {
                    <div class="flex w-full justify-center">
                        <app-no-data></app-no-data>
                    </div>
                }
            }
        </div>
    `,
    styleUrls: ['./quarter.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe,
        NgClass,
        TranslocoModule,
        MatTableModule,
        TranslateJsonPipe,
        MatSelectModule,
        AsyncPipe,
        TranslateJsonPipe,
        FormsModule,
        MatTooltipModule,
        NoDataComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuarterComponent implements OnInit {
    selectQuarty = signal<number>(null);

    $gradeService = inject(GradeService);

    userService = inject(UserService);

    data: GradeByStudent;

    cdr = inject(ChangeDetectorRef);

    readonly ATTENDANCE_STATUS_COLORS = Constants.ATTENDANCE_STATUS_COLORS;
    quarties = signal<QuarterlyModel>(null);

    constructor() {}

    ngOnInit() {
        this.$gradeService.getQuarter().subscribe((res) => {
            this.quarties.set(res);
            this.selectQuarty.set(res.data[0].id);
            if (this.userService.chooseStudentId()) {
                this.$gradeService.userId = this.userService.chooseStudentId();
                this.getData();
            } else {
                this.$gradeService.userId = this.userService.userId();
                this.getData();
            }
        });
    }
    getData() {
        this.$gradeService
            .getGradesByStudent(null, this.selectQuarty())
            .subscribe((res) => {
                this.data = res;
                this.cdr.markForCheck();
            });
    }
}
