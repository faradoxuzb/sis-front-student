import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';
import { ProfileService } from '../profile.service';
import { AsyncPipe } from '@angular/common';
import { TranslateJsonPipe } from '../../../shared/Pipes/translate-json.pipe';

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ComingSoonComponent, AsyncPipe, TranslateJsonPipe],
})
export default class GradesComponent implements OnInit {
    constructor() {}
    groupedData: any;

    _profileService = inject(ProfileService);
    cd = inject(ChangeDetectorRef);

    ngOnInit() {
        this._profileService.getSubjects().subscribe((res) => {
            const groupedSubjects = {};
            res.forEach(entry => {
                const { quarterly, classes } = entry;

                // Iterate over each class (subject)
                classes.forEach(classItem => {
                    const { subject, subjectGrade } = classItem;
                    const subjectId = subject.id;

                    // Initialize the subject in the grouped structure if it doesn't exist
                    if (!groupedSubjects[subjectId]) {
                        groupedSubjects[subjectId] = {
                            subject: subject,
                            gradesByQuarterly: []
                        };
                    }

                    // Add the subjectGrade associated with the current quarterly
                    groupedSubjects[subjectId].gradesByQuarterly.push({
                        quarterly: quarterly.name,
                        subjectGrade
                    });
                });
            });
            const groupedSubjectsArray = Object.values(groupedSubjects);
            this.groupedData = groupedSubjectsArray;
            console.log(this.groupedData);
            this.cd.detectChanges();
        });
    }
}
