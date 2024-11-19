import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { IdentityPipe } from 'app/modules/shared/Pipes/identity.pipe';
import { NoAvatarPipe } from 'app/modules/shared/Pipes/no-avatar.pipe';
import { PhonePipe } from 'app/modules/shared/Pipes/phone.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-contacts',
    template: `
        <div class="grid grid-cols-2 gap-6">
            @for (guardian of guardians; track guardian.id) {
                <div class="flex items-start justify-between">
                    <div class="mb-4 flex items-center">
                        <!-- Contact Photo -->
                        <mat-icon
                        svgIcon="heroicons_outline:user-circle"
                        class="rounded-full icon-size-16"></mat-icon>
                        <!-- Basic Info -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                {{ guardian | appFullName }}
                            </h3>
                            <p class="text-gray-500">
                                {{ guardian.type | transloco }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Detailed Info -->
                <div class="space-y-2 text-gray-700">
                    <p>
                        <span class="font-bold"
                            >{{ 'contract.number' | transloco }}:</span
                        >
                        {{ guardian.contract_number }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'pnfl_number' | transloco }}:</span
                        >
                        {{ guardian.pnfl_number }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{
                                'passport.serial.and.number' | transloco
                            }}:</span
                        >
                        {{ guardian | appIdentity }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'citizenship' | transloco }}:</span
                        >
                        {{ guardian.citizenship.name | translateJson | async }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'birthplace' | transloco }}:</span
                        >
                        {{ guardian.address }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'actual_address' | transloco }}:</span
                        >
                        {{ guardian.address }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'email' | transloco }}:</span
                        >
                        <a
                            href="mailto:ivanov@example.com"
                            class="text-blue-500 underline hover:text-blue-700"
                        >
                            {{ guardian.email }}
                        </a>
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'phone' | transloco }}:</span
                        >
                        {{ guardian.phone | appPhone }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'extra_phone' | transloco }}:</span
                        >
                        {{ guardian.extra_phone | appPhone }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'workingplace' | transloco }}:</span
                        >
                        {{ guardian.work_place }}
                    </p>
                    <p>
                        <span class="font-bold"
                            >{{ 'position' | transloco }}:</span
                        >
                        {{ guardian.work_position }}
                    </p>
                </div>
                <!-- Actions -->
            }
        </div>
    `,
    styleUrls: ['./contacts.component.scss'],
    standalone: true,
    imports: [
        TranslocoModule,
        TranslateJsonPipe,
        NoAvatarPipe,
        PhonePipe,
        IdentityPipe,
        AsyncPipe,
        FullNamePipe,
        MatIconModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactsComponent implements OnInit {
    guardians: any;
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _user = inject(UserService)
    constructor(private _profileService: ProfileService) {}

    ngOnInit() {
        this._user.user$.subscribe(res=>{
            this._profileService.getGuardiansByStudentId(res.id).subscribe((res) => {
                this.guardians = res;
                this._changeDetectorRef.markForCheck();
            });
        })
    }
}
