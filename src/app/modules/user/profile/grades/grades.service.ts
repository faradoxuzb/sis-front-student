import { inject, Injectable } from '@angular/core';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { GradeByStudent } from './grade-by-student.model';

@Injectable({
    providedIn: 'root',
})
export class GradeService {
    $userService = inject(UserService);

    constructor(private $base: BaseService) {}

    userId: number;

    getGradesByStudent(userId:number, quarterId: number, subjectId: number = null) {
        let link = `school/student/${userId || this.userId}/quarterly/${quarterId}/attendances` +( subjectId ? `?subject_id=${subjectId}` : '');
        return this.$base.get<GradeByStudent>(link);
    }

    getQuarter() {
        return this.$base.get<any>(
            'settings/education-years/1/quarterlies?page=1&per_page=10'
        );
    }
}
