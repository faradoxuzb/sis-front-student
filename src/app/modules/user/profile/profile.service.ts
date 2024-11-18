import { inject, Injectable } from '@angular/core';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GuardianFullData, ProfileInfo } from './profileInfo';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private _baseHttpService = inject(BaseService);
    private _user = inject(UserService);
    private _profileInfo = new BehaviorSubject<ProfileInfo>(null);
    constructor() {}

    public get profileInfo$(): Observable<any> {
        return this._profileInfo.asObservable();
    }

    getProfileInfo() {
        this._user.user$.subscribe((res) => {
            this._baseHttpService
                .get<ProfileInfo>(`student/students/3/edit`)
                .subscribe((res) => {
                    this._profileInfo.next(res);
                });
        });
    }
    getGuardiansByStudentId(studentId: number) {
        return this._baseHttpService.get<GuardianFullData[]>(
            `students/guardians/${studentId}`
        );
    }
}
