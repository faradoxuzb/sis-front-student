import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contracts',
  template: `
   <p>
  		contracts Works!
   </p>
  `,
  styleUrls: ['./contracts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
})
export default class ContractsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
