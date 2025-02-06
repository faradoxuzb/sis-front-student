import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { FuseNavigationService } from '@fuse/components/navigation';
import { TranslocoModule } from '@ngneat/transloco';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { IdentityPipe } from 'app/modules/shared/Pipes/identity.pipe';
import { PhonePipe } from 'app/modules/shared/Pipes/phone.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile/profile.service';
import { MatIconModule } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'app-parentProfile',
    templateUrl: './parentProfile.component.html',
    styleUrls: ['./parentProfile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AsyncPipe,
        FullNamePipe,
        TranslocoModule,
        IdentityPipe,
        PhonePipe,
        TranslateJsonPipe,
        FuseCardComponent,
        FullNamePipe,
        MatButtonModule,
        MatIconModule,
        MatRipple,
    ],
})
export default class ParentProfileComponent implements OnInit {
    constructor() {}
    protected $userService = inject(UserService);
    protected $navigationService = inject(NavigationService);
    protected $router = inject(Router);
    protected $profileService = inject(ProfileService);
    protected $fuseNavigationService = inject(FuseNavigationService);
    private route = inject(ActivatedRoute);
    parent = this.route.snapshot.data.parentData;
    changeRouting(item) {
        localStorage.setItem('studentId', item.id);
        this.$userService.chooseStudentId.set(item.id);
        this.$navigationService.get().subscribe((res) => {
            this.$navigationService.navigation$ = res;
            this.$profileService.getProfileInfo();
            this.$router.navigate(['children-menu'], {
                queryParams: {
                    data: item.id,
                },
            });
        });
    }
    ngOnInit() {
        console.log(this.route.snapshot);
    }
}
