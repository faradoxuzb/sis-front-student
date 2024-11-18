import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { Constants } from 'app/config/constants';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-bio',
    template: `
        <div class="overflow-auto" style="  ">
            <table class="w-full">
                @if (profileService.profileInfo$ | async; as profileInfo) {
                    <tbody>
                        <tr>
                            <td>{{ 'name' | transloco }}</td>
                            <td>{{ profileInfo.student.first_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'surname' | transloco }}</td>
                            <td>{{ profileInfo.student.last_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'patronymic' | transloco }}</td>
                            <td>{{ profileInfo.student.middle_name }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'email' | transloco }}</td>
                            <td>{{ profileInfo.student.user.email }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'phoneNumber' | transloco }}</td>
                            <td>{{ profileInfo.student.phone }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'additionalPhoneNumber' | transloco }}</td>
                            <td>{{ profileInfo.student.extra_phone }}</td>
                        </tr>
                        <tr>
                            <td>{{ 'SeriaDoc/passportNumber' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.identity_serial }} /
                                {{ profileInfo.student.identity_number }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'pinfl' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.pnfl_number }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'IdCard' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.id_card }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'birthDate' | transloco }}</td>
                            <td>
                                {{
                                    profileInfo.student.birth_date
                                        | date: 'dd.MM.yyyy'
                                }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'sex' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.gender | transloco }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Filial' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.branch?.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Filial' | transloco }}</td>
                            <td>
                                {{ profileInfo.student.branch?.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ 'Transport' | transloco }}</td>
                            <td>
                                <span class="px-[11px]">
                                    @for (
                                        transport of profileInfo.student
                                            .transports;
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
                                {{ 'citizenship' | transloco }}
                            </td>
                            <td>
                                {{
                                    profileInfo.student.citizenship.name
                                        | translateJson
                                        | async
                                }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'address' | transloco }}
                            </td>
                            <td>
                                {{ profileInfo.student.address }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'actual_address' | transloco }}
                            </td>
                            <td>
                                {{ profileInfo.student.actual_address }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Status' | transloco }}
                            </td>
                            <td>
                                {{ STUDENT_STATUS[profileInfo.student.status] }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {{ 'Knowing Languages' | transloco }}
                            </td>
                            <td>
                                @for (
                                    item of profileInfo.student
                                        .knowingLanguages;
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
                                {{ 'hobbies' | transloco }}
                            </td>
                            <td>
                                @for (
                                    hobby of profileInfo.student.hobbies;
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
    private _changeDetectorRef = inject(ChangeDetectorRef);

    constructor() {}

    ngOnInit() {}
}
