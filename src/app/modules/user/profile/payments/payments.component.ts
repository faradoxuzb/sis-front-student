import { DatePipe, NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    effect,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component';
import { PaymentService } from './common/payment.service';
import { FormatCurrencyPipe } from './formatCurrency.pipe';

@Component({
    selector: 'app-payments',
    template: `
        <div class="w-full py-2 px-4">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Contracts and Payments' | transloco }}
            </p>
            @if ($paymentService.contracts(); as contracts) {
                <div
                    class="bg-card flex flex-auto flex-col overflow-hidden rounded-2xl shadow xl:col-span-2"
                >
                    <div class="mx-6 overflow-x-auto">
                        <table
                            class="w-full bg-transparent"
                            mat-table
                            matSort
                            [dataSource]="contracts"
                            [trackBy]="trackByFn"
                            #recentTransactionsTable
                        >
                            <ng-container matColumnDef="contract_number">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Contract number' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span
                                        class="text-secondary whitespace-nowrap pr-6 text-sm font-medium"
                                    >
                                        {{ contract.contract_number }}
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="educationYear">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Education year' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span class="whitespace-nowrap pr-6">
                                        {{ contract.educationYear.name }}
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="amount">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Price' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span class="whitespace-nowrap pr-6">
                                        {{ contract.price | formatCurrency }}
                                        {{ 'SUM' | transloco }}
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="signing_date">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Signing Date' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span class="whitespace-nowrap pr-6">
                                        {{
                                            contract.signing_date
                                                | date: 'dd.MM.yyy'
                                        }}
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="rejected_date">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Rejected Date' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span class="whitespace-nowrap pr-6">
                                        {{
                                            contract.rejection_date
                                                | date: 'dd.MM.yyy'
                                        }}
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="status">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Status' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    <span
                                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide"
                                        [ngClass]="
                                            contract.rejection_date
                                                ? 'bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-50'
                                                : 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-50'
                                        "
                                    >
                                        <span
                                            class="whitespace-nowrap leading-relaxed"
                                            >{{
                                                (contract.rejection_date
                                                    ? 'CANCELED'
                                                    : 'DONE'
                                                ) | transloco
                                            }}</span
                                        >
                                    </span>
                                </td>
                            </ng-container>

                            <ng-container matColumnDef="action">
                                <th mat-header-cell *matHeaderCellDef>
                                    {{ 'Action' | transloco }}
                                </th>
                                <td mat-cell *matCellDef="let contract">
                                    @if (contract?.contract?.presigned_url) {
                                        <a
                                            class="text-blue-500 underline"
                                            [href]="
                                                contract?.contract.presigned_url
                                            "
                                        >
                                            {{ 'Download' | transloco }}
                                        </a>
                                    } @else {
                                        <p class="text-center">-</p>
                                    }
                                </td>
                            </ng-container>

                            <tr
                                mat-header-row
                                *matHeaderRowDef="contractsColumn"
                            ></tr>

                            <tr
                                class="order-row h-16"
                                mat-row
                                *matRowDef="let row; columns: contractsColumn"
                            ></tr>
                        </table>
                    </div>
                </div>
            } @else {
                <div>
                    <app-no-data></app-no-data>
                </div>
            }
        </div>
    `,
    styleUrls: ['./payments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslocoModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        NoDataComponent,
        NgClass,
        DatePipe,
        FormatCurrencyPipe,
    ],
})
export default class PaymentsComponent implements AfterViewInit {
    $userService = inject(UserService);
    $activatedRoute = inject(ActivatedRoute);
    contracts: MatTableDataSource<any> = new MatTableDataSource();
    contractsColumn: string[] = [
        'contract_number',
        'educationYear',
        'amount',
        'signing_date',
        'rejected_date',
        'status',
        'action',
    ];

    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    constructor() {
        effect(() => {
            if (this.$paymentService.contracts()) {
                this.contracts = this.$paymentService.contracts();
            }
        });
        let id = this.$userService.chooseStudentId();
        if (!id) {
            this.$userService.user$.subscribe((res) => {
                this.$paymentService.getData(res.id);
            });
        } else {
            this.$paymentService.getData(+id);
        }
    }
    ngAfterViewInit(): void {
        this.contracts.sort = this.recentTransactionsTableMatSort;
    }
    public $paymentService = inject(PaymentService);
}
