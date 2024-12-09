import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TranslocoModule } from '@ngneat/transloco';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    template: `
        <div
            class="flex w-full min-w-0 flex-col sm:absolute sm:inset-0 sm:overflow-hidden"
        >
            <mat-drawer-container class="flex-auto sm:h-full">
                <!-- Drawer -->
                <mat-drawer
                    class="dark:bg-gray-900 sm:w-96"
                    [autoFocus]="false"
                    [mode]="drawerMode"
                    [opened]="drawerOpened"
                    #drawer
                >
                    <!-- Header -->
                    <div
                        class="m-8 mr-6 flex items-center justify-between sm:my-10"
                    >
                        <!-- Title -->
                        <div
                            class="text-4xl font-extrabold leading-none tracking-tight"
                        >
                            {{ 'Profile informations' | transloco }}
                        </div>
                        <!-- Close button -->
                        <div class="lg:hidden">
                            <button mat-icon-button (click)="drawer.close()">
                                <mat-icon
                                    [svgIcon]="'heroicons_outline:x-mark'"
                                ></mat-icon>
                            </button>
                        </div>
                    </div>
                    <!-- Panel links -->
                    <div class="flex flex-col divide-y border-b border-t">
                        @for (panel of panels; track $index) {
                            <div
                                class="flex cursor-pointer px-8 py-5"
                                [ngClass]="{
                                    'dark:hover:bg-hover hover:bg-gray-100':
                                        !selectedPanel ||
                                        selectedPanel !== panel.id,
                                    'bg-primary-50 dark:bg-hover':
                                        selectedPanel &&
                                        selectedPanel === panel.id,
                                }"
                                (click)="goToPanel(panel.id)"
                            >
                                <mat-icon
                                    [ngClass]="{
                                        'text-hint':
                                            !selectedPanel ||
                                            selectedPanel !== panel.id,
                                        'text-primary dark:text-primary-500':
                                            selectedPanel &&
                                            selectedPanel === panel.id,
                                    }"
                                    [svgIcon]="panel.icon"
                                ></mat-icon>
                                <div class="ml-3">
                                    <div
                                        class="font-medium leading-6"
                                        [ngClass]="{
                                            'text-primary dark:text-primary-500':
                                                selectedPanel &&
                                                selectedPanel === panel.id,
                                        }"
                                    >
                                        {{ panel.title | transloco }}
                                    </div>
                                    <!-- <div class="text-secondary mt-0.5">
                                        {{ panel.description }}
                                    </div> -->
                                </div>
                            </div>
                        }
                    </div>
                </mat-drawer>

                <!-- Drawer content -->
                <mat-drawer-content class="flex flex-col">
                    <!-- Main -->
                    <div
                        class="flex-auto bg-white px-6 pb-12 pt-9 dark:bg-transparent md:p-8 md:pb-12 lg:p-12"
                    >
                        <!-- Panel header -->
                        <div class="mb-3 flex items-center">
                            <!-- Drawer toggle -->
                            <button
                                class="-ml-2 lg:hidden"
                                mat-icon-button
                                (click)="drawer.toggle()"
                            >
                                <mat-icon
                                    [svgIcon]="'heroicons_outline:bars-3'"
                                ></mat-icon>
                            </button>

                            <!-- Panel title -->
                            <div
                                class="ml-2 text-xl font-bold leading-none tracking-tight md:text-3xl lg:ml-0"
                            >
                                {{
                                    getPanelInfo(selectedPanel).title
                                        | transloco
                                }}
                            </div>
                        </div>

                        <!-- Load settings panel -->
                        <div class="">
                            <!-- <app-bio></app-bio> -->
                            <router-outlet></router-outlet>
                        </div>
                    </div>
                </mat-drawer-content>
            </mat-drawer-container>
        </div>
    `,
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports: [
        MatTabsModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        NgClass,
        RouterModule,
        TranslocoModule,
        RouterModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileComponent implements OnInit {
    constructor() {}
    private _fuseMediaWatcherService = inject(FuseMediaWatcherService);
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _profileService = inject(ProfileService);
    private _router = inject(Router);
    private _activatedRoute = inject(ActivatedRoute);

    link = 'profile';

    panels = [
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
        // {
        //     id: 'contracts',
        //     icon: 'heroicons_outline:document-text',
        //     title: 'Contracts',
        //     description: 'Contracts',
        // },
    ];
    selectedPanel: string = 'bio';
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit() {
        this._profileService.id =
            +this._activatedRoute.snapshot.paramMap.get('id');
        if (this._profileService.id) {
            this.link = `children/${this._profileService.id}`;
        }
        this._profileService.getProfileInfo(+this._profileService.id);
        const url = this._router.url.split('/').at(-1);

        if (url !== 'profile' && isNaN(+url)) {
            this.selectedPanel = url;
        }
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    goToPanel(panel: string): void {
        // Close the drawer on 'over' mode
        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
        this.selectedPanel = panel;
        if (panel == 'bio') {
            this._router.navigate([this.link]);
        } else {
            this._router.navigate([this.link + '/' + panel]);
        }
    }
    getPanelInfo(id: string): any {
        return this.panels.find((panel) => panel.id === id);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
