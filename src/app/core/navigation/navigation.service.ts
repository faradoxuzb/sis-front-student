import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from 'app/config/constants';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    private _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }
    set navigation$(navigation: Navigation) {
        this._navigation.next(navigation);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                const userId = +localStorage.getItem('studentId');
                this._userService.chooseStudentId.set(userId);
                this._userService.user$.subscribe((res) => {
                    const role = res.roles[0].name;
                    if (role == Constants.Roles.Parent) {
                        this._userService.getParent().subscribe((res) => {
                            let navigations = { ...navigation };
                            let studentIdFromST =
                                localStorage.getItem('studentId');
                            const studentId = res.students.find(
                                (el) => el.id == +studentIdFromST
                            )?.id;
                            this._userService.chooseStudentId.set(studentId);
                            if (studentId) {
                                this._navigation.next(navigation);
                            } else {
                                navigations.default = [
                                    {
                                        id: 'parentProfile',
                                        title: 'Parent Profile',
                                        type: 'basic',
                                        icon: 'heroicons_outline:user',
                                        link: '/parentProfile',
                                    },
                                ];
                                this._navigation.next(navigations);
                            }
                        });
                    } else {
                        this._navigation.next(navigation);
                    }
                });
            })
        );
    }
}
