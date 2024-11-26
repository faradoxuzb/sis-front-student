import { inject, Injectable } from '@angular/core';
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
    public _classes = this._baseHttpService.get<any>(
        'students/classes-schedule'
    );
    public _lessonSchedule = this._baseHttpService.get<any>(
        'students/lesson-schedule'
    )
    constructor() {}

    public get profileInfo$(): Observable<any> {
        return this._profileInfo.asObservable();
    }

    getProfileInfo() {
        this._baseHttpService
            .get<ProfileInfo>(`students/profile`)
            .subscribe((res) => {
                this._profileInfo.next(res);
            });
    }
}
