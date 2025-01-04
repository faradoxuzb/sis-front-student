import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation';
import { TranslocoModule } from '@ngneat/transloco';
import { Constants } from 'app/config/constants';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { filter } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-bio',
    template: `
        <div class="overflow-auto" style="  ">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Bio' | transloco }}
            </p>
            <table class="w-full">
                @if (profileService.profileInfo$ | async; as profileInfo) {
                    <tbody>
                        <tr>
                            <td
                                colspan="2"
                                class="text-xl font-bold text-gray-800"
                            >
                                {{ 'Personal Information' | transloco }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'First name' | transloco }}</td>
                            <td>{{ profileInfo.first_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'Last name' | transloco }}</td>
                            <td>{{ profileInfo.last_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'Patronymic' | transloco }}</td>
                            <td>{{ profileInfo.middle_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'Sex' | transloco }}</td>
                            <td>
                                {{ profileInfo.gender | transloco }}
                            </td>
                        </tr>

                        <tr>
                            <td
                                colspan="2"
                                class="text-xl font-bold text-gray-800"
                            >
                                {{ 'Contact information' | transloco }}
                            </td>
                        </tr>

                        <tr>
                            <td>{{ 'Phone number' | transloco }}</td>
                            <td>{{ profileInfo.phone }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'Additional number' | transloco }}</td>
                            <td>{{ profileInfo.extra_phone }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'Email' | transloco }}</td>
                            <td>{{ profileInfo.user.email }}</td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Address' | transloco }}
                            </td>
                            <td>
                                {{ profileInfo.address }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Residential address' | transloco }}
                            </td>
                            <td>
                                {{ profileInfo.actual_address }}
                            </td>
                        </tr>

                        <tr>
                            <td
                                colspan="2"
                                class="text-xl font-bold text-gray-800"
                            >
                                {{ 'School Details' | transloco }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Student ID' | transloco }}
                            </td>
                            <td>
                                {{ profileInfo.id }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Branch' | transloco }}</td>
                            <td>
                                {{ profileInfo.branch?.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Status' | transloco }}
                            </td>
                            <td>
                                {{ STUDENT_STATUS[profileInfo.status] }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Transport' | transloco }}</td>
                            <td>
                                <span class="px-[11px]">
                                    @for (
                                        transport of profileInfo.transports;
                                        track transport.id
                                    ) {
                                        <span
                                            >{{ transport.transport }} -
                                            {{ transport.name }}</span
                                        >
                                    }
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td
                                colspan="2"
                                class="text-xl font-bold text-gray-800"
                            >
                                {{ 'Additional details' | transloco }}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {{
                                    'Passport series / passport number'
                                        | transloco
                                }}
                            </td>
                            <td>
                                {{ profileInfo.identity_serial }} /
                                {{ profileInfo.identity_number }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Pinfl' | transloco }}</td>
                            <td>
                                {{ profileInfo.pnfl_number }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Id Card' | transloco }}</td>
                            <td>
                                {{ profileInfo.id_card }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Birth date' | transloco }}</td>
                            <td>
                                {{
                                    profileInfo.birth_date | date: 'dd.MM.yyyy'
                                }}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {{ 'Citizenship' | transloco }}
                            </td>
                            <td>
                                {{
                                    profileInfo.citizenship.name
                                        | translateJson
                                        | async
                                }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Transport' | transloco }}</td>
                            <td>
                                <span class="px-[11px]">
                                    @for (
                                        transport of profileInfo.transports;
                                        track transport.id
                                    ) {
                                        <span
                                            >{{ transport.transport }} -
                                            {{ transport.name }}</span
                                        >
                                    }
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Knowing languages' | transloco }}
                            </td>
                            <td>
                                @for (
                                    item of profileInfo.knowingLanguages;
                                    track $index
                                ) {
                                    <span
                                        class="mr-2 inline-block rounded-[5px] bg-blue-400 p-1 font-semibold text-white"
                                        >{{ STUDENT_LANGUAGES[item] }}</span
                                    >
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Hobbies' | transloco }}
                            </td>
                            <td>
                                @for (
                                    hobby of profileInfo.hobbies;
                                    track hobby
                                ) {
                                    <span
                                        class="mr-2 inline-block rounded-[5px] bg-blue-400 p-1 font-semibold text-white"
                                    >
                                        {{ hobby }}
                                    </span>
                                }
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </div>
    `,
    styleUrls: ['./bio.component.scss'],
    standalone: true,
    imports: [TranslocoModule, AsyncPipe, DatePipe, TranslateJsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BioComponent implements OnInit {
    readonly STUDENT_STATUS = Constants.STUDENT_STATUS;
    readonly STUDENT_LANGUAGES = Constants.STUDENT_LANGUAGES;

    protected profileService = inject(ProfileService);
    protected $fuseNavigationService = inject(FuseNavigationService);
    protected _router = inject(Router);
    private $activatedRoute = inject(ActivatedRoute);

    constructor() {}

    ngOnInit() {
        this.$activatedRoute.queryParams.subscribe((res) => {
            if (res?.studentId) {
                setTimeout(() => {
                    this.$fuseNavigationService.isMenuOpen$.next(true);
                });
                this._router.events
                    .pipe(filter((event) => event instanceof NavigationEnd))
                    .subscribe(() => {
                        this.$fuseNavigationService.isMenuOpen$.next(false);
                    });
            }
        });
    }
}
