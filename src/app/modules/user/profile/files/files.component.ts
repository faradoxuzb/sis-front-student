import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-files',
    template: `
        <div class="w-full">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Files' | transloco }}
            </p>
            @if (_profileService.profileInfo$ | async; as profileInfo) {
                <table class="w-full">
                    <thead>
                        <tr>
                            <td class="font-semibold">
                                {{ 'File name' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Type' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Upload date' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Action' | transloco }}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of profileInfo.files; track $index) {
                            <tr>
                                <td>{{ item.name }}</td>
                                <td>
                                    <button class="typeAllStyles">
                                        {{ item.key | transloco }}
                                    </button>
                                </td>
                                <td>2024-11-15</td>
                                <td class="cursor-pointer">
                                    <a
                                        [href]="item.presigned_url"
                                        target="_blank"
                                    >
                                        <mat-icon
                                            svgIcon="heroicons_outline:eye"
                                            class="icon-size-5"
                                        ></mat-icon>
                                    </a>
                                    <!-- <div class="">
                                    <button
                                        mat-icon-button
                                        [matMenuTriggerFor]="summaryMenu"
                                    >
                                        <mat-icon
                                            class="icon-size-4"
                                            [svgIcon]="
                                                'heroicons_mini:ellipsis-vertical'
                                            "
                                        ></mat-icon>
                                    </button>
                                    <mat-menu #summaryMenu="matMenu">
                                        <button mat-menu-item>Yesterday</button>
                                        <button mat-menu-item>
                                            2 days ago
                                        </button>
                                        <button mat-menu-item>
                                            3 days ago
                                        </button>
                                    </mat-menu>
                                </div> -->
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            }
        </div>
    `,
    styleUrls: ['./files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslocoModule,
        MatIconButton,
        MatIconModule,
        MatMenuModule,
        AsyncPipe,
    ],
})
export default class FilesComponent implements OnInit {
    protected _profileService = inject(ProfileService);
    constructor() {}

    visible: any = {};
    fileList = [
        {
            name: 'StudentPhoto.png',
            type: 'Фото',
            uploadDate: '2024-11-15',
        },
        {
            name: 'BirthCertificate.pdf',
            type: 'Свидетельство о рождении',
            uploadDate: '2024-10-20',
        },
        {
            name: 'Diploma.pdf',
            type: 'Дипломы',
            uploadDate: '2024-09-30',
        },
        {
            name: 'Certificate.png',
            type: 'Сертификат',
            uploadDate: '2024-09-15',
        },
    ];

    // Get color for resource type tags
    getTagColor(key: string): string {
        switch (key) {
            case 'photo':
                return 'border-[#91d5ff] bg-[#e6f7ff] text-[#096dd9]';
            case 'diplomas':
                return 'border-[#b7eb8f] bg-[#f6ffed] text-[#389e0d]';
            case 'sertificates':
                return 'border-[#ffe58f] bg-[#fffbe6] text-[#d48806]';
            case 'personalDocument':
                return 'border-[#d3adf7] bg-[#f9f0ff] text-[#531dab]';
            default:
                return 'default';
        }
    }

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
