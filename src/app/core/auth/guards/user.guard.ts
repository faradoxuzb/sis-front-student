import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';
import { of } from 'rxjs';

let firstTime = false;
export const GetUserGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const userService = inject(UserService);
    const navigationService = inject(NavigationService);
    if (!firstTime) {
        firstTime = true;
        userService.get().subscribe();
        navigationService.get().subscribe();
    }
    return of(true);
};
