import { AsyncPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateJsonPipe } from '../../../shared/Pipes/translate-json.pipe';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, TranslateJsonPipe, NgClass, TranslocoModule],
})
export default class GradesComponent implements OnInit {
    constructor() {}
    groupedData: any;
    performanceIndicators = [
        {
            grade: 'A*',
            mark: '90+',
            class: 'text-green-800',
        },
        {
            grade: 'A',
            mark: '80-89',
            class: 'text-green-700',
        },
        {
            grade: 'B',
            mark: '70-79',
            class: 'text-green-600',
        },
        {
            grade: 'C',
            mark: '60-69',
            class: 'text-amber-600',
        },
        {
            grade: 'D',
            mark: '50-59',
            class: 'text-amber-500',
        },
        {
            grade: 'E',
            mark: '40-49',
            class: 'text-red-600',
        },
        {
            grade: 'F',
            mark: '30-39',
            class: 'text-red-700',
        },
        {
            grade: 'G',
            mark: '20-29',
            class: 'text-red-800',
        },
        {
            grade: 'U',
            mark: '0-19',
            class: 'text-red-900',
        },
    ];

    _profileService = inject(ProfileService);
    cd = inject(ChangeDetectorRef);

    ngOnInit() {
        this._profileService.getSubjects().subscribe((res) => {
            const groupedSubjects = {};
            res.forEach((entry) => {
                const { quarterly, classes } = entry;

                // Iterate over each class (subject)
                classes.forEach((classItem) => {
                    const { subject, subjectGrade } = classItem;
                    const subjectId = subject.id;

                    // Initialize the subject in the grouped structure if it doesn't exist
                    if (!groupedSubjects[subjectId]) {
                        groupedSubjects[subjectId] = {
                            subject: subject,
                            gradesByQuarterly: [],
                        };
                    }

                    // Add the subjectGrade associated with the current quarterly
                    groupedSubjects[subjectId].gradesByQuarterly.push({
                        quarterly: quarterly.name,
                        subjectGrade,
                    });
                });
            });
            const groupedSubjectsArray = Object.values(groupedSubjects);
            this.groupedData = groupedSubjectsArray;
            this.cd.detectChanges();
        });
    }
}
