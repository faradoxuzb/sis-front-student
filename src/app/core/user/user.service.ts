import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/core/user/user.types';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { Parent } from '../../modules/shared/models/parent.model';
import { BaseService } from '../services/baseHttp.service';
import { allResponseUser } from './user.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _parent: ReplaySubject<Parent> = new ReplaySubject<Parent>(1);
    private _router = inject(Router);
    private _baseHttpService = inject(BaseService);
    public chooseStudentId = signal<number | null>(0);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    set parent(value: Parent) {
        // Store the value
        this._parent.next(value);
    }

    get parent$(): Observable<Parent> {
        return this._parent.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<allResponseUser> {
        return this._baseHttpService.get<allResponseUser>('auth/me').pipe(
            tap((user) => {
                this._user.next(user.user);
                if (user.user.is_password_reset) {
                    this._router.navigate(['reset-password'], {
                        queryParams: {
                            status: 'mustReset',
                        },
                    });
                }
            })
        );
    }
    getParent(): Observable<Parent> {
        return this._baseHttpService.get<Parent>('guardians/profile').pipe(
            tap((parent) => {
                this.parent = parent;
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
