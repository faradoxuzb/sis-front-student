import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { GradeService } from '../grades/grades.service';
import { map, Observable } from 'rxjs';
import { TranslateJsonPipe } from '../../../shared/Pipes/translate-json.pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileInfo } from '../profileInfo';
import { FullNamePipe } from '../../../shared/Pipes/full-name.pipe';
import { MatFormField } from '@angular/material/form-field';
import { GradeByStudent } from '../grades/grade-by-student.model';
import { Constants } from '../../../../config/constants';
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component';
import { GradePipe } from '../overview/grade.pipe';

@Component({
    selector: 'app-daily-grades',
    standalone: true,
    imports: [
        MatMenuModule,
        MatRipple,
        MatIcon,
        MatButtonModule,
        TranslocoDirective,
        TranslateJsonPipe,
        AsyncPipe,
        FullNamePipe,
        TranslocoPipe,
        MatFormField,
        NgClass,
        NoDataComponent,
        GradePipe,
    ],
    templateUrl: './daily-grades.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyGradesComponent {
    selectedProject: any;
    studentProfile: ProfileInfo;
    gradeService = inject(GradeService);
    cd = inject(ChangeDetectorRef);
    route = inject(ActivatedRoute);
    quarterlies = [];
    grades$: Observable<GradeByStudent>;
    readonly ATTENDANCE_STATUS_COLORS = Constants.ATTENDANCE_STATUS_COLORS;
    subjectId: number;

    constructor() {
        this.studentProfile = this.route.snapshot.parent.data.studentProfile;
        this.quarterlies = this.route.snapshot.data.quarters;
        this.subjectId = this.route.snapshot.queryParams.subjectId;
        this.onQuarterlyChanged(this.quarterlies[2]);
    }

    onQuarterlyChanged(quarterly: any) {
        this.selectedProject = quarterly;
        this.loadGrades(this.studentProfile.id, quarterly.id, this.subjectId);
        this.cd.markForCheck();
    }

    loadGrades(studentId: number, quarterId: number, subjectId?: number) {
        this.grades$ = this.gradeService.getGradesByStudent(
            studentId,
            quarterId,
            subjectId
        );
    }
}
