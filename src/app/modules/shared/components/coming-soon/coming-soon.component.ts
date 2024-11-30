import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  template: `
    <div class="w-full flex justify-center">
       <img src="images/coming-soon.png"
       class="w-40 h-40"
       alt="Coming soon">
    </div>
  `,
  standalone:true
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
