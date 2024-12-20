import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from 'app/core/services/baseHttp.service';
import { map } from 'rxjs';
import { Payment } from './payment.model';
@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    $baseHttpService = inject(BaseService);
    contracts = signal(null);
    constructor() {}
    getData(id: number) {
        this.$baseHttpService
            .get<Payment>(`student/students/${id}/student-contracts`)
            .pipe(map((el) => el.data))
            .subscribe((res) => {
                this.contracts.set(res);
            });
    }
}
