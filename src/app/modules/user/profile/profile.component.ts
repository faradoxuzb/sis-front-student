import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BioComponent } from './bio/bio.component';
@Component({
    selector: 'app-profile',
    template: `
        <div class="w-full p-5">
            <div class="w-full rounded-md bg-white dark:bg-black p-5">
                <div class="mb-5 flex gap-4">
                    <div class="overflow-hidden rounded-md">
                        <mat-icon
                            class="icon-size-[50px]"
                            svgIcon="heroicons_outline:user-circle"
                        ></mat-icon>
                    </div>
                    <div>
                        <h1 class="text-lg font-semibold">Ergashev Marufjon</h1>
                        <span>01.04.1998</span>
                    </div>
                </div>
                <mat-tab-group>
                    <mat-tab label="BIO">
                        <app-bio></app-bio>
                    </mat-tab>
                    <mat-tab label="Контакты"> Content 2 </mat-tab>
                    <mat-tab label="Посещаемость"> Content 3 </mat-tab>
                    <mat-tab label="Классы"> Content 3 </mat-tab>
                    <mat-tab label="Отчеты"> Content 3 </mat-tab>
                    <mat-tab label="Инциденты или происшествия">
                        Content 3
                    </mat-tab>
                    <mat-tab
                        label="Файловый кабинет куда мы можем прикреплять документы "
                    >
                        Content 3
                    </mat-tab>
                    <mat-tab label="Контракты"> Content 3 </mat-tab>
                    <mat-tab label="Оплата"> Content 3 </mat-tab>
                    <mat-tab label=" Общее сведения "> Content 3 </mat-tab>
                </mat-tab-group>
            </div>
        </div>
    `,
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports: [MatTabsModule, MatIconModule, BioComponent],
})
export default class ProfileComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
