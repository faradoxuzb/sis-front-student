import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateJsonPipe } from 'app/modules/shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-classes',
    /*template: `
        <div id="classes" class="tab-content">
            <!-- Description -->
            <!-- Class List -->
            <div class="space-y-8">
                <!-- Example Class Schedule -->
                <div class="rounded-lg border bg-white p-4 shadow">
                    <!-- Class Title -->
                    @if (_profileService.profileInfo$ | async; as class) {
                        <h3 class="mb-4 text-lg font-bold text-gray-800">
                            {{ class.currentGroup.groupName }}
                            {{
                                class.currentGroup.classType
                                    | translateJson
                                    | async
                            }}
                        </h3>
                    }

                    <!-- Terms -->
                    <div class="space-y-6">
                        <!-- Term T1 -->
                        <div>
                            <!-- <div class="grid grid-cols-5 gap-4">
                                <div class="rounded border bg-gray-100 p-3">
                                    <h5 class="mb-2 font-medium text-gray-700">
                                        Monday
                                    </h5>
                                    <ul class="space-y-1">
                                        <li
                                            class="rounded bg-blue-200 px-2 py-1 text-sm text-blue-800"
                                        >
                                            P1: Music
                                        </li>
                                        <li
                                            class="rounded bg-blue-200 px-2 py-1 text-sm text-blue-800"
                                        >
                                            P3: Music
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded border bg-gray-100 p-3">
                                    <h5 class="mb-2 font-medium text-gray-700">
                                        Tuesday
                                    </h5>
                                    <ul class="space-y-1">
                                        <li
                                            class="rounded bg-red-200 px-2 py-1 text-sm text-red-800"
                                        >
                                            P2: Math
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded border bg-gray-100 p-3">
                                    <h5 class="mb-2 font-medium text-gray-700">
                                        Wednesday
                                    </h5>
                                    <ul class="space-y-1">
                                        <li
                                            class="rounded bg-green-200 px-2 py-1 text-sm text-green-800"
                                        >
                                            P1: Russian
                                        </li>
                                        <li
                                            class="rounded bg-green-200 px-2 py-1 text-sm text-green-800"
                                        >
                                            P4: Russian
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded border bg-gray-100 p-3">
                                    <h5 class="mb-2 font-medium text-gray-700">
                                        Thursday
                                    </h5>
                                    <ul class="space-y-1">
                                        <li
                                            class="rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800"
                                        >
                                            P2: English
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded border bg-gray-100 p-3">
                                    <h5 class="mb-2 font-medium text-gray-700">
                                        Friday
                                    </h5>
                                    <ul class="space-y-1">
                                        <li
                                            class="rounded bg-purple-200 px-2 py-1 text-sm text-purple-800"
                                        >
                                            P1: PE
                                        </li>
                                    </ul>
                                </div>
                            </div> -->
                            <div class="grid sm:grid-cols-5 grid-cols-3 gap-4">
                                @if (
                                    _profileService._classes | async;
                                    as classes
                                ) {
                                    @for (class of classes; track $index) {
                                        <div
                                            class="rounded border bg-gray-100 p-3"
                                        >
                                            <h5
                                                class="mb-2 font-medium text-gray-700"
                                            >
                                                {{
                                                    class.quarterly.name
                                                        | translateJson
                                                        | async
                                                }}
                                            </h5>
                                            <ul class="space-y-1">
                                                @for (
                                                    subject of class.classes;
                                                    track $index
                                                ) {
                                                    <li
                                                        class="rounded bg-blue-200 px-2 py-1 text-sm text-blue-800"
                                                    >
                                                        {{
                                                            subject.name
                                                                | translateJson
                                                                | async
                                                        }}
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    }
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,*/
    styleUrls: ['./classes.component.scss'],
    templateUrl: './classes.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        TranslateJsonPipe,
        JsonPipe,
        TranslocoModule,
        DatePipe,
    ],
})
export default class ClassesComponent implements OnInit {
    constructor() {}

    _profileService = inject(ProfileService);

    ngOnInit() {
        this._profileService.getSubjects().subscribe((res) => {
            this._profileService._classes.next(res);
        });
    }
}
