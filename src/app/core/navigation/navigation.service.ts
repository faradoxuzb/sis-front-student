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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._userService.user$.subscribe((res) => {
                    const role = res.roles[0].name;
                    if (role == Constants.Roles.Parent) {
                        this._userService.getParent().subscribe((res) => {
                            navigation.default = [
                                {
                                    id: 'Parent Profile',
                                    title: 'Parent Profile',
                                    type: 'basic',
                                    icon: 'heroicons_outline:identification',
                                    link: '/parentProfile',
                                },
                                {
                                    id: 'children',
                                    title: "Children's profile",
                                    type: 'group',
                                    children: [],
                                },
                                {
                                    id: 'children',
                                    title: "Children's schedule",
                                    type: 'group',
                                    children: [],
                                },
                            ];
                            if (res.students.length > 0) {
                                res.students.forEach((student) => {
                                    navigation.default[1].children.push({
                                        id: 'children/' + student.id,
                                        title: student.first_name+' '+student.last_name,
                                        type: 'basic',
                                        icon: 'heroicons_outline:user',
                                        link: '/children/' + student.id,
                                    });
                                });
                                res.students.forEach((student) => {
                                    navigation.default[2].children.push({
                                        id: 'children-schedule/' + student.id,
                                        title: student.first_name+' '+student.last_name,
                                        type: 'basic',
                                        icon: 'heroicons_outline:academic-cap',
                                        link: '/children-schedule/' + student.id,
                                    });
                                });
                            }
                            this._navigation.next(navigation);
                        });
                    } else {
                        this._navigation.next(navigation);
                    }
                });
            })
        );
    }
}
