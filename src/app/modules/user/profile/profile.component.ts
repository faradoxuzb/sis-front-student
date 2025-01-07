import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { map, of, Subject } from 'rxjs';
import { ProfileService } from './profile.service';
@Component({
    selector: 'app-profile',
    template: `
        <div class="w-full p-4">
            @if (showBack()) {
                <button mat-icon-button color="primary" (click)="backToMenu()">
                    <mat-icon
                        svgIcon="heroicons_outline:arrow-left-circle"
                        class="icon-size-10"
                    ></mat-icon>
                </button>
            }
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports: [
        MatTabsModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        RouterModule,
        TranslocoModule,
        RouterModule,
    ],
})
export default class ProfileComponent implements OnInit {
    constructor() {}
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private $profileService = inject(ProfileService);
    private $userService = inject(UserService);
    private $locationService = inject(Location);

    showBack = toSignal(
        this.$userService.parent$.pipe(
            map((el) => {
                if (el) {
                    return of(true);
                }
                return of(false);
            })
        )
    );

    ngOnInit() {
        this.$profileService.getProfileInfo();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    backToMenu() {
        this.$locationService.back();
    }
}
