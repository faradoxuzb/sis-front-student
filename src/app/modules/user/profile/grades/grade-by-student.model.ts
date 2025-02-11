import { MultiLanguageField } from 'app/modules/shared/models/multi-language-field.model';
import { SelectModel } from 'app/modules/shared/models/select.model';
import { OverviewAttendance } from '../overview/module';

export interface GradeByStudent {
    subjects: GradeByStudentSubject[];
}

interface GradeByStudentSubject {
    id: number;
    name: MultiLanguageField;
    days: {
        date: string; // '2024-12-09';
        existsInDailyLessonForSubject: boolean;
        attendance: OverviewAttendance;
    }[];
}
export interface QuarterlyModel {
    id: number;
    name: MultiLanguageField;
    start_date: string;
    end_date: string;
}

export interface QuarterlyResponse extends QuarterlyModel {
    id: number;
    educationYear: SelectModel;
    branchGroup: SelectModel;
    classType: SelectModel<MultiLanguageField>;
}
