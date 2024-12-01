import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { UserService } from 'app/core/user/user.service';
import { AsyncPipe } from '@angular/common';
import { FullNamePipe } from 'app/modules/shared/Pipes/full-name.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { IdentityPipe } from 'app/modules/shared/Pipes/identity.pipe';
import { PhonePipe } from 'app/modules/shared/Pipes/phone.pipe';

@Component({
    selector: 'app-parentProfile',
    template: `
        @if ($userService.parent$ | async; as parent) {
            <div class="w-full max-w-7xl mx-auto p-4">
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
                    {{ parent.gender }}
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
                    {{
                        parent.citizenship.name
                            | translateJson
                            | async
                    }}
                </p>

                <p>
                    <span class="font-bold">{{ 'Pinfl' | transloco }}:</span>
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
                    <span class="font-bold">{{ 'Email' | transloco }}:</span>
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
            <!-- Actions -->
        </div>
        }
    `,
    styleUrls: ['./parentProfile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:[AsyncPipe, FullNamePipe, TranslocoModule,IdentityPipe,PhonePipe, TranslateJsonPipe]
})
export default class ParentProfileComponent implements OnInit {
    constructor() {}
    protected $userService = inject(UserService);
    ngOnInit() {}
}
