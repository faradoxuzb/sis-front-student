import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from './user.service';
import { Parent } from '../../modules/shared/models/parent.model';
import { ProfileInfo } from '../../modules/user/profile/profileInfo';
import { ProfileService } from '../../modules/user/profile/profile.service';

export const guardianProfileResolver: ResolveFn<Parent> = (route, state) => {
    const userService = inject(UserService);
    return userService.parent$;
};

export const studentProfileResolver: ResolveFn<ProfileInfo> =  (route, state) => {
    const profileService = inject(ProfileService);
    return profileService.profileInfo$;
}
