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
import { UserService } from 'app/core/user/user.service';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { IdentityPipe } from 'app/modules/shared/Pipes/identity.pipe';
import { PhonePipe } from 'app/modules/shared/Pipes/phone.pipe';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-contacts',
    template: `
        <div class="grid w-full grid-cols-2 justify-between">
            @if (_profileService.profileInfo$ | async; as profileInfo) {
                @for (guardian of profileInfo.guardians; track guardian.id) {
                    <div>
                        <div class="flex items-start justify-between">
                            <div class="mb-4 flex items-center gap-4">
                                <div
                                    class="flex h-30 w-30 items-center justify-center rounded-full border border-gray-200"
                                >
                                    <p
                                        class="text-4xl font-bold text-[#Bf9000]"
                                    >
                                        {{ guardian.guardian.first_name[0] }}
                                    </p>
                                </div>
                                <div>
                                    <h3
                                        class="w-[200px] text-lg font-semibold text-gray-800"
                                    >
                                        {{ guardian.guardian | appFullName }}
                                    </h3>
                                    <p class="text-gray-500">
                                        {{ guardian.type | transloco }}
                                    </p>
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
                                <span class="font-bold"
                                    >{{ 'Sex' | transloco }}:</span
                                >
                                {{ guardian.guardian.gender }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{ 'Birthdate' | transloco }}:</span
                                >
                                {{ guardian.guardian.birth_date }}
                            </p>

                            <p>
                                <span class="font-bold"
                                    >{{ 'Citizenship' | transloco }}:</span
                                >
                                {{
                                    guardian.guardian.citizenship.name
                                        | translateJson
                                        | async
                                }}
                            </p>



                            <p>
                                <span class="font-bold"
                                    >{{ 'Pinfl' | transloco }}:</span
                                >
                                {{ guardian.guardian.pnfl_number }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{
                                        'Passport series / passport number'
                                            | transloco
                                    }}:</span
                                >
                                {{ guardian.guardian | appIdentity }}
                            </p>

                            <!-- <p>
                                <span class="font-bold"
                                    >{{ 'Birth place' | transloco }}:</span
                                >
                                {{ guardian.guardian.address }}
                            </p> -->
                            <p>
                                <span class="font-bold"
                                    >{{
                                        'Residential address' | transloco
                                    }}:</span
                                >
                                {{ guardian.guardian.address }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{ 'Email' | transloco }}:</span
                                >
                                <a
                                    href="mailto:ivanov@example.com"
                                    class="text-blue-500 underline hover:text-blue-700"
                                >
                                    {{ guardian.guardian.email }}
                                </a>
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{ 'Phone number' | transloco }}:</span
                                >
                                {{ guardian.guardian.phone | appPhone }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{
                                        'Additional number' | transloco
                                    }}:</span
                                >
                                {{ guardian.guardian.extra_phone | appPhone }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{ 'Workplace' | transloco }}:</span
                                >
                                {{ guardian.guardian.work_place }}
                            </p>
                            <p>
                                <span class="font-bold"
                                    >{{ 'Position' | transloco }}:</span
                                >
                                {{ guardian.guardian.work_position }}
                            </p>
                        </div>
                        <!-- Actions -->
                    </div>
                }
            }
        </div>
    `,
    styleUrls: ['./contacts.component.scss'],
    standalone: true,
    imports: [
        TranslocoModule,
        TranslateJsonPipe,
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
    private _user = inject(UserService);
    protected _profileService = inject(ProfileService);
    constructor() {}

    ngOnInit() {}
}
