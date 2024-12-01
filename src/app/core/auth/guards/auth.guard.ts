import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Constants } from 'app/config/constants';
import { AuthService } from 'app/core/auth/auth.service';
import { BaseService } from 'app/core/services/baseHttp.service';
import { UserService } from 'app/core/user/user.service';
import { Parent } from 'app/modules/shared/models/parent.model';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const baseHttp = inject(BaseService);
    const userService = inject(UserService);
    // Check the authentication status
    return inject(AuthService)
        .check()
        .pipe(
            switchMap((authenticated) => {
                // If the user is not authenticated...
                if (!authenticated) {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL =
                        state.url === '/sign-out'
                            ? ''
                            : `redirectURL=${state.url}`;
                    const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                    return of(urlTree);
                }

                // Allow the access
                return of(true);
            })
        );
};
