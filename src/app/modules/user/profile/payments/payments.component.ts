import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { PaymentService } from './common/payment.service';

@Component({
    selector: 'app-payments',
    template: `
        <div class="w-full">
            <p class="my-4 text-[22px] font-semibold">
                {{ 'Contracts and Payments' | transloco }}
            </p>
            @if ($paymentService.contracts(); as contracts) {
                <table class="w-full">
                    <thead>
                        <tr>
                            <td>No</td>
                            <td class="font-semibold">
                                {{ 'Contract number' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Education year' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Signing Date' | transloco }}
                            </td>
                            <td class="font-semibold">
                                {{ 'Rejected' | transloco }}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of contracts; track $index) {
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ item.contract_number }}</td>
                                <td>{{ item.educationYear.name }}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            }
        </div>
    `,
    styleUrls: ['./payments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TranslocoModule],
})
export default class PaymentsComponent {
    $userService = inject(UserService);
    $activatedRoute = inject(ActivatedRoute);
    constructor() {
        let id = this.$userService.chooseStudentId();
        if (!id) {
            this.$userService.user$.subscribe((res) => {
                this.$paymentService.getData(res.id);
            });
        } else {
            this.$paymentService.getData(+id);
        }
    }
    public $paymentService = inject(PaymentService);
}
