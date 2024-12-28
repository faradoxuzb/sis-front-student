import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { of, switchMap } from 'rxjs';

export const CheckUserRole: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);
    const baseHttp = inject(BaseService);
    const userService = inject(UserService);
    return inject(UserService).user$.pipe(
        switchMap((user) => {
            if (
                user.roles[0].name !== 'student' &&
                !userService.chooseStudentId()
            ) {
                const urlTree = router.parseUrl(`parentProfile`);
                return of(urlTree);
            }
            return of(true);
        })
    );
};
