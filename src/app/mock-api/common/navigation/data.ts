/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const parentNavigation: FuseNavigationItem[] = [
    {
        id: 'parentProfile',
        title: 'Parent Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/parentProfile',
    },
    {
        id: "Children's profile",
        type: 'group',
        title: "Children's profile",
        children: [],
    },
];

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Schedule',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Schedule',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Schedule',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Schedule',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
