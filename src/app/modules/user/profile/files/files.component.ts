import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { NoDataComponent } from 'app/modules/shared/components/no-data/no-data.component';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-files',
    template: `
        <div class="h-full w-full">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Files' | transloco }}
            </p>
            @if (_profileService.profileInfo$ | async; as profileInfo) {
                <div class="-m-2 mt-2 flex flex-wrap">
                    @for (
                        file of profileInfo.files;
                        track trackByFn($index, file)
                    ) {
                        <a
                            class="bg-card m-2 flex h-40 w-40 cursor-pointer flex-col rounded-2xl p-4 shadow"
                            [href]="file.presigned_url"
                            target="_self"
                        >
                            <div class="flex w-full justify-end">
                                <mat-icon
                                    class="icon-size-5"
                                    svgIcon="heroicons_solid:arrow-down-tray"
                                ></mat-icon>
                            </div>
                            <div class="aspect-[9/6]">
                                <div
                                    class="flex h-full items-center justify-center"
                                >
                                    <!-- Icons -->
                                    <div class="relative">
                                        <mat-icon
                                            class="text-hint opacity-50 icon-size-16"
                                            [svgIcon]="
                                                'heroicons_solid:document'
                                            "
                                        ></mat-icon>
                                        <div
                                            class="absolute bottom-0 left-0 rounded px-1.5 text-sm font-semibold leading-5 text-white"
                                            [class.bg-red-600]="
                                                file.type === 'PDF'
                                            "
                                            [class.bg-blue-600]="
                                                file.type === 'DOC' ||
                                                file.type === 'DOCX'
                                            "
                                            [class.bg-green-600]="
                                                file.type === 'XLS' ||
                                                file.type === 'XLSX'
                                            "
                                            [class.bg-gray-600]="
                                                file.type === 'TXT'
                                            "
                                            [class.bg-amber-600]="
                                                file.type === 'JPG' ||
                                                file.type === 'PNG'
                                            "
                                        >
                                            {{ file.type.toUpperCase() }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex flex-auto flex-col justify-center text-center text-sm font-medium"
                            >
                                <div class="truncate" [matTooltip]="file.name">
                                    {{ file.name }}
                                </div>
                            </div>
                        </a>
                    }
                </div>
            } @else {
                <app-no-data></app-no-data>
            }
        </div>
    `,
    styleUrls: ['./files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        AsyncPipe,
        NoDataComponent,
        MatTooltipModule,
    ],
})
export default class FilesComponent implements OnInit {
    protected _profileService = inject(ProfileService);

    constructor() {}

    fileList = [
        {
            name: 'StudentPhoto.png',
            type: 'JPG',
            uploadDate: '2024-11-15',
        },
        {
            name: 'BirthCertificate.pdf',
            type: 'PDF',
            uploadDate: '2024-10-20',
        },
        {
            name: 'Diploma.pdf',
            type: 'XLS',
            uploadDate: '2024-09-30',
        },
        {
            name: 'Certificate.png',
            type: 'TXT',
            uploadDate: '2024-09-15',
        },
    ];

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    onBackdropClicked(): void {}

    viewFile(file: any): void {
        console.log('Viewing file:', file);
    }

    downloadFile(file: any): void {
        console.log('Downloading file:', file);
    }

    deleteFile(file: any): void {
        console.log('Deleting file:', file);
        this.fileList = this.fileList.filter((f) => f !== file);
    }

    ngOnInit() {}
}
