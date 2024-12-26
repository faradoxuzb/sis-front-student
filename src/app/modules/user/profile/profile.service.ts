import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'app/core/services/baseHttp.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileInfo } from './profileInfo';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private _baseHttpService = inject(BaseService);
    private _profileInfo = new BehaviorSubject<ProfileInfo>(null);
    public _files = new BehaviorSubject<any>(null);
    public _activatedRoute = inject(ActivatedRoute);
    public id: number;
    public _classes = new BehaviorSubject<any>(null);

    constructor() {}

    public get profileInfo$(): Observable<any> {
        return this._profileInfo.asObservable();
    }

    getSchedule(id?: number) {
        let link = `students/lesson-schedule`;
        if (id) {
            link = `students/lesson-schedule/${id}`;
        }
        return this._baseHttpService.get<any>(link);
    }
    getSubjects() {
        let link = `students/classes-schedule`;
        if (this.id) {
            link = `students/classes-schedule/${this.id}`;
        }
        return this._baseHttpService.get<any>(link);
    }

    getProfileInfo(id?: number) {
        let link = `students/profile`;
        if (id) {
            link = `students/profile/${this.id}`;
        }
        this._baseHttpService.get<ProfileInfo>(link).subscribe((res) => {
            this._profileInfo.next(res);
        });
    }
}
