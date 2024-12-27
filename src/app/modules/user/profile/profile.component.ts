import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    template: `
        <div class="w-full p-4">
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileComponent implements OnInit {
    constructor() {}
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private $profileService = inject(ProfileService);

    ngOnInit() {
        this.$profileService.getProfileInfo();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
