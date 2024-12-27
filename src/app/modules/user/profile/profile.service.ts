import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
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
    private _userService = inject(UserService);
    public id: number;
    public _classes = new BehaviorSubject<any>(null);

    constructor() {}

    public get profileInfo$(): Observable<any> {
        return this._profileInfo.asObservable();
    }

    getSchedule() {
        const id = this._userService.chooseStudentId();
        let link = `students/lesson-schedule`;
        if (id) {
            link = `students/lesson-schedule/${id}`;
        }
        return this._baseHttpService.get<any>(link);
    }
    getSubjects() {
        const id = this._userService.chooseStudentId();
        let link = `students/classes-schedule`;
        if (+id) {
            link = `students/classes-schedule/${id}`;
        }
        return this._baseHttpService.get<any>(link);
    }

    getProfileInfo() {
        this._profileInfo.next(null);
        const id = this._userService.chooseStudentId();
        let link = `students/profile`;
        if (id) {
            link = `students/profile/${id}`;
        }
        this._baseHttpService.get<ProfileInfo>(link).subscribe((res) => {
            this._profileInfo.next(res);
        });
    }
}
