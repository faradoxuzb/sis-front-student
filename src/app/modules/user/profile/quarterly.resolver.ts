import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GradeService } from './grades/grades.service';
import { map } from 'rxjs';

export const quarterlyResolver: ResolveFn<any> = (route, state) => {
    const gradeService = inject(GradeService);
    return gradeService.getQuarter().pipe(map((v) => v.data));
};
