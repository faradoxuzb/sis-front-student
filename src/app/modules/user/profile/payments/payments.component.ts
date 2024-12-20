import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';
import { PaymentService } from './common/payment.service';

@Component({
    selector: 'app-payments',
    template: `
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
    `,
    styleUrls: ['./payments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent, TranslocoModule],
})
export default class PaymentsComponent {
    $userService = inject(UserService);
    $activatedRoute = inject(ActivatedRoute);
    constructor() {
        let id = this.$activatedRoute.snapshot.paramMap.get('id');
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
