import { Directive, HostBinding, input } from '@angular/core';
import { MyDay } from './attendance.component';

@Directive({
    selector: '[appDayStatus]',
    standalone: true,
})
export class DayStatusDirective {
    day = input.required<MyDay>();
    @HostBinding('class')
    get hostClassValue(): string {
        return this.treatClass();
    }
    treatClass(): string {
        if (this.day().isCurrentMonth && !this.day().isDayOff) {
            if (this.day().daystatus == 'present') {
                return 'bg-[#ede7ff]';
            }
            if (this.day().daystatus ==  'late') {
                return 'bg-red-400 text-white';
            }
            if (this.day().daystatus == 'absent') {
                return 'bg-red-600 text-white';
            }
        }
        if (this.day().isDayOff && this.day().isCurrentMonth) {
            return 'bg-[#ffd0d0]';
        } else if (!this.day().isCurrentMonth) {
            return 'text-[#94a3b8]';
        }
    }
}