import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-schedule',
    template: `
        @if (_profileService._lessonSchedule | async; as schedule) {
            <div class="w-full p-5">
                <table class="my-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{'Monday' | transloco}}</th>
                            <th>{{'Tuesday' | transloco}}</th>
                            <th>{{'Wednesday' | transloco}}</th>
                            <th>{{'Thursday' | transloco}}</th>
                            <th>{{'Friday' | transloco}}</th>
                            <th>{{'Saturday' | transloco}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of data; track item.order; let rowInd = $index) {
                            <tr>
                                <td class="p-4">{{ rowInd + 1 }}</td>
                                @for (
                                    day of item.days;
                                    track colInd;
                                    let colInd = $index
                                ) {
                                    <ng-container
                                        [ngTemplateOutlet]="templateScheduleCell"
                                        [ngTemplateOutletContext]="{
                                            $implicit: day,
                                            rowInd,
                                            colInd,
                                        }"
                                    ></ng-container>
                                }
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <ng-template
                #templateScheduleCell
                let-cellData
                let-rowInd="rowInd"
                let-colInd="colInd"
            >
                <td class="h-[182px]" (click)="showScheduleEdit(rowInd, colInd)">
                    <div
                        class="wrapper-subject h-full cursor-pointer border border-transparent p-4"
                        [ngClass]="{
                            'wrapper-subject-active':
                                colIndex === colInd && rowIndex === rowInd,
                        }"
                    >
                        @if (cellData.subjects.length > 0) {
                            <div class="flex h-full flex-col gap-2">
                                @for (
                                    subject of cellData.subjects;
                                    track i;
                                    let i = $index
                                ) {
                                    <div
                                        class="flex flex-col justify-between gap-1 {{
                                            subject.subjectColor
                                        }} border {{
                                            subject.borderColor
                                        }} rounded-md p-4 text-left h-full subject"
                                    >
                                        <div>
                                            <p class="text-lg font-semibold">
                                                {{ subject.subject }}
                                            </p>
                                            <!-- <span class="text-[#6D6D6D]">{{
                                        item.time
                                      }}</span> -->
                                        </div>

                                        <div
                                            class="flex items-center justify-between gap-2"
                                        >
                                            <span class="text-[#454545]">{{
                                                subject.teacher
                                            }}</span>
                                            <div
                                                class="text-[white] {{
                                                    subject.roomColor
                                                }} rounded-3xl px-2"
                                            >
                                                {{ subject.room }}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        } @else {
                            <div
                                class="subject flex h-full items-center justify-center rounded-xl border border-dashed border-[#5C79D5] bg-[#F2F5FC] p-4"
                            >
                                <span
                                    nz-icon
                                    nzType="plus-circle"
                                    nzTheme="outline"
                                    style="color: #5C79D5"
                                ></span>
                            </div>
                        }
                    </div>
                </td>
            </ng-template>
        }
    `,
    styleUrls: ['./schedule.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, AsyncPipe, TranslocoModule],
})
export default class ScheduleComponent implements OnInit {
    constructor() {}
    protected _profileService = inject(ProfileService)
    readonly SUBJECT_ALGEBRA = {
        subject: 'Algebra',
        subjectColor: 'bg-[#F2F5FC]',
        roomColor: 'bg-[#5C79D5]',
        borderColor: 'border-[#E1E8F8]',
        teacher: 'Karimjonova P.',
        room: 221,
    };
    readonly SUBJECT_ONA_TILI = {
        subject: 'Ona tili',
        subjectColor: 'bg-[#F9F7F3]',
        roomColor: 'bg-[#B1875E]',
        borderColor: 'border-[#F2ECE2]',
        teacher: 'Karimjonova P.',
        room: 21,
    };

    readonly SUBJECT_ADABIYOT = {
        subject: 'Adabiyot',
        subjectColor: 'bg-[#FAEEFF]',
        roomColor: 'bg-[#C276E1]',
        borderColor: 'border-[#F0CCFF]',
        teacher: 'Karimjonova P.',
        room: 21,
    };

    readonly SUBJECT_BIOLOGIYA = {
        subject: 'Biologiya',
        subjectColor: 'bg-[#F2FFF3]',
        roomColor: 'bg-[#40A772]',
        borderColor: 'border-[#BEEDD5]',
        teacher: 'Karimjonova P.',
        room: 21,
    };

    readonly SUBJECT_FIZIKA = {
        subject: 'Fizika',
        subjectColor: 'bg-[#FFF7E9]',
        roomColor: 'bg-[#FFA200]',
        borderColor: 'border-[#FFE4B6]',
        teacher: 'Karimjonova P.',
        room: 21,
    };

