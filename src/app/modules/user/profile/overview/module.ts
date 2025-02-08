import { MultiLanguageField } from 'app/modules/shared/models/multi-language-field.model';

export interface DailySchedule {
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    subject: Subject;
    start_time: string;
    end_time: string;
    class_number: number;
    teacher: Teacher;
    attendance: Attendance;
}

export interface Attendance {
    id: number;
    status: string;
    mark: number;
    note: string;
    grade: string;
}

export interface Subject {
    id: number;
    name: MultiLanguageField;
}
export interface Teacher {
    id: number;
    full_name: string;
}

export interface OverviewAttendance {
    absents: number;
    lates: number;
    presents: number;
    missed: number;
}
