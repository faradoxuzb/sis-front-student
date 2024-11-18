import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  template: `
  <div id="classes" class="tab-content">
  <!-- Description -->
  <p class="text-gray-600 mb-6">
    Below is the schedule for the classes the student is registered for. Each term (T1, T2, T3) contains a weekly schedule with subjects and their respective periods. Certain subjects may occur multiple times on the same day.
  </p>

  <!-- Class List -->
  <div class="space-y-8">
    <!-- Example Class Schedule -->
    <div class="border rounded-lg shadow p-4 bg-white">
      <!-- Class Title -->
      <h3 class="text-lg font-bold text-gray-800 mb-4">2A класс</h3>

      <!-- Terms -->
      <div class="space-y-6">
        <!-- Term T1 -->
        <div>
          <h4 class="text-md font-semibold text-gray-700 mb-2">Term T1</h4>
          <div class="grid grid-cols-5 gap-4">
            <!-- Monday -->
            <div class="border rounded p-3 bg-gray-100">
              <h5 class="font-medium text-gray-700 mb-2">Monday</h5>
              <ul class="space-y-1">
                <li class="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">P1: Music</li>
                <li class="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">P3: Music</li>
              </ul>
            </div>
            <!-- Tuesday -->
            <div class="border rounded p-3 bg-gray-100">
              <h5 class="font-medium text-gray-700 mb-2">Tuesday</h5>
              <ul class="space-y-1">
                <li class="bg-red-200 text-red-800 px-2 py-1 rounded text-sm">P2: Math</li>
              </ul>
            </div>
            <!-- Wednesday -->
            <div class="border rounded p-3 bg-gray-100">
              <h5 class="font-medium text-gray-700 mb-2">Wednesday</h5>
              <ul class="space-y-1">
                <li class="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">P1: Russian</li>
                <li class="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">P4: Russian</li>
              </ul>
            </div>
            <!-- Thursday -->
            <div class="border rounded p-3 bg-gray-100">
              <h5 class="font-medium text-gray-700 mb-2">Thursday</h5>
              <ul class="space-y-1">
                <li class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">P2: English</li>
              </ul>
            </div>
            <!-- Friday -->
            <div class="border rounded p-3 bg-gray-100">
              <h5 class="font-medium text-gray-700 mb-2">Friday</h5>
              <ul class="space-y-1">
                <li class="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm">P1: PE</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  `,
  styleUrls: ['./classes.component.scss'],
  standalone: true,

})
export default class ClassesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
