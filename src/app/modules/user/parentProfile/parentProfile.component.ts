import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
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

@Component({
    selector: 'app-parentProfile',
    template: `
        @if ($userService.parent$ | async; as parent) {
            <div class="mx-auto w-full max-w-7xl p-4">
                <div class="flex items-start justify-between">
                    <div class="mb-4 flex items-center gap-4">
                        <div
                            class="flex h-30 w-30 items-center justify-center rounded-full border border-gray-200"
                        >
                            <p class="text-4xl font-bold text-[#Bf9000]">
                                {{ parent.first_name[0] }}
                            </p>
                        </div>
                        <div>
                            <h3
                                class="w-[200px] text-lg font-semibold text-gray-800"
                            >
                                {{ parent | appFullName }}
                            </h3>
                        </div>
                    </div>
                </div>
                <!-- Detailed Info -->
                <!-- <p class="headerP text-[18px] font-semibold">
                            {{ 'Personal Info' }}
                        </p> -->
                <div class="space-y-2 text-gray-700">
                    <!-- <p>
                                <span class="font-bold"
                                    >{{ 'Contract number' | transloco }}:</span
                                >
                                {{ guardian.guardian.contract_number }}
                            </p> -->

                    <p>
                        <span class="font-bold">{{ 'Sex' | transloco }}:</span>
                        {{ parent.gender | transloco }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'Birthdate' | transloco }}:</span
                        >
                        {{ parent.birth_date }}
                    </p>

                    <p>
                        <span class="font-bold"
                            >{{ 'Citizenship' | transloco }}:</span
                        >
                        {{ parent.citizenship.name | translateJson | async }}
                    </p>

                    <p>
                        <span class="font-bold"
                            >{{ 'Pinfl' | transloco }}:</span
                        >
                        {{ parent.pnfl_number }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{
                                'Passport series / passport number' | transloco
                            }}:</span
                        >
                        {{ parent | appIdentity }}
                    </p>

                    <!-- <p>
                                <span class="font-bold"
                                    >{{ 'Birth place' | transloco }}:</span
                                >
                                {{ guardian.guardian.address }}
                            </p> -->
                    <p>
                        <span class="font-bold"
                            >{{ 'Residential address' | transloco }}:</span
                        >
                        {{ parent.address }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'Email' | transloco }}:</span
                        >
                        <a
                            href="mailto:ivanov@example.com"
                            class="text-blue-500 underline hover:text-blue-700"
                        >
                            {{ parent.email }}
                        </a>
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'Phone number' | transloco }}:</span
                        >
                        {{ parent.phone | appPhone }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'Additional number' | transloco }}:</span
                        >
                        {{ parent.extra_phone | appPhone }}
                    </p>
                </div>
                <hr class="my-3 h-[2px] w-full bg-[#c8c8c8]" />
                <p class="mb-3 text-[20px] font-semibold">
                    {{ 'My children' | transloco }}
                </p>
                <div
                    class="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                    @for (item of parent.students; track $index) {
                        <div
                            class="bg-card flex flex-auto flex-col items-center overflow-hidden rounded-2xl shadow"
                        >
                            <div
                                class="flex w-full flex-auto flex-col p-8 text-center"
                            >
                                <div
                                    class="mx-auto h-32 w-32 overflow-hidden rounded-full"
                                >
                                    @if (item.photo) {
                                        <img
                                            class="h-full w-full object-cover"
                                            [src]="item.photo.presigned_url"
                                        />
                                    } @else {
                                        <img
                                            class="mr-6 rounded-full"
                                            src="/images/noPhoto.png"
                                            alt="Card cover image"
                                        />
                                    }
                                </div>
                                <div class="mt-6 font-medium">
                                    {{ item | appFullName }}
                                </div>
                                <div class="text-secondary">
                                    {{ item.currentGroup.groupName }} -
                                    {{
                                        item.currentGroup.classType
                                            | translateJson
                                            | async
                                    }}
                                </div>
                            </div>
                            <div
                                class="flex w-full items-center divide-x border-t p-3"
                            >
                                <!-- <a
                                    class="flex flex-auto items-center justify-center py-4 hover:bg-hover"
                                    [href]="'mailto:' + item.email"
                                >
                                    <mat-icon
                                        class="text-hint icon-size-5"
                                        [svgIcon]="'heroicons_solid:envelope'"
                                    ></mat-icon>
                                    <span class="ml-2">Email</span>
                                </a>
                                <a
                                    class="flex flex-auto items-center justify-center py-4 hover:bg-hover"
                                    [href]="'tel:' + item.phone"
                                >
                                    <mat-icon
                                        class="text-hint icon-size-5"
                                        [svgIcon]="'heroicons_solid:phone'"
                                    ></mat-icon>
                                    <span class="ml-2">Call</span>
                                </a> -->
                                <a
                                    (click)="changeRouting(item)"
                                    class="w-full bg-[#4f47e6]"
                                    mat-flat-button
                                    [color]="'primary'"
                                >
                                    {{ 'See full information' | transloco }}
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        }
    `,
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
    ],
})
export default class ParentProfileComponent implements OnInit {
    constructor() {}
    protected $userService = inject(UserService);
    protected $navigationService = inject(NavigationService);
    protected $router = inject(Router);
    protected $profileService = inject(ProfileService);
    protected $fuseNavigationService = inject(FuseNavigationService);
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
    ngOnInit() {}
}
