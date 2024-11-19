import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-files',
    template: `
        <table class="w-full">
            <thead>
                <tr>
                    <td class="font-semibold">
                        {{ 'FileName' | transloco }}
                    </td>
                    <td class="font-semibold">
                        {{ 'Type' | transloco }}
                    </td>
                    <td class="font-semibold">
                        {{ 'Upload Date' | transloco }}
                    </td>
                    <td class="font-semibold">
                        {{ 'Action' | transloco }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>StudentPhoto.png</td>
                    <td>
                        <button
                            class="typeAllStyles border-[#91d5ff] bg-[#e6f7ff] text-[#096dd9]"
                        >
                            Фото
                        </button>
                    </td>
                    <td>2024-11-15</td>
                    <td>
                        <div class="">
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
                                <button mat-menu-item>2 days ago</button>
                                <button mat-menu-item>3 days ago</button>
                            </mat-menu>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>BirthCertificate.pdf</td>
                    <td>
                        <button
                            class="typeAllStyles w-fit border-[#b7eb8f] bg-[#f6ffed] text-[#389e0d]"
                        >
                            Свидетельство о рождении
                        </button>
                    </td>
                    <td>2024-11-15</td>
                    <td>
                        <div class="">
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
                                <button mat-menu-item>2 days ago</button>
                                <button mat-menu-item>3 days ago</button>
                            </mat-menu>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Diploma.pdf</td>
                    <td>
                        <button
                            class="typeAllStyles w-fit border-[#ffe58f] bg-[#fffbe6] text-[#d48806]"
                        >
                            Дипломы
                        </button>
                    </td>
                    <td>2024-11-15</td>
                    <td>
                        <div class="">
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
                                <button mat-menu-item>2 days ago</button>
                                <button mat-menu-item>3 days ago</button>
                            </mat-menu>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Certificate.png</td>
                    <td>
                        <button
                            class="typeAllStyles w-fit border-[#d3adf7] bg-[#f9f0ff] text-[#531dab]"
                        >
                            Сертификат
                        </button>
                    </td>
                    <td>2024-11-15</td>
                    <td>
                        <div class="">
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
                                <button mat-menu-item>2 days ago</button>
                                <button mat-menu-item>3 days ago</button>
                            </mat-menu>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    styleUrls: ['./files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TranslocoModule, MatIconButton, MatIconModule, MatMenuModule],
})
export default class FilesComponent implements OnInit {
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
    getTagColor(type: string): string {
        switch (type) {
            case 'Фото':
                return 'blue';
            case 'Свидетельство о рождении':
                return 'green';
            case 'Дипломы':
                return 'gold';
            case 'Сертификат':
                return 'purple';
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
