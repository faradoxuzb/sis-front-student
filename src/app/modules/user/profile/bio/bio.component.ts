import { Component, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-bio',
    template: `
        <div class="overflow-auto" style="height: calc(100vh - 280px)">
            <table class="w-full">
                <tbody>
                    @for (item of data; track $index) {
                        <tr>
                            <td>
                                {{ item.translate }}
                            </td>
                            <td>
                                <p>{{item.propertyName}}</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    `,
    styleUrls: ['./bio.component.scss'],
    standalone: true,
    imports: [TranslocoModule],
})
export class BioComponent implements OnInit {
    data = [
        {
            translate: 'fullName',
            propertyName: 'Ergashev Maruf Mamurjon o`g`li',
        },
        {
            translate: 'phoneNumber',
            propertyName: '+998 90 132 65 66',
        },
        {
            translate: 'emailaddress',
            propertyName: 'dvoryanin@gmail.com',
        },
    ];

    constructor() {}

    ngOnInit() {}
}