    data = [
        {
            order: 1,
            days: [
                {
                    subjects: [this.SUBJECT_ONA_TILI, this.SUBJECT_ALGEBRA],
                },
                {
                    subjects: [this.SUBJECT_ONA_TILI, this.SUBJECT_ONA_TILI],
                },
                {
                    subjects: [this.SUBJECT_ADABIYOT],
                },
                {
                    subjects: [this.SUBJECT_ALGEBRA],
                },
                {
                    subjects: [this.SUBJECT_BIOLOGIYA],
                },
                {
                    subjects: [this.SUBJECT_FIZIKA],
                },
            ],
        },
        {
            order: 2,
            days: [
                {
                    subjects: [this.SUBJECT_ADABIYOT],
                },
                {
                    subjects: [this.SUBJECT_BIOLOGIYA],
                },
                {
                    subjects: [this.SUBJECT_ADABIYOT],
                },
                {
                    subjects: [this.SUBJECT_ONA_TILI, this.SUBJECT_ONA_TILI],
                },
                {
                    subjects: [this.SUBJECT_ONA_TILI],
                },

                {
                    subjects: [this.SUBJECT_FIZIKA],
                },
            ],
        },
        {
            order: 3,
            days: [
                {
                    subjects: [this.SUBJECT_FIZIKA],
                },
                {
                    subjects: [this.SUBJECT_ALGEBRA, this.SUBJECT_ALGEBRA],
                },
                {
                    subjects: [this.SUBJECT_ONA_TILI, this.SUBJECT_ONA_TILI],
                },
                {
                    subjects: [this.SUBJECT_ONA_TILI],
                },
                {
                    subjects: [this.SUBJECT_FIZIKA, this.SUBJECT_FIZIKA],
                },
                {
                    subjects: [],
                },
            ],
        },
        {
            order: 4,
            days: [
                {
                    subjects: [this.SUBJECT_ADABIYOT],
                },
                {
                    subjects: [this.SUBJECT_BIOLOGIYA],
                },
                {
                    subjects: [],
                },
                {
                    subjects: [this.SUBJECT_ALGEBRA],
                },
                {
                    subjects: [this.SUBJECT_FIZIKA],
                },
                {
                    subjects: [],
                },
            ],
        },
        {
            order: 5,
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
        },
        {
            order: 6,
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
        },
    ];

    dataFull = [
        {
            class: '5A',
            days: [
                {
                    day: 'Dushanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Seshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Chorshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ALGEBRA,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ONA_TILI],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_FIZIKA,
                                this.SUBJECT_FIZIKA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Payshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Juma',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Shanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
            ],
        },
        {
            class: '5B',
            days: [
                {
                    day: 'Dushanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Seshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Chorshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ALGEBRA,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ONA_TILI],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_FIZIKA,
                                this.SUBJECT_FIZIKA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Payshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Juma',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Shanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
            ],
        },
        {
            class: '6A',
            days: [
                {
                    day: 'Dushanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Seshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Chorshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ALGEBRA,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ONA_TILI],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_FIZIKA,
                                this.SUBJECT_FIZIKA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Payshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Juma',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Shanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
            ],
        },
        {
            class: '6B',
            days: [
                {
                    day: 'Dushanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Seshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Chorshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ALGEBRA,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ONA_TILI],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_FIZIKA,
                                this.SUBJECT_FIZIKA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Payshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Juma',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Shanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
            ],
        },
        {
            class: '7A',
            days: [
                {
                    day: 'Dushanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Seshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 3,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                    ],
                },
                {
                    day: 'Chorshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 2,
                            subjects: [
                                this.SUBJECT_ALGEBRA,
                                this.SUBJECT_ALGEBRA,
                            ],
                        },
                        {
                            hour: 3,
                            subjects: [
                                this.SUBJECT_ONA_TILI,
                                this.SUBJECT_ONA_TILI,
                            ],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ONA_TILI],
                        },
                        {
                            hour: 5,
                            subjects: [
                                this.SUBJECT_FIZIKA,
                                this.SUBJECT_FIZIKA,
                            ],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Payshanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Juma',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
                {
                    day: 'Shanba',
                    hours: [
                        {
                            hour: 1,
                            subjects: [this.SUBJECT_ADABIYOT],
                        },
                        {
                            hour: 2,
                            subjects: [this.SUBJECT_BIOLOGIYA],
                        },
                        {
                            hour: 3,
                            subjects: [],
                        },
                        {
                            hour: 4,
                            subjects: [this.SUBJECT_ALGEBRA],
                        },
                        {
                            hour: 5,
                            subjects: [this.SUBJECT_FIZIKA],
                        },
                        {
                            hour: 6,
                            subjects: [],
                        },
                    ],
                },
            ],
        },
    ];

    ngOnInit() {}
}
