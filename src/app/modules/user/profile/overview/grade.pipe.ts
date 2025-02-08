import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'grade',
    standalone: true,
})
export class GradePipe implements PipeTransform {
    // .grade-A- {
    //     color: darkgreen; /* Color for grade A- */
    //     font-weight: bold;
    // }
    transform(value: string, args?: any): any {
        if (!value) {
            return '';
        }
        switch (value) {
            case 'A':
                return 'text-[#4CAF50] bg-[#D0E9D0]'; // hex for rgba(76, 175, 80, 0.1)
            case 'B':
                return 'text-[#2196F3] bg-[#B2E0F0]'; // hex for rgba(33, 150, 243, 0.1)
            case 'C':
                return 'text-[#F44336] bg-[#F9C2C2]'; // hex for rgba(244, 67, 54, 0.1)
        }
        return 'text-green-600';
    }
}
