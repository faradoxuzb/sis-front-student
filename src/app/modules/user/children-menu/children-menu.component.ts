import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { Student } from 'app/modules/shared/models/parent.model';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';

@Component({
    selector: 'app-children-menu',
    template: `
        <div class="w-full p-4">
            @if (!nameOfChild) {
                <div role="status" class="max-w-sm animate-pulse">
                    <div
                        class="mb-4 h-6 w-80 rounded-[8px] bg-gray-200 dark:bg-gray-700"
                    ></div>
                </div>
            }
            <p class="my-4 text-[16px] font-semibold sm:text-[22px]">
                {{ nameOfChild | appFullName }}
                <br />
                <span class="">
                    ({{ nameOfChild.currentGroup.groupName }} -
                    {{
                        nameOfChild.currentGroup.classType
                            | translateJson
                            | async
                    }})
                </span>
            </p>
            <div class="grid grid-cols-2 flex-wrap sm:flex">
                @for (item of panels; track $index) {
                    <div
                        class="bg-card m-2 flex h-40 w-40 cursor-pointer flex-col rounded-2xl p-4 shadow sm:h-30 sm:w-30"
                        (click)="navigate(item)"
                    >
                        <div class="aspect-[9/6]">
                            <div
                                class="flex h-full items-center justify-center"
                            >
                                <!-- Icons -->
                                <div class="relative">
                                    <mat-icon
                                        class="text-hint text-[#bf9000] opacity-50 icon-size-12 sm:icon-size-10"
                                        [svgIcon]="item.icon"
                                    ></mat-icon>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex flex-auto flex-col justify-center text-center text-sm font-medium"
                        >
                            <div
                                class="truncate"
                                [matTooltip]="item.title | transloco"
                            >
                                {{ item.title | transloco }}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
    styleUrls: ['./children-menu.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        TranslocoModule,
        MatTooltipModule,
        FullNamePipe,
        TranslateJsonPipe,
        AsyncPipe,
    ],
})
export default class ChildrenMenuComponent implements OnInit {
    constructor(
        private _userService: UserService,
        private _router: Router,
        private _activatedRouter: ActivatedRoute
    ) {}

    panels = [
        {
            id: 'overview',
            icon: 'heroicons_outline:server-stack',
            title: 'Overview',
            description: 'overview',
        },
        {
            id: 'schedule',
            icon: 'heroicons_outline:academic-cap',
            title: 'Schedule',
            description: 'Schedule',
        },
        {
            id: 'bio',
            icon: 'heroicons_outline:user-circle',
            title: 'Bio',
            description: 'Main information of student',
        },
        {
            id: 'contacts',
            icon: 'heroicons_outline:newspaper',
            title: 'Contact informations',
            description: "Contacts of student's parent",
        },
        {
            id: 'notes',
            icon: 'heroicons_outline:paper-clip',
            title: 'Notes/Incidents',
            description: "Incident's student",
        },
        {
            id: 'payments',
            icon: 'heroicons_outline:banknotes',
            title: 'Contracts and Payments',
            description: 'Payments Menu',
        },
        {
            id: 'attendance',
            icon: 'heroicons_outline:calendar-days',
            title: 'Attendance',
            description: 'Student attendance appear calendar',
        },
        {
            id: 'grades',
            icon: 'heroicons_outline:book-open',
            title: 'Grades',
            description: "Student' grades",
        },
        {
            id: 'medicalInfo',
            icon: 'heroicons_outline:beaker',
            title: 'Medical info',
            description: 'Medical info',
        },
        {
            id: 'classes',
            icon: 'heroicons_outline:building-library',
            title: 'Classes',
            description: "Student's classes info",
        },
        {
            id: 'files',
            icon: 'heroicons_outline:clipboard-document-check',
            title: 'Files',
            description: "Student's files",
        },
    ];
    nameOfChild: Student;
    ngOnInit() {
        this._activatedRouter.queryParams.subscribe((res) => {
            this._userService.parent$.subscribe((res) => {
                if (res) {
                    const chidrenId = localStorage.getItem('studentId');
                    this.nameOfChild = res.students?.find(
                        (el) => el.id == +chidrenId
                    );
                }
            });
        });
    }
    navigate(item: any) {
        if (item.id == 'schedule') {
            this._router.navigate([item.id]);
            return;
        }
        this._router.navigate(['profile/' + item.id]);
    }
}
