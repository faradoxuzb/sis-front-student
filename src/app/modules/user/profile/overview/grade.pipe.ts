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
                return 'text-[#4CAF50]'; // hex for rgba(76, 175, 80, 0.1)
            case 'B':
                return 'text-[#2196F3]'; // hex for rgba(33, 150, 243, 0.1)
            case 'C':
                return 'text-[#F44336]'; // hex for rgba(244, 67, 54, 0.1)
        }
        return 'text-green-600';
    }
}
