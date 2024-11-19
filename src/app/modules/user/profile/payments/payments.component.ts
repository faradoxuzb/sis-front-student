import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-payments',
  template: `
   <p>
  		payments Works!
   </p>
  `,
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class PaymentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
